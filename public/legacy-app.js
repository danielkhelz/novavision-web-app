const $ = (selector, root = document) => root.querySelector(selector);
const icon = name => `<svg class="icon"><use href="#icon-${name}"></use></svg>`;
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const I18N_EN = {"NovaVision — Artisti e clienti, senza intermediari": "NovaVision — Artists and clients, without intermediaries", "Esplora artisti": "Explore artists", "Opportunità": "Opportunities", "Messaggi": "Messages", "Contatti": "Contacts", "Accedi": "Sign in", "Inizia ora": "Get started", "Esci": "Sign out", "Dashboard": "Dashboard", "Accedi per gestire profilo, annunci e messaggi.": "Sign in to manage your profile, listings and messages.", "Crea account": "Create account", "Utente NovaVision": "NovaVision user", "Profilo personale": "Personal profile", "Consulente evento": "Event advisor", "Artist Booking & Management": "Artist Booking & Management", "Il talento giusto.": "The right talent.", "Per ogni evento.": "For every event.", "NovaVision mette in contatto diretto artisti verificati e clienti. Ricerca per città, data, stile e budget. Tratta e prenota in un unico spazio.": "NovaVision directly connects verified artists and clients. Search by city, date, style and budget. Negotiate and book in one place.", "Località": "Location", "Professionista": "Professional", "Tutte le categorie": "All categories", "Musicista": "Musician", "Cantante": "Singer", "Tecnico audio": "Audio technician", "Data evento": "Event date", "Cerca": "Search", "Profili verificati": "Verified profiles", "Pagamenti protetti": "Protected payments", "Contatto diretto": "Direct contact", "artisti disponibili": "artists available", "In evidenza": "Featured", "Match consigliati": "Recommended matches", "Richiesta ricevuta": "Request received", "Cena aziendale": "Corporate dinner", "Prenotazione confermata": "Booking confirmed", "Pagamento protetto": "Protected payment", "professionisti attivi": "active professionals", "città raggiunte": "cities covered", "valutazione media": "average rating", "nessuna agenzia": "no agency", "Musicisti": "Musicians", "Cantanti": "Singers", "Tecnici audio": "Audio technicians", "Piani NovaVision": "NovaVision plans", "Parti gratis.": "Start for free.", "Cresci senza intermediari.": "Grow without intermediaries.", "Ogni utente deve registrarsi per aprire gli annunci. Il piano Free non richiede carta.": "Every user must register to open listings. The Free plan does not require a card.", "Mensile": "Monthly", "Annuale": "Yearly", "risparmia": "save", "Per artisti e clienti": "For artists and clients", "Registrazione gratuita. Nessuna intermediazione sul compenso.": "Free registration. No commission on your fee.", "per sempre": "forever", "Profilo con foto e dati anagrafici": "Profile with photo and personal details", "Contatti, strumento e competenze": "Contacts, instrument and skills", "Formazione musicale e diploma": "Music education and diploma", "Accesso agli annunci pubblicati": "Access to published listings", "Filtri per luogo, data, genere, strumento e budget": "Filters by location, date, genre, instrument and budget", "Candidatura diretta agli annunci": "Apply directly to listings", "Crea account Free": "Create Free account", "Premium artista": "Artist Premium", "Artista": "Artist", "Profilo avanzato, calendario, preventivi, chat e maggiore visibilità.": "Advanced profile, calendar, quotes, chat and greater visibility.", "/mese": "/month", "Risparmi €5 ogni anno": "Save €5 every year", "Tutto del piano Free": "Everything in the Free plan", "Calendario disponibilità": "Availability calendar", "Richieste e controproposte": "Requests and counteroffers", "Priorità nei risultati locali": "Priority in local results", "Più scelto": "Most popular", "Premium cliente": "Client Premium", "Cliente": "Client", "Ricerca artisti, pubblicazione annunci, preventivi e prenotazioni organizzate.": "Artist search, listing publication, quotes and organized bookings.", "Risparmi €7 ogni anno": "Save €7 every year", "Pubblicazione annunci": "Publish listings", "Contatto diretto con artisti": "Direct contact with artists", "Gestione preventivi e prenotazioni": "Quote and booking management", "Scelti vicino a te": "Selected near you", "Vedi tutti →": "View all →", "Consulenza evento": "Event advice", "Un esperto NovaVision per ogni necessità.": "A NovaVision expert for every need.", "Dubbi su artista, budget, repertorio, impianto audio, tempi o organizzazione? Apri la chat e chiedi supporto per il tuo evento.": "Questions about the artist, budget, repertoire, sound system, timing or organization? Open the chat and ask for support for your event.", "Parla con un consulente": "Talk to an advisor", "What we do": "What we do", "Dalla ricerca alla conferma.": "From search to confirmation.", "Solo passaggi utili.": "Only useful steps.", "NovaVision centralizza scoperta, contatto, preventivo e prenotazione. Artista e cliente mantengono controllo completo.": "NovaVision centralizes discovery, contact, quotes and bookings. Artists and clients keep full control.", "Trova il match": "Find the right match", "Filtra per zona, categoria, data, prezzo e disponibilità reale.": "Filter by area, category, date, price and actual availability.", "Definisci l’accordo": "Define the agreement", "Chat diretta, preventivo trasparente e possibilità di controproposta.": "Direct chat, transparent quote and the option to make a counteroffer.", "Conferma l’evento": "Confirm the event", "Prenotazione ordinata, pagamento protetto e dettagli sempre disponibili.": "Organized booking, protected payment and details always available.", "NovaVision · Per professionisti": "NovaVision · For professionals", "Trasforma disponibilità e talento in nuove opportunità.": "Turn availability and talent into new opportunities.", "Profilo, aree di lavoro, compenso, calendario e richieste: tutto sotto controllo.": "Profile, work areas, fees, calendar and requests: everything under control.", "Crea profilo artista": "Create artist profile", "Contatti NovaVision": "NovaVision contacts", "Parliamo del tuo progetto.": "Let's talk about your project.", "Per eventi, collaborazioni, produzione artistica, marketing e informazioni sulla piattaforma.": "For events, collaborations, artistic production, marketing and platform information.", "Email generale": "General email", "Direzione e produzione artistica": "Artistic direction and production", "Responsabile Marketing & PR": "Marketing & PR Manager", "Ricerca avanzata": "Advanced search", "Trova artisti": "Find artists", "Disponibilità verificata, contatto diretto, nessuna agenzia.": "Verified availability, direct contact, no agency.", "Mostra mappa": "Show map", "Artisti vicino a te": "Artists near you", "Posizione non ancora rilevata.": "Location not detected yet.", "Aggiorna posizione": "Update location", "Filtri": "Filters", "Azzera": "Reset", "Città o zona": "City or area", "Categoria": "Category", "Tutte": "All", "Compenso massimo:": "Maximum fee:", "Solo profili verificati": "Verified profiles only", "Solo disponibili": "Available only", "0 artisti trovati": "0 artists found", "Consigliati": "Recommended", "Valutazione": "Rating", "Prezzo crescente": "Price: low to high", "Prezzo decrescente": "Price: high to low", "Annunci di lavoro": "Job listings", "Eventi pubblicati da locali, hotel, aziende e privati.": "Events published by venues, hotels, companies and private clients.", "Pubblica annuncio": "Publish listing", "Clienti e opportunità vicino a te": "Clients and opportunities near you", "Filtra annunci": "Filter listings", "Azzera filtri": "Reset filters", "Luogo": "Location", "Data": "Date", "Genere musicale": "Music genre", "Strumento / ruolo": "Instrument / role", "Voce": "Vocals", "Sassofono": "Saxophone", "Chitarra": "Guitar", "Pianoforte": "Piano", "Console DJ": "DJ console", "Budget minimo": "Minimum budget", "Contatti diretti": "Direct contacts", "Seleziona una conversazione": "Select a conversation", "Parla direttamente con artista o cliente.": "Talk directly with an artist or client.", "Online ora": "Online now", "Crea preventivo": "Create quote", "Invia": "Send", "Area personale": "Personal area", "Dashboard artista": "Artist dashboard", "Gestisci richieste, disponibilità e profilo.": "Manage requests, availability and profile.", "Abbonamento attivo": "Active subscription", "Piano artista mensile": "Monthly artist plan", "€2 al mese · rinnovo automatico": "€2 per month · automatic renewal", "Attivo": "Active", "Cambia piano": "Change plan", "Profilo NovaVision": "NovaVision profile", "Nome utente": "User name", "Profilo professionale": "Professional profile", "Richieste attive": "Active requests", "+2 questa settimana": "+2 this week", "Prenotazioni mese": "Bookings this month", "previsti": "expected", "Visualizzazioni profilo": "Profile views", "+18% ultimi 30 giorni": "+18% in the last 30 days", "recensioni verificate": "verified reviews", "Richieste ricevute": "Received requests", "Apri messaggi": "Open messages", "Disponibilità": "Availability", "Modifica": "Edit", "Disponibile": "Available", "Occupato": "Busy", "Annunci attivi": "Active listings", "candidature totali": "total applications", "Prenotazioni": "Bookings", "in arrivo": "upcoming", "Budget impegnato": "Committed budget", "Preferiti": "Favorites", "Artisti salvati": "Saved artists", "Le tue richieste": "Your requests", "Nuova richiesta": "New request", "Artisti preferiti": "Favorite artists", "Cerca artisti": "Search artists", "Marketplace diretto per artisti, clienti ed eventi.": "Direct marketplace for artists, clients and events.", "Annunci": "Listings", "Chat": "Chat", "Profilo": "Profile", "Area riservata": "Restricted area", "Registrati per aprire gli annunci": "Register to open listings", "Artisti e clienti devono avere un account NovaVision. Il piano Free è sufficiente e non richiede carta.": "Artists and clients need a NovaVision account. The Free plan is enough and does not require a card.", "Ho già un account": "I already have an account", "Entra in NovaVision": "Join NovaVision", "Crea il tuo account": "Create your account", "Contatto diretto. Nessuna agenzia.": "Direct contact. No agency.", "Registrati": "Register", "Sono un artista": "I am an artist", "Mostra il tuo talento e ricevi richieste": "Show your talent and receive requests", "Sono un cliente": "I am a client", "Trova artisti per il tuo evento": "Find artists for your event", "Abbonamento": "Subscription", "Piano artista": "Artist plan", "al mese": "per month", "Nome": "Name", "Email": "Email", "Password": "Password", "Foto profilo": "Profile photo", "JPG o PNG. Foto salvata localmente nella demo.": "JPG or PNG. The photo is saved locally in the demo.", "Data di nascita": "Date of birth", "Telefono / contatto": "Phone / contact", "Strumento principale": "Main instrument", "Diploma / titolo": "Diploma / qualification", "Formazione musicale": "Music education", "Città": "City", "Posizione operativa": "Working location", "Trova automaticamente risultati nella tua zona": "Automatically find results in your area", "La posizione verrà richiesta durante l’iscrizione.": "Location permission will be requested during registration.", "Usa posizione": "Use location", "Continua": "Continue", "oppure": "or", "Continua con Google": "Continue with Google", "Continua con Apple": "Continue with Apple", "Continuando accetti Termini, Privacy e regole della piattaforma.": "By continuing, you accept the Terms, Privacy Policy and platform rules.", "Attiva abbonamento": "Activate subscription", "Completa l’iscrizione": "Complete registration", "Checkout dimostrativo. Nessun addebito reale viene eseguito in questa versione.": "Demo checkout. No real charge is made in this version.", "Piano artista · mensile": "Artist plan · monthly", "Rinnovo mensile": "Monthly renewal", "Intestatario carta": "Cardholder", "Numero carta demo": "Demo card number", "Scadenza": "Expiry date", "Demo sicura: dati non inviati né memorizzati.": "Secure demo: data is not sent or stored.", "Richiesta diretta": "Direct request", "Contatta artista": "Contact artist", "Invia dettagli. L’artista può accettare, rifiutare o proporre un nuovo prezzo.": "Send the details. The artist can accept, decline or propose a new price.", "Tipo evento": "Event type", "Matrimonio": "Wedding", "Locale / ristorante": "Venue / restaurant", "Evento aziendale": "Corporate event", "Festa privata": "Private party", "Budget": "Budget", "Messaggio": "Message", "Pagamento protetto: addebito solo dopo conferma.": "Protected payment: charged only after confirmation.", "Invia richiesta": "Send request", "Nuova opportunità": "New opportunity", "Pubblica un annuncio": "Publish a listing", "Ricevi candidature dagli artisti disponibili nella zona.": "Receive applications from artists available in the area.", "Titolo": "Title", "Budget massimo": "Maximum budget", "Descrizione": "Description", "Notifiche": "Notifications", "Segna lette": "Mark as read", "Nuova candidatura": "New application", "ha risposto al tuo annuncio.": "replied to your listing.", "Preventivo aggiornato": "Updated quote", "propone": "proposes", "Profilo verificato": "Verified profile", "Identità e contatti approvati.": "Identity and contacts approved.", "Torna su": "Back to top", "Consulente NovaVision": "NovaVision advisor", "Disponibile · risposta demo": "Available · demo response", "Per ogni necessità o informazione sul tuo evento hai a disposizione la consulenza NovaVision.": "NovaVision advice is available for every need or question about your event.", "Scelta artista": "Choosing an artist", "Impianto audio": "Sound system", "Lingua": "Language", "Automatico": "Automatic", "Italiano": "Italian", "Automatico usa la lingua del dispositivo": "Automatic uses your device language", "Cambia lingua": "Change language", "Navigazione principale": "Main navigation", "Menu principale": "Main menu", "Navigazione mobile": "Mobile navigation", "Apri menu": "Open menu", "Chiudi menu": "Close menu", "Torna all'inizio della pagina": "Back to the top of the page"};
const I18N_PLACEHOLDERS_EN = {"Milano, Monza, Roma…": "Milan, Monza, Rome…", "Milano": "Milan", "Cerca città o zona": "Search city or area", "Nome e cognome": "Full name", "Viola, voce, sax…": "Viola, vocals, sax…", "Diploma accademico, conservatorio…": "Academic diploma, conservatory…", "Percorso di studi, corsi, masterclass…": "Education, courses, masterclasses…", "Descrivi evento o necessità…": "Describe your event or need…", "Scrivi un messaggio…": "Write a message…", "Titolo dell’annuncio": "Listing title", "Descrivi la richiesta…": "Describe the request…"};

