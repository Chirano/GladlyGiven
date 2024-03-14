import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/classes/userProfiles/Contact';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})

export class ViewContactComponent {


  emailSentMessage: string = '';
  contactName: string = '';
  contactEmail: string = '';
  contactDescription: string = '';

  registerNewContact(contactForm: NgForm) {
      // Exibir a mensagem de "Email enviado"
      this.emailSentMessage = 'Email enviado com sucesso';

      // Limpar o formulário após enviar
      this.contactName = ' ';
      this.contactEmail = ' ';
      this.contactDescription = ' ';
  
      // Desaparecer a mensagem após 5 segundos
      setTimeout(() => {
        contactForm.resetForm();
        this.emailSentMessage = '';
      }, 3000);
  }

  // private contact: Contact | null = null;
  // contactForm: any;

  // constructor() {
  // }

  // registerNewContact(contactForm: any) {
  
  //   if (contactForm.valid) {
  //     this.contact = {
  //       // app contact:
  //       contactName       : contactForm.value.contactName,
  //       contactemail      : contactForm.value.contactemail,
  //       contactdescription: contactForm.value.contactdescription,
  //     };
      
  //     // console.log(this.contact);
  //     EventManagerService.OnContactEvent.emit(this.contact);
  //   } else {
  //     console.log("Form is invalid");
  //   }
  // }
}
