import { Component } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { DonationService } from 'src/app/services/donation/donation.service';

@Component({
  selector: 'app-view-donation-list',
  templateUrl: './view-donation-list.component.html',
  styleUrls: ['./view-donation-list.component.scss']
})
export class ViewDonationListComponent {

  donations: Donation[] = [];

  constructor(private donationService : DonationService){}


  getAllDonations(donorId: number): void {
    this.donationService.findAllDonationsByDonorId(donorId)
      .subscribe(donations => this.donations = donations);
  }
}
