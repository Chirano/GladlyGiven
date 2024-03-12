import { Component } from '@angular/core';
import { RefugeeDTO as RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-refugee',
  templateUrl: './view-sign-up-refugee.component.html',
  styleUrls: ['./view-sign-up-refugee.component.scss']
})

export class ViewSignUpRefugeeComponent {

  constructor() {
  }

  registerNewRefugee(form: any) {
    var refugee: RefugeeDTO | null = null;

    if (form.valid) {
      refugee = {
        id: -1,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        gender: form.value.gender,
        photoURL: "",
        mainLanguage: form.value.mainLanguage,
        mainPhoneNumber: form.value.phone,

        protocolId: form.value.protocolId,
        snsNumber: form.value.sns,
        nationality: form.value.nationality,
        country: form.value.country,
      };
    } else {
      do {
          refugee = RefugeeService.GetRandomRefugee();
      } while(refugee == null);
      
      console.log("Form is invalid, creating mock user: ", refugee);    
    }

    if (refugee) {
      EventManagerService.OnSignUpRefugeeEvent.emit(refugee);
    }
  }

}
