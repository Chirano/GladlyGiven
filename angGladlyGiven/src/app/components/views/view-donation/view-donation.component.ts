import { Component } from '@angular/core';
import { Donation } from 'src/app/classes/Donation';
import { DonationType } from 'src/app/classes/DonationType';
import { FiscalIdentity } from 'src/app/classes/FiscalIdentity';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DonationServiceService } from 'src/app/services/donation-service/donation-service.service';

//Author: Sónia Ribeiro

/**
 * Component for viewing and creating donations.
 */

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.scss']
})
export class ViewDonationComponent {

  /**
   * Represents the donation being created.
   */
  
  donation: Donation = {
    id:0,
    donorId: 0,
    amount: 0,
    donationType: DonationType.Singular,
    fiscalIdentity: FiscalIdentity.Individual,
    date: '',
  };

   /**
   * Enum reference for DonationType.
   */
  DonationType = DonationType; 

  /**
   * Enum reference for FiscalIdentity.
   */

  FiscalIdentity = FiscalIdentity;

  /**
   * Warning message to be displayed to the user.
   */

  warningMessage: string = '';

  /**
   * Success message to be displayed to the user.
   */

  successMessage: string = '';

  /**
   * Initializes a new instance of the ViewDonationComponent class.
   * @param donationService - The service responsible for donation-related operations.
   * @param authService - The service responsible for authentication-related operations.
   */
  constructor(private donationService : DonationServiceService, private authService: AuthService){}

  /**
   * Initializes the component.
   * Updates donorId with the current user's id.
   */

  ngOnInit(): void{
    //Update donorId with the current user's id when the component initializes
    this.donation.donorId = AuthService.SessionContext.userId;
  }


  /**
   * Creates a new donation.
   * @param amount - The amount of the donation.
   * @param donationType - The type of the donation (Singular, Monthly, Yearly).
   * @param fiscalIdentity - The fiscal identity of the donor (Individual, Company).
   * @param date - The date of the donation.
   */

  createDonation(amount: number, donationType: DonationType, fiscalIdentity: FiscalIdentity, date:string): void {
    if (amount <= 0) {
      this.warningMessage = 'Invalid amount! Please enter a positive value.';
      return;
    }
    
    // Call the donation service to create the donation
    this.donationService.createDonation({
      donorId: this.donation.donorId, //Use donorId from the donation object
      amount, 
      donationType, 
      fiscalIdentity, 
      date
    } as Donation) 
      .subscribe({
        next: (createdDonation) => {
          // Handle the created donation as needed
          console.log('Donation created:', createdDonation);
          // Optionally, update UI or perform any additional actions here
          this.donation = createdDonation;
          this.successMessage = 'Donation created successfully!';

          // Set a timeout to clear the form and success message after 3 seconds
          
          setTimeout(() => {
            this.donation = {
              id: 0,
              donorId: 0,
              amount: 0,
              donationType: DonationType.Singular,
              fiscalIdentity: FiscalIdentity.Individual,
              date: '',
            };
            this.successMessage = '';
          }, 3000);

        },
        error: (error) => {
          console.error('Failed to create donation', error);
          // Optionally, show an error message to the user
        }
      });
    }

  

}
