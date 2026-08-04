import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  constructor(private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    let tokenizedReq = req;
    const accessToken = authService.getAccessToken();
    // Add access token if available
    if (accessToken) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Ignore if not access token expiry
        if (
          error.status !== 401 ||
          req.url.includes('/refresh-token') ||
          !authService.getRefreshToken()
        ) {
          return throwError(() => error);
        }
        console.log("Access token expired");
        // -----------------------------
        // Refresh already running
        // -----------------------------
        if (this.isRefreshing) {
          console.log("Waiting for refresh...");
          return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(newReq);
            })
          );
        }
        // -----------------------------
        // Start refresh
        // -----------------------------
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        console.log("Refreshing token...");
        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            console.log("Refresh success");
            authService.saveTokens(
              res.accessToken,
              res.refreshToken,
              authService.getRole()!
            );
            this.refreshTokenSubject.next(res.accessToken);
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });
            return next.handle(newReq);
          }),
          catchError((err) => {
            console.log("Refresh failed");
            localStorage.clear();
            authService.logoutUser();
            return throwError(() => err);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      })
    );
  }
}