let currentInterfaceLanguage = "it";
let currentLanguagePreference = localStorage.getItem("novavision_language") || "auto";
let isApplyingTranslations = false;
let translationObserver = null;

function detectInterfaceLanguage() {
  const browserLanguage = (
    navigator.languages?.[0] ||
    navigator.language ||
    "it"
  ).toLowerCase();

  return browserLanguage.startsWith("it") ? "it" : "en";
}

function resolveInterfaceLanguage(preference = currentLanguagePreference) {
  return preference === "auto" ? detectInterfaceLanguage() : preference;
}

function interfaceLocale() {
  return currentInterfaceLanguage === "en" ? "en-GB" : "it-IT";
}

function translateDynamicItalian(source) {
  let result = source;

  const replacements = [
    [/^(\d+) artista trovato$/, "$1 artist found"],
    [/^(\d+) artisti trovati$/, "$1 artists found"],
    [/^(\d+) candidature$/, "$1 applications"],
    [/^(\d+) candidatura$/, "$1 application"],
    [/^(\d+) recensioni verificate$/, "$1 verified reviews"],
    [/^(\d+) recensione verificata$/, "$1 verified review"],
    [/^(\d+) artisti disponibili$/, "$1 artists available"],
    [/^Artisti disponibili a (.+)$/, "Artists available in $1"],
    [/^Artisti vicino a (.+)$/, "Artists near $1"],
    [/^Clienti e opportunità vicino a (.+)$/, "Clients and opportunities near $1"],
    [/^Piano artista (mensile|annuale)$/, (_, cycle) => `Artist plan ${cycle === "mensile" ? "monthly" : "yearly"}`],
    [/^Piano cliente (mensile|annuale)$/, (_, cycle) => `Client plan ${cycle === "mensile" ? "monthly" : "yearly"}`],
    [/^Premium artista (mensile|annuale)$/, (_, cycle) => `Artist Premium ${cycle === "mensile" ? "monthly" : "yearly"}`],
    [/^Premium cliente (mensile|annuale)$/, (_, cycle) => `Client Premium ${cycle === "mensile" ? "monthly" : "yearly"}`],
    [/^Risparmi (€[^ ]+)$/, "Save $1"],
    [/^Zona impostata dalla città$/i, "Area set from the city"],
    [/^posizione rilevata$/i, "location detected"],
    [/^precisione circa (.+)$/i, "accuracy about $1"],
    [/^Posizione rilevata: (.+)\. Mostreremo risultati entro (\d+) km\.$/, "Location detected: $1. We will show results within $2 km."],
    [/^Risultati ordinati per distanza entro (\d+) km · (.+)\.$/, "Results sorted by distance within $1 km · $2."],
    [/^Annunci ordinati per distanza entro (\d+) km · (.+)\.$/, "Listings sorted by distance within $1 km · $2."],
    [/^(\d+(?:[.,]\d+)?) km dalla tua posizione$/, "$1 km from your location"],
    [/^€(\d+) all’anno$/, "€$1 per year"],
    [/^€(\d+) al mese$/, "€$1 per month"],
    [/^rinnovo (.+)$/i, "renewal $1"],
    [/^Accesso demo con (Google|Apple)$/, "Demo sign-in with $1"],
    [/^Annuncio aperto: (.+)$/, "Listing opened: $1"],
    [/^Candidatura inviata per “(.+)”\. Nessuna trattenuta sul compenso\.$/, "Application sent for “$1”. No commission on your fee."],
    [/^Richiesta inviata a (.+)$/, "Request sent to $1"],
    [/^Profilo di (.+) aperto$/, "$1's profile opened"],
    [/^Passaggio al piano (mensile|annuale)\.$/, (_, cycle) => `Switching to the ${cycle === "mensile" ? "monthly" : "yearly"} plan.`]
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  return result;
}

function translateInterfaceText(source, language = currentInterfaceLanguage) {
  if (!source || language === "it") return source;
  const normalized = String(source).trim();
  return I18N_EN[normalized] || translateDynamicItalian(normalized);
}

function translateAttributeValue(source, language = currentInterfaceLanguage) {
  if (!source || language === "it") return source;
  const normalized = String(source).trim();
  return I18N_PLACEHOLDERS_EN[normalized] || I18N_EN[normalized] || translateDynamicItalian(normalized);
}

function translateTextNode(node) {
  if (!node || !node.nodeValue || !node.parentElement) return;
  if (node.parentElement.closest("script, style, svg, [data-no-translate]")) return;

  const raw = node.nodeValue;
  const trimmed = raw.trim();
  if (!trimmed) return;

  if (typeof node.__novavisionOriginalText === "undefined") {
    node.__novavisionOriginalText = trimmed;
  }

  const leading = raw.match(/^\s*/)?.[0] || "";
  const trailing = raw.match(/\s*$/)?.[0] || "";
  const translated = translateInterfaceText(node.__novavisionOriginalText);
  const nextValue = `${leading}${translated}${trailing}`;

  if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
}

function translateElementAttributes(element) {
  if (!(element instanceof Element)) return;
  if (element.closest("script, style, svg, [data-no-translate]")) return;

  ["placeholder", "title", "aria-label"].forEach(attribute => {
    if (!element.hasAttribute(attribute)) return;

    const property = `novavisionOriginal${attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()).replace(/^./, character => character.toUpperCase())}`;
    if (typeof element.dataset[property] === "undefined") {
      element.dataset[property] = element.getAttribute(attribute);
    }

    const original = element.dataset[property];
    element.setAttribute(attribute, translateAttributeValue(original));
  });
}

function translateTree(root = document.body) {
  if (!root) return;
  isApplyingTranslations = true;

  translateElementAttributes(root);

  const elementWalker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT
  );
  let currentElement;
  while ((currentElement = elementWalker.nextNode())) {
    translateElementAttributes(currentElement);
  }

  const textWalker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT
  );
  let currentText;
  while ((currentText = textWalker.nextNode())) {
    translateTextNode(currentText);
  }

  document.documentElement.lang = currentInterfaceLanguage;
  document.title = currentInterfaceLanguage === "en"
    ? "NovaVision — Artists and clients, without intermediaries"
    : "NovaVision — Artisti e clienti, senza intermediari";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = currentInterfaceLanguage === "en"
      ? "NovaVision directly connects artists and clients for events, venues, hotels and companies."
      : "NovaVision connette direttamente artisti e clienti per eventi, locali, hotel e aziende.";
  }

  isApplyingTranslations = false;
}

function refreshLocalizedViews() {
  if (typeof renderFeatured === "function") renderFeatured();
  if (typeof renderArtists === "function") renderArtists();
  if (state.currentRoute === "jobs" && isRegistered() && typeof renderJobs === "function") renderJobs();
  if (state.currentRoute === "messages" && typeof renderConversations === "function") renderConversations();
  if (state.currentRoute === "dashboard" && typeof renderDashboard === "function") renderDashboard();
  if (typeof updateLocationBanners === "function") updateLocationBanners();

  requestAnimationFrame(() => translateTree(document.body));
}

function updateLanguageSelectors() {
  $$("[data-language-select]").forEach(select => {
    select.value = currentLanguagePreference;
  });
}

function setInterfaceLanguage(preference, { persist = true, refresh = true } = {}) {
  currentLanguagePreference = preference;
  currentInterfaceLanguage = resolveInterfaceLanguage(preference);

  if (persist) localStorage.setItem("novavision_language", preference);
  updateLanguageSelectors();

  if (refresh) refreshLocalizedViews();
  else translateTree(document.body);
}

function initializeLanguageSystem() {
  currentInterfaceLanguage = resolveInterfaceLanguage(currentLanguagePreference);
  updateLanguageSelectors();
  translateTree(document.body);

  $$("[data-language-select]").forEach(select => {
    select.addEventListener("change", event => {
      setInterfaceLanguage(event.target.value);
      showToast(
        currentInterfaceLanguage === "en"
          ? "Language updated"
          : "Lingua aggiornata"
      );
    });
  });

  translationObserver = new MutationObserver(mutations => {
    if (isApplyingTranslations) return;

    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
        });
      }

      if (mutation.type === "characterData") {
        const node = mutation.target;
        if (!isApplyingTranslations) {
          node.__novavisionOriginalText = node.nodeValue.trim();
          translateTextNode(node);
        }
      }
    });
  });

  translationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}


