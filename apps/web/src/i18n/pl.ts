import type { Content } from './types';

// Polish dictionary. Values maintained via scripts/pl-review.mjs + pl-apply.mjs.
export const pl: Content = {
  lang: 'pl',
  meta: {
    title: 'Causality — Praktyczne AI i oprogramowanie klasy R&D',
    description:
      'Jesteśmy badaczami ML i inżynierami oprogramowania. Wdrażamy rozwiązania AI klasy State-of-the-Art w Twojej organizacji. SIEVE — wyszukiwanie semantyczne on-premise; STRUCTURA — ekstrakcja danych i agenci AI.',
    ogTitle: 'Causality — Praktyczne AI i oprogramowanie klasy R&D',
    ogDescription:
      'Badacze ML i inżynierowie oprogramowania wdrażający AI klasy State-of-the-Art — gotowe na infrastrukturę on-premise.',
    ogLocale: 'pl',
    ogLocaleAlternate: 'en',
  },
  nav: {
    services: 'Usługi',
    products: 'Produkty',
    approach: 'Proces',
    about: 'O nas',
    contact: 'Kontakt',
    talkToUs: 'Porozmawiajmy',
    euProjects: 'Projekty UE',
    oss: 'Open source',
    primaryLabel: 'Nawigacja główna',
    skipToContent: 'Przejdź do treści',
    langLabel: 'Język',
    talkToUsAria: 'Porozmawiajmy — napisz na research@causality.pl',
  },
  hero: {
    eyebrow: 'PRAKTYCZNE AI · OPROGRAMOWANIE KLASY R&D',
    h1: 'Zlikwiduj dystans między Twoim biznesem a nowoczesnym AI.',
    lead: 'Jesteśmy badaczami machine learningu i inżynierami oprogramowania. Wdrażamy AI klasy State-of-the-Art prosto w Twoje codzienne procesy — abyś mógł skalować biznes bez zaciągania długu technologicznego.',
    ctaPrimary: 'Porozmawiajmy',
    ctaSecondary: 'Poznaj produkty',
    motifTitle:
      'Causality — semantyczne pole wektorowe układające się w sylwetkę mózgu i koła zębatego',
    motifDesc:
      'Rozproszone węzły wektorowe na delikatnej siatce; połączone limonkowe węzły układają się w logo Causality — mózg z kołem zębatym.',
    spec: {
      labelFocus: 'SPECJALIZACJA',
      labelMode: 'MODEL WSPÓŁPRACY',
      labelDeploy: 'WDROŻENIE',
      labelBased: 'SIEDZIBA',
      focus: 'Praktyczne AI',
      mode: 'Custom Development & Produkty',
      deploy: 'Cloud lub On-premise',
      based: 'UE',
      statusLabel: 'STATUS',
      statusValue: 'DOSTĘPNI',
    },
  },
  trust: {
    label: 'POZYCJA',
    line: 'AI klasy R&D, zaprojektowane do natywnego działania w Twojej infrastrukturze.',
    chips: [
      'SIEDZIBA W UE',
      'GOTOWE NA ON-PREMISE',
      'OPARTE NA R&D',
      'CUSTOM DEVELOPMENT & PRODUKTY',
    ],
  },
  services: {
    tag: '§03 / USŁUGI',
    h2: 'Cztery obszary, w których wdrażamy nowoczesne AI.',
    items: [
      {
        ref: 'SVC-01',
        title: 'Custom Applied AI',
        summary:
          'Architektury State-of-the-Art zintegrowane natywnie z Twoim produktem i workflow.',
        keys: ['dedykowane modele', 'natywna integracja', 'production-grade'],
        primary: true,
      },
      {
        ref: 'SVC-02',
        title: 'AI Research',
        summary:
          'Akademicki rygor badawczy nakierowany na rozwiązanie Twoich najbardziej złożonych problemów technologicznych.',
        keys: ['ewaluacja', 'nowatorskie metody', 'benchmarking'],
      },
      {
        ref: 'SVC-03',
        title: 'Software Engineering',
        summary:
          'Niezawodne i skalowalne systemy wokół modeli ML — zamiast jednorazowych prototypów.',
        keys: ['API', 'data pipelines', 'MLOps'],
      },
      {
        ref: 'SVC-04',
        title: 'Gotowe produkty',
        summary:
          'SIEVE i STRUCTURA — narzędzia AI klasy State-of-the-Art w standardzie plug-and-play.',
        keys: ['SIEVE', 'STRUCTURA', 'on-prem'],
      },
    ],
  },
  productsIntro: {
    tag: '§04 / PRODUKTY',
    h2: 'AI w standardzie produkcyjnym, gotowe od pierwszego dnia.',
    frame:
      'SIEVE i STRUCTURA oddają najnowocześniejsze AI w ręce Twojego zespołu — wyszukiwanie, które naprawdę rozumie kontekst, oraz autonomiczni agenci zmieniający surowe dane w akcje. Wdróż je w chmurze lub w pełni on-premise.',
  },
  ingest: {
    label: 'ŹRÓDŁA DANYCH',
    types: ['Dokumenty', 'Systemy ERP i bazy danych', 'Obrazy', 'Nagrania audio'],
    email: 'Przekaż e-mail',
    note: 'Zasilaj system z dowolnego źródła — plików, systemów ERP, zdjęć czy audio. Wystarczy przesłać e-mail na dedykowaną skrzynkę Causality, a w kilka sekund zostanie zindeksowany.',
  },
  sieve: {
    ref: 'PRD/SIEVE',
    name: 'SIEVE',
    h3: 'Wyszukiwanie semantyczne i głęboka analiza danych.',
    body: 'SIEVE przeszukuje i analizuje dane na podstawie kontekstu, wykorzystując nasze autorskie przestrzenie wektorowe. Indeksuje pliki tekstowe i multimodalne w przestrzeni semantycznej, w której właściwa odpowiedź jest po prostu najbliższym dopasowaniem (nearest neighbour).',
    specCaption: 'SIEVE — specyfikacja techniczna',
    specHeadCapability: 'FUNKCJA',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      {
        capability: 'Wyszukiwanie semantyczne',
        detail: 'Wyszukiwanie po znaczeniu (algorytm nearest neighbour)',
      },
      {
        capability: 'Indeksowanie multimodalne',
        detail: 'Tekst, dokumenty, obrazy i inne formaty',
      },
      {
        capability: 'Przestrzenie wektorowe',
        detail: 'Autorskie modele embeddingów, fine-tuningowane pod Twoją branżę',
      },
      {
        capability: 'Wdrożenie',
        detail: 'Wdrożenie on-premise — dane nigdy nie opuszczają Twojej infrastruktury',
        highlight: true,
      },
    ],
    cta: 'Porozmawiajmy o SIEVE',
    ctaAria: 'Porozmawiajmy o SIEVE — napisz na research@causality.pl',
    diagramTitle: 'Architektura on-premise SIEVE — dane nigdy nie opuszczają środowiska klienta',
    diagramDesc:
      'Schemat architektury. Przerywana linia wyznacza środowisko klienta (customer perimeter), zamykając w nim magazyn danych i moduł SIEVE. Wektor zapytania łączy się z nearest neighbour wewnątrz środowiska. Strzałka oznaczająca ruch na zewnątrz zostaje zablokowana statusem NO DATA EGRESS.',
    diagramSummary:
      'Zasada wdrożenia: SIEVE działa w 100% w Twojej infrastrukturze. Magazyn danych i indeks semantyczny są odizolowane wewnątrz środowiska klienta (perimeter). Zapytania są procesowane lokalnie. Gwarantujemy architekturę zero data egress — żadne dane nie opuszczają systemu.',
    perimeterLabel: 'ŚRODOWISKO KLIENTA (PERIMETER)',
    egressLabel: 'ZERO DATA EGRESS (BRAK WYCIEKÓW)',
    perimeterDataStore: 'MAGAZYN DANYCH',
    perimeterQuery: 'ZAPYTANIE',
    perimeterBlocked: 'Zablokowane na granicy środowiska',
    demo: {
      plateTitle: 'SIEVE · WYSZUKIWANIE SEMANTYCZNE',
      badge: 'DZIAŁA LOKALNIE · ŻADNE DANE NIE OPUSZCZAJĄ PRZEGLĄDARKI',
      meter: '0 REQUESTÓW',
      presetsLabel: 'PRZYKŁADOWE ZAPYTANIE',
      clusters: ['INFRASTRUKTURA', 'WYSZUKIWANIE', 'PRYWATNOŚĆ DANYCH', 'MULTIMODALNOŚĆ'],
      narrateIdle:
        'Wybierz przykładowe zapytanie i kliknij Uruchom — SIEVE znajdzie dokumenty najbardziej zbliżone kontekstowo.',
      steps: [
        'Zasil system dowolnymi danymi — dokumentami, eksportami z baz, obrazami czy nagraniami. Przekaż e-mail, a w kilka sekund zindeksuje się w wyszukiwarce.',
        'Zadawaj pytania naturalnym językiem — bez dobierania słów kluczowych i skomplikowanej składni.',
        'SIEVE analizuje zapytanie kontekstowo i mapuje je w tej samej przestrzeni wektorowej co Twoje zbiory danych.',
        'Najbardziej trafne dokumenty zostają dopasowane — nawet jeśli nie dzielą z zapytaniem ani jednego wspólnego słowa.',
        'Otrzymujesz wyselekcjonowaną listę wyników, podczas gdy Twoje dane przez cały czas pozostają bezpieczne na serwerze.',
      ],
      presets: [
        'baza wektorowa on-premise',
        'wyszukiwanie semantyczne dokumentów',
        'prywatność danych klientów',
        'wyszukiwanie w obrazach i audio',
      ],
      docs: [
        'baza wektorowa on-premise',
        'konfiguracja klastra Kubernetes',
        'wdrożenie typu air-gapped',
        'wyszukiwanie nearest neighbour',
        'ranking semantyczny',
        'budowanie indeksu embeddingów',
        'rezydencja danych (GDPR)',
        'anonimizacja danych (PII)',
        'polityka kontroli dostępu (RBAC)',
        'embedding obrazów',
        'wyszukiwanie transkrypcji audio',
        'ekstrakcja tabel z PDF',
      ],
      laneQuery: 'ZAPYTANIE',
      laneEmbed: 'EMBEDDING · wymiar 16 (demo)',
      laneSpace: 'PRZESTRZEŃ SEMANTYCZNA · nearest neighbour',
      btnRun: 'Szukaj',
      btnRunAria: 'Uruchom wyszukiwanie semantyczne dla wybranego zapytania',
      btnReplay: 'Powtórz',
      btnReset: 'Reset',
      btnResetAria: 'Zresetuj demo',
      resultsTitle: 'WYNIKI WYSZUKIWANIA',
      colRank: 'RANKING',
      colDoc: 'DOKUMENT',
      colScore: 'COSINE',
      nearest: 'NAJBLIŻSZE DOPASOWANIE',
      liveSet: 'Zapytanie: {q}',
      liveSearching: 'Wyszukiwanie lokalne',
      liveResult:
        'Najlepsze dopasowanie: {n1}, cosine similarity {s1}. Znaleziono 3 nearest neighbours. Żadne dane nie opuściły infrastruktury.',
      figureTitle:
        'Wyszukiwanie semantyczne SIEVE — lokalne procesowanie algorytmem nearest neighbour',
      figureDesc:
        'Dwuwymiarowa przestrzeń semantyczna ze sklastrowanymi dokumentami. Wprowadzone zostaje zapytanie testowe, a trzy najbliższe powiązania są podświetlane wraz z wynikiem cosine similarity. Cała logika wykonywana jest w przeglądarce.',
      figcaptionTpl:
        'Jak to działa: SIEVE wektoryzuje Twoje zapytanie i znajduje dokumenty najbliższe pod względem koncepcyjnym. W tym przypadku „{q}” koreluje z „{n1}” (cosine {s1}), „{n2}” ({s2}) oraz „{n3}” ({s3}). Proces odbywa się w pełni lokalnie.',
    },
  },
  structura: {
    ref: 'PRD/STRUCTURA',
    name: 'STRUCTURA',
    h3: 'Ustrukturyzowana ekstrakcja, knowledge graphs i agenci AI.',
    body: 'STRUCTURA przekształca nieustrukturyzowane, multimodalne dane w solidny graf wiedzy (knowledge graph). Na jego bazie uruchamia dedykowanych agentów AI, którzy wchodzą w interakcję z interfejsami webowymi i automatyzują operacyjny workflow.',
    specCaption: 'STRUCTURA — specyfikacja techniczna',
    specHeadCapability: 'FUNKCJA',
    specHeadDetail: 'SZCZEGÓŁY',
    specs: [
      {
        capability: 'Dane wejściowe (Input)',
        detail: 'Nieustrukturyzowane, multimodalne dane',
      },
      {
        capability: 'Pipeline ekstrakcji',
        detail: 'Ustrukturyzowane pola, encje i relacje',
      },
      {
        capability: 'Baza wiedzy',
        detail: 'W pełni przeszukiwalna, zintegrowana z bazami wektorowymi SIEVE',
      },
      {
        capability: 'Agenci / Automatyzacja',
        detail: 'Dedykowani agenci automatyzujący workflow bezpośrednio w aplikacjach',
        highlight: true,
      },
    ],
    cta: 'Porozmawiajmy o STRUCTURA',
    ctaAria: 'Porozmawiajmy o STRUCTURA — napisz na research@causality.pl',
    diagramTitle: 'Pipeline STRUCTURA — od nieustrukturyzowanych danych po działających agentów AI',
    diagramDesc:
      "Schemat sekwencyjny pipeline'u. Nieustrukturyzowane pliki graficzne, dokumenty i dźwięki przekształcają się w graf wiedzy (knowledge graph), przekazując kontekst do agenta wykonującego akcje w sieci.",
    diagramSummary:
      'Przepływ danych: Nieustrukturyzowane pliki są parsowane do ustrukturyzowanych relacji budując przeszukiwalny knowledge graph. Te dane trafiają do agentów, którzy obsługują interfejsy webowe automatyzując codzienne procesy.',
    stages: [
      'Ingestia nieustrukturyzowanych danych multimodalnych',
      'Ekstrakcja do ustrukturyzowanych pól key-value',
      'Kompilacja w przeszukiwalny graf wiedzy',
      'Agent procesuje i aktualizuje bazę wiedzy',
      'Zautomatyzowana egzekucja zadań przez agenta w przeglądarce',
    ],
    demo: {
      label: 'STRUCTURA · INTERAKTYWNE DEMO',
      intro:
        'Autonomiczny workflow: e-maile spływają asynchronicznie; agent na bieżąco aktualizuje graf wiedzy, monitoruje braki informacyjne, a po zebraniu kompletu danych – egzekwuje akcję w zewnętrznym portalu.',
      statusReady: 'GOTOWE · kliknij Play lub przechodź krok po kroku',
      stepReadout: 'KROK {n} / 5',
      captions: [
        'INGESTIA · dowolne źródło · plik · system · zdjęcie · e-mail',
        'E-MAIL 1 · potwierdzenie zamówienia · +Zamówienie +Produkt +Dostawa',
        'AGENT · monitorowanie · oczekiwanie na powiązaną fakturę',
        'E-MAIL 2 · faktura INV-2231 · dopasowano → Zamówienie · status DO ZAPŁATY',
        'AKCJA · portal · wpisano INV-2231 · Harmonogram → ZAPLANOWANO',
      ],
      sr: [
        "Krok 1 z 5. Dane spływają do pipeline'u z dowolnych źródeł — systemów ERP, plików, zdjęć czy maili. Wszystko jest konsolidowane w centralnym hubie.",
        'Krok 2 z 5. Odbiór pierwszego maila: Acme potwierdza zamówienie PO-4471. STRUCTURA parsuje tekst, mapując zamówienie i produkt bezpośrednio do bazy wiedzy.',
        'Krok 3 z 5. Płatność nie jest jeszcze wymagana, dlatego agent pozostaje w trybie nasłuchu — czekając na nadejście przypisanej faktury.',
        "Krok 4 z 5. Pojawia się drugi mail z fakturą INV-2231. Agent przypisuje ją do oryginalnego zamówienia, waliduje kwoty i aktualizuje status na 'Do zapłaty'.",
        'Krok 5 z 5. Po poprawnym zrekonsolidowaniu danych, agent nawiguje do bramki płatności, wpisuje numer faktury i ustala harmonogram przelewu. (Symulacja poglądowa).',
      ],
      nodes: [
        'Dostawca · Acme Foods',
        'Zamówienie · PO-4471',
        'Produkt · Mrożony groszek ×1200',
        'Faktura · INV-2231 · €8,420',
        'Dostawa · SH-889',
        'STATUS · DO ZAPŁATY',
      ],
      anchor: 'KOTWICA',
      rels: ['dostarcza', 'zawiera', 'fakturowane przez', 'wysyła', 'status'],
      browserUrl: 'pay.acme-erp.internal',
      browserField: 'Nr faktury',
      browserButton: 'Zaplanuj płatność',
      browserButtonDone: 'ZAPLANOWANO',
      ctrlPrev: 'Poprzedni krok',
      ctrlNext: 'Następny krok',
      ctrlPlay: 'Odtwórz demo',
      ctrlPause: 'Zatrzymaj demo',
      ctrlReplay: 'Odtwórz demo od początku',
      hintKeyboard:
        'Użyj strzałek, aby nawigować po krokach; przycisk Play kontroluje automatyzację.',
      laneInput: 'INPUT PIPELINE',
      laneGraph: 'KNOWLEDGE GRAPH',
      laneAction: 'AKCJE AGENTA',
      agentLabel: 'AGENT',
      extractChips: ['Dostawca', 'Zamówienie', 'Ilość', 'Kwota', 'Faktura'],
      inboxLabel: 'SKRZYNKA ODBIORCZA',
      emails: ['Fwd: Potwierdzenie zamówienia — Acme Foods', 'Fwd: Faktura INV-2231 — Acme Foods'],
      waitNote: 'Monitorowanie — oczekiwanie na przypisaną fakturę',
      agentWatch: 'nasłuchuje',
      agentAct: 'egzekwuje w przeglądarce',
      figcaption:
        'Wizualizacja workflow: Źródła danych spływają asynchronicznie; STRUCTURA utrzymuje aktualność bazy wiedzy, podczas gdy agent AI konsoliduje informacje i egzekwuje polecenia w aplikacjach webowych. Symulacja poglądowa.',
    },
  },
  about: {
    tag: '§07 / O NAS',
    h2: 'Zespół inżynierów i badaczy.',
    body: 'Jesteśmy zespołem doświadczonych badaczy machine learningu i inżynierów oprogramowania. Zmniejszamy lukę technologiczną między biznesem a nowoczesnym IT. Wdrażamy rozwiązania State-of-the-Art w Twoje codzienne procesy, pozwalając na skalowanie organizacji bez zaciągania długu technologicznego.',
    roster: ['Research', 'ML Engineering', 'Software Engineering', 'Produkt'],
    teamLabel: 'Liderzy R&D',
    team: [
      {
        name: 'Roman Bartusiak',
        role: 'Co-founder · AI Research',
        note: 'Naukowiec ML/NLP z publikacjami (h-index 5); współtwórca LEPISZCZE — polskiego benchmarku NLP.',
        linkedin: 'https://www.linkedin.com/in/romanbartusiak/',
        scholar: 'https://scholar.google.com/citations?user=mk68epwAAAAJ&hl=en',
      },
      {
        name: 'Krzysztof Sobota',
        role: 'Co-founder · ML Engineering',
        note: 'Senior ML engineer, AGH — techniczny lider naszych projektów R&D dofinansowanych z UE.',
        linkedin: 'https://www.linkedin.com/in/sobota',
      },
    ],
  },
  approach: {
    tag: '§08 / PROCES',
    h2: 'Od definicji problemu do systemu na produkcji.',
    steps: [
      {
        n: '01',
        title: 'Analiza & Research',
        body: 'Dogłębnie analizujemy Twoje dane oraz obszar biznesowy, aby rzetelnie ocenić, czy sztuczna inteligencja jest tutaj najlepszym kierunkiem.',
      },
      {
        n: '02',
        title: 'Development',
        body: 'Implementujemy dedykowany system lub wdrażamy jeden z naszych produktów. Budujemy stabilne oprogramowanie na produkcję, a nie dema technologiczne.',
      },
      {
        n: '03',
        title: 'Wdrożenie & Support',
        body: 'Uruchomienie w chmurze lub w pełni na infrastrukturze on-premise. Ty zachowujesz pełną własność kodu i danych, my zapewniamy utrzymanie.',
      },
    ],
  },
  finalCta: {
    tag: '§09 / KONTAKT',
    h2: 'Porozmawiajmy o Twoich danych.',
    sub: 'Opisz nam swój problem. Uczciwie zweryfikujemy, czy sztuczna inteligencja jest tu adekwatnym narzędziem — i doradzimy, jak utrzymać pełną suwerenność danych.',
    ctaPrimary: 'Napisz do nas',
    reassurance: 'JEDEN E-MAIL. ODPOWIADA BEZPOŚREDNIO INŻYNIER.',
  },
  footer: {
    tagline: 'Praktyczne AI i oprogramowanie klasy R&D.',
    productsTitle: 'Produkty',
    companyTitle: 'Firma',
    contactTitle: 'Kontakt',
    copyright: '© 2026 Causality. Wszelkie prawa zastrzeżone.',
  },
  eu: {
    metaTitle: 'Projekty dofinansowane z UE — Causality',
    metaDescription:
      'Projekty badawczo-rozwojowe realizowane przez Causality ze współfinansowaniem Unii Europejskiej — programy, numery projektów i alokacje funduszy.',
    tag: '§ FUNDUSZE EUROPEJSKIE',
    h1: 'Projekty dofinansowane z UE',
    intro:
      'Causality realizuje zaawansowane projekty badawczo-rozwojowe (R&D) współfinansowane ze środków Unii Europejskiej. Poniżej przedstawiamy szczegóły naszych inicjatyw.',
    coFunded: 'Projekt dofinansowany przez Unię Europejską',
    disclosure: 'Projekt współfinansowany przez Unię Europejską.',
    backHome: 'Powrót na stronę główną',
    beneficiaryLabel: 'Beneficjent',
    programmeLabel: 'Program',
    actionLabel: 'Działanie',
    numberLabel: 'Numer projektu',
    institutionLabel: 'Instytucja wdrażająca',
    valueLabel: 'Całkowita wartość projektu',
    euFundingLabel: 'Dofinansowanie UE',
    cofinancingLabel: 'Dofinansowanie UE',
    scopeLabel: 'Zakres',
    projects: [
      {
        title:
          'Opracowanie elastycznej, uniwersalnej metody generowania wysokiej jakości syntetycznych danych tekstowych i wizualnych do trenowania komercyjnych modeli uczenia maszynowego',
        paragraphs: [
          'Firma CAUSALITY PROSTA SPÓŁKA AKCYJNA uzyskała dotację z Unii Europejskiej na projekt „Opracowanie elastycznej i uniwersalnej metody generowania danych tekstowych i obrazowych o wysokiej jakości i wiarygodności na potrzeby budowy komercyjnych rozwiązań bazujących na uczeniu maszynowym” w ramach programu Fundusze Europejskie dla Nowoczesnej Gospodarki 2021–2027, Priorytet Wsparcie dla przedsiębiorców; Działanie Ścieżka SMART nr FENG.01.01-IP.02-2364/23.',
          'Celem projektu jest stworzenie elastycznej metody generowania wysoce wiarygodnych syntetycznych danych tekstowych i wizualnych, optymalizujących proces uczenia komercyjnych modeli machine learningowych (ML).',
        ],
        tasksIntro: 'Realizacja opiera się na czterech głównych zadaniach badawczych:',
        tasks: [
          'Opracowanie modeli generatywnych do syntezy danych tekstowych bazujących na wzorcach użytkownika, z naciskiem na poprawność semantyczną i minimalizację zjawiska halucynacji (badania przemysłowe).',
          'Integracja silnika generującego tekst w pełnoprawną, skalowalną architekturę opartą na mikroserwisach (prace rozwojowe).',
          'Skonstruowanie modeli generujących syntetyczne dane wizualne (obrazy) ze wskazanych parametrów z gwarancją spójności semantycznej i redukcją halucynacji (badania przemysłowe).',
          'Wdrożenie komponentu syntezy obrazu do jednolitego środowiska mikroserwisowego (prace rozwojowe).',
        ],
        paragraphsAfter: [
          'Końcowym produktem projektu będzie platforma SaaS ze zintegrowanym API, komercjalizowana bezpośrednio przez Causality. Rozwiązanie to jest dedykowane firmom tworzącym oprogramowanie oparte na AI i pozwoli im znacznie przyspieszyć wdrożenia rozwiązań ML. Ze względu na uniwersalną architekturę, platforma znajdzie zastosowanie w wielu branżach — a w szczególności w sektorach wysokiego ryzyka (np. healthtech, finanse, przemysł 4.0), które zmagają się z deficytem rzetelnych danych treningowych.',
          'Autorskie podejście do syntezowania danych zapewni użytkownikom przewagę rynkową poprzez drastyczne podniesienie wiarygodności i jakości generowanych zbiorów uczących.',
        ],
        beneficiary: 'CAUSALITY PROSTA SPÓŁKA AKCYJNA',
        programme: 'Fundusze Europejskie dla Nowoczesnej Gospodarki 2021–2027',
        action: 'Priorytet: Wsparcie dla przedsiębiorców · Działanie: Ścieżka SMART',
        number: 'FENG.01.01-IP.02-2364/23',
        value: '10 052 632,00 PLN',
        funding: '7 223 363,75 PLN',
        fundingKind: 'eu',
      },
      {
        title: 'Silnik wyszukiwania semantycznego i eksploracji danych zoptymalizowany dla biznesu',
        paragraphs: [
          'Firma CAUSALITY PROSTA SPÓŁKA AKCYJNA zrealizowała projekt „Silnik wyszukiwania semantycznego i eksploracji danych dostępny dla użytkowników biznesowych” w ramach Działania 1.1: Projekty B+R przedsiębiorstw (Poddziałanie 1.1.1 - Badania przemysłowe i prace rozwojowe realizowane przez przedsiębiorstwa) z Programu Operacyjnego Inteligentny Rozwój 2014–2020.',
          'Projekt został współfinansowany przez Unię Europejską w ramach konkursu 1/1.1.1/2022 — Szybka ścieżka — Innowacje cyfrowe.',
        ],
        beneficiary: 'CAUSALITY PROSTA SPÓŁKA AKCYJNA',
        programme: 'Program Operacyjny Inteligentny Rozwój 2014–2020',
        action: 'Działanie 1.1: Projekty B+R przedsiębiorstw · Poddziałanie 1.1.1',
        number: 'POIR.01.01.01-00-0178/22',
        institution: 'Narodowe Centrum Badań i Rozwoju',
        value: '5 520 888,16 PLN',
        funding: '4 181 246,47 PLN',
        fundingKind: 'cofinancing',
      },
    ],
  },
  oss: {
    metaTitle: 'Open source — Causality',
    metaDescription:
      'Oprogramowanie open source od Causality. Poznaj BORSUK — wydajny silnik wyszukiwania podobieństwa (similarity search) w Rust, streamujący wektory prosto z plików Parquet na dysku lub w magazynie S3.',
    tag: '§ OPEN SOURCE',
    h1: 'Oprogramowanie open source',
    intro:
      'Wierzymy w open source. To kluczowe projekty, które wyrosły z naszych laboratoriów R&D — otwarte dla społeczności. Możesz z nich swobodnie korzystać i integrować ze swoim stosem technologicznym.',
    stackLabel: 'TECH STACK',
    visit: 'Zobacz projekt na GitHubie',
    backHome: 'Wróć do strony głównej',
    projects: [
      {
        name: 'BORSUK',
        tagline: 'Blob-Oriented Retrieval with Segmental Unified KNN',
        description:
          'Wysoce zoptymalizowany silnik similarity search napisany natywnie w Rust. Drastycznie obniża zużycie pamięci dzięki strumieniowemu czytaniu wektorów prosto z plików Parquet — z dysku lokalnego lub magazynów S3 (AWS S3, MinIO, SeaweedFS) — bez potrzeby ładowania całych zbiorów do RAM-u. Projekt dostarcza natywne API dla Pythona (PyO3) oraz TypeScriptu (N-API) i obsługuje szeroki wachlarz metryk dla wektorów gęstych, histogramów, zbiorów oraz tekstu.',
        href: 'https://causality.pl/borsuk/',
        stack: ['Rust', 'Python', 'TypeScript', 'Parquet', 'S3'],
      },
    ],
  },
};
