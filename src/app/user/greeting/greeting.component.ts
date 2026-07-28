import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  username: string = ""
  eventName = ""
  bookingData: any;

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');
    });
  };

  downloadReceipt() {
    const pdf = new jsPDF();
    const booking = this.bookingData;
    // Header
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TREKONE ADVENTURES', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Booking Confirmation Receipt', 105, 28, { align: 'center' });

    // Divider
    pdf.line(15, 35, 195, 35);

    // Booking ID
    pdf.setFont('helvetica', 'bold');
    pdf.text('Booking ID:', 15, 45);

    pdf.setFont('helvetica', 'normal');
    pdf.text(booking.bookingId, 55, 45);

    // Table
    autoTable(pdf, {
      startY: 55,
      theme: 'grid',
      head: [['Field', 'Details']],
      body: [
        ['Customer Name', booking.customerName],
        ['Mobile', booking.mobile],
        ['Email', booking.email],
        ['Trek Name', booking.eventName],
        ['Trek Date', booking.eventDate],
        ['No. of Persons', booking.noOfPersons],
        ['Pick-up Point', booking.pickupLocation],
        ['Amount Paid', 'Rs. ' + booking.amount]
      ]
    });

    // Footer Note
    const finalY = (pdf as any).lastAutoTable.finalY + 15;

    pdf.setFontSize(11);
    pdf.text(
      'Please carry a valid ID proof and reach the pickup location on time.',
      15,
      finalY
    );

    pdf.setFontSize(10);
    pdf.text(
      'Thank you for booking with TrekOne Adventures.',
      15,
      finalY + 15
    );
    pdf.save('TrekOne-Booking-Receipt_' + booking.bookingId + '.pdf');
  }
}