const SUBSCRIPTION_PLANS = {
  artist: {
    label: "Artista",
    monthly: { amount: 2, period: "mese", renewal: "Rinnovo mensile" },
    annual: { amount: 19, period: "anno", renewal: "Rinnovo annuale", saving: 5 }
  },
  client: {
    label: "Cliente",
    monthly: { amount: 3, period: "mese", renewal: "Rinnovo mensile" },
    annual: { amount: 29, period: "anno", renewal: "Rinnovo annuale", saving: 7 }
  }
};

const FREE_PLAN = {
  label: "Free account",
  amount: 0,
  status: "active",
  cycle: "free"
};

const CITY_COORDINATES = {
  "Milano": [45.4642, 9.1900],
  "Monza": [45.5845, 9.2744],
  "Sesto San Giovanni": [45.5345, 9.2307],
  "Rho": [45.5286, 9.0402],
  "Bergamo": [45.6983, 9.6773],
  "Roma": [41.9028, 12.4964],
  "Pavia": [45.1847, 9.1582],
  "Lodi": [45.3144, 9.5037],
  "Lecco": [45.8566, 9.3977],
  "Brescia": [45.5416, 10.2118],
  "Legnano": [45.5979, 8.9151]
};

const MATCH_RADIUS_KM = 80;


const artists = [
  {
    id: 1, name: "Laura Milesi", initials: "LM", category: "Cantante", city: "Milano",
    zones: ["Milano", "Monza", "Brianza"], price: 420, rating: 4.9, reviews: 38,
    verified: true, available: true, cover: 1, tags: ["Jazz", "Soul", "Pop"],
    bio: "Cantante professionista con repertorio jazz, soul e pop. Formazioni dal duo al quartetto, soluzione ideale per hotel, ristoranti, matrimoni ed eventi aziendali.",
    experience: "12 anni di esperienza · oltre 350 eventi", distance: 2.4, position: [48, 52]
  },
  {
    id: 2, name: "Niko Bianchi", initials: "NB", category: "DJ", city: "Milano",
    zones: ["Milano", "Rho", "Sesto San Giovanni"], price: 550, rating: 4.8, reviews: 27,
    verified: true, available: true, cover: 2, tags: ["House", "Disco", "Corporate"],
    bio: "DJ e producer per club, matrimoni ed eventi corporate. Impianto audio e luci disponibile su richiesta.",
    experience: "9 anni di esperienza · resident DJ", distance: 5.1, position: [37, 43]
  },
  {
    id: 3, name: "The Velvet Trio", initials: "VT", category: "Band", city: "Monza",
    zones: ["Monza", "Milano", "Lecco"], price: 850, rating: 5.0, reviews: 19,
    verified: true, available: true, cover: 3, tags: ["Swing", "Lounge", "Wedding"],
    bio: "Trio elegante voce, piano e contrabbasso. Repertorio internazionale per ricevimenti, hotel ed eventi di prestigio.",
    experience: "7 anni insieme · 180 eventi", distance: 14.3, position: [78, 24]
  },
  {
    id: 4, name: "Marco De Santis", initials: "MD", category: "Musicista", city: "Milano",
    zones: ["Milano", "Pavia", "Lodi"], price: 280, rating: 4.7, reviews: 44,
    verified: true, available: true, cover: 4, tags: ["Sax", "Aperitivo", "Live set"],
    bio: "Sassofonista versatile per aperitivi, cerimonie, club e live set con DJ. Amplificazione compatta inclusa.",
    experience: "15 anni di attività live", distance: 3.8, position: [55, 60]
  },
  {
    id: 5, name: "Giulia Ferri", initials: "GF", category: "Tecnico audio", city: "Sesto San Giovanni",
    zones: ["Milano", "Monza", "Bergamo"], price: 330, rating: 4.9, reviews: 31,
    verified: true, available: true, cover: 5, tags: ["FOH", "Monitor", "Recording"],
    bio: "Tecnico audio FOH e monitor per concerti, convention e produzioni. Disponibile con regia digitale e microfonazione.",
    experience: "10 anni · tournée nazionali", distance: 7.6, position: [62, 38]
  },
  {
    id: 6, name: "Andrea Riva", initials: "AR", category: "Musicista", city: "Rho",
    zones: ["Rho", "Milano", "Legnano"], price: 240, rating: 4.6, reviews: 16,
    verified: false, available: false, cover: 6, tags: ["Chitarra", "Acustico", "Pop"],
    bio: "Chitarrista e cantante per locali e feste private. Repertorio pop italiano e internazionale.",
    experience: "6 anni di esperienza", distance: 12.1, position: [18, 36]
  },
  {
    id: 7, name: "Maya Rose", initials: "MR", category: "Cantante", city: "Roma",
    zones: ["Roma", "Castelli Romani"], price: 380, rating: 4.8, reviews: 22,
    verified: true, available: true, cover: 1, tags: ["Soul", "R&B", "Cerimonia"],
    bio: "Voce soul e R&B, disponibile in solo, duo o band completa.",
    experience: "8 anni di esperienza", distance: 480, position: [50, 75]
  },
  {
    id: 8, name: "Elektro Lab", initials: "EL", category: "DJ", city: "Bergamo",
    zones: ["Bergamo", "Milano", "Brescia"], price: 620, rating: 4.7, reviews: 29,
    verified: true, available: true, cover: 2, tags: ["Tech house", "Open format", "Festival"],
    bio: "DJ set energico e produzione completa per eventi pubblici e privati.",
    experience: "11 anni di esperienza", distance: 48, position: [87, 42]
  }
];

const ARTIST_COORDINATE_OFFSETS = [
  [0.004, 0.003], [-0.006, 0.010], [0.003, -0.005], [-0.008, -0.003],
  [0.002, 0.006], [-0.004, 0.004], [0.006, -0.006], [-0.004, 0.008]
];

artists.forEach((artist, index) => {
  const base = CITY_COORDINATES[artist.city] || CITY_COORDINATES["Milano"];
  const offset = ARTIST_COORDINATE_OFFSETS[index] || [0, 0];
  artist.lat = base[0] + offset[0];
  artist.lng = base[1] + offset[1];
});

let jobs = JSON.parse(localStorage.getItem("novavision_jobs") || "null") || [
  { id: 1, title: "Jazz trio per cena aziendale", company: "Terrazza Duomo", city: "Milano", date: "2026-07-12", category: "Band", budget: 900, description: "Cena aziendale, 120 ospiti. Repertorio jazz elegante, set 20:00–23:00.", applicants: 8, logo: "TD" },
  { id: 2, title: "DJ per matrimonio", company: "Villa Reale Events", city: "Monza", date: "2026-08-02", category: "DJ", budget: 750, description: "Ricevimento serale con circa 100 invitati. Richiesto impianto audio e luci.", applicants: 12, logo: "VR" },
  { id: 3, title: "Sassofonista per aperitivo", company: "Hotel Navigli", city: "Milano", date: "2026-07-18", category: "Musicista", budget: 350, description: "Live set di 90 minuti con basi. Ambiente elegante e pubblico internazionale.", applicants: 5, logo: "HN" },
  { id: 4, title: "Tecnico audio per convention", company: "Nova Company", city: "Roma", date: "2026-09-05", category: "Tecnico audio", budget: 600, description: "Gestione audio conferenza, radiomicrofoni e contributi video.", applicants: 4, logo: "NC" },
  { id: 5, title: "Band pop per festa privata", company: "Cliente verificato", city: "Milano", date: "2026-07-25", category: "Band", budget: 1100, description: "Festa 40 anni. Due set da 60 minuti, repertorio dance e pop.", applicants: 9, logo: "CV" },
  { id: 6, title: "Cantante per brunch domenicale", company: "Casa Bistrot", city: "Roma", date: "2026-07-19", category: "Cantante", budget: 300, description: "Atmosfera soft, repertorio soul e acoustic pop.", applicants: 6, logo: "CB" }
];

const JOB_METADATA = {
  1: { genre: "Jazz", instrument: "Pianoforte" },
  2: { genre: "Dance", instrument: "Console DJ" },
  3: { genre: "Lounge", instrument: "Sassofono" },
  4: { genre: "Corporate", instrument: "Tecnico audio" },
  5: { genre: "Pop", instrument: "Band" },
  6: { genre: "Soul", instrument: "Voce" }
};

jobs = jobs.map(job => ({
  ...job,
  genre: job.genre || JOB_METADATA[job.id]?.genre || "Pop",
  instrument: job.instrument || JOB_METADATA[job.id]?.instrument || job.category
}));

let state = {
  currentRoute: "home",
  currentRole: "artist",
  authMode: "register",
  selectedBilling: "monthly",
  selectedTier: "free",
  pendingUser: null,
  postAuthRoute: null,
  profilePhotoData: null,
  advisorMessages: JSON.parse(localStorage.getItem("novavision_advisor_messages") || "null") || [
    {
      mine: false,
      text: "Ciao, sono il consulente evento NovaVision. Raccontami tipo di evento, città, data, numero di ospiti e budget: ti aiuto a definire artista, repertorio, impianto e tempi.",
      time: "Ora"
    }
  ],
  location: JSON.parse(localStorage.getItem("novavision_location") || "null"),
  useNearbyArtists: false,
  useNearbyJobs: false,
  currentUser: JSON.parse(localStorage.getItem("novavision_user") || "null"),
  favorites: JSON.parse(localStorage.getItem("novavision_favorites") || "[]"),
  requests: JSON.parse(localStorage.getItem("novavision_requests") || "[]"),
  conversations: JSON.parse(localStorage.getItem("novavision_conversations") || "null") || [
    {
      id: 1, artistId: 1, name: "Laura Milesi", initials: "LM", last: "Perfetto, posso mandarti un preventivo.", time: "14:32",
      messages: [
        { mine: false, text: "Ciao! Ho visto la tua richiesta per il 12 luglio.", time: "14:26" },
        { mine: true, text: "Ciao Laura, cerchiamo una voce jazz per una cena aziendale a Milano.", time: "14:29" },
        { mine: false, text: "Perfetto, posso mandarti un preventivo. Hai già pianoforte e impianto?", time: "14:32" }
      ]
    },
    {
      id: 2, artistId: 2, name: "Niko Bianchi", initials: "NB", last: "Impianto incluso fino a 120 persone.", time: "Ieri",
      messages: [
        { mine: true, text: "Lavori anche a Monza?", time: "18:03" },
        { mine: false, text: "Sì. Impianto incluso fino a 120 persone.", time: "18:10" }
      ]
    },
    {
      id: 3, artistId: 5, name: "Giulia Ferri", initials: "GF", last: "Ti invio la scheda tecnica.", time: "Lun",
      messages: [
        { mine: false, text: "Ti invio la scheda tecnica entro stasera.", time: "11:12" }
      ]
    }
  ]
};

function saveState() {
  localStorage.setItem("novavision_favorites", JSON.stringify(state.favorites));
  localStorage.setItem("novavision_requests", JSON.stringify(state.requests));
  localStorage.setItem("novavision_conversations", JSON.stringify(state.conversations));
  localStorage.setItem("novavision_advisor_messages", JSON.stringify(state.advisorMessages));
  if (state.location) {
    localStorage.setItem("novavision_location", JSON.stringify(state.location));
  } else {
    localStorage.removeItem("novavision_location");
  }
  if (state.currentUser) {
    localStorage.setItem("novavision_user", JSON.stringify(state.currentUser));
  } else {
    localStorage.removeItem("novavision_user");
  }
}


