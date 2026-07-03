import "./styles.css";
import { isConfigured, planLabels } from "./config.js";
import {
  getSession,
  onAuthChange,
  signInWithOAuth,
  signInWithPassword,
  signOut,
  signUpWithProfile,
  supabase
} from "./services/supabaseClient.js";
import {
  createApplication,
  createBookingRequest,
  createCheckoutSession,
  createJob,
  createPortalSession,
  fetchAdminQueue,
  fetchArtists,
  fetchConversations,
  fetchDashboard,
  fetchJobs,
  fetchProfile,
  saveProfile,
  sendMessage,
  startConversation,
  updateReviewStatus,
  uploadAvatar
} from "./services/api.js";

const state = {
  session: null,
  user: null,
  profile: null,
  route: "home",
  artists: [],
  jobs: [],
  conversations: [],
  dashboard: { jobs: [], applications: [], requests: [], subscription: null },
  adminQueue: { profiles: [], jobs: [] },
  selectedConversationId: null,
  filters: { artistCity: "", artistCategory: "all", maxPrice: "", jobCity: "", jobCategory: "all", jobDate: "", minBudget: "" },
  authMode: "register",
  authRole: "artist",
  selectedArtist: null,
  selectedJob: null,
  loading: false
};

const categories = ["Musicista", "Cantante", "DJ", "Band", "Tecnico audio"];

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function currency(value) {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value || 0);
}

function dateLabel(value) {
  if (!value) return "Data da definire";
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function initials(name = "NV") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "NV";
}

function toast(message, tone = "dark") {
  const existing = $(".toast");
  if (existing) existing.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  if (tone === "danger") node.style.background = "var(--danger)";
  if (tone === "success") node.style.background = "var(--success)";
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 4400);
}

function requireConfigured() {
  if (!isConfigured) {
    toast("Configura Supabase nelle variabili ambiente prima di usare questa funzione.", "danger");
    return false;
  }
  return true;
}

function requireAuth() {
  if (!state.user) {
    openAuth("login");
    toast("Accedi o crea un account per continuare.");
    return false;
  }
  return true;
}

