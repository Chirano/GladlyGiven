import { Component } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { DonationType } from 'src/app/classes/DonationType';
import { FiscalIdentity } from 'src/app/classes/FiscalIdentity';
import { DonationServiceService } from 'src/app/services/donation-service/donation-service.service';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.scss']
})
export class ViewDonationComponent {

  donation: Donation = {
    id:0,
    donorId: 0,
    amount: 0,
    donationType: DonationType.Singular,
    fiscalIdentity: FiscalIdentity.Individual,
    date: '',
  };

  DonationType = DonationType; 
  FiscalIdentity = FiscalIdentity;

  constructor(private donationService : DonationServiceService){}

  createDonation(id:number,donorId: number, amount: number, donationType: DonationType, fiscalIdentity: FiscalIdentity, date:string): void {
    
    
    // Call the donation service to create the donation
    this.donationService.createDonation({id, donorId, amount, donationType, fiscalIdentity, date
    } as Donation) 
      .subscribe({
        next: (createdDonation) => {
          // Handle the created donation as needed
          console.log('Donation created:', createdDonation);
          // Optionally, update UI or perform any additional actions here
          this.donation = createdDonation;
        },
        error: (error) => {
          console.error('Failed to create donation', error);
          // Optionally, show an error message to the user
        }
      });
    }

}
