import { Component } from '@angular/core';
import { Donor } from 'src/app/classes/userProfiles/Donor';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-donor',
  templateUrl: './view-sign-up-donor.component.html',
  styleUrls: ['./view-sign-up-donor.component.scss']
})

export class ViewSignUpDonorComponent {
  private donor: Donor | null = null;

  registerNewDonor(form: any) {
  
    if (form.valid) {
      this.donor = {
        // app user:
        id : -1,
        firstName         : form.value.firstName,
        lastName          : form.value.lastName,
        email             : form.value.email,
        gender            : form.value.gender,
        phone             : form.value.phone,
        photoURL          : "",
        mainLanguage      : form.value.mainLanguage,
        secondLanguage    : form.value.secondLanguage,
        phoneNumber       : form.value.phoneNumber,
  
        // monetary user:
        nif               : form.value.nif,
        paymentInfoId     : "",
        invoiceInfoId     : "",

        // service provider:
        fiscalIdentity    : 0, // TODO: based on NIF, identify
        donationIds       : [],
      };
      
      // console.log(this.refugee);
      EventManagerService.OnSignUpDonorEvent.emit(this.donor);
    } else {
      console.log("Form is invalid");
    }
  }
}
