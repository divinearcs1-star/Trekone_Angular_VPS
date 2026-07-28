import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminTreksComponent } from './admin-treks/admin-treks.component';
import { AddTrekComponent } from './add-trek/add-trek.component';
import { AdminRefundsComponent } from './admin-refunds/admin-refunds.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPaymentsComponent } from './admin-payments/admin-payments.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent},
  { path: 'treks', component: AdminTreksComponent},
  { path: 'add-trek', component: AddTrekComponent},
  { path: 'edit-trek/:id', component: AddTrekComponent},
  { path: 'bookings', component: AdminBookingsComponent},
  { path: 'refunds', component: AdminRefundsComponent},
  { path: 'users', component: AdminUsersComponent},
  { path: 'reports', component: AdminReportsComponent},
  { path: 'payments', component: AdminPaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
