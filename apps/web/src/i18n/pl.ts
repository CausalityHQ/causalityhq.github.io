import type { Content } from './types';

export const pl: Content = {
  lang: 'pl',

  meta: {
    title: 'Causality — stosowana AI i oprogramowanie klasy badawczej',
    description:
      'Badacze uczenia maszynowego i inżynierowie oprogramowania, którzy wdrażają najnowocześniejszą AI w Twojej firmie. SIEVE — wyszukiwanie semantyczne on-premise; STRUCTURA — ekstrakcja danych i agenci AI.',
    ogTitle: 'Causality — stosowana AI i oprogramowanie klasy badawczej',
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
    h1: 'Zniweluj dystans między Twoją firmą a nowoczesną AI.',
    lead: 'Jesteśmy badaczami uczenia maszynowego i inżynierami oprogramowania. Wdrażamy najnowocześniejszą AI w Twojej codziennej pracy, aby Twoja firma rosła — bez zbędnych komplikacji.',
    ctaPrimary: 'Porozmawiajmy',
    ctaSecondary: 'Zobacz produkty',
    motifTitle:
      'Causality — semantyczne pole wektorowe układające się w sylwetkę mózgu i koła zębatego',
    motifDesc:
      'Rozproszone węzły wektorowe na delikatnej siatce; kilka limonkowych węzłów łączą limonkowe krawędzie, które układają się w znak marki Causality — mózg z kołem zębatym.',
    spec: {
      focus: 'Stosowana AI',
      mode: 'Usługi + Produkty',
      deploy: 'Chmura lub on-premise',
      based: 'UE',
      statusLabel: 'STATUS',
      statusValue: 'DOSTĘPNI',
    },
  },

  trust: {
    label: 'POZYCJA',
    line: 'AI klasy badawczej, zbudowana tak, by działać wewnątrz Twojej firmy.',
    chips: ['SIEDZIBA W UE', 'OPCJA ON-PREM', 'PODEJŚCIE BADAWCZE', 'USŁUGI + PRODUKTY'],
  },

  services: {
    tag: '§03 / USŁUGI',
    h2: 'Cztery sposoby, w jakie wdrażamy nowoczesną AI.',
    items: [
      {
        ref: 'SVC-01',
        title: 'Dedykowane oprogramowanie AI',
        summary: 'Najnowocześniejsze metody wbudowane w Twój produkt i procesy.',
        keys: ['modele na miarę', 'integracja', 'klasa produkcyjna'],
        primary: true,
      },
      {
        ref: 'SVC-02',
        title: 'Badania nad AI',
        summary:
          'Rygor naukowy skierowany na Twoje najtrudniejsze, najbardziej specyficzne problemy.',
        keys: ['ewaluacja', 'nowe metody', 'benchmarking'],
      },
      {
        ref: 'SVC-03',
        title: 'Rozwój oprogramowania',
        summary: 'Niezawodne, łatwe w utrzymaniu systemy wokół modeli — a nie notebooki.',
        keys: ['API', 'pipeline’y', 'MLOps'],
      },
      {
        ref: 'SVC-04',
        title: 'Gotowe produkty',
        summary:
          'SIEVE i STRUCTURA — najnowocześniejsza AI, z której Twój zespół skorzysta już dziś.',
        keys: ['SIEVE', 'STRUCTURA', 'on-prem'],
      },
    ],
  },

  productsIntro: {
    tag: '§04 / PRODUKTY',
    h2: 'Dwa produkty, udokumentowane.',
    frame:
      'Najnowocześniejsze metody przygotowane tak, by Twój zespół mógł z nich skorzystać już dziś. Poniżej: co robi każdy z nich, jego specyfikacja i sposób wdrożenia.',
  },

  sieve: {
    ref: 'PRD/SIEVE',
    name: 'SIEVE',
    h3: 'Wyszukiwanie semantyczne i rozumienie danych.',
    body: 'SIEVE przeszukuje i rozumie Twoje dane według znaczenia, a nie słów kluczowych — dzięki naszym autorskim przestrzeniom wektorowym. Indeksuje tekst, dokumenty i treści multimodalne w przestrzeni semantycznej, w której właściwą odpowiedzią jest najbliższy sąsiad.',
    specCaption: 'SIEVE — specyfikacja możliwości',
    specHeadCapability: 'MOŻLIWOŚĆ',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      {
        capability: 'Wyszukiwanie semantyczne',
        detail: 'Zapytania według znaczenia; wyszukiwanie najbliższego sąsiada',
      },
      { capability: 'Indeksowanie multimodalne', detail: 'Tekst, dokumenty, obrazy i więcej' },
      {
        capability: 'Przestrzenie wektorowe',
        detail: 'Autorskie osadzenia dostrojone do Twojej domeny',
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
      'Schemat. Przerywana granica perymetru klienta obejmuje magazyn danych i SIEVE. Wektor zapytania trafia do najbliższego sąsiada wewnątrz perymetru. Strzałka próbująca opuścić perymetr zostaje zablokowana i oznaczona jako BRAK EKSPORTU DANYCH.',
    diagramSummary:
      'Jak przebiega wdrożenie: SIEVE działa w całości wewnątrz Twojej infrastruktury. Magazyn danych i indeks semantyczny znajdują się w perymetrze klienta, a zapytania rozwiązywane są na miejscu. Nic nie przekracza granicy — nie ma eksportu danych.',
    perimeterLabel: 'PERYMETR KLIENTA',
    egressLabel: 'BRAK EKSPORTU DANYCH',
    demo: {
      plateTitle: 'SIEVE · WYSZUKIWANIE SEMANTYCZNE',
      badge: 'DZIAŁA LOKALNIE · ŻADNE DANE NIE OPUSZCZAJĄ PRZEGLĄDARKI',
      meter: '0 ŻĄDAŃ',
      presetsLabel: 'PRZYKŁADOWE ZAPYTANIE',
      presets: [
        'baza wektorowa on-prem',
        'znajdź dokumenty według znaczenia',
        'zachowaj prywatność danych klientów',
        'przeszukaj obrazy i dźwięk',
      ],
      docs: [
        'baza wektorowa on-prem',
        'konfiguracja klastra kubernetes',
        'wdrożenie air-gapped',
        'wyszukiwanie najbliższego sąsiada',
        'ranking semantyczny',
        'budowa indeksu osadzeń',
        'rezydencja danych RODO',
        'redakcja danych PII',
        'polityka kontroli dostępu',
        'osadzanie obrazów',
        'wyszukiwanie w transkrypcji audio',
        'ekstrakcja tabel z PDF',
      ],
      laneQuery: 'ZAPYTANIE',
      laneEmbed: 'OSADZENIE · wymiar 16 (demo)',
      laneSpace: 'PRZESTRZEŃ SEMANTYCZNA · najbliższy sąsiad',
      btnRun: 'Uruchom wyszukiwanie',
      btnRunAria: 'Uruchom wyszukiwanie semantyczne dla wybranego zapytania',
      btnReplay: 'Odtwórz ponownie',
      btnReset: 'Zresetuj',
      btnResetAria: 'Zresetuj demo',
      resultsTitle: 'WYNIKI W RANKINGU',
      colRank: 'POZ.',
      colDoc: 'DOKUMENT',
      colScore: 'KOSINUS',
      nearest: 'NAJBLIŻSZY',
      liveSet: 'Ustawiono zapytanie: {q}',
      liveSearching: 'Wyszukiwanie lokalnie',
      liveResult:
        'Najlepsze dopasowanie: {n1}, kosinus {s1}. Znaleziono trzech najbliższych sąsiadów. Żadne dane nie zostały wysłane.',
      figureTitle:
        'Wyszukiwanie semantyczne SIEVE — zapytanie odnajduje najbliższych sąsiadów, lokalnie',
      figureDesc:
        'Dwuwymiarowa przestrzeń semantyczna dwunastu dokumentów pogrupowanych tematycznie. Umieszczane jest w niej przykładowe zapytanie, a trzej najbliżsi sąsiedzi zostają wyróżnieni wynikami podobieństwa kosinusowego. Całość obliczana jest w przeglądarce.',
      figcaptionTpl:
        'Jak to działa: SIEVE zamienia Twoje zapytanie w wektor i znajduje najbliższe dokumenty według znaczenia. Tutaj ‘{q}’ pasuje do ‘{n1}’ (kosinus {s1}), ‘{n2}’ ({s2}) oraz ‘{n3}’ ({s3}). Wszystko działa lokalnie — żadne dane nie opuszczają przeglądarki.',
    },
  },

  structura: {
    ref: 'PRD/STRUCTURA',
    name: 'STRUCTURA',
    h3: 'Ustrukturyzowana ekstrakcja, bazy wiedzy i agenci.',
    body: 'STRUCTURA zamienia nieustrukturyzowane, multimodalne dane w uporządkowaną bazę wiedzy, a następnie uruchamia dedykowanych agentów, którzy wykorzystują tę wiedzę, by działać w sieci i automatyzować codzienną pracę.',
    specCaption: 'STRUCTURA — specyfikacja możliwości',
    specHeadCapability: 'MOŻLIWOŚĆ',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      { capability: 'Wejście', detail: 'Nieustrukturyzowane, multimodalne dane' },
      { capability: 'Ekstrakcja', detail: 'Uporządkowane pola, encje i relacje' },
      { capability: 'Baza wiedzy', detail: 'Przeszukiwalna, połączona z przestrzeniami SIEVE' },
      {
        capability: 'Agenci / automatyzacja',
        detail: 'Dedykowani agenci działają w sieci i automatyzują procesy',
        highlight: true,
      },
    ],
    cta: 'Zapytaj nas o STRUCTURA',
    ctaAria: 'Zapytaj nas o STRUCTURA — napisz na hello@causality.pl',
    diagramTitle: 'Pipeline STRUCTURA — od nieustrukturyzowanych danych do działających agentów',
    diagramDesc:
      'Pipeline od lewej do prawej. Rozproszone symbole dokumentów, obrazów i dźwięku układają się w uporządkowany graf wiedzy, który trafia do węzła agenta podejmującego działania w sieci.',
    diagramSummary:
      'Jak to działa: nieustrukturyzowane dane multimodalne są ekstrahowane do pól i relacji, składane w przeszukiwalną bazę wiedzy i przekazywane dedykowanym agentom, którzy działają w sieci, automatyzując codzienną pracę.',
    stages: [
      'Nieustrukturyzowane dane multimodalne',
      'Ekstrakcja do ustrukturyzowanych pól',
      'Złożenie w przeszukiwalną bazę wiedzy',
      'Agent czyta i aktualizuje bazę wiedzy',
      'Agent działa w sieci, automatyzując zadanie',
    ],
    demo: {
      label: 'STRUCTURA · INTERAKTYWNY PRZEWODNIK',
      intro:
        'Przykład: przejdź krok po kroku — trzy nieuporządkowane źródła stają się grafem wiedzy, a agent go czyta, aktualizuje i działa.',
      statusReady: 'GOTOWE · naciśnij Odtwórz lub przechodź po krokach',
      stepReadout: 'KROK {n} / 5',
      captions: [
        'WEJŚCIE · 3 źródła · PO.pdf, pallet.jpg, vm.m4a',
        'EKSTRAKCJA · 7 pól · 3 encje · 2 relacje',
        'BAZA WIEDZY · 5 węzłów · 5 relacji · przeszukiwalna',
        'AGENT · odczyt Zamówienie→Faktura · zapis status=ZALEGŁA',
        'DZIAŁANIE · wpisano INV-2231 · kliknięto Zaplanuj → ZAPLANOWANO',
      ],
      sr: [
        'Krok 1 z 5. Napływają trzy nieustrukturyzowane źródła: PDF zamówienia, zdjęcie palety i wiadomość głosowa.',
        'Krok 2 z 5. STRUCTURA wydobywa siedem ustrukturyzowanych pól — dostawca, zamówienie, produkt, ilość, kwota, faktura, wysyłka.',
        'Krok 3 z 5. Pola układają się w przeszukiwalny graf wiedzy z pięciu połączonych encji.',
        'Krok 4 z 5. Agent czyta od Zamówienia do Faktury, stwierdza, że faktura INV-2231 jest niezapłacona i wymagalna, i zapisuje w bazie wiedzy nowy status ZALEGŁA.',
        'Krok 5 z 5. Wykorzystując zdobytą wiedzę, agent wpisuje fakturę INV-2231 w formularz płatności i klika Zaplanuj. Płatność jest zaplanowana. To ilustracyjny przykład, a nie rzeczywista transakcja.',
      ],
      nodes: [
        'Dostawca · Acme Foods',
        'Zamówienie · PO-4471',
        'Produkt · Mrożony groszek ×1200',
        'Faktura · INV-2231 · 8 420 €',
        'Wysyłka · SH-889',
        'STATUS · ZALEGŁA',
      ],
      anchor: 'KOTWICA',
      rels: ['dostarcza', 'zawiera', 'fakturowane-przez', 'wysyła', 'status'],
      browserUrl: 'pay.acme-erp.internal',
      browserField: 'Nr faktury',
      browserButton: 'Zaplanuj płatność',
      browserButtonDone: 'ZAPLANOWANO',
      ctrlPrev: 'Poprzedni krok',
      ctrlNext: 'Następny krok',
      ctrlPlay: 'Odtwórz przewodnik',
      ctrlPause: 'Wstrzymaj przewodnik',
      ctrlReplay: 'Odtwórz przewodnik od początku',
      hintKeyboard:
        'Użyj strzałek, aby przechodzić po krokach; przycisk Odtwórz przełącza odtwarzanie.',
      figcaption:
        'Jak to przebiega: nieustrukturyzowane dane multimodalne są wydobywane do ustrukturyzowanych pól i relacji, składane w przeszukiwalną bazę wiedzy i przekazywane niestandardowym agentom, którzy ją czytają, aktualizują i działają w sieci, automatyzując codzienną pracę. Pokazany scenariusz jest przykładem ilustracyjnym.',
    },
  },

  about: {
    tag: '§07 / O NAS',
    h2: 'Zespół badaczy i inżynierów.',
    body: 'Jesteśmy zespołem doświadczonych badaczy uczenia maszynowego i inżynierów oprogramowania, którzy niwelują dystans między biznesem a nowoczesnymi rozwiązaniami. Dzięki naszym usługom wykorzystasz najnowocześniejszą AI w codziennej pracy i rozwiniesz firmę — bez zbędnych komplikacji.',
    roster: ['Badania', 'Inżynieria ML', 'Oprogramowanie', 'Produkt'],
  },

  approach: {
    tag: '§08 / PODEJŚCIE',
    h2: 'Od Twojego problemu do działającego systemu.',
    steps: [
      {
        n: '01',
        title: 'Analiza i badania',
        body: 'Poznajemy Twoje dane i problem, po czym uczciwie mówimy, czy AI to właściwe narzędzie.',
      },
      {
        n: '02',
        title: 'Budowa',
        body: 'System szyty na miarę lub jeden z naszych produktów — gotowy do wdrożenia, nie na pokaz.',
      },
      {
        n: '03',
        title: 'Wdrożenie i wsparcie',
        body: 'Chmura lub w pełni on-premise. System należy do Ciebie — my go utrzymujemy.',
      },
    ],
  },

  finalCta: {
    tag: '§09 / KONTAKT',
    h2: 'Porozmawiajmy o Twoich danych.',
    sub: 'Opisz nam swój problem. Uczciwie powiemy, czy AI to właściwe narzędzie — i jak zachować kontrolę nad danymi.',
    ctaPrimary: 'Porozmawiajmy',
    reassurance: 'JEDEN E-MAIL. ODPOWIADA PRAWDZIWY INŻYNIER.',
  },

  footer: {
    tagline: 'Stosowana AI, oprogramowanie klasy badawczej.',
    productsTitle: 'Produkty',
    companyTitle: 'Firma',
    contactTitle: 'Kontakt',
    copyright: '© 2026 Causality. Wszelkie prawa zastrzeżone.',
  },
};