function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function isRegistered() {
  return Boolean(state.currentUser);
}

function createFreeSubscription(role) {
  return {
    role,
    tier: "free",
    cycle: "free",
    amount: 0,
    status: "active",
    startedAt: new Date().toISOString(),
    renewsAt: null
  };
}

function openJobGate() {
  state.postAuthRoute = "jobs";
  openModal("jobGateModal");
}

function finishFreeRegistration(pendingUser) {
  state.currentUser = {
    ...pendingUser,
    subscription: createFreeSubscription(pendingUser.role),
    location: state.location
  };
  state.currentRole = pendingUser.role;
  state.pendingUser = null;

  localStorage.setItem("novavision_registered_account", JSON.stringify(state.currentUser));
  saveState();
  updateAuthUI();
  renderSubscriptionSummary();
  setDashboardRole(state.currentUser.role);
  closeModal("authModal");
  closeModal("jobGateModal");

  const destination = state.postAuthRoute || "dashboard";
  state.postAuthRoute = null;
  routeTo(destination);
  showToast("Account Free creato. Accesso agli annunci attivo.");
}

function getRegisteredAccount() {
  return JSON.parse(localStorage.getItem("novavision_registered_account") || "null");
}

function renderAdvisorMessages() {
  const root = $("#advisorMessages");
  if (!root) return;

  root.innerHTML = state.advisorMessages.map(message => `
    <div class="advisor-message ${message.mine ? "mine" : ""}">
      <div class="advisor-bubble">
        ${escapeHtml(message.text)}
        <small>${escapeHtml(message.time)}</small>
      </div>
    </div>
  `).join("");

  root.scrollTop = root.scrollHeight;
}

function advisorResponse(question) {
  const text = question.toLowerCase();

  if (text.includes("budget") || text.includes("costo") || text.includes("prezzo")) {
    return "Per stimare il budget servono durata, formazione, città, trasferta e impianto. Come riferimento: solista o DJ partono spesso da una fascia inferiore rispetto a trio e band. Inserisci questi dati e confronteremo profili e preventivi senza trattenute sul compenso.";
  }
  if (text.includes("impianto") || text.includes("audio") || text.includes("microfon")) {
    return "Verifica numero ospiti, ambiente interno o esterno, prese elettriche, limiti acustici, mixer, diffusori, monitor e microfoni. Chiedi sempre una scheda tecnica all’artista o al tecnico audio prima della conferma.";
  }
  if (text.includes("matrimonio") || text.includes("cerimonia")) {
    return "Per un matrimonio conviene dividere musica per momenti: cerimonia, aperitivo, cena e festa. Puoi scegliere formazioni diverse oppure un artista versatile. Indica orari, spazi e repertorio desiderato.";
  }
  if (text.includes("artista") || text.includes("musicista") || text.includes("dj") || text.includes("band")) {
    return "La scelta dipende da atmosfera, pubblico, spazio e budget. Usa filtri per luogo, data, genere, strumento e compenso; poi confronta esperienza, repertorio, video e disponibilità.";
  }
  if (text.includes("scaletta") || text.includes("repertorio") || text.includes("genere")) {
    return "Definisci 3 elementi: brani indispensabili, generi da evitare e momenti principali dell’evento. Lascia poi all’artista margine per adattare la scaletta al pubblico.";
  }
  return "Posso aiutarti su scelta artista, budget, programma, repertorio, impianto, logistica e tempistiche. Scrivimi città, data, tipo di evento, ospiti e budget indicativo.";
}

function sendAdvisorMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  const time = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  state.advisorMessages.push({ mine: true, text: cleanText, time });
  saveState();
  renderAdvisorMessages();

  setTimeout(() => {
    state.advisorMessages.push({
      mine: false,
      text: advisorResponse(cleanText),
      time: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
    });
    saveState();
    renderAdvisorMessages();
  }, 550);
}

function toggleAdvisor(forceOpen = null) {
  const chat = $("#advisorChat");
  const shouldOpen = forceOpen === null ? chat.classList.contains("hidden") : forceOpen;
  chat.classList.toggle("hidden", !shouldOpen);
  if (shouldOpen) {
    renderAdvisorMessages();
    setTimeout(() => $("#advisorInput")?.focus(), 100);
  }
}

function getPlan(role = state.currentRole, cycle = state.selectedBilling) {
  return SUBSCRIPTION_PLANS[role][cycle];
}

function formatSubscriptionAmount(amount) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function setBillingCycle(cycle, source = "all") {
  state.selectedBilling = cycle;

  if (source !== "auth") {
    $$("[data-pricing-cycle]").forEach(button => {
      button.classList.toggle("active", button.dataset.pricingCycle === cycle);
    });
  }

  if (source !== "pricing") {
    $$("[data-auth-cycle]").forEach(button => {
      button.classList.toggle("active", button.dataset.authCycle === cycle);
    });
  }

  updatePricingUI();
  updateAuthPlanUI();
}

function updatePricingUI() {
  const artistPlan = getPlan("artist");
  const clientPlan = getPlan("client");
  const annual = state.selectedBilling === "annual";

  $("#artistPlanPrice").textContent = formatSubscriptionAmount(artistPlan.amount);
  $("#artistPlanPeriod").textContent = annual ? "/anno" : "/mese";
  $("#clientPlanPrice").textContent = formatSubscriptionAmount(clientPlan.amount);
  $("#clientPlanPeriod").textContent = annual ? "/anno" : "/mese";
  $("#artistAnnualSaving").classList.toggle("hidden", !annual);
  $("#clientAnnualSaving").classList.toggle("hidden", !annual);
}

function updateAuthPlanUI() {
  const isFree = state.selectedTier === "free";
  const plan = isFree ? FREE_PLAN : getPlan();
  const annual = state.selectedBilling === "annual";

  $$("[data-auth-tier]").forEach(button => {
    button.classList.toggle("active", button.dataset.authTier === state.selectedTier);
  });

  $("#authPlanName").textContent = isFree
    ? "Free account"
    : `Premium ${SUBSCRIPTION_PLANS[state.currentRole].label.toLowerCase()}`;
  $("#authPlanPrice").textContent = formatSubscriptionAmount(plan.amount);
  $("#authPlanPeriod").textContent = isFree ? "nessun pagamento" : (annual ? "all’anno" : "al mese");
  $("#authPlanSaving").textContent = !isFree && annual ? `Risparmi ${formatSubscriptionAmount(plan.saving)}` : "";

  $$(".billing-toggle.compact").forEach(toggle => toggle.classList.toggle("hidden", isFree));
  $("#authForm button[type=submit]").textContent =
    state.authMode === "login"
      ? "Accedi"
      : isFree
        ? "Crea account Free"
        : "Continua al pagamento";
}

function setAuthTier(tier) {
  state.selectedTier = tier === "premium" ? "premium" : "free";
  if (state.selectedTier === "free") state.selectedBilling = "monthly";
  updateAuthPlanUI();
}

function startPlanRegistration(role, cycle = state.selectedBilling, tier = "premium") {
  try {
    state.selectedTier = tier;
    setAuthMode("register");
    setRole(role);
    setBillingCycle(cycle);
    updateAuthPlanUI();
  } catch (error) {
    console.warn("Registrazione aperta con UI piano semplificata.", error);
  } finally {
    openModal("authModal");
  }
}

