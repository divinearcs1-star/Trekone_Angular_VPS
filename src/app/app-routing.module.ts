import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  //  {path : '', redirectTo:'events', pathMatch:'full'},
  { path: '', component: HomeComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module')
        .then(m => m.UserModule)
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () =>
      import('./admin/admin.module')
        .then(m => m.AdminModule)
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./event/event.module').then(m => m.EventModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule)
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
