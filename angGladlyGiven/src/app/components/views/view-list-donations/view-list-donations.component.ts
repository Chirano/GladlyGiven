import { Component } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DonationServiceService } from 'src/app/services/donation-service/donation-service.service';

@Component({
  selector: 'app-view-list-donations',
  templateUrl: './view-list-donations.component.html',
  styleUrls: ['./view-list-donations.component.scss']
})
export class ViewListDonationsComponent {


  donations: Donation[] = [];

  constructor(private donationService: DonationServiceService) { }


  ngOnInit(): void {
    this.getDonationsByUserId();
  }

  getDonationsByUserId(): void {
    console.log(AuthService.SessionContext.userId);
    this.donationService.getDonationsByDonorId(AuthService.SessionContext.userId)
      .subscribe(donations => {
        this.donations = donations;
        console.log(this.donations); // Printing donations to console
      });
  }

}
