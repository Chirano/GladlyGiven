import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: any = {
    'pt': {
      'question1': 'O que é um refugiado?',
      'answer1': 'Um refugiado é alguém que foge de seu país de origem devido a perseguição, conflito armado, violência ou violação de direitos humanos e busca proteção em outro país.',
      'question2': 'Qual é a diferença entre um refugiado e um imigrante?',
      'answer2': 'A principal diferença é que os refugiados fogem de suas casas devido a circunstâncias extremas, como guerra ou perseguição, enquanto os imigrantes geralmente buscam melhores condições de vida, oportunidades de trabalho ou educação em outros países.',
      'question3': 'De que forma refugiados são protegidos pelo direito internacional?',
      'answer3':'A proteção internacional dos refugiados é garantida a partir atos normativos específicos, entre eles cabe mencionar o Art. 14 da Declaração Universal dos Direitos Humanos que afirma o direito de toda e qualquer pessoas de buscar e receber asilo. Assim como a Declaração Americana de Direitos Humanos, de 1948, em seu artigo 27 e a Convenção Americana sobre Direitos Humanos, de 1969, em seu artigo 22(7), também fazendo alusão ao direito de buscar e de receber asilo em caso de perseguição. A Convenção de 1951 Relativa ao Estatuto dos Refugiados estabelece a estrutura mais amplamente aplicável para a proteção de refugiados. A Convenção de 1951 foi adotada em julho de 1951 e entrou em vigor em abril de 1954. O Protocolo de 1967 remove as restrições temporal e geográfica estabelecida pela Convenção de 1951. Estes são dois dos principais instrumentos internacionais de direitos humanos para a garantia dos direitos fundamentais para os refugiados e solicitantes de refúgio.',
      'question4': 'Qual a Legislação e Jurisprudência existente em Portugal?',
      'answer4':'Constituição da República Portuguesa, artigo 33.º e Lei n.º 27/2008, de 30 de Junho, alterada pelo Decreto-Lei n.º 41/2023, de 2 de junho, artigos 15.º; 65.º–81.º; 84.º.',
      'question5': 'Descendentes de refugiados mantêm o estatuto de refugiados?',
      'answer5':'Sob o direito internacional e o princípio da unidade familiar, os filhos dos refugiados e os seus descendentes são também considerados refugiados até que uma solução duradoura para o conflito seja encontrada.',
      'question6': 'Quais são os principais desafios enfrentados pelos refugiados?',
      'answer6':'Os refugiados enfrentam uma série de desafios, incluindo dificuldades de integração cultural, barreiras linguísticas, acesso limitado a serviços básicos como saúde e educação, estigma e discriminação, além de incertezas sobre seu futuro e a possibilidade de retorno seguro a seus países de origem.',
      'question7': 'Como posso ajudar os refugiados?',
      'answer7':'Você pode ajudar os refugiados de várias maneiras, incluindo doações para organizações humanitárias que trabalham com refugiados, oferecendo apoio voluntário em programas de integração, sensibilizando a comunidade sobre as questões enfrentadas pelos refugiados e defendendo políticas e práticas que promovam os direitos e a dignidade dos refugiados. No nosso site a sua doação vai para a manutenção custos básicos dos profissionais de saúde (transportes, suprimentos médicos, medicamentos entre outros).',

    },
    'en': {
      'question1': 'What is a refugee?',
      'answer1': 'A refugee is someone who flees their country of origin due to persecution, armed conflict, violence, or violation of human rights and seeks protection in another country.',
      'question2':'What is the difference between a refugee and an immigrant?',
      'answer2':'The main difference is that refugees flee their homes due to extreme circumstances such as war or persecution, while immigrants generally seek better living conditions, job opportunities, or education in other countries.',
      'question3': 'How are refugees protected by international law?',
      'answer3':'The international protection of refugees is guaranteed by specific normative acts, including Article 14 of the Universal Declaration of Human Rights, which affirms the right of all persons to seek and receive asylum. The American Declaration of Human Rights of 1948, in its Article 27, and the American Convention on Human Rights of 1969, in its Article 22(7), also allude to the right to seek and receive asylum in the event of persecution. The 1951 Convention relating to the Status of Refugees establishes the most widely applicable framework for the protection of refugees. The 1951 Convention was adopted in July 1951 and entered into force in April 1954. The 1967 Protocol removes the temporal and geographical restrictions established by the 1951 Convention. These are two of the main international human rights instruments for guaranteeing fundamental rights for refugees and asylum seekers.',
      'question4': 'What legislation and case law exists in Portugal?',
      'answer4':'Constitution of the Portuguese Republic, article 33 and Law no. 27/2008, of June 30, amended by Decree-Law no. 41/2023, of June 2, articles 15; 65-81; 84.',
      'question5': 'Do descendants of refugees retain their refugee status?',
      'answer5':'Under international law and the principle of family unity, the children of refugees and their descendants are also considered refugees until a lasting solution to the conflict is found.',
      'question6': 'What are the main challenges faced by refugees?',
      'answer6':'Refugees face a number of challenges, including difficulties with cultural integration, language barriers, limited access to basic services such as health and education, stigma and discrimination, as well as uncertainty about their future and the possibility of safe return to their countries of origin.',
      'question7': 'How can I help the refugees?',
      'answer7':'You can help refugees in a number of ways, including donating to humanitarian organizations that work with refugees, offering volunteer support in integration programs, raising awareness in the community about the issues faced by refugees and advocating for policies and practices that promote the rights and dignity of refugees. On our website, your donation goes towards maintaining the basic costs of health professionals (transportation, medical supplies, medicines and more).',
    },
    'uk': {
      'question1': 'Що таке біженець?',
      'answer1': 'Біженець - це людина, яка втікає зі своєї країни походження через переслідування, збройний конфлікт, насильство або порушення прав людини і шукає захист в іншій країні.',
      'question2':'Яка різниця між біженцем і імігрантом?',
      'answer2':'Основна різниця полягає в тому, що біженці втікають зі своїх домівок через екстремальні обставини, такі як війна чи переслідування, тоді як імігранти, як правило, шукають кращі умови проживання, можливості працевлаштування або освіту в інших країнах.',
      'question3': 'Як біженців захищає міжнародне право?',
      'answer3':'Міжнародний захист біженців гарантується конкретними нормативними актами, зокрема статтею 14 Загальної декларації прав людини, яка підтверджує право кожної людини шукати і отримувати притулок. Американська декларація прав людини 1948 року в статті 27 та Американська конвенція про права людини 1969 року в статті 22(7) також посилаються на право шукати і отримувати притулок у разі переслідування. Конвенція про статус біженців 1951 року встановлює найбільш широко застосовні рамки для захисту біженців. Конвенція 1951 року була прийнята в липні 1951 року і набула чинності в квітні 1954 року. Протокол 1967 року усуває часові та географічні обмеження, встановлені Конвенцією 1951 року. Це два основні міжнародні документи з прав людини, що гарантують основні права біженців та шукачів притулку.',
      'question4': 'Яке законодавство та прецедентне право існує в Португалії?',
      'answer4':'Конституція Португальської Республіки, стаття 33 та Закон № 27/2008 від 30 червня зі змінами, внесеними Декретом-законом № 41/2023 від 2 червня, статті 15; 65-81; 84.',
      'question5': 'Чи зберігають нащадки біженців статус біженця?',
      'answer5':'Згідно з міжнародним правом і принципом єдності сім`ї, діти біженців та їхні нащадки також вважаються біженцями доти, доки не буде знайдено довгострокового вирішення конфлікту.',
      'question6': 'З якими основними проблемами стикаються біженці?',
      'answer6':'Біженці стикаються з низкою проблем, серед яких труднощі з культурною інтеграцією, мовні бар`єри, обмежений доступ до базових послуг, таких як охорона здоров`я та освіта, стигма та дискримінація, а також невпевненість у своєму майбутньому та можливості безпечного повернення до країн походження.',
      'question7': 'Як я можу допомогти біженцям?',
      'answer7':'Ви можете допомогти біженцям різними способами, включаючи пожертвування гуманітарним організаціям, які працюють з біженцями, волонтерство для підтримки інтеграційних програм, підвищення обізнаності в суспільстві про проблеми, з якими стикаються біженці, а також адвокацію політики і практики, які сприяють захисту прав і гідності біженців. На нашому сайті ваші пожертви йдуть на покриття основних витрат медичних працівників (транспорт, медичне приладдя, медикаменти та інше).',
    },
    'es': {
    'question1': '¿Qué es un refugiado?',
    'answer1':'Un refugiado es alguien que ha huido de su país de origen por persecución, conflicto armado, violencia o violación de los derechos humanos y busca protección en otro país.',
    'question2': '¿Cuál es la diferencia entre un refugiado y un inmigrante?',
    'answer2':'La principal diferencia es que los refugiados huyen de sus hogares por circunstancias extremas como la guerra o la persecución, mientras que los inmigrantes suelen buscar mejores condiciones de vida, oportunidades laborales o educación en otros países.',
    'question3': '¿Cómo protege el Derecho internacional a los refugiados?',
    'answer3':'La protección internacional de los refugiados está garantizada por actos normativos específicos, como el artículo 14 de la Declaración Universal de Derechos Humanos, que afirma el derecho de toda persona a buscar y recibir asilo. La Declaración Americana de Derechos Humanos de 1948, en su artículo 27, y la Convención Americana sobre Derechos Humanos de 1969, en su artículo 22(7), también aluden al derecho a buscar y recibir asilo en caso de persecución. La Convención sobre el Estatuto de los Refugiados de 1951 establece el marco más ampliamente aplicable para la protección de los refugiados. La Convención de 1951 se adoptó en julio de 1951 y entró en vigor en abril de 1954. El Protocolo de 1967 elimina las restricciones temporales y geográficas establecidas por la Convención de 1951. Se trata de dos de los principales instrumentos internacionales de derechos humanos para garantizar los derechos fundamentales de los refugiados y solicitantes de asilo.',
    'question4': '¿Qué legislación y jurisprudencia existen en Portugal?',
    'answer4':'Constitución de la República Portuguesa, artículo 33 y Ley nº 27/2008, de 30 de junio, modificada por el Decreto-Ley nº 41/2023, de 2 de junio, artículos 15; 65-81; 84.',
    'question5': '¿Conservan los descendientes de refugiados su condición de refugiados?',
    'answer5':'Según el derecho internacional y el principio de unidad familiar, los hijos de refugiados y sus descendientes también son considerados refugiados hasta que se encuentre una solución duradera al conflicto.',
    'question6': '¿Cuáles son los principales retos a los que se enfrentan los refugiados?',
    'answer6':'Los refugiados se enfrentan a una serie de retos, como dificultades de integración cultural, barreras lingüísticas, acceso limitado a servicios básicos como sanidad y educación, estigmatización y discriminación, así como incertidumbre sobre su futuro y la posibilidad de regresar sanos y salvos a sus países de origen.',
    'question7': '¿Cómo puedo ayudar a los refugiados?',
    'answer7':'Puede ayudar a los refugiados de varias maneras: donando a organizaciones humanitarias que trabajan con refugiados, ofreciendo apoyo voluntario en programas de integración, sensibilizando a la comunidad sobre los problemas a los que se enfrentan los refugiados y abogando por políticas y prácticas que promuevan los derechos y la dignidad de los refugiados. En nuestro sitio web, su donación se destina a mantener los gastos básicos de los profesionales sanitarios (transporte, material médico, medicinas y otros).',
  },
  };

  getTranslation(language: string) {
    return this.translations[language];
  }
}
