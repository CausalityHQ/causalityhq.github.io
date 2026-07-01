import type { Content } from './types';

export const pl: Content = {
  lang: 'pl',

  meta: {
    title: 'Causality — Stosowana AI, oprogramowanie klasy badawczej',
    description:
      'Badacze uczenia maszynowego i inżynierowie oprogramowania, którzy wdrażają najnowocześniejszą AI w Twojej firmie. SIEVE — wyszukiwanie semantyczne on-premise; STRUCTURA — ekstrakcja danych i agenci.',
    ogTitle: 'Causality — Stosowana AI, oprogramowanie klasy badawczej',
    ogDescription:
      'Badacze ML i inżynierowie oprogramowania wdrażający najnowocześniejszą AI — z opcją on-premise.',
    ogLocale: 'pl',
    ogLocaleAlternate: 'en',
  },

  nav: {
    services: 'Usługi',
    products: 'Produkty',
    approach: 'Podejście',
    about: 'O nas',
    contact: 'Kontakt',
    talkToUs: 'Porozmawiajmy',
    primaryLabel: 'Główna',
    skipToContent: 'Przejdź do treści',
    langLabel: 'Język',
    talkToUsAria: 'Porozmawiajmy — napisz na hello@causality.pl',
  },

  hero: {
    eyebrow: 'STOSOWANA AI · OPROGRAMOWANIE KLASY BADAWCZEJ',
    h1: 'Zamknij lukę między Twoją firmą a nowoczesną AI.',
    lead: 'Jesteśmy badaczami uczenia maszynowego i inżynierami oprogramowania. Wdrażamy najnowocześniejszą AI w Twojej codziennej pracy — abyś rozwijał firmę bez bólu.',
    ctaPrimary: 'Porozmawiajmy',
    ctaSecondary: 'Zobacz produkty',
    motifTitle:
      'Causality — semantyczne pole wektorowe układające się w sylwetkę mózgu i koła zębatego',
    motifDesc:
      'Rozproszone węzły wektorowe na delikatnej siatce; kilka limonkowych węzłów łączą limonkowe krawędzie, które układają się w znak marki Causality — mózg z kołem zębatym.',
    spec: {
      focus: 'Stosowana AI',
      mode: 'Usługi + Produkty',
      deploy: 'Chmura lub On-prem',
      based: 'UE',
      statusLabel: 'STATUS',
      statusValue: 'DOSTĘPNI',
    },
  },

  trust: {
    label: 'POZYCJA',
    line: 'AI klasy badawczej, stworzona, by działać wewnątrz Twojej firmy.',
    chips: ['SIEDZIBA W UE', 'WSPARCIE ON-PREM', 'OPARTE NA BADANIACH', 'USŁUGI + PRODUKTY'],
  },

  services: {
    tag: '§03 / USŁUGI',
    h2: 'Cztery sposoby, w jakie wdrażamy nowoczesną AI.',
    items: [
      {
        ref: 'SVC-01',
        title: 'Dedykowane oprogramowanie AI',
        summary: 'Najnowocześniejsze metody, wbudowane w Twój produkt i procesy.',
        keys: ['modele na miarę', 'integracja', 'klasa produkcyjna'],
        primary: true,
      },
      {
        ref: 'SVC-02',
        title: 'Badania nad AI',
        summary:
          'Rygor publikacyjny, wycelowany w Twoje najtrudniejsze i najbardziej specyficzne problemy.',
        keys: ['ewaluacja', 'nowe metody', 'benchmarking'],
      },
      {
        ref: 'SVC-03',
        title: 'Rozwój oprogramowania',
        summary: 'Niezawodne, łatwe w utrzymaniu systemy wokół modeli — nie notatniki.',
        keys: ['API', 'pipeline’y', 'MLOps'],
      },
      {
        ref: 'SVC-04',
        title: 'Gotowe produkty',
        summary: 'SIEVE i STRUCTURA — najnowocześniejsza AI, której zespół użyje już dziś.',
        keys: ['SIEVE', 'STRUCTURA', 'on-prem'],
      },
    ],
  },

  productsIntro: {
    tag: '§04 / PRODUKTY',
    h2: 'Dwa produkty, udokumentowane.',
    frame:
      'Najnowocześniejsze metody, spakowane tak, by Twój zespół mógł ich użyć już dziś. Poniżej: co robią, ich specyfikacje i sposób wdrożenia.',
  },

  sieve: {
    ref: 'PRD/SIEVE',
    name: 'SIEVE',
    h3: 'Wyszukiwanie semantyczne i rozumienie danych.',
    body: 'SIEVE przeszukuje i rozumie Twoje dane według znaczenia, a nie słów kluczowych, dzięki naszym autorskim przestrzeniom wektorowym. Indeksuje tekst, dokumenty i treści multimodalne w przestrzeni semantycznej, w której właściwą odpowiedzią jest najbliższy sąsiad.',
    specCaption: 'SIEVE — specyfikacja możliwości',
    specHeadCapability: 'MOŻLIWOŚĆ',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      {
        capability: 'Wyszukiwanie semantyczne',
        detail: 'Zapytania wg znaczenia; wyszukiwanie najbliższego sąsiada',
      },
      { capability: 'Indeksowanie multimodalne', detail: 'Tekst, dokumenty, obrazy i więcej' },
      {
        capability: 'Przestrzenie wektorowe',
        detail: 'Autorskie osadzenia, dostrojone do Twojej domeny',
      },
      {
        capability: 'Wdrożenie',
        detail: 'W pełni on-premise — dane nigdy nie opuszczają Twojej infrastruktury',
        highlight: true,
      },
    ],
    cta: 'Zapytaj nas o SIEVE',
    ctaAria: 'Zapytaj nas o SIEVE — napisz na hello@causality.pl',
    diagramTitle: 'Architektura on-premise SIEVE — dane nigdy nie opuszczają perymetru klienta',
    diagramDesc:
      'Schemat. Przerywana granica perymetru klienta obejmuje magazyn danych i SIEVE. Wektor zapytania trafia do najbliższego sąsiada wewnątrz perymetru. Strzałka próbująca opuścić perymetr jest zablokowana i oznaczona BRAK EKSPORTU DANYCH.',
    diagramSummary:
      'Jak się wdraża: SIEVE działa w całości wewnątrz Twojej infrastruktury. Magazyn danych i indeks semantyczny znajdują się w perymetrze klienta; zapytania rozwiązują się na miejscu. Nic nie przekracza granicy — nie ma eksportu danych.',
    perimeterLabel: 'PERYMETR KLIENTA',
    egressLabel: 'BRAK EKSPORTU DANYCH',
  },

  structura: {
    ref: 'PRD/STRUCTURA',
    name: 'STRUCTURA',
    h3: 'Ustrukturyzowana ekstrakcja, bazy wiedzy i agenci.',
    body: 'STRUCTURA zamienia nieustrukturyzowane, multimodalne dane w ustrukturyzowaną bazę wiedzy — a następnie uruchamia dedykowanych agentów, którzy wykorzystują tę wiedzę, by podejmować działania w sieci i automatyzować codzienną pracę.',
    specCaption: 'STRUCTURA — specyfikacja możliwości',
    specHeadCapability: 'MOŻLIWOŚĆ',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      { capability: 'Wejście', detail: 'Nieustrukturyzowane, multimodalne dane' },
      { capability: 'Ekstrakcja', detail: 'Ustrukturyzowane pola, encje, relacje' },
      { capability: 'Baza wiedzy', detail: 'Przeszukiwalna, połączona z przestrzeniami SIEVE' },
      {
        capability: 'Agenci / automatyzacja',
        detail: 'Dedykowani agenci działają w sieci, automatyzują procesy',
        highlight: true,
      },
    ],
    cta: 'Zapytaj nas o STRUCTURA',
    ctaAria: 'Zapytaj nas o STRUCTURA — napisz na hello@causality.pl',
    diagramTitle: 'Pipeline STRUCTURA — od nieustrukturyzowanych danych do działających agentów',
    diagramDesc:
      'Pipeline od lewej do prawej. Rozproszone symbole dokumentów, obrazów i dźwięku układają się w uporządkowany graf wiedzy, który trafia do węzła agenta podejmującego działania w sieci.',
    diagramSummary:
      'Jak przebiega: nieustrukturyzowane dane multimodalne są ekstrahowane do pól i relacji, składane w przeszukiwalną bazę wiedzy i przekazywane dedykowanym agentom, którzy działają w sieci, automatyzując codzienną pracę.',
    stages: [
      'Nieustrukturyzowane dane multimodalne',
      'Ekstrakcja',
      'Baza wiedzy',
      'Agenci → działania w sieci',
    ],
  },

  about: {
    tag: '§07 / O NAS',
    h2: 'Zespół badaczy i inżynierów.',
    body: 'Jesteśmy grupą doświadczonych badaczy uczenia maszynowego i deweloperów oprogramowania, którzy zamykają lukę między biznesem a nowoczesnymi rozwiązaniami. Nasze usługi pozwalają wykorzystać najnowocześniejszą AI w codziennej pracy, by rozwijać firmę — bez bólu.',
    roster: ['Badania', 'Inżynieria ML', 'Oprogramowanie', 'Produkt'],
  },

  approach: {
    tag: '§08 / PODEJŚCIE',
    h2: 'Od Twojego problemu do działającego systemu.',
    steps: [
      {
        n: '01',
        title: 'Analiza i badania',
        body: 'Poznajemy Twoje dane i problem, i uczciwie mówimy, czy AI to właściwe narzędzie.',
      },
      {
        n: '02',
        title: 'Budowa',
        body: 'System na miarę lub jeden z naszych produktów — zbudowany do wdrożenia, nie na pokaz.',
      },
      {
        n: '03',
        title: 'Wdrożenie i wsparcie',
        body: 'Chmura lub w pełni on-premise. Należy do Ciebie; my je wspieramy.',
      },
    ],
  },

  finalCta: {
    tag: '§09 / KONTAKT',
    h2: 'Porozmawiajmy o Twoich danych.',
    sub: 'Opisz nam problem. Uczciwie powiemy, czy AI to właściwe narzędzie — i jak zachować kontrolę nad danymi.',
    ctaPrimary: 'Porozmawiajmy',
    reassurance: 'JEDEN E-MAIL. ODPOWIADA PRAWDZIWY INŻYNIER.',
  },

  footer: {
    tagline: 'Stosowana AI, oprogramowanie klasy badawczej.',
    productsTitle: 'Produkty',
    companyTitle: 'Firma',
    contactTitle: 'Kontakt',
    copyright: '© 2026 Causality. Wszelkie prawa zastrzeżone.',
    colophon: 'Złożone krojami Space Grotesk, Inter i IBM Plex Mono. Zbudowane w Astro.',
  },
};
