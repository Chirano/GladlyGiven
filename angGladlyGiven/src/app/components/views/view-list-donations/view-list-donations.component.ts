import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DonationServiceService } from 'src/app/services/donation-service/donation-service.service';

@Component({
  selector: 'app-view-list-donations',
  templateUrl: './view-list-donations.component.html',
  styleUrls: ['./view-list-donations.component.scss']
})
export class ViewListDonationsComponent implements OnInit {


  donations: Donation[] = [];
  pageSize = 4;
  currentPage = 1;

  constructor(private donationService: DonationServiceService) { }

  ngOnInit(): void {
    this.getDonationsByUserId();
  }

  getDonationsByUserId(): void {
    const userId = AuthService.SessionContext.userId;
    console.log(userId);
    this.donationService.getDonationsByDonorId(userId, this.currentPage, this.pageSize)
      .subscribe(donations => {
        this.donations = donations;
      });
  }

  nextPage(): void {
    this.currentPage++;
    this.getDonationsByUserId();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDonationsByUserId();
    }
  }


}
