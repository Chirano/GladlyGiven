import { Component } from '@angular/core';
import { RefugeeDTO as RefugeeDTO } from 'src/app/classes/userProfiles/RefugeeDTO';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-view-sign-up-refugee',
  templateUrl: './view-sign-up-refugee.component.html',
  styleUrls: ['./view-sign-up-refugee.component.scss']
})

export class ViewSignUpRefugeeComponent {

  //Author: Sónia Ribeiro

  /**
   * The selected language.
   */

  selectedLanguage: string = 'en'; // Default language

  /**
   * The translations for the selected language.
   */

  translations: any;

   /**
   * Initializes a new instance of this class.
   * @param translationService - The service responsible for translation-related operations.
   */

  constructor(private translationService: TranslationService) {
    this.loadTranslations();
  }

   /**
   * Loads translations for the selected language.
   */

  loadTranslations(): void {
    this.translations = this.translationService.getTranslation(this.selectedLanguage);
  }

  /**
   * Changes the selected language and loads translations for the new language.
   * @param language - The new language to set.
   */

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.loadTranslations();
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
        secondLanguage: form.value.secondLanguage,
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
