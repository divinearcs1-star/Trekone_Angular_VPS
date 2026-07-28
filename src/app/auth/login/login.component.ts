import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authservice: AuthService, private router: Router,
    private toastr: ToastrService, private route: ActivatedRoute) {
    console.log("login comp loaded")
  }
  msg = ""
  showPassword: boolean = false;
  loginUserData = {
    email: "",
    password: ""
  }

  returnUrl: string = '/';

  ngOnInit() {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginUser() {
    this.authservice.loginUser(this.loginUserData).subscribe(
      res => {
        console.log("received token")
        this.authservice.saveTokens(res.accessToken, res.refreshToken, res.role);
        console.log(res.accessToken)
        console.log(res.role)

        console.log("entering into special")
        // this.router.navigate(['/']);
        this.router.navigateByUrl(this.returnUrl);
      },
      err => {
        console.log(err)
        this.msg = err.error.message;
      }
    );
  }

  register() {
    console.log("calling register")
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
