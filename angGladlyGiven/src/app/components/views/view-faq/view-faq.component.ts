import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.scss']
})

export class ViewFaqComponent { 
  selectedLanguage: string = 'en'; // Default language
  translations: any;
 
  
   
  constructor(private translationService: TranslationService) {
    this.loadTranslations();
  }

  loadTranslations() {
    this.translations = this.translationService.getTranslation(this.selectedLanguage);
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.loadTranslations();
  }

}

