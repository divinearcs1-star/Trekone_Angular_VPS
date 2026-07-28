import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MybookingComponent } from './mybooking/mybooking.component';
import { SharedModule } from '../shared/shared.module';
import { TermsComponent } from './terms/terms.component';
import { ReviewComponent } from './review/review.component';
import { GreetingComponent } from './greeting/greeting.component';
import { TrekRegistrationComponent } from './trek-registration/trek-registration.component';


@NgModule({
  declarations: [
    MybookingComponent,
    GreetingComponent,
    ReviewComponent,
    TermsComponent,
    TrekRegistrationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
