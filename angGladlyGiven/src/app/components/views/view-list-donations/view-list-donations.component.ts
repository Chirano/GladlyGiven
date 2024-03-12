import { Component } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { DonationServiceService } from 'src/app/services/donation-service/donation-service.service';

@Component({
  selector: 'app-view-list-donations',
  templateUrl: './view-list-donations.component.html',
  styleUrls: ['./view-list-donations.component.scss']
})
export class ViewListDonationsComponent {

  constructor(private donationService : DonationServiceService) {}

  donations: Donation[] = [];

  getDonationsByDonorId(donorId: number): void{
    this.donationService.getDonationsByDonorId(donorId).subscribe(donations => this.donations = donations);
  }

}
