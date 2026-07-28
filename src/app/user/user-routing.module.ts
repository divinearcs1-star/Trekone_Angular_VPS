import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MybookingComponent } from './mybooking/mybooking.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ReviewComponent } from './review/review.component';
import { TermsComponent } from './terms/terms.component';
import { TrekRegistrationComponent } from './trek-registration/trek-registration.component';

const routes: Routes = [
  { path: 'mybooking', component: MybookingComponent },
  { path: 'greeting', component: GreetingComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'terms-and-conditions', component: TermsComponent },
  { path: 'trekregistration/:name/:id/:fees/:eventDate/:batchId/:pickup', component: TrekRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
