import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminTreksComponent } from './admin-treks/admin-treks.component';
import { AddTrekComponent } from './add-trek/add-trek.component';
import { AdminRefundsComponent } from './admin-refunds/admin-refunds.component';
import { AdminPaymentsComponent } from './admin-payments/admin-payments.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminBookingsComponent,
    AdminUsersComponent,
    AddTrekComponent,
    AdminTreksComponent,
    AdminRefundsComponent,
    AdminPaymentsComponent,
    AdminReportsComponent,
    AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
