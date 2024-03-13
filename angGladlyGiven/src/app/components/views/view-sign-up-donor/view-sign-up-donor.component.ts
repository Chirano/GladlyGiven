import { Component } from '@angular/core';
import { FiscalIdentity } from 'src/app/classes/FiscalIdentity';
import { DonorDTO } from 'src/app/classes/userProfiles/DonorDTO';
import { DonorService } from 'src/app/services/data/javaSpring/donor/donor.service';
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
      // Identify fiscalIdentity based on NIF
      const fiscalIdentity: FiscalIdentity = DonorService.DetectFiscalIdentityByNIF(form.value.nif);

      this.donor = {
        // app user:
        id: -1,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        gender: form.value.gender,
        photoURL: "",
        mainLanguage: form.value.mainLanguage,
        secondLanguage: form.value.secondLanguage,
        mainPhoneNumber: form.value.phone,
  
        // monetary user:
        nif: form.value.nif,
        paymentInfoId: "",
        invoiceInfoId: "",

        // donor-specific:
        fiscalIdentity: fiscalIdentity,
        donationIds: [],
      };
      
      console.log("New donor registered: ", this.donor);
      EventManagerService.OnSignUpDonorEvent.emit(this.donor);
    } else {
      do {
        this.donor = DonorService.GetRandomDonor();
      } while(this.donor == null);
      
      console.log("Form is invalid, creating mock Donor: ", this.donor);
      EventManagerService.OnSignUpDonorEvent.emit(this.donor);
    }
  }
}
