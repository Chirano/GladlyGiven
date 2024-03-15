import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DonationService } from 'src/app/services/donation/donation.service';

@Component({
  selector: 'app-global-details',
  templateUrl: './global-details.component.html',
  styleUrls: ['./global-details.component.scss'],
})
export class GlobalDetailsComponent {
  amount: number = 0;
  appointments: number = 0;
  donors: number = 0;

  constructor(
    private donationService: DonationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getReport();
    this.getTotalDonors();
    this.getAppointmentsCount();
  }

  getReport(): void {
    this.donationService
      .getDonationsAmonunt()
      .subscribe((amount) => (this.amount = amount));
  }

  getAppointmentsCount(): void {
    this.donationService
      .getTotalAppointments()
      .subscribe((appointments) => (this.appointments = appointments));
    console.log(this.appointments);
  }

  getTotalDonors(): void {
    this.donationService
      .getTotalDonors()
      .subscribe((donors) => (this.donors = donors));
  }
}
