import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: any = {
    'pt': {
      'question1': '1. O que é um refugiado?',
      'answer1': 'Um refugiado é alguém que foge de seu país de origem devido a perseguição, conflito armado, violência ou violação de direitos humanos e busca proteção em outro país.',
      'question2': '2. Qual é a diferença entre um refugiado e um imigrante?',
      'answer2': 'A principal diferença é que os refugiados fogem de suas casas devido a circunstâncias extremas, como guerra ou perseguição, enquanto os imigrantes geralmente buscam melhores condições de vida, oportunidades de trabalho ou educação em outros países.',
    
    },
    'en': {
      'question1': '1. What is a refugee?',
      'answer1': 'A refugee is someone who flees their country of origin due to persecution, armed conflict, violence, or violation of human rights and seeks protection in another country.',
      'question2':'2. What is the difference between a refugee and an immigrant?',
      'answer2':'The main difference is that refugees flee their homes due to extreme circumstances such as war or persecution, while immigrants generally seek better living conditions, job opportunities, or education in other countries.',
    },
    'uk': {
      'question1': '1. Що таке біженець?',
      'answer1': 'Біженець - це людина, яка втікає зі своєї країни походження через переслідування, збройний конфлікт, насильство або порушення прав людини і шукає захист в іншій країні.',
      'question2':'2. Яка різниця між біженцем і імігрантом?',
      'answer2':'Основна різниця полягає в тому, що біженці втікають зі своїх домівок через екстремальні обставини, такі як війна чи переслідування, тоді як імігранти, як правило, шукають кращі умови проживання, можливості працевлаштування або освіту в інших країнах.',
    }
    
  };

  getTranslation(language: string) {
    return this.translations[language];
  }
}