function startFreeRegistration(role = "artist") {
  state.selectedTier = "free";
  startPlanRegistration(role, "monthly", "free");
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCity(latitude, longitude) {
  return Object.entries(CITY_COORDINATES)
    .map(([city, coords]) => ({
      city,
      distance: distanceKm(latitude, longitude, coords[0], coords[1])
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

function syncArtistDistances() {
  if (!state.location) return;

  artists.forEach(artist => {
    artist.distance = Number(
      distanceKm(state.location.latitude, state.location.longitude, artist.lat, artist.lng).toFixed(1)
    );
  });
}

function setLocationStatus(message, status = "") {
  const statusElement = $("#locationStatus");
  const box = $(".location-request-box");

  if (statusElement) statusElement.textContent = message;
  if (box) {
    box.classList.remove("success", "error");
    if (status) box.classList.add(status);
  }
}

function requestCurrentLocation({ routeAfter = false } = {}) {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocalizzazione non supportata. Useremo la città inserita.", "error");
      resolve(null);
      return;
    }

    setLocationStatus("Richiesta posizione in corso…");
    const button = $("#useLocationButton");
    if (button) button.disabled = true;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude, accuracy } = position.coords;
        const nearest = findNearestCity(latitude, longitude);

        state.location = {
          latitude,
          longitude,
          accuracy: Math.round(accuracy || 0),
          city: nearest.city,
          detectedAt: new Date().toISOString()
        };

        state.useNearbyArtists = true;
        state.useNearbyJobs = true;
        syncArtistDistances();

        if ($("#authCity")) $("#authCity").value = nearest.city;
        if (state.currentUser) {
          state.currentUser.city = nearest.city;
          state.currentUser.location = state.location;
        }

        saveState();
        setLocationStatus(`Posizione rilevata: ${nearest.city}. Mostreremo risultati entro ${MATCH_RADIUS_KM} km.`, "success");
        updateLocationBanners();
        renderArtists();
        renderJobs();

        if (routeAfter && state.currentUser) {
          routeTo(state.currentUser.role === "client" ? "discover" : "jobs");
        }

        if (button) button.disabled = false;
        resolve(state.location);
      },
      error => {
        const messages = {
          1: "Permesso posizione negato. Useremo la città inserita.",
          2: "Posizione non disponibile. Useremo la città inserita.",
          3: "Tempo scaduto. Useremo la città inserita."
        };
        setLocationStatus(messages[error.code] || "Impossibile rilevare la posizione.", "error");
        if (button) button.disabled = false;
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  });
}

function applyCityFallback(city) {
  const coords = CITY_COORDINATES[city] || CITY_COORDINATES["Milano"];
  state.location = {
    latitude: coords[0],
    longitude: coords[1],
    accuracy: null,
    city: CITY_COORDINATES[city] ? city : "Milano",
    fallback: true,
    detectedAt: new Date().toISOString()
  };
  state.useNearbyArtists = true;
  state.useNearbyJobs = true;
  syncArtistDistances();
  saveState();
  return state.location;
}

function updateLocationBanners() {
  const location = state.location;
  const artistBanner = $("#artistLocationBanner");
  const clientBanner = $("#clientLocationBanner");

  if (!location) {
    artistBanner?.classList.add("hidden");
    clientBanner?.classList.add("hidden");
    return;
  }

  const suffix = location.fallback
    ? "zona impostata dalla città"
    : `posizione rilevata${location.accuracy ? ` · precisione circa ${location.accuracy} m` : ""}`;

  if (artistBanner) {
    artistBanner.classList.remove("hidden");
    $("#artistLocationTitle").textContent = `Artisti vicino a ${location.city}`;
    $("#artistLocationText").textContent = `Risultati ordinati per distanza entro ${MATCH_RADIUS_KM} km · ${suffix}.`;
  }

  if (clientBanner) {
    clientBanner.classList.remove("hidden");
    $("#clientLocationTitle").textContent = `Clienti e opportunità vicino a ${location.city}`;
    $("#clientLocationText").textContent = `Annunci ordinati per distanza entro ${MATCH_RADIUS_KM} km · ${suffix}.`;
  }
}

function buildSubscription(role, cycle) {
  const plan = SUBSCRIPTION_PLANS[role][cycle];
  const startedAt = new Date();
  const renewsAt = new Date(startedAt);

  if (cycle === "annual") {
    renewsAt.setFullYear(renewsAt.getFullYear() + 1);
  } else {
    renewsAt.setMonth(renewsAt.getMonth() + 1);
  }

  return {
    role,
    tier: "premium",
    cycle,
    amount: plan.amount,
    status: "active",
    startedAt: startedAt.toISOString(),
    renewsAt: renewsAt.toISOString()
  };
}

function updateCheckoutSummary() {
  const role = state.pendingUser?.role || state.currentRole;
  const cycle = state.pendingUser?.billing || state.selectedBilling;
  const plan = SUBSCRIPTION_PLANS[role][cycle];

  $("#checkoutPlanLabel").textContent = `Piano ${SUBSCRIPTION_PLANS[role].label.toLowerCase()} · ${cycle === "annual" ? "annuale" : "mensile"}`;
  $("#checkoutPlanPrice").textContent = formatSubscriptionAmount(plan.amount);
  $("#checkoutRenewalText").textContent = plan.renewal;
  $("#cardholderName").value = state.pendingUser?.name || state.currentUser?.name || "";
}

function openCheckout(pendingUser) {
  state.pendingUser = pendingUser;
  updateCheckoutSummary();
  closeModal("authModal");
  openModal("paymentModal");
}

function renderSubscriptionSummary() {
  const summary = $("#subscriptionSummary");
  const subscription = state.currentUser?.subscription;

  if (!state.currentUser || !subscription) {
    summary?.classList.add("hidden");
    return;
  }

  summary.classList.remove("hidden");

  if (subscription.tier === "free" || subscription.cycle === "free") {
    $("#subscriptionSummaryTitle").textContent = "Free account";
    $("#subscriptionSummaryMeta").textContent = "€0 · accesso annunci · nessuna commissione sul compenso";
    $(".subscription-status").textContent = "Free";
    $("#manageSubscriptionButton").textContent = "Passa a Premium";
    return;
  }

  const roleLabel = SUBSCRIPTION_PLANS[subscription.role].label.toLowerCase();
  const cycleLabel = subscription.cycle === "annual" ? "annuale" : "mensile";
  const renewalDate = new Intl.DateTimeFormat(interfaceLocale(), {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(subscription.renewsAt));

  $("#subscriptionSummaryTitle").textContent = `Premium ${roleLabel} ${cycleLabel}`;
  $("#subscriptionSummaryMeta").textContent =
    `${formatSubscriptionAmount(subscription.amount)} ${subscription.cycle === "annual" ? "all’anno" : "al mese"} · rinnovo ${renewalDate}`;
  $(".subscription-status").textContent = "Attivo";
  $("#manageSubscriptionButton").textContent = "Cambia piano";
}

function finishSubscriptionActivation() {
  if (!state.pendingUser) return;

  const pending = state.pendingUser;
  const previousUser = state.currentUser;
  const isPlanChange = Boolean(previousUser && pending.email === previousUser.email);

  state.currentUser = {
    ...(isPlanChange ? previousUser : {}),
    ...pending,
    subscription: buildSubscription(pending.role, pending.billing),
    location: state.location
  };
  state.currentRole = pending.role;
  state.pendingUser = null;

  localStorage.setItem("novavision_registered_account", JSON.stringify(state.currentUser));
  saveState();
  updateAuthUI();
  renderSubscriptionSummary();
  setDashboardRole(state.currentUser.role);
  closeModal("paymentModal");
  $("#paymentForm").reset();

  if (isPlanChange) {
    routeTo("dashboard");
    showToast("Piano aggiornato correttamente.");
    return;
  }

  if (state.currentUser.role === "client") {
    state.useNearbyArtists = true;
    routeTo("discover");
    showToast("Abbonamento attivato. Ecco gli artisti nella tua zona.");
  } else {
    state.useNearbyJobs = true;
    routeTo("jobs");
    showToast("Abbonamento attivato. Ecco clienti e opportunità nella tua zona.");
  }

  updateLocationBanners();
}

function formatCurrency(value) {
  return new Intl.NumberFormat(interfaceLocale(), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(date) {
  if (!date) return currentInterfaceLanguage === "en" ? "Date to be defined" : "Data da definire";
  return new Intl.DateTimeFormat(interfaceLocale(), {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T12:00:00`));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = translateInterfaceText(message);
  toast.classList.remove("hidden");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.add("hidden"), 2600);
}

function openModal(id) {
  $(`#${id}`).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  $(`#${id}`).classList.add("hidden");
  document.body.style.overflow = "";
}

function openMobileMenu() {
  const drawer = $("#mobileDrawer");
  const backdrop = $("#mobileDrawerBackdrop");
  const button = $("#mobileMenuButton");

  drawer.classList.add("open");
  backdrop.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");

  setTimeout(() => $("#mobileDrawerClose")?.focus(), 80);
}

function closeMobileMenu() {
  const drawer = $("#mobileDrawer");
  const backdrop = $("#mobileDrawerBackdrop");
  const button = $("#mobileMenuButton");

  drawer?.classList.remove("open");
  backdrop?.classList.remove("open");
  drawer?.setAttribute("aria-hidden", "true");
  backdrop?.setAttribute("aria-hidden", "true");
  button?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  if ($("#mobileDrawer").classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function routeTo(route) {
  closeMobileMenu();

  if (route === "jobs" && !isRegistered()) {
    openJobGate();
    return;
  }

  state.currentRoute = route;
  $$(".page").forEach(page => page.classList.toggle("active", page.id === `page-${route}`));
  $$("[data-route]").forEach(btn => btn.classList.toggle("active", btn.dataset.route === route));
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (route === "discover") renderArtists();
  if (route === "jobs") renderJobs();
  if (route === "messages") renderConversations();
  if (route === "dashboard") renderDashboard();
}

function artistCard(artist) {
  const fav = state.favorites.includes(artist.id);
  return `
    <article class="artist-card">
      <div class="artist-cover cover-${artist.cover}">
        <div class="cover-initials">${artist.initials}</div>
        <button class="favorite-btn ${fav ? "active" : ""}" data-favorite="${artist.id}" aria-label="Salva preferito">${fav ? "♥" : "♡"}</button>
        ${artist.verified ? '<span class="verified-badge">Profilo verificato</span>' : ""}
      </div>
      <div class="artist-body">
        <div class="artist-title-row">
          <h3>${artist.name}</h3>
          <span class="rating">${icon("star")} ${artist.rating}</span>
        </div>
        <div class="artist-meta">${artist.category} · ${artist.city} · ${artist.distance} km</div>
        <div class="tag-row">${artist.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="card-footer">
          <div class="price"><strong>da ${formatCurrency(artist.price)}</strong><span>compenso indicativo</span></div>
          <span class="availability">${artist.available ? "Disponibile" : "Non disponibile"}</span>
        </div>
        <button class="btn btn-secondary btn-block" data-view-artist="${artist.id}">Apri profilo</button>
      </div>
    </article>`;
}

function bindArtistCardActions(root = document) {
  $$("[data-view-artist]", root).forEach(btn => btn.onclick = () => showArtistProfile(Number(btn.dataset.viewArtist)));
  $$("[data-favorite]", root).forEach(btn => btn.onclick = event => {
    event.stopPropagation();
    toggleFavorite(Number(btn.dataset.favorite));
  });
}

function renderFeatured() {
  $("#featuredArtists").innerHTML = artists.slice(0, 4).map(artistCard).join("");
  bindArtistCardActions($("#featuredArtists"));
}

function getFilteredArtists() {
  const city = $("#filterCity")?.value.trim().toLowerCase() || "";
  const category = $("#filterCategory")?.value || "";
  const maxPrice = Number($("#filterPrice")?.value || 1500);
  const verifiedOnly = $("#filterVerified")?.checked || false;
  const availableOnly = $("#filterAvailable")?.checked || false;
  const sort = $("#sortArtists")?.value || "recommended";
  const nearbyMode = Boolean(state.location && state.useNearbyArtists && !city);

  let result = artists.filter(artist => {
    const cityMatch =
      !city ||
      artist.city.toLowerCase().includes(city) ||
      artist.zones.some(zone => zone.toLowerCase().includes(city));
    const categoryMatch = !category || artist.category === category;
    const priceMatch = artist.price <= maxPrice;
    const verifiedMatch = !verifiedOnly || artist.verified;
    const availableMatch = !availableOnly || artist.available;
    const distanceMatch = !nearbyMode || artist.distance <= MATCH_RADIUS_KM;

    return cityMatch && categoryMatch && priceMatch && verifiedMatch && availableMatch && distanceMatch;
  });

  result.sort((a, b) => {
    if (nearbyMode) return a.distance - b.distance;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    return (b.verified - a.verified) || (b.rating - a.rating);
  });

  return result;
}

function renderArtists() {
  const result = getFilteredArtists();
  $("#priceValue").textContent = formatCurrency(Number($("#filterPrice").value));
  const locationSuffix = state.location && state.useNearbyArtists && !$("#filterCity").value.trim()
    ? ` entro ${MATCH_RADIUS_KM} km`
    : "";
  $("#resultsCount").textContent = `${result.length} ${result.length === 1 ? "artista trovato" : "artisti trovati"}${locationSuffix}`;
  $("#artistResults").innerHTML = result.length ? result.map(artistCard).join("") : `<div class="empty-state">Nessun artista corrisponde ai filtri.</div>`;
  $("#mapMarkers").innerHTML = result.map(a => `<button class="map-marker" style="left:${a.position[0]}%;top:${a.position[1]}%" data-view-artist="${a.id}" title="${a.name}"><span>${a.initials}</span></button>`).join("");
  bindArtistCardActions($("#artistResults"));
  bindArtistCardActions($("#mapMarkers"));
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
  saveState();
  renderFeatured();
  renderArtists();
  renderDashboard();
  showToast(state.favorites.includes(id) ? "Artista aggiunto ai preferiti" : "Artista rimosso dai preferiti");
}

function showArtistProfile(id) {
  const artist = artists.find(a => a.id === id);
  if (!artist) return;
  $("#artistModalContent").innerHTML = `
    <div class="profile-hero">
      <div class="profile-art cover-${artist.cover}">${artist.initials}</div>
      <div>
        <div class="profile-title"><h2>${artist.name}</h2>${artist.verified ? '<span class="check">Profilo verificato</span>' : ""}</div>
        <div class="profile-sub">${artist.category} · ${artist.city} · disponibile in ${artist.zones.join(", ")}</div>
        <div class="profile-stats">
          <span><strong>${icon("star")} ${artist.rating}</strong> (${artist.reviews} recensioni)</span>
          <span><strong>${artist.distance} km</strong> da Milano</span>
          <span><strong>${artist.available ? "Disponibile" : "Occupato"}</strong></span>
        </div>
        <div class="profile-actions" style="margin-top:17px">
          <button class="btn btn-primary" data-profile-book="${artist.id}">Richiedi preventivo</button>
          <button class="btn btn-secondary" data-profile-chat="${artist.id}">Invia messaggio</button>
          <button class="btn btn-secondary" data-favorite="${artist.id}">${state.favorites.includes(id) ? "♥ Salvato" : "♡ Salva"}</button>
        </div>
      </div>
    </div>
    <div class="profile-columns">
      <div>
        <section class="profile-section">
          <h3>Profilo</h3>
          <p>${artist.bio}</p>
        </section>
        <section class="profile-section">
          <h3>Repertorio e video</h3>
          <div class="tag-row" style="margin-bottom:12px">${artist.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
          <div class="video-placeholder">▶</div>
        </section>
        <section class="profile-section">
          <h3>Esperienza</h3>
          <p>${artist.experience}</p>
        </section>
      </div>
      <aside>
        <div class="profile-booking-card">
          <div class="profile-price">da ${formatCurrency(artist.price)} <small>/ evento</small></div>
          <p style="color:var(--muted);font-size:12px">Prezzo indicativo. Ricevi preventivo personalizzato senza commissioni di agenzia.</p>
          <button class="btn btn-primary btn-block" data-profile-book="${artist.id}">Verifica disponibilità</button>
        </div>
        <section class="profile-section" style="margin-top:20px">
          <h3>Recensioni verificate</h3>
          <div class="review"><strong>5,0 · Hotel Milano</strong><span>Professionale, puntuale e perfetta per la serata.</span></div>
          <div class="review"><strong>5,0 · Marco P.</strong><span>Comunicazione chiara e repertorio molto curato.</span></div>
        </section>
      </aside>
    </div>`;
  bindArtistCardActions($("#artistModalContent"));
  $$("[data-profile-book]", $("#artistModalContent")).forEach(btn => btn.onclick = () => openBooking(Number(btn.dataset.profileBook)));
  $$("[data-profile-chat]", $("#artistModalContent")).forEach(btn => btn.onclick = () => startConversation(Number(btn.dataset.profileChat)));
  openModal("artistModal");
}

function openBooking(artistId) {
  const artist = artists.find(a => a.id === artistId);
  if (!artist) return;
  $("#bookingArtistId").value = artistId;
  $("#bookingTitle").textContent = `Contatta ${artist.name}`;
  $("#bookingBudget").value = artist.price;
  closeModal("artistModal");
  openModal("bookingModal");
}

function startConversation(artistId) {
  const artist = artists.find(a => a.id === artistId);
  let conv = state.conversations.find(c => c.artistId === artistId);
  if (!conv) {
    conv = { id: Date.now(), artistId, name: artist.name, initials: artist.initials, last: "Nuova conversazione", time: "Ora", messages: [] };
    state.conversations.unshift(conv);
    saveState();
  }
  closeModal("artistModal");
  routeTo("messages");
  selectConversation(conv.id);
}

function renderJobs(filter = "all") {
  if (!isRegistered()) {
    openJobGate();
    return;
  }

  const cityFilter = $("#jobFilterCity")?.value.trim().toLowerCase() || "";
  const dateFilter = $("#jobFilterDate")?.value || "";
  const genreFilter = $("#jobFilterGenre")?.value || "";
  const instrumentFilter = $("#jobFilterInstrument")?.value || "";
  const budgetFilter = Number($("#jobFilterBudget")?.value || 0);

  let list = filter === "all"
    ? [...jobs]
    : jobs.filter(job => job.city === filter || job.category === filter);

  list = list.filter(job => {
    const cityMatch = !cityFilter || job.city.toLowerCase().includes(cityFilter);
    const dateMatch = !dateFilter || job.date === dateFilter;
    const genreMatch = !genreFilter || job.genre === genreFilter;
    const instrumentMatch = !instrumentFilter || job.instrument === instrumentFilter;
    const budgetMatch = !budgetFilter || job.budget >= budgetFilter;
    return cityMatch && dateMatch && genreMatch && instrumentMatch && budgetMatch;
  });

  if (state.location && state.useNearbyJobs && filter === "all" && !cityFilter) {
    list = list
      .map(job => {
        const coords = CITY_COORDINATES[job.city] || CITY_COORDINATES["Milano"];
        return {
          ...job,
          distance: distanceKm(
            state.location.latitude,
            state.location.longitude,
            coords[0],
            coords[1]
          )
        };
      })
      .filter(job => job.distance <= MATCH_RADIUS_KM)
      .sort((a, b) => a.distance - b.distance);
  }

  $("#jobGrid").innerHTML = list.length
    ? list.map(job => `
      <article class="job-card">
        <div class="job-card-top">
          <div class="company-logo">${job.logo}</div>
          <span class="tag">${job.category}</span>
        </div>
        <h3>${job.title}</h3>
        <div class="job-company">${job.company} · profilo verificato</div>
        <div class="job-info">
          <span>${icon("pin")} ${job.city}</span>
          <span>${icon("calendar")} ${formatDate(job.date)}</span>
          <span>${icon("euro")} fino a ${formatCurrency(job.budget)}</span>
          <span>${icon("music")} ${job.genre}</span>
          <span>${icon("user")} ${job.instrument}</span>
          <span>${icon("bolt")} risposta rapida</span>
        </div>
        ${Number.isFinite(job.distance) ? `<div class="distance-label">${job.distance.toFixed(1)} km dalla tua posizione</div>` : ""}
        <p>${job.description}</p>
        <div class="job-footer">
          <span class="applicants">${job.applicants} candidature · compenso diretto</span>
          <button class="btn btn-primary btn-small" data-job-action="${job.id}">
            ${state.currentUser.role === "artist" ? "Candidati" : "Apri annuncio"}
          </button>
        </div>
      </article>`)
      .join("")
    : `<div class="empty-state">Nessun annuncio corrisponde ai filtri.</div>`;

  $$("[data-job-action]").forEach(button => button.onclick = () => {
    const job = jobs.find(item => item.id === Number(button.dataset.jobAction));
    if (!job) return;

    if (state.currentUser.role === "artist") {
      job.applicants += 1;
      localStorage.setItem("novavision_jobs", JSON.stringify(jobs));
      showToast(`Candidatura inviata per “${job.title}”. Nessuna trattenuta sul compenso.`);
      renderJobs(filter);
    } else {
      showToast(`Annuncio aperto: ${job.title} · ${job.city} · ${formatCurrency(job.budget)}`);
    }
  });
}

function renderConversations() {
  $("#conversationList").innerHTML = state.conversations.map((conv, index) => `
    <button class="conversation-item ${index === 0 ? "active" : ""}" data-conversation="${conv.id}">
      <span class="avatar gradient-${(index % 6) + 1}">${conv.initials}</span>
      <span class="conversation-copy"><strong>${conv.name}</strong><span>${conv.last}</span></span>
      <span class="conversation-time">${conv.time}</span>
    </button>`).join("");
  $$("[data-conversation]").forEach(btn => btn.onclick = () => selectConversation(Number(btn.dataset.conversation)));
  if (state.conversations.length) selectConversation(state.conversations[0].id);
}

function selectConversation(id) {
  const conv = state.conversations.find(c => c.id === id);
  if (!conv) return;
  $$(".conversation-item").forEach(btn => btn.classList.toggle("active", Number(btn.dataset.conversation) === id));
  $("#chatEmpty").classList.add("hidden");
  $("#chatContent").classList.remove("hidden");
  $("#chatName").textContent = conv.name;
  $("#chatAvatar").textContent = conv.initials;
  $("#chatContent").dataset.activeConversation = id;
  $("#chatMessages").innerHTML = conv.messages.length ? conv.messages.map(msg => `
    <div class="message ${msg.mine ? "mine" : ""}">
      <div class="message-bubble">${msg.text}<span class="message-time">${msg.time}</span></div>
    </div>`).join("") : `<div class="empty-state">Inizia la conversazione con ${conv.name}.</div>`;
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function renderPublicUserProfile() {
  const card = $("#publicUserProfile");
  const user = state.currentUser;

  if (!user) {
    card?.classList.add("hidden");
    return;
  }

  card.classList.remove("hidden");
  const initials = (user.name || "NV")
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  $("#publicProfileAvatar").innerHTML = user.photo
    ? `<img src="${user.photo}" alt="Foto profilo di ${escapeHtml(user.name)}">`
    : escapeHtml(initials);

  $("#publicProfileName").textContent = user.name || "Utente NovaVision";
  $("#publicProfileHeadline").textContent = user.role === "artist"
    ? `${user.category || "Artista"}${user.instrument ? ` · ${user.instrument}` : ""}`
    : "Cliente · organizzazione eventi";

  const tags = user.role === "artist"
    ? [user.category, user.instrument, user.city, user.diploma].filter(Boolean)
    : ["Cliente", user.city, user.subscription?.tier === "free" ? "Free account" : "Premium"].filter(Boolean);

  $("#publicProfileTags").innerHTML = tags
    .map(tag => `<span>${escapeHtml(tag)}</span>`)
    .join("");

  const details = user.role === "artist"
    ? [
        ["Contatto", user.phone || user.email || "Non indicato"],
        ["Formazione", user.education || "Non indicata"],
        ["Diploma", user.diploma || "Non indicato"],
        ["Zona", user.city || "Non indicata"]
      ]
    : [
        ["Contatto", user.phone || user.email || "Non indicato"],
        ["Città", user.city || "Non indicata"],
        ["Piano", user.subscription?.tier === "free" ? "Free account" : "Premium"],
        ["Annunci", "Accesso abilitato"]
      ];

  $("#publicProfileDetails").innerHTML = details.map(([label, value]) => `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");
}

function renderDashboard() {
  renderSubscriptionSummary();
  renderPublicUserProfile();
  $("#metricRequests").textContent = Math.max(4, state.requests.length);
  $("#favoriteMetric").textContent = state.favorites.length;

  const incoming = [
    { name: "Terrazza Duomo", initials: "TD", event: "Cena aziendale · 12 lug", price: 450 },
    { name: "Villa Aurora", initials: "VA", event: "Matrimonio · 2 ago", price: 700 },
    { name: "Hotel Navigli", initials: "HN", event: "Aperitivo · 18 lug", price: 300 }
  ];
  $("#artistRequests").innerHTML = incoming.map((r, i) => `
    <div class="request-row">
      <span class="avatar gradient-${i+2}">${r.initials}</span>
      <div><strong>${r.name}</strong><span>${r.event}</span></div>
      <div class="request-price">
        <strong>${formatCurrency(r.price)}</strong>
        <div class="request-actions">
          <button class="action-mini reject" data-request-action="Rifiutata">Rifiuta</button>
          <button class="action-mini" data-request-action="Controproposta inviata">Nuovo prezzo</button>
          <button class="action-mini accept" data-request-action="Accettata">Accetta</button>
        </div>
      </div>
    </div>`).join("");

  $$("[data-request-action]").forEach(btn => btn.onclick = () => showToast(btn.dataset.requestAction));

  const clientReqs = state.requests.length ? state.requests : [
    { artistName: "Laura Milesi", eventType: "Cena aziendale", date: "2026-07-12", budget: 450, status: "In trattativa" },
    { artistName: "Niko Bianchi", eventType: "Matrimonio", date: "2026-08-02", budget: 700, status: "Confermata" }
  ];
  $("#clientRequests").innerHTML = clientReqs.map((r, i) => `
    <div class="request-row">
      <span class="avatar gradient-${(i%6)+1}">${(r.artistName || "Richiesta").split(" ").map(x => x[0]).join("").slice(0,2)}</span>
      <div><strong>${r.artistName || "Annuncio pubblico"}</strong><span>${r.eventType} · ${formatDate(r.date)}</span></div>
      <div class="request-price"><strong>${formatCurrency(r.budget)}</strong><span>${r.status || "Inviata"}</span></div>
    </div>`).join("");

  const favorites = artists.filter(a => state.favorites.includes(a.id));
  $("#favoriteArtists").innerHTML = favorites.length ? favorites.map((a,i) => `
    <div class="request-row">
      <span class="avatar gradient-${a.cover}">${a.initials}</span>
      <div><strong>${a.name}</strong><span>${a.category} · ${a.city}</span></div>
      <button class="action-mini" data-view-artist="${a.id}">Apri</button>
    </div>`).join("") : `<div class="empty-state">Nessun artista salvato.</div>`;
  bindArtistCardActions($("#favoriteArtists"));
}

function renderCalendar() {
  const days = ["L","M","M","G","V","S","D"];
  const cells = [...days.map(d => `<div class="calendar-day head">${d}</div>`)];
  for (let i = 1; i <= 31; i++) {
    const status = [4,9,12,18,22,27].includes(i) ? "busy" : [2,3,7,10,11,15,16,20,23,24,29,30].includes(i) ? "free" : "";
    cells.push(`<button class="calendar-day ${status}" data-calendar-day="${i}">${i}</button>`);
  }
  $("#availabilityCalendar").innerHTML = cells.join("");
  $$("[data-calendar-day]").forEach(btn => btn.onclick = () => {
    btn.classList.remove("busy");
    btn.classList.toggle("free");
  });
}

function updateAuthUI() {
  const user = state.currentUser;
  $("#loginButton").classList.toggle("hidden", !!user);
  $("#registerButton").classList.toggle("hidden", !!user);
  $("#profileChip").classList.toggle("hidden", !user);
  $("#logoutButton").classList.toggle("hidden", !user);
  $("#mobileGuestActions").classList.toggle("hidden", !!user);
  $("#mobileUserActions").classList.toggle("hidden", !user);

  if (user) {
    const safeName = user.name || "Utente";
    $("#profileName").textContent = safeName.split(" ")[0];
    const initials = safeName.split(" ").map(x => x[0]).join("").slice(0,2).toUpperCase();
    $("#profileAvatar").textContent = initials;
    $("#mobileProfileAvatar").textContent = initials;
    $("#mobileProfileName").textContent = safeName;
    $("#mobileProfileRole").textContent = user.role === "client" ? "Profilo cliente" : "Profilo artista";
    $("#profileChip").onclick = () => routeTo("dashboard");
    state.currentRole = user.role || "artist";
  } else {
    $("#profileName").textContent = "";
    $("#profileAvatar").textContent = "";
    $("#mobileProfileName").textContent = "Utente NovaVision";
    $("#mobileProfileAvatar").textContent = "NV";
    $("#mobileProfileRole").textContent = "Profilo personale";
    $("#profileChip").onclick = null;
  }
}

function logout() {
  state.currentUser = null;
  state.currentRole = "artist";
  state.authMode = "login";
  state.pendingUser = null;
  state.profilePhotoData = null;
  state.useNearbyArtists = Boolean(state.location);
  state.useNearbyJobs = Boolean(state.location);

  localStorage.removeItem("novavision_user");
  $("#authForm").reset();
  $("#notificationPanel").classList.add("hidden");
  closeModal("authModal");
  updateAuthUI();
  setDashboardRole("artist");
  routeTo("home");
  showToast("Sessione terminata");

  setTimeout(() => {
    setAuthMode("login");
    openModal("authModal");
  }, 350);
}

function setAuthMode(mode) {
  state.authMode = mode;
  const isLogin = mode === "login";

  $$("[data-auth-mode]").forEach(btn => btn.classList.toggle("active", btn.dataset.authMode === mode));
  $("#authModalTitle").textContent = isLogin ? "Bentornato" : "Crea il tuo account";
  $("#roleCards").classList.toggle("hidden", isLogin);
  $("#planTierSelector").classList.toggle("hidden", isLogin);
  $("#subscriptionChooser").classList.toggle("hidden", isLogin);
  $("#locationRegistrationField").classList.toggle("hidden", isLogin);
  $$(".artist-only").forEach(el => el.classList.toggle("hidden", isLogin || state.currentRole !== "artist"));
  $("#authName").closest(".field").classList.toggle("hidden", isLogin);
  $("#authCity").closest(".field").classList.toggle("hidden", isLogin);

  $("#authName").required = !isLogin;
  $("#authCity").required = !isLogin;
  $("#authName").disabled = isLogin;
  $("#authCity").disabled = isLogin;
  $("#authCategory").disabled = isLogin || state.currentRole !== "artist";
  ["authPhoto","authBirthDate","authInstrument","authDiploma","authEducation"].forEach(id => {
    $(`#${id}`).disabled = isLogin || state.currentRole !== "artist";
  });

  updateAuthPlanUI();
}

function setRole(role) {
  state.currentRole = role;
  $$("[data-role]").forEach(btn => btn.classList.toggle("active", btn.dataset.role === role));
  $$(".artist-only").forEach(el => el.classList.toggle("hidden", role !== "artist"));
  $("#authCategory").disabled = role !== "artist" || state.authMode === "login";
  ["authPhoto","authBirthDate","authInstrument","authDiploma","authEducation"].forEach(id => {
    $(`#${id}`).disabled = role !== "artist" || state.authMode === "login";
  });
  updateAuthPlanUI();
}

function setDashboardRole(role) {
  $$("[data-dashboard-role]").forEach(btn => btn.classList.toggle("active", btn.dataset.dashboardRole === role));
  $("#artistDashboard").classList.toggle("hidden", role !== "artist");
  $("#clientDashboard").classList.toggle("hidden", role !== "client");
  $("#dashboardTitle").textContent = role === "artist" ? "Dashboard artista" : "Dashboard cliente";
  $("#dashboardSubtitle").textContent = role === "artist" ? "Gestisci richieste, disponibilità e profilo." : "Gestisci annunci, richieste e prenotazioni.";
}

function initializeDates() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const dateValue = nextWeek.toISOString().split("T")[0];
  ["heroDate","filterDate","bookingDate","jobDate","jobFilterDate"].forEach(id => {
    const el = $(`#${id}`);
    if (el) {
      el.min = today.toISOString().split("T")[0];
      if (!el.value && id !== "jobFilterDate") el.value = dateValue;
    }
  });
}

function bindEvents() {
  const backToTopButton = $("#backToTop");

  const updateBackToTopVisibility = () => {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    backToTopButton.classList.toggle("visible", scrollPosition > 80);
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.documentElement.scrollTo?.({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  document.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  window.addEventListener("load", updateBackToTopVisibility);
  requestAnimationFrame(updateBackToTopVisibility);

  $("#mobileMenuButton").addEventListener("click", toggleMobileMenu);
  $("#mobileDrawerClose").addEventListener("click", closeMobileMenu);
  $("#mobileDrawerBackdrop").addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMobileMenu();
  });

  $$("[data-mobile-login]").forEach(button => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      setAuthMode("login");
      openModal("authModal");
    });
  });

  $$("[data-mobile-register]").forEach(button => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      startFreeRegistration("artist");
    });
  });

  $$("[data-mobile-logout]").forEach(button => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      logout();
    });
  });

  $$("[data-route]").forEach(btn => btn.addEventListener("click", () => routeTo(btn.dataset.route)));

  $$("[data-scroll-contact]").forEach(button => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      if (state.currentRoute !== "home") {
        routeTo("home");
      }
      setTimeout(() => {
        $("#contatti")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
  });

  $$("[data-pricing-cycle]").forEach(button => {
    button.addEventListener("click", () => setBillingCycle(button.dataset.pricingCycle, "pricing"));
  });

  $$("[data-auth-cycle]").forEach(button => {
    button.addEventListener("click", () => setBillingCycle(button.dataset.authCycle, "auth"));
  });

  $$("[data-auth-tier]").forEach(button => {
    button.addEventListener("click", () => setAuthTier(button.dataset.authTier));
  });

  $$("[data-start-plan]").forEach(button => {
    button.addEventListener("click", () => startPlanRegistration(button.dataset.startPlan));
  });

  $$("[data-start-free]").forEach(button => {
    button.addEventListener("click", () => startFreeRegistration("artist"));
  });

  $$("[data-open-advisor]").forEach(button => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      toggleAdvisor(true);
    });
  });

  $("#advisorFab").addEventListener("click", () => toggleAdvisor());
  $("#advisorClose").addEventListener("click", () => toggleAdvisor(false));

  $$("[data-advisor-question]").forEach(button => {
    button.addEventListener("click", () => sendAdvisorMessage(button.dataset.advisorQuestion));
  });

  $("#advisorForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#advisorInput");
    sendAdvisorMessage(input.value);
    input.value = "";
  });

  $$("[data-refresh-location]").forEach(button => {
    button.addEventListener("click", () => requestCurrentLocation({ routeAfter: true }));
  });

  $("#useLocationButton").addEventListener("click", () => requestCurrentLocation());

  $("#authPhoto").addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1200000) {
      showToast("Foto troppo grande. Usa un file inferiore a 1,2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      state.profilePhotoData = reader.result;
      $("#profilePhotoPreview").innerHTML = `<img src="${reader.result}" alt="Anteprima foto profilo">`;
    };
    reader.readAsDataURL(file);
  });
  $$("[data-category-shortcut]").forEach(btn => btn.addEventListener("click", () => {
    $("#filterCategory").value = btn.dataset.categoryShortcut;
    routeTo("discover");
  }));
  $$("[data-close-modal]").forEach(btn => btn.onclick = () => closeModal(btn.dataset.closeModal));
  $$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeModal(backdrop.id);
  }));

  $("#gateRegisterButton").addEventListener("click", () => {
    closeModal("jobGateModal");
    startFreeRegistration("artist");
  });

  $("#gateLoginButton").addEventListener("click", () => {
    closeModal("jobGateModal");
    setAuthMode("login");
    openModal("authModal");
  });

  $("#registerButton").onclick = () => startFreeRegistration("artist");
  $("#loginButton").onclick = () => { setAuthMode("login"); openModal("authModal"); };
  $("#logoutButton").onclick = logout;
  $$("[data-open-register]").forEach(btn => btn.onclick = () => startFreeRegistration(btn.dataset.openRegister));
  $$("[data-auth-mode]").forEach(btn => btn.onclick = () => setAuthMode(btn.dataset.authMode));
  $$("[data-role]").forEach(btn => btn.onclick = () => setRole(btn.dataset.role));

  $("#authForm").addEventListener("submit", async event => {
    event.preventDefault();

    if (state.authMode === "login") {
      const email = $("#authEmail").value.trim();
      const registered = getRegisteredAccount();

      if (!registered || registered.email.toLowerCase() !== email.toLowerCase()) {
        showToast("Account non trovato. Crea prima un account Free o Premium.");
        return;
      }

      state.currentUser = registered;
      state.currentRole = registered.role || "artist";
      state.location = registered.location || state.location || applyCityFallback(registered.city || "Milano");

      saveState();
      updateAuthUI();
      closeModal("authModal");
      closeModal("jobGateModal");
      setDashboardRole(state.currentRole);
      renderSubscriptionSummary();

      const destination = state.postAuthRoute || "dashboard";
      state.postAuthRoute = null;
      routeTo(destination);
      showToast("Accesso effettuato");
      return;
    }

    if (!state.location) await requestCurrentLocation();

    const city = $("#authCity").value.trim() || "Milano";
    if (!state.location) applyCityFallback(city);

    const pendingUser = {
      name: $("#authName").value.trim() || "Utente NovaVision",
      email: $("#authEmail").value.trim(),
      phone: $("#authPhone").value.trim(),
      role: state.currentRole,
      city: state.location?.city || city,
      category: state.currentRole === "artist" ? $("#authCategory").value : null,
      birthDate: state.currentRole === "artist" ? $("#authBirthDate").value : null,
      instrument: state.currentRole === "artist" ? $("#authInstrument").value.trim() : null,
      diploma: state.currentRole === "artist" ? $("#authDiploma").value.trim() : null,
      education: state.currentRole === "artist" ? $("#authEducation").value.trim() : null,
      photo: state.currentRole === "artist" ? state.profilePhotoData : null,
      billing: state.selectedBilling,
      tier: state.selectedTier,
      location: state.location,
      provider: "email"
    };

    if (state.selectedTier === "free") {
      finishFreeRegistration(pendingUser);
    } else {
      openCheckout(pendingUser);
    }
  });

  $$("[data-social]").forEach(button => button.onclick = async event => {
    event.preventDefault();
    const provider = button.dataset.social;
    const providerEmail = provider === "Google" ? "google@example.com" : "apple@example.com";

    if (state.authMode === "login") {
      const registered = getRegisteredAccount();

      if (!registered || registered.provider !== provider) {
        showToast(`Nessun account ${provider} registrato in questa demo.`);
        return;
      }

      state.currentUser = registered;
      state.currentRole = registered.role || "artist";
      state.location = registered.location || state.location || applyCityFallback("Milano");
      saveState();
      updateAuthUI();
      closeModal("authModal");
      closeModal("jobGateModal");
      setDashboardRole(state.currentRole);
      renderSubscriptionSummary();

      const destination = state.postAuthRoute || "dashboard";
      state.postAuthRoute = null;
      routeTo(destination);
      showToast(`Accesso demo con ${provider}`);
      return;
    }

    if (!state.location) await requestCurrentLocation();
    if (!state.location) applyCityFallback($("#authCity").value.trim() || "Milano");

    const pendingUser = {
      name: provider === "Google" ? "Utente Google" : "Utente Apple",
      email: providerEmail,
      phone: $("#authPhone").value.trim(),
      role: state.currentRole,
      city: state.location.city,
      category: state.currentRole === "artist" ? $("#authCategory").value : null,
      birthDate: state.currentRole === "artist" ? $("#authBirthDate").value : null,
      instrument: state.currentRole === "artist" ? $("#authInstrument").value.trim() : null,
      diploma: state.currentRole === "artist" ? $("#authDiploma").value.trim() : null,
      education: state.currentRole === "artist" ? $("#authEducation").value.trim() : null,
      photo: state.currentRole === "artist" ? state.profilePhotoData : null,
      billing: state.selectedBilling,
      tier: state.selectedTier,
      location: state.location,
      provider
    };

    if (state.selectedTier === "free") {
      finishFreeRegistration(pendingUser);
    } else {
      openCheckout(pendingUser);
    }
  });

  $("#cardNumber").addEventListener("input", event => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
    event.target.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  });

  $("#cardExpiry").addEventListener("input", event => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
    event.target.value = digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  });

  $("#cardCvc").addEventListener("input", event => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 3);
  });

  $("#paymentForm").addEventListener("submit", event => {
    if (document.documentElement.dataset.backend === "supabase") return;

    event.preventDefault();

    const cardDigits = $("#cardNumber").value.replace(/\D/g, "");
    const expiry = $("#cardExpiry").value;
    const cvc = $("#cardCvc").value;

    if (cardDigits.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvc.length !== 3) {
      showToast("Inserisci dati carta demo validi.");
      return;
    }

    finishSubscriptionActivation();
  });

  $("#manageSubscriptionButton").addEventListener("click", () => {
    if (document.documentElement.dataset.backend === "supabase") return;
    if (!state.currentUser) return;

    if (state.currentUser.subscription?.tier === "free" || state.currentUser.subscription?.cycle === "free") {
      state.selectedTier = "premium";
      state.selectedBilling = "monthly";
      state.pendingUser = {
        ...state.currentUser,
        billing: "monthly",
        tier: "premium"
      };
      updateCheckoutSummary();
      openModal("paymentModal");
      showToast("Scegli Premium per attivare funzioni avanzate.");
      return;
    }

    const currentCycle = state.currentUser.subscription?.cycle || "monthly";
    const newCycle = currentCycle === "monthly" ? "annual" : "monthly";

    state.selectedBilling = newCycle;
    state.pendingUser = {
      ...state.currentUser,
      billing: newCycle,
      tier: "premium"
    };

    updateCheckoutSummary();
    openModal("paymentModal");
    showToast(`Passaggio al piano ${newCycle === "annual" ? "annuale" : "mensile"}.`);
  });

  $("#heroSearchForm").addEventListener("submit", e => {
    e.preventDefault();
    $("#filterCity").value = $("#heroCity").value;
    $("#filterCategory").value = $("#heroCategory").value;
    $("#filterDate").value = $("#heroDate").value;
    routeTo("discover");
  });

  ["filterCity","filterCategory","filterDate","filterPrice","filterVerified","filterAvailable","sortArtists"].forEach(id => {
    $(`#${id}`).addEventListener("input", () => {
      if (id === "filterCity" && $(`#${id}`).value.trim()) state.useNearbyArtists = false;
      renderArtists();
    });
    $(`#${id}`).addEventListener("change", renderArtists);
  });
  $("#resetFilters").onclick = () => {
    $("#filterCity").value = "";
    state.useNearbyArtists = Boolean(state.location);
    $("#filterCategory").value = "";
    $("#filterPrice").value = 800;
    $("#filterVerified").checked = false;
    $("#filterAvailable").checked = true;
    renderArtists();
  };
  $("#toggleMapButton").onclick = () => {
    const hidden = $("#mapPanel").classList.toggle("hidden");
    $("#toggleMapButton").textContent = hidden ? "Mostra mappa" : "Nascondi mappa";
  };

  $("#bookingForm").addEventListener("submit", e => {
    e.preventDefault();
    const artist = artists.find(a => a.id === Number($("#bookingArtistId").value));
    state.requests.unshift({
      id: Date.now(),
      artistId: artist.id,
      artistName: artist.name,
      date: $("#bookingDate").value,
      eventType: $("#bookingEventType").value,
      city: $("#bookingCity").value,
      budget: Number($("#bookingBudget").value),
      message: $("#bookingMessage").value,
      status: "Inviata"
    });
    saveState();
    closeModal("bookingModal");
    showToast("Richiesta inviata direttamente all’artista");
    renderDashboard();
  });

  $("#publishJobButton").onclick = () => {
    if (!isRegistered()) {
      openJobGate();
      return;
    }
    if (state.currentUser.role !== "client") {
      showToast("Solo un account cliente può pubblicare annunci.");
      return;
    }
    openModal("jobModal");
  };
  $("#newRequestButton").onclick = () => routeTo("discover");
  $("#jobForm").addEventListener("submit", e => {
    e.preventDefault();
    jobs.unshift({
      id: Date.now(),
      title: $("#jobTitle").value,
      company: state.currentUser?.name || "Cliente verificato",
      city: $("#jobCity").value,
      date: $("#jobDate").value,
      category: $("#jobCategory").value,
      genre: $("#jobGenre").value,
      instrument: $("#jobInstrument").value,
      budget: Number($("#jobBudget").value),
      description: $("#jobDescription").value,
      applicants: 0,
      logo: ($("#jobTitle").value.match(/\b\w/g) || ["A"]).slice(0,2).join("").toUpperCase()
    });
    localStorage.setItem("novavision_jobs", JSON.stringify(jobs));
    closeModal("jobModal");
    renderJobs();
    showToast("Annuncio pubblicato");
    e.target.reset();
    initializeDates();
  });

  $$("[data-job-filter]").forEach(btn => btn.onclick = () => {
    $$("[data-job-filter]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    renderJobs(btn.dataset.jobFilter);
  });

  ["jobFilterCity", "jobFilterDate", "jobFilterGenre", "jobFilterInstrument", "jobFilterBudget"]
    .forEach(id => {
      $(`#${id}`).addEventListener("input", () => renderJobs());
      $(`#${id}`).addEventListener("change", () => renderJobs());
    });

  $("#resetJobFilters").addEventListener("click", () => {
    $("#jobFilterCity").value = "";
    $("#jobFilterDate").value = "";
    $("#jobFilterGenre").value = "";
    $("#jobFilterInstrument").value = "";
    $("#jobFilterBudget").value = "";
    state.useNearbyJobs = Boolean(state.location);
    $$("[data-job-filter]").forEach(button => button.classList.toggle("active", button.dataset.jobFilter === "all"));
    renderJobs();
  });

  $("#chatForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    const id = Number($("#chatContent").dataset.activeConversation);
    const conv = state.conversations.find(c => c.id === id);
    conv.messages.push({ mine: true, text, time: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }) });
    conv.last = text;
    conv.time = "Ora";
    input.value = "";
    saveState();
    renderConversations();
    selectConversation(id);
  });

  $("#chatBookingButton").onclick = () => {
    const id = Number($("#chatContent").dataset.activeConversation);
    const conv = state.conversations.find(c => c.id === id);
    openBooking(conv.artistId);
  };

  $$("[data-dashboard-role]").forEach(btn => btn.onclick = () => setDashboardRole(btn.dataset.dashboardRole));

  $("#notificationButton").onclick = e => {
    e.stopPropagation();
    $("#notificationPanel").classList.toggle("hidden");
  };
  document.addEventListener("click", e => {
    if (!$("#notificationPanel").contains(e.target) && e.target !== $("#notificationButton")) $("#notificationPanel").classList.add("hidden");
  });
  $("#markReadButton").onclick = () => {
    $$(".notification-item").forEach(n => n.classList.remove("unread"));
    $(".badge").classList.add("hidden");
  };

  $("#editAvailabilityButton").onclick = () => showToast("Tocca i giorni per impostare la disponibilità");
}

function init() {
  initializeDates();
  if (state.location) {
    state.useNearbyArtists = true;
    state.useNearbyJobs = true;
    syncArtistDistances();
  }
  updatePricingUI();
  updateAuthPlanUI();
  updateLocationBanners();
  renderAdvisorMessages();

  const existingAccount = getRegisteredAccount();
  if (!localStorage.getItem("novavision_registered_account") && state.currentUser) {
    localStorage.setItem("novavision_registered_account", JSON.stringify(state.currentUser));
  }

  renderFeatured();
  renderArtists();
  renderJobs();
  renderConversations();
  renderCalendar();
  renderDashboard();
  updateAuthUI();
  setDashboardRole(state.currentUser?.role || "artist");
  renderSubscriptionSummary();
  renderPublicUserProfile();
  bindEvents();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) closeMobileMenu();
  });

  initializeLanguageSystem();
}

let appInitialized = false;

function bootNovaVision() {
  if (appInitialized) return;
  appInitialized = true;
  init();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.routeTo = routeTo;
window.setAuthMode = setAuthMode;
window.startPlanRegistration = startPlanRegistration;
window.startFreeRegistration = startFreeRegistration;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootNovaVision, { once: true });
} else {
  bootNovaVision();
}
