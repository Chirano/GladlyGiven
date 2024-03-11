import { Component } from '@angular/core';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.scss']
})
export class ViewFaqComponent {

}

document.addEventListener('DOMContentLoaded', function () {
  const languageSelect = document.getElementById('language-select') as HTMLSelectElement;

  // Limpar opções existentes
  languageSelect.innerHTML = '';

  // Opções de idioma
  const languages: { value: string, text: string }[] = [
    { value: 'pt', text: 'Português' },
    { value: 'en', text: 'English' },
    { value: 'uk', text: 'Українська' }
  ];

  // Adicionar opções ao seletor de idioma
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.value;
    option.textContent = lang.text;
    languageSelect.appendChild(option);
  });

  // Adicionar evento de mudança de idioma
  languageSelect.addEventListener('change', function () {
    changeLanguage();
  });

  // Função para mudar o idioma
  function changeLanguage() {
    const selectedLanguage = languageSelect.value;

    // Alterar o conteúdo com base no idioma selecionado
    switch (selectedLanguage) {
      case 'pt':
        document.getElementById('faq-title')!.innerText = 'Perguntas Frequentes sobre Refugiados';
        document.getElementById('q1')!.innerText = '1. O que é um refugiado?';
        document.getElementById('a1')!.innerText = 'Um refugiado é alguém que foge de seu país de origem devido a perseguição, conflito armado, violência ou violação de direitos humanos e busca proteção em outro país.';
        document.getElementById('q2')!.innerText = '2. Qual é a diferença entre um refugiado e um imigrante?';
        document.getElementById('a2')!.innerText = 'A principal diferença é que os refugiados fogem de suas casas devido a circunstâncias extremas, como guerra ou perseguição, enquanto os imigrantes geralmente buscam melhores condições de vida, oportunidades de trabalho ou educação em outros países.';
        break;
      case 'en':
        document.getElementById('faq-title')!.innerText = 'Frequently Asked Questions about Refugees';
        document.getElementById('q1')!.innerText = '1. What is a refugee?';
        document.getElementById('a1')!.innerText = 'A refugee is someone who flees their country of origin due to persecution, armed conflict, violence, or violation of human rights and seeks protection in another country.';
        document.getElementById('q2')!.innerText = '2. What is the difference between a refugee and an immigrant?';
        document.getElementById('a2')!.innerText = 'The main difference is that refugees flee their homes due to extreme circumstances such as war or persecution, while immigrants generally seek better living conditions, job opportunities, or education in other countries.';
        break;
      case 'uk':
        document.getElementById('faq-title')!.innerText = 'Поширені запитання про біженців';
        document.getElementById('q1')!.innerText = '1. Що таке біженець?';
        document.getElementById('a1')!.innerText = 'Біженець - це людина, яка втікає зі своєї країни походження через переслідування, збройний конфлікт, насильство або порушення прав людини і шукає захист в іншій країні.';
        document.getElementById('q2')!.innerText = '2. Яка різниця між біженцем і імігрантом?';
        document.getElementById('a2')!.innerText = 'Основна різниця полягає в тому, що біженці втікають зі своїх домівок через екстремальні обставини, такі як війна чи переслідування, тоді як імігранти, як правило, шукають кращі умови проживання, можливості працевлаштування або освіту в інших країнах.';
        break;
      default:
        break;
    }
  }
});
