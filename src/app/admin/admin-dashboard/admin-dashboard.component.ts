import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

 bookings: any[] = [];
  treks: any[] = [];
  refunds: any[] = [];
  stats: any = ""
  constructor(private adminService: AdminService) {
  }
  ngOnInit(): void {
    console.log("admin dashboard comp loaded")
    this.getStats();
    this.getBookings();
    this.getTreks();
    this.getRefunds();
  }
  getStats() {
    this.adminService.getStats().subscribe((res: any) => {
      this.stats = res;
    });
  }
  getBookings() {
    this.adminService.getBookings().subscribe((res: any) => {
      this.bookings = res;
    });
  }
  getTreks() {
    this.adminService.getTreks().subscribe((res: any) => {
      this.treks = res;
    });
  }
  getRefunds() {
    this.adminService.getRefunds().subscribe((res: any) => {
      this.refunds = res;
    });
  }
}

