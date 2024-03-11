import { Component } from '@angular/core';
import { RefugeeDTO as RefugeeDTO } from 'src/app/classes/userProfiles/Refugee';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-refugee',
  templateUrl: './view-sign-up-refugee.component.html',
  styleUrls: ['./view-sign-up-refugee.component.scss']
})

export class ViewSignUpRefugeeComponent {

  private refugee: RefugeeDTO | null = null;

  constructor() {
  }

  registerNewRefugee(refugeeForm: any) {
    var refugee: RefugeeDTO | null = null;

    if (refugeeForm.valid) {
      refugee = {
        id: -1,
        firstName: refugeeForm.value.firstName,
        lastName: refugeeForm.value.lastName,
        email: refugeeForm.value.email,
        gender: refugeeForm.value.gender,
        photoURL: "",
        mainLanguage: refugeeForm.value.mainLanguage,
        mainPhoneNumber: refugeeForm.value.phone, // Assuming phone number is stored in mainPhoneNumber
        protocolId: refugeeForm.value.protocolId,
        snsNumber: refugeeForm.value.sns, // Assuming snsNumber is used for sns
        nationality: refugeeForm.value.nationality,
        country: refugeeForm.value.country,
      };
    } else {
      refugee = RefugeeService.GetRandomRefugee();
      console.log("Form is invalid, creating mock user: ", this.refugee);    
    }

    if (refugee) {
      EventManagerService.OnSignUpRefugeeEvent.emit(refugee);
    }
  }

}
