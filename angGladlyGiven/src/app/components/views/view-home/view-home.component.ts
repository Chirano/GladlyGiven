import { Component } from '@angular/core';
import { DonationService } from 'src/app/services/donation/donation.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss'],
})

export class ViewHomeComponent {
  amount : number = 0;
  appointments : number = 0;
  donors : number = 0;

  constructor(
    private donationService: DonationService,
    ){}

  ngOnInit(): void{
    this.getReport();
    this.getTotalDonors();
    this.getAppointmentsCount();
  }

  getReport(): void{
    this.donationService.getDonationsAmonunt().subscribe(amount => this.amount = amount);
  }

  getAppointmentsCount(): void{
    this.donationService.getTotalAppointments().subscribe(appointments => this.appointments = appointments);
    console.log(this.appointments);
  }

  getTotalDonors(): void{
    this.donationService.getTotalDonors().subscribe(donors => this.donors = donors);
  
  }
}
