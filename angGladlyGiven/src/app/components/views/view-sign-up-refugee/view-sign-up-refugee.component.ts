import { Component } from '@angular/core';
import { Refugee } from 'src/app/classes/userProfiles/Refugee';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-refugee',
  templateUrl: './view-sign-up-refugee.component.html',
  styleUrls: ['./view-sign-up-refugee.component.scss']
})

export class ViewSignUpRefugeeComponent {

  private refugee: Refugee | null = null;

  constructor() {
  }

  registerNewRefugee(refugeeForm: any) {
  
    if (refugeeForm.valid) {
      this.refugee = {
        // app user:
        id : -1,
        firstName         : refugeeForm.value.firstName,
        lastName          : refugeeForm.value.lastName,
        email             : refugeeForm.value.email,
        gender            : refugeeForm.value.gender,
        phone             : refugeeForm.value.phone,
        photoURL          : "",
        mainLanguage      : refugeeForm.value.mainLanguage,
        secondLanguage    : refugeeForm.value.secondLanguage,
  
        // refugee:
        protocolId        : refugeeForm.value.protocolId,
        sns               : refugeeForm.value.sns,
        nationality       : refugeeForm.value.nationality,
        country           : refugeeForm.value.country,
      };
      
      // console.log(this.refugee);
      EventManagerService.OnSignUpRefugeeEvent.emit(this.refugee);
    } else {
      console.log("Form is invalid");
    }
  }
}
