import { Component } from '@angular/core';
import { DonorDTO } from 'src/app/classes/userProfiles/DonorDTO';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-donor',
  templateUrl: './view-sign-up-donor.component.html',
  styleUrls: ['./view-sign-up-donor.component.scss']
})

export class ViewSignUpDonorComponent {
  private donor: DonorDTO | null = null;

  registerNewDonor(form: any) {
  
    if (form.valid) {
      this.donor = {
        // app user:
        id: -1,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        gender: form.value.gender,
        photoURL: "",
        mainLanguage: form.value.mainLanguage,
        mainPhoneNumber: form.value.phone,
  
        // monetary user:
        nif               : form.value.nif,
        paymentInfoId     : "",
        invoiceInfoId     : "",

        // service provider:
        fiscalIdentity    : 0, // TODO: based on NIF, identify
        donationIds       : [],
      };
      
      // console.log(this.refugee);
    } else {
      console.log("Form is invalid");
    }
  }
}