function setRoute(route) {
  state.route = route;
  history.replaceState(null, "", route === "home" ? "/" : `#${route}`);
  render();
  if (["discover", "jobs", "messages", "dashboard", "admin"].includes(route)) refreshRouteData(route);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(id) {
  $(`#${id}`)?.classList.remove("hidden");
}

function closeModal(id) {
  $(`#${id}`)?.classList.add("hidden");
}

function openAuth(mode = "register", role = state.authRole) {
  state.authMode = mode;
  state.authRole = role;
  renderAuthModal();
  openModal("authModal");
}

function appShell() {
  return `
    ${!isConfigured ? `<div class="status-banner">Configura <strong>VITE_SUPABASE_URL</strong> e <strong>VITE_SUPABASE_ANON_KEY</strong> per collegare NovaVision al backend reale.</div>` : ""}
    <div class="app-shell">
      <header class="topbar">
        <button class="brand" data-route="home" aria-label="NovaVision home">
          <img src="/novavision-logo.png" alt="Logo NovaVision">
          <span>NovaVision</span>
        </button>
        <nav class="nav" aria-label="Navigazione principale">
          ${navButton("home", "Home")}
          ${navButton("discover", "Artisti")}
          ${navButton("jobs", "Opportunità")}
          ${navButton("messages", "Messaggi")}
          ${navButton("dashboard", "Dashboard")}
          ${state.profile?.is_admin ? navButton("admin", "Admin") : ""}
        </nav>
        <div class="topbar-actions">
          ${state.user ? `
            <button class="btn btn-secondary btn-small" data-route="dashboard">${escapeHtml(state.profile?.display_name || state.user.email)}</button>
            <button class="btn btn-primary btn-small" data-logout>Esci</button>
          ` : `
            <button class="btn btn-secondary btn-small" data-open-login>Accedi</button>
            <button class="btn btn-primary btn-small" data-open-register>Inizia ora</button>
          `}
        </div>
      </header>
      <main class="main">
        ${page("home", homePage())}
        ${page("discover", discoverPage())}
        ${page("jobs", jobsPage())}
        ${page("messages", messagesPage())}
        ${page("dashboard", dashboardPage())}
        ${page("admin", adminPage())}
        ${page("terms", legalPage("Termini di servizio", termsText()))}
        ${page("privacy", legalPage("Privacy policy", privacyText()))}
        ${page("cookies", legalPage("Cookie policy", cookiesText()))}
      </main>
      ${footer()}
    </div>
    ${authModal()}
    ${profileModal()}
    ${jobModal()}
    ${bookingModal()}
  `;
}

function navButton(route, label) {
  return `<button class="${state.route === route ? "active" : ""}" data-route="${route}">${label}</button>`;
}

function page(route, content) {
  return `<section class="page ${state.route === route ? "active" : ""}" id="page-${route}">${content}</section>`;
}

function homePage() {
  return `
    <section class="hero">
      <div class="hero-orbit orbit-a"></div>
      <div class="hero-orbit orbit-b"></div>
      <div class="hero-copy">
        <span class="eyebrow eyebrow-light">Artist Booking & Management</span>
        <h1>Il talento giusto.<br><span>Per ogni evento.</span></h1>
        <p>NovaVision mette in contatto diretto artisti verificati e clienti. Ricerca per città, data, stile e budget. Tratta e prenota in un unico spazio.</p>

        <form class="hero-search" id="heroSearch">
          <label>
            <span>Localita</span>
            <div class="input-with-icon">
              <span class="icon">⌖</span>
              <input name="city" type="text" placeholder="Milano, Monza, Roma..." value="${escapeHtml(state.filters.artistCity || "Milano")}" aria-label="Citta o zona">
            </div>
          </label>
          <label>
            <span>Professionista</span>
            <div class="input-with-icon">
              <span class="icon">⌕</span>
              <select name="category" aria-label="Categoria">
                <option value="all">Tutte le categorie</option>
                ${categories.map((item) => `<option ${state.filters.artistCategory === item ? "selected" : ""}>${item}</option>`).join("")}
              </select>
            </div>
          </label>
          <label>
            <span>Data evento</span>
            <div class="input-with-icon">
              <span class="icon">□</span>
              <input name="date" type="date" aria-label="Data evento">
            </div>
          </label>
          <button class="btn btn-accent btn-search" type="submit">Cerca <span class="icon">→</span></button>
        </form>

        <div class="trust-row">
          <span><span class="icon">✓</span> Profili verificati</span>
          <span><span class="icon">▣</span> Pagamenti protetti</span>
          <span><span class="icon">✉</span> Contatto diretto</span>
        </div>
      </div>

      <div class="hero-visual">
        <div class="stage-preview">
          <div class="preview-topbar">
            <div>
              <span class="preview-kicker">Sabato 12 luglio</span>
              <strong>Live jazz · Milano</strong>
            </div>
            <span class="live-pill"><i></i> 12 artisti disponibili</span>
          </div>

          <div class="preview-performance">
            <div class="performance-copy">
              <span>In evidenza</span>
              <strong>Laura Milesi</strong>
              <small>Voce jazz & soul · da €420</small>
            </div>
            <div class="performance-wave">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>

          <div class="preview-list">
            <div class="preview-list-head">
              <strong>Match consigliati</strong>
              <span>Milano · 12 luglio</span>
            </div>
            <div class="preview-artist">
              <span class="avatar gradient-2">NB</span>
              <div><strong>Niko Bianchi</strong><span>DJ · 4,8</span></div>
              <b>€550</b>
            </div>
            <div class="preview-artist">
              <span class="avatar gradient-4">GF</span>
              <div><strong>Giulia Ferri</strong><span>Tecnico audio · 4,9</span></div>
              <b>€330</b>
            </div>
          </div>
        </div>

        <div class="floating-card card-artist">
          <span class="mini-label">Richiesta ricevuta</span>
          <strong>Terrazza Duomo</strong>
          <span>Cena aziendale · €450</span>
        </div>

        <div class="floating-card card-booking">
          <span class="booking-icon"><span class="icon">✓</span></span>
          <div>
            <strong>Prenotazione confermata</strong>
            <span>Pagamento protetto</span>
          </div>
        </div>
      </div>
    </section>
    <section class="stats">
      <div><strong>2.400+</strong><span>professionisti attivi</span></div>
      <div><strong>180+</strong><span>citta raggiunte</span></div>
      <div><strong>4,9/5</strong><span>valutazione media</span></div>
      <div><strong>0%</strong><span>nessuna agenzia</span></div>
    </section>
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Come funziona</p>
          <h2>Una piattaforma, tre passaggi.</h2>
        </div>
      </div>
      <div class="grid">
        <article class="card"><h3>1. Verifica</h3><p class="muted">Artisti e annunci entrano in coda approvazione prima di diventare pubblici.</p></article>
        <article class="card"><h3>2. Contatto diretto</h3><p class="muted">Clienti e artisti gestiscono richieste, candidature e messaggi in area riservata.</p></article>
        <article class="card"><h3>3. Crescita</h3><p class="muted">I piani Premium passano da Stripe Checkout e aggiornano l’abbonamento via webhook.</p></article>
      </div>
    </section>
    <section class="section section-dark">
      <div class="section-head">
        <div>
          <p class="eyebrow">Piani NovaVision</p>
          <h2>Parti gratis. Attiva Premium quando serve.</h2>
          <p class="lead">Il piano Free non richiede carta. I piani Premium sono collegati a Stripe e pronti per test mode o live mode.</p>
        </div>
      </div>
      <div class="grid">
        ${planCard("Free", "€0", "Accesso, profilo e annunci approvati.", null)}
        ${planCard("Premium artista", "€2/mese", "Profilo avanzato, priorità locale e gestione richieste.", "artist_monthly")}
        ${planCard("Premium cliente", "€3/mese", "Pubblicazione e gestione organizzata delle richieste.", "client_monthly")}
      </div>
    </section>
  `;
}

function planCard(title, price, body, planKey) {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p class="lead">${price}</p>
      <p class="muted">${body}</p>
      ${planKey ? `<button class="btn btn-accent btn-block" data-checkout="${planKey}">Attiva</button>` : `<button class="btn btn-secondary btn-block" data-open-register>Crea Free</button>`}
    </article>
  `;
}

function discoverPage() {
  return `
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Ricerca artisti</p>
          <h2>Profili approvati e pronti al contatto.</h2>
        </div>
        <button class="btn btn-primary" data-edit-profile>${state.profile?.role === "artist" ? "Aggiorna profilo artista" : "Crea profilo artista"}</button>
      </div>
      <div class="grid-2">
        <aside class="panel filters">
          <label class="field">Città<input id="artistCity" value="${escapeHtml(state.filters.artistCity)}" placeholder="Milano, Roma..."></label>
          <label class="field">Categoria<select id="artistCategory">${categoryOptions(state.filters.artistCategory)}</select></label>
          <label class="field">Compenso massimo<input id="maxPrice" type="number" min="0" value="${escapeHtml(state.filters.maxPrice)}" placeholder="800"></label>
          <button class="btn btn-secondary" data-reset-artist-filters>Azzera filtri</button>
        </aside>
        <div class="list" id="artistList">
          ${state.artists.length ? state.artists.map(artistCard).join("") : emptyState("Nessun artista approvato trovato.")}
        </div>
      </div>
    </section>
  `;
}

function artistCard(artist) {
  return `
    <article class="card artist-card">
      <div class="row">
        <div class="avatar">${artist.avatar_url ? `<img src="${escapeHtml(artist.avatar_url)}" alt="Foto profilo di ${escapeHtml(artist.display_name)}">` : initials(artist.display_name)}</div>
        <div>
          <h3>${escapeHtml(artist.display_name || "Artista NovaVision")}</h3>
          <p class="muted">${escapeHtml([artist.city, artist.country].filter(Boolean).join(", ") || "Area operativa da definire")}</p>
        </div>
      </div>
      <div class="meta">
        ${artist.verified ? `<span class="pill pill-success">Verificato</span>` : `<span class="pill">In crescita</span>`}
        ${artist.category ? `<span class="pill">${escapeHtml(artist.category)}</span>` : ""}
        ${artist.instrument ? `<span class="pill">${escapeHtml(artist.instrument)}</span>` : ""}
      </div>
      <p class="muted">${escapeHtml(artist.bio || "Profilo sintetico in aggiornamento.")}</p>
      <div class="job-top">
        <strong>${artist.price_min ? `da ${currency(artist.price_min)}` : "Preventivo su richiesta"}</strong>
        <div class="row">
          <button class="btn btn-secondary btn-small" data-message-artist="${artist.id}">Messaggio</button>
          <button class="btn btn-primary btn-small" data-book-artist="${artist.id}">Richiedi</button>
        </div>
      </div>
    </article>
  `;
}

function jobsPage() {
  return `
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Opportunità</p>
          <h2>Annunci approvati da clienti e location.</h2>
        </div>
        <button class="btn btn-primary" data-open-job>Pubblica annuncio</button>
      </div>
      <div class="grid-2">
        <aside class="panel filters">
          <label class="field">Città<input id="jobCity" value="${escapeHtml(state.filters.jobCity)}" placeholder="Milano, Roma..."></label>
          <label class="field">Categoria<select id="jobCategory">${categoryOptions(state.filters.jobCategory)}</select></label>
          <label class="field">Data<input id="jobDate" type="date" value="${escapeHtml(state.filters.jobDate)}"></label>
          <label class="field">Budget minimo<input id="minBudget" type="number" min="0" value="${escapeHtml(state.filters.minBudget)}" placeholder="300"></label>
          <button class="btn btn-secondary" data-reset-job-filters>Azzera filtri</button>
        </aside>
        <div class="list">
          ${state.jobs.length ? state.jobs.map(jobCard).join("") : emptyState("Nessun annuncio approvato trovato.")}
        </div>
      </div>
    </section>
  `;
}

function jobCard(job) {
  return `
    <article class="card job-card">
      <div class="job-top">
        <div>
          <h3>${escapeHtml(job.title)}</h3>
          <p class="muted">${escapeHtml(job.city || "Luogo da definire")} - ${dateLabel(job.event_date)}</p>
        </div>
        <span class="pill pill-dark">${currency(job.budget_max)}</span>
      </div>
      <div class="meta">
        ${job.category ? `<span class="pill">${escapeHtml(job.category)}</span>` : ""}
        ${job.genre ? `<span class="pill">${escapeHtml(job.genre)}</span>` : ""}
        ${job.instrument ? `<span class="pill">${escapeHtml(job.instrument)}</span>` : ""}
      </div>
      <p class="muted">${escapeHtml(job.description || "")}</p>
      <div class="row">
        <button class="btn btn-primary btn-small" data-apply-job="${job.id}">Candidati</button>
      </div>
    </article>
  `;
}

function messagesPage() {
  const selected = state.conversations.find((item) => item.id === state.selectedConversationId) || state.conversations[0];
  const selectedName = selected
    ? selected.client_id === state.user?.id
      ? selected.artist?.display_name
      : selected.client?.display_name
    : "Conversazione";
  return `
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Messaggi</p>
          <h2>Conversazioni dirette.</h2>
        </div>
      </div>
      ${state.user ? `
        <div class="messages-shell">
          <aside class="conversation-list">
            ${state.conversations.length ? state.conversations.map((item, index) => `
              <button class="conversation-item ${(selected?.id === item.id || (!selected && index === 0)) ? "active" : ""}" data-select-conversation="${item.id}">
                <strong>${escapeHtml(item.client_id === state.user.id ? item.artist?.display_name : item.client?.display_name)}</strong>
                <p class="muted">${escapeHtml(item.messages?.at(-1)?.body || "Nuova conversazione")}</p>
              </button>
            `).join("") : `<div class="empty">Nessuna conversazione attiva.</div>`}
          </aside>
          <section class="chat-panel">
            <div class="chat-head"><strong>${escapeHtml(selectedName || "Conversazione")}</strong></div>
            <div class="chat-messages">
              ${selected?.messages?.length ? selected.messages.map((message) => `
                <div class="message ${message.sender_id === state.user.id ? "mine" : ""}">${escapeHtml(message.body)}</div>
              `).join("") : `<div class="empty">Seleziona un artista e invia il primo messaggio.</div>`}
            </div>
            <form class="chat-compose" id="messageForm">
              <input name="body" placeholder="Scrivi un messaggio..." ${selected ? "" : "disabled"}>
              <button class="btn btn-primary" type="submit" ${selected ? "" : "disabled"}>Invia</button>
            </form>
          </section>
        </div>
      ` : emptyState("Accedi per leggere e inviare messaggi.")}
    </section>
  `;
}

function dashboardPage() {
  if (!state.user) {
    return `<section class="section">${emptyState("Accedi per gestire profilo, annunci, richieste e abbonamenti.")}<button class="btn btn-primary" data-open-login>Accedi</button></section>`;
  }

  const subscription = state.dashboard.subscription;
  return `
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Area personale</p>
          <h2>${escapeHtml(state.profile?.display_name || "Profilo NovaVision")}</h2>
          <p class="muted">Stato profilo: ${statusPill(state.profile?.publication_status || "pending_review")}</p>
        </div>
        <div class="row">
          <button class="btn btn-secondary" data-edit-profile>Modifica profilo</button>
          <button class="btn btn-primary" data-open-job>Nuovo annuncio</button>
        </div>
      </div>
      <div class="grid">
        <article class="card"><h3>Abbonamento</h3><p class="muted">${subscription ? `${escapeHtml(subscription.plan_key || "Premium")} - ${escapeHtml(subscription.status)}` : "Free account"}</p><button class="btn btn-secondary btn-block" data-portal>Gestisci</button></article>
        <article class="card"><h3>Annunci</h3><p class="lead">${state.dashboard.jobs.length}</p><p class="muted">Pubblicati o in revisione</p></article>
        <article class="card"><h3>Richieste</h3><p class="lead">${state.dashboard.requests.length + state.dashboard.applications.length}</p><p class="muted">Candidature e richieste inviate</p></article>
      </div>
      <div class="grid" style="margin-top:14px">
        <article class="card">
          <h3>I tuoi annunci</h3>
          <div class="list">${state.dashboard.jobs.length ? state.dashboard.jobs.map((job) => `<p><strong>${escapeHtml(job.title)}</strong><br><span class="muted">${statusPill(job.publication_status)} - ${dateLabel(job.event_date)}</span></p>`).join("") : `<p class="muted">Nessun annuncio creato.</p>`}</div>
        </article>
        <article class="card">
          <h3>Candidature</h3>
          <div class="list">${state.dashboard.applications.length ? state.dashboard.applications.map((app) => `<p><strong>${escapeHtml(app.job?.title || "Annuncio")}</strong><br><span class="muted">${escapeHtml(app.status)}</span></p>`).join("") : `<p class="muted">Nessuna candidatura inviata.</p>`}</div>
        </article>
        <article class="card">
          <h3>Richieste cliente</h3>
          <div class="list">${state.dashboard.requests.length ? state.dashboard.requests.map((request) => `<p><strong>${escapeHtml(request.artist?.display_name || "Artista")}</strong><br><span class="muted">${escapeHtml(request.status)} - ${dateLabel(request.event_date)}</span></p>`).join("") : `<p class="muted">Nessuna richiesta inviata.</p>`}</div>
        </article>
      </div>
    </section>
  `;
}

function adminPage() {
  if (!state.profile?.is_admin) {
    return `<section class="section">${emptyState("Area riservata agli amministratori NovaVision.")}</section>`;
  }
  return `
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Admin</p>
          <h2>Coda approvazione.</h2>
        </div>
      </div>
      <div class="grid-2">
        <article class="panel">
          <h3>Profili</h3>
          <div class="list">${state.adminQueue.profiles.length ? state.adminQueue.profiles.map((profile) => reviewItem("profiles", profile)).join("") : `<p class="muted">Nessun profilo in revisione.</p>`}</div>
        </article>
        <article class="panel">
          <h3>Annunci</h3>
          <div class="list">${state.adminQueue.jobs.length ? state.adminQueue.jobs.map((job) => reviewItem("jobs", job)).join("") : `<p class="muted">Nessun annuncio in revisione.</p>`}</div>
        </article>
      </div>
    </section>
  `;
}

function reviewItem(table, item) {
  const title = item.display_name || item.title || item.email;
  const body = item.bio || item.description || item.city || "";
  return `
    <div class="card">
      <h3>${escapeHtml(title)}</h3>
      <p class="muted">${escapeHtml(body)}</p>
      <div class="row">
        <button class="btn btn-primary btn-small" data-review="${table}:${item.id}:approved">Approva</button>
        <button class="btn btn-danger btn-small" data-review="${table}:${item.id}:rejected">Rifiuta</button>
      </div>
    </div>
  `;
}

function statusPill(status) {
  const label = {
    approved: "approvato",
    pending_review: "in revisione",
    rejected: "rifiutato",
    draft: "bozza",
    archived: "archiviato"
  }[status] || status;
  return `<span class="pill ${status === "approved" ? "pill-success" : "pill-warning"}">${label}</span>`;
}

function legalPage(title, body) {
  return `<section class="section"><article class="legal-doc"><p class="eyebrow">NovaVision</p><h2>${title}</h2>${body}</article></section>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="brand"><img src="/novavision-logo.png" alt="Logo NovaVision"><span>NovaVision</span></div>
          <p class="muted">Marketplace diretto per artisti, clienti, eventi e produzioni.</p>
        </div>
        <div class="footer-links">
          <button class="text-btn" data-route="terms">Termini</button>
          <button class="text-btn" data-route="privacy">Privacy</button>
          <button class="text-btn" data-route="cookies">Cookie</button>
        </div>
      </div>
      <p class="muted">Contatti: info@novavisionmgmt.com - Eugenio Mangini 342 622 0391 - Filippo Ravasio 327 115 6830 - Daniel Calzone 351 900 1260</p>
    </footer>
  `;
}

function authModal() {
  return `
    <div class="modal-backdrop hidden" id="authModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="authTitle">
        <div class="modal-head">
          <h3 id="authTitle">${state.authMode === "login" ? "Accedi" : "Crea account"}</h3>
          <button class="modal-close" data-close="authModal" aria-label="Chiudi">×</button>
        </div>
        <div class="modal-body" id="authModalBody"></div>
      </div>
    </div>
  `;
}

function renderAuthModal() {
  const body = $("#authModalBody");
  if (!body) return;
  body.innerHTML = `
    <div class="tabs">
      <button class="${state.authMode === "register" ? "active" : ""}" data-auth-mode="register">Registrati</button>
      <button class="${state.authMode === "login" ? "active" : ""}" data-auth-mode="login">Accedi</button>
    </div>
    ${state.authMode === "register" ? `
      <div class="tabs">
        <button class="${state.authRole === "artist" ? "active" : ""}" data-auth-role="artist">Sono artista</button>
        <button class="${state.authRole === "client" ? "active" : ""}" data-auth-role="client">Sono cliente</button>
      </div>
    ` : ""}
    <form id="authForm" class="form-grid">
      ${state.authMode === "register" ? `<label class="field full">Nome e cognome<input name="name" required autocomplete="name"></label>` : ""}
      <label class="field full">Email<input name="email" type="email" required autocomplete="email"></label>
      <label class="field full">Password<input name="password" type="password" minlength="6" required autocomplete="${state.authMode === "login" ? "current-password" : "new-password"}"></label>
      <button class="btn btn-primary btn-block full" type="submit">${state.authMode === "login" ? "Accedi" : "Crea account Free"}</button>
    </form>
    <div class="row" style="margin-top:12px">
      <button class="btn btn-secondary" data-oauth="google">Continua con Google</button>
      <button class="btn btn-secondary" data-oauth="apple">Continua con Apple</button>
    </div>
    <p class="muted" style="margin-top:12px">Continuando accetti Termini, Privacy e regole della piattaforma.</p>
  `;
}

function profileModal() {
  return `
    <div class="modal-backdrop hidden" id="profileModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="profileTitle">
        <div class="modal-head">
          <h3 id="profileTitle">Profilo NovaVision</h3>
          <button class="modal-close" data-close="profileModal" aria-label="Chiudi">×</button>
        </div>
        <div class="modal-body">
          <form id="profileForm" class="form-grid">
            <label class="field">Nome pubblico<input name="display_name" required value="${escapeHtml(state.profile?.display_name || "")}"></label>
            <label class="field">Ruolo<select name="role"><option value="artist" ${state.profile?.role === "artist" ? "selected" : ""}>Artista</option><option value="client" ${state.profile?.role === "client" ? "selected" : ""}>Cliente</option></select></label>
            <label class="field">Città<input name="city" value="${escapeHtml(state.profile?.city || "")}"></label>
            <label class="field">Telefono<input name="phone" value="${escapeHtml(state.profile?.phone || "")}"></label>
            <label class="field">Categoria<select name="category">${categoryOptions(state.profile?.category || "all")}</select></label>
            <label class="field">Strumento / ruolo<input name="instrument" value="${escapeHtml(state.profile?.instrument || "")}"></label>
            <label class="field">Compenso da<input name="price_min" type="number" min="0" value="${escapeHtml(state.profile?.price_min || "")}"></label>
            <label class="field">Foto profilo<input name="avatar" type="file" accept="image/png,image/jpeg,image/webp"></label>
            <label class="field full">Formazione<input name="education" value="${escapeHtml(state.profile?.education || "")}"></label>
            <label class="field full">Diploma / titolo<input name="diploma" value="${escapeHtml(state.profile?.diploma || "")}"></label>
            <label class="field full">Bio<textarea name="bio">${escapeHtml(state.profile?.bio || "")}</textarea></label>
            <button class="btn btn-primary btn-block full" type="submit">Salva profilo</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function jobModal() {
  return `
    <div class="modal-backdrop hidden" id="jobModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="jobTitle">
        <div class="modal-head">
          <h3 id="jobTitle">Pubblica annuncio</h3>
          <button class="modal-close" data-close="jobModal" aria-label="Chiudi">×</button>
        </div>
        <div class="modal-body">
          <form id="jobForm" class="form-grid">
            <label class="field full">Titolo<input name="title" required></label>
            <label class="field">Città<input name="city" required></label>
            <label class="field">Data evento<input name="eventDate" type="date" required></label>
            <label class="field">Categoria<select name="category">${categoryOptions("all")}</select></label>
            <label class="field">Genere<input name="genre"></label>
            <label class="field">Strumento / ruolo<input name="instrument"></label>
            <label class="field">Budget massimo<input name="budgetMax" type="number" min="0" required></label>
            <label class="field full">Descrizione<textarea name="description" required></textarea></label>
            <button class="btn btn-primary btn-block full" type="submit">Invia in approvazione</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function bookingModal() {
  return `
    <div class="modal-backdrop hidden" id="bookingModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="bookingTitle">
        <div class="modal-head">
          <h3 id="bookingTitle">Richiesta diretta</h3>
          <button class="modal-close" data-close="bookingModal" aria-label="Chiudi">×</button>
        </div>
        <div class="modal-body">
          <form id="bookingForm" class="form-grid">
            <label class="field">Tipo evento<input name="eventType" required placeholder="Matrimonio, locale, azienda..."></label>
            <label class="field">Città<input name="city" required></label>
            <label class="field">Data<input name="eventDate" type="date" required></label>
            <label class="field">Budget<input name="budget" type="number" min="0" required></label>
            <label class="field full">Messaggio<textarea name="message" required></textarea></label>
            <button class="btn btn-primary btn-block full" type="submit">Invia richiesta</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function categoryOptions(selected) {
  return `<option value="all">Tutte</option>${categories.map((category) => `<option value="${category}" ${selected === category ? "selected" : ""}>${category}</option>`).join("")}`;
}

function emptyState(message) {
  return `<div class="empty">${message}</div>`;
}

function termsText() {
  return `
    <p>Questi Termini regolano l’uso della piattaforma NovaVision da parte di artisti, clienti, location e operatori autorizzati. La piattaforma consente la creazione di profili, pubblicazione di annunci, invio di candidature, messaggi e gestione di abbonamenti.</p>
    <p>Gli utenti sono responsabili dell’esattezza dei dati inseriti, dei contenuti caricati e degli accordi economici presi con le controparti. NovaVision non trattiene automaticamente compensi artistici salvo servizi o abbonamenti esplicitamente acquistati.</p>
    <p>I contenuti pubblici possono essere sottoposti a revisione. NovaVision può sospendere profili, annunci o account in caso di abuso, dati falsi, contenuti illeciti o violazione delle regole della piattaforma.</p>
    <p><strong>Nota operativa:</strong> testo pronto per revisione legale prima della pubblicazione aperta.</p>
  `;
}

function privacyText() {
  return `
    <p>NovaVision tratta dati identificativi, contatti, informazioni professionali, messaggi, richieste, candidature, dati tecnici e dati di pagamento gestiti da Stripe. Le password e l’autenticazione sono gestite da Supabase Auth.</p>
    <p>I dati sono usati per erogare il servizio, mostrare profili approvati, consentire comunicazioni tra utenti, prevenire abusi, amministrare abbonamenti e adempiere agli obblighi applicabili.</p>
    <p>Foto profilo e asset caricati sono conservati su Supabase Storage. I pagamenti sono processati da Stripe; NovaVision non conserva numeri completi di carta.</p>
    <p><strong>Nota operativa:</strong> integrare titolare, base giuridica, tempi di conservazione, DPA e contatti privacy prima del go-live definitivo.</p>
  `;
}

function cookiesText() {
  return `
    <p>La piattaforma usa tecnologie necessarie per autenticazione, sicurezza, preferenze locali e funzionamento dell’applicazione. Eventuali strumenti analitici o marketing dovranno essere aggiunti solo dopo configurazione del consenso.</p>
    <p>Supabase e Stripe possono usare tecnologie tecniche necessarie per autenticazione, sessioni e pagamenti.</p>
    <p><strong>Nota operativa:</strong> completare con elenco cookie effettivi prima della pubblicazione aperta.</p>
  `;
}

async function refreshRouteData(route = state.route) {
  if (!isConfigured) return;
  try {
    if (route === "discover" || route === "home") {
      state.artists = await fetchArtists({
        city: state.filters.artistCity,
        category: state.filters.artistCategory,
        maxPrice: state.filters.maxPrice
      });
    }
    if (route === "jobs" || route === "home") {
      state.jobs = await fetchJobs({
        city: state.filters.jobCity,
        category: state.filters.jobCategory,
        date: state.filters.jobDate,
        minBudget: state.filters.minBudget
      });
    }
    if (route === "messages" && state.user) {
      state.conversations = await fetchConversations(state.user.id);
      state.selectedConversationId ||= state.conversations[0]?.id || null;
    }
    if (route === "dashboard" && state.user) {
      state.dashboard = await fetchDashboard(state.user.id);
    }
    if (route === "admin" && state.profile?.is_admin) {
      state.adminQueue = await fetchAdminQueue();
    }
    render();
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function loadIdentity() {
  if (!isConfigured) return;
  const { session, user } = await getSession();
  state.session = session;
  state.user = user;
  state.profile = user ? await fetchProfile(user.id) : null;
}

function bindGlobalEvents() {
  document.addEventListener("click", async (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      setRoute(routeButton.dataset.route);
      return;
    }

    if (event.target.closest("[data-open-login]")) openAuth("login");
    if (event.target.closest("[data-open-register]")) openAuth("register");
    if (event.target.closest("[data-edit-profile]")) {
      if (!requireAuth()) return;
      render();
      openModal("profileModal");
    }
    if (event.target.closest("[data-open-job]")) {
      if (!requireAuth()) return;
      openModal("jobModal");
    }
    if (event.target.closest("[data-close]")) closeModal(event.target.closest("[data-close]").dataset.close);
    if (event.target.classList.contains("modal-backdrop")) event.target.classList.add("hidden");
    if (event.target.closest("[data-logout]")) await handleLogout();

    const oauth = event.target.closest("[data-oauth]");
    if (oauth && requireConfigured()) await signInWithOAuth(oauth.dataset.oauth);

    const mode = event.target.closest("[data-auth-mode]");
    if (mode) {
      state.authMode = mode.dataset.authMode;
      renderAuthModal();
    }
    const role = event.target.closest("[data-auth-role]");
    if (role) {
      state.authRole = role.dataset.authRole;
      renderAuthModal();
    }

    const checkout = event.target.closest("[data-checkout]");
    if (checkout) await handleCheckout(checkout.dataset.checkout);
    if (event.target.closest("[data-portal]")) await handlePortal();

    const book = event.target.closest("[data-book-artist]");
    if (book) {
      if (!requireAuth()) return;
      state.selectedArtist = book.dataset.bookArtist;
      openModal("bookingModal");
    }

    const message = event.target.closest("[data-message-artist]");
    if (message) await handleStartConversation(message.dataset.messageArtist);

    const apply = event.target.closest("[data-apply-job]");
    if (apply) await handleApplication(apply.dataset.applyJob);

    const selectConversation = event.target.closest("[data-select-conversation]");
    if (selectConversation) {
      state.selectedConversationId = selectConversation.dataset.selectConversation;
      render();
    }

    const resetArtist = event.target.closest("[data-reset-artist-filters]");
    if (resetArtist) {
      state.filters.artistCity = "";
      state.filters.artistCategory = "all";
      state.filters.maxPrice = "";
      await refreshRouteData("discover");
    }

    const resetJob = event.target.closest("[data-reset-job-filters]");
    if (resetJob) {
      state.filters.jobCity = "";
      state.filters.jobCategory = "all";
      state.filters.jobDate = "";
      state.filters.minBudget = "";
      await refreshRouteData("jobs");
    }

    const review = event.target.closest("[data-review]");
    if (review) {
      const [table, id, status] = review.dataset.review.split(":");
      await updateReviewStatus(table, id, status);
      toast("Stato aggiornato.", "success");
      await refreshRouteData("admin");
    }
  });

  document.addEventListener("submit", async (event) => {
    if (event.target.id === "heroSearch") {
      event.preventDefault();
      const form = new FormData(event.target);
      state.filters.artistCity = form.get("city") || "";
      state.filters.artistCategory = form.get("category") || "all";
      setRoute("discover");
    }
    if (event.target.id === "authForm") await handleAuth(event);
    if (event.target.id === "profileForm") await handleProfileSave(event);
    if (event.target.id === "jobForm") await handleJobCreate(event);
    if (event.target.id === "bookingForm") await handleBooking(event);
    if (event.target.id === "messageForm") await handleMessage(event);
  });

  document.addEventListener("input", async (event) => {
    if (event.target.id === "artistCity") state.filters.artistCity = event.target.value;
    if (event.target.id === "artistCategory") state.filters.artistCategory = event.target.value;
    if (event.target.id === "maxPrice") state.filters.maxPrice = event.target.value;
    if (["artistCity", "artistCategory", "maxPrice"].includes(event.target.id)) await refreshRouteData("discover");
    if (event.target.id === "jobCity") state.filters.jobCity = event.target.value;
    if (event.target.id === "jobCategory") state.filters.jobCategory = event.target.value;
    if (event.target.id === "jobDate") state.filters.jobDate = event.target.value;
    if (event.target.id === "minBudget") state.filters.minBudget = event.target.value;
    if (["jobCity", "jobCategory", "jobDate", "minBudget"].includes(event.target.id)) await refreshRouteData("jobs");
  });
}

async function handleAuth(event) {
  event.preventDefault();
  if (!requireConfigured()) return;
  const form = new FormData(event.target);
  try {
    if (state.authMode === "login") {
      const data = await signInWithPassword(form.get("email"), form.get("password"));
      state.session = data.session;
      state.user = data.user;
    } else {
      const data = await signUpWithProfile({
        email: form.get("email"),
        password: form.get("password"),
        name: form.get("name"),
        role: state.authRole
      });
      state.session = data.session;
      state.user = data.user;
      toast(data.session ? "Account creato." : "Account creato. Controlla l’email per confermare l’accesso.", "success");
    }
    await loadIdentity();
    closeModal("authModal");
    render();
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleLogout() {
  try {
    await signOut();
    state.session = null;
    state.user = null;
    state.profile = null;
    state.route = "home";
    render();
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleProfileSave(event) {
  event.preventDefault();
  if (!requireAuth()) return;
  const form = new FormData(event.target);
  try {
    let avatarUrl = state.profile?.avatar_url || null;
    const avatarFile = form.get("avatar");
    if (avatarFile?.size) avatarUrl = await uploadAvatar(state.user.id, avatarFile);
    state.profile = await saveProfile({
      id: state.user.id,
      email: state.user.email,
      display_name: form.get("display_name"),
      role: form.get("role"),
      city: form.get("city"),
      phone: form.get("phone"),
      category: form.get("category") === "all" ? null : form.get("category"),
      instrument: form.get("instrument"),
      price_min: form.get("price_min") ? Number(form.get("price_min")) : null,
      education: form.get("education"),
      diploma: form.get("diploma"),
      bio: form.get("bio"),
      avatar_url: avatarUrl,
      publication_status: form.get("role") === "artist" && state.profile?.publication_status !== "approved" ? "pending_review" : state.profile?.publication_status || "approved"
    });
    closeModal("profileModal");
    toast("Profilo salvato. Le modifiche pubbliche possono richiedere approvazione.", "success");
    await refreshRouteData(state.route);
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleJobCreate(event) {
  event.preventDefault();
  if (!requireAuth()) return;
  const form = new FormData(event.target);
  try {
    await createJob(state.user.id, Object.fromEntries(form.entries()));
    closeModal("jobModal");
    event.target.reset();
    toast("Annuncio inviato in approvazione.", "success");
    await refreshRouteData("dashboard");
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleBooking(event) {
  event.preventDefault();
  if (!requireAuth()) return;
  const form = new FormData(event.target);
  try {
    await createBookingRequest(state.user.id, {
      artistId: state.selectedArtist,
      ...Object.fromEntries(form.entries())
    });
    closeModal("bookingModal");
    event.target.reset();
    toast("Richiesta inviata.", "success");
    await refreshRouteData("dashboard");
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleApplication(jobId) {
  if (!requireAuth()) return;
  if (state.profile?.role !== "artist") {
    toast("Solo gli account artista possono candidarsi agli annunci.", "danger");
    return;
  }
  const message = window.prompt("Messaggio per il cliente");
  if (!message) return;
  try {
    await createApplication(state.user.id, jobId, message);
    toast("Candidatura inviata.", "success");
    await refreshRouteData("dashboard");
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleStartConversation(artistId) {
  if (!requireAuth()) return;
  try {
    const conversation = await startConversation({ clientId: state.user.id, artistId });
    state.selectedConversationId = conversation.id;
    setRoute("messages");
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleMessage(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const body = String(form.get("body") || "").trim();
  if (!body || !state.selectedConversationId) return;
  try {
    await sendMessage(state.selectedConversationId, state.user.id, body);
    event.target.reset();
    await refreshRouteData("messages");
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handleCheckout(planKey) {
  if (!requireAuth()) return;
  try {
    const data = await createCheckoutSession(planKey, state.session.access_token);
    window.location.assign(data.url);
  } catch (error) {
    toast(error.message, "danger");
  }
}

async function handlePortal() {
  if (!requireAuth()) return;
  try {
    const data = await createPortalSession(state.session.access_token);
    window.location.assign(data.url);
  } catch (error) {
    toast(error.message, "danger");
  }
}

function render() {
  const app = $("#app");
  app.innerHTML = appShell();
  renderAuthModal();
}

async function init() {
  state.route = window.location.hash?.replace("#", "") || "home";
  render();
  bindGlobalEvents();

  if (isConfigured) {
    try {
      await loadIdentity();
      await refreshRouteData(state.route);
      onAuthChange(async (session) => {
        state.session = session;
        state.user = session?.user || null;
        state.profile = state.user ? await fetchProfile(state.user.id) : null;
        render();
      });
    } catch (error) {
      toast(error.message, "danger");
    }
  }
}

init();
