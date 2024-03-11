import { Component } from '@angular/core';
import { Contact } from 'src/app/classes/userProfiles/Contact';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})

export class ViewContactComponent {

  private contact: Contact | null = null;
  contactForm: any;

  constructor() {
  }

  registerNewContact(contactForm: any) {
  
    if (contactForm.valid) {
      this.contact = {
        // app contact:
        contactName       : contactForm.value.contactName,
        contactemail      : contactForm.value.contactemail,
        contactdescription: contactForm.value.contactdescription,
      };
      
      // console.log(this.contact);
      EventManagerService.OnContactEvent.emit(this.contact);
    } else {
      console.log("Form is invalid");
    }
  }
}
