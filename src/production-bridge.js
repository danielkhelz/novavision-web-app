import { supabase } from "./services/supabaseClient.js";
import { config, isConfigured } from "./config.js";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let session = null;
let profile = null;
let subscription = null;
let productionArtists = [];
let productionJobs = [];
const pendingRegistrationKey = "novavision_pending_registration";
const postAuthRouteKey = "novavision_post_auth_route";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function toast(message) {
  if (typeof window.showToast === "function") window.showToast(message);
  else console.log(message);
}

function authErrorMessage(error) {
  const message = String(error?.message || "").toLowerCase();
  if (message.includes("email not confirmed")) {
    return "Email non confermata. Conferma l'account da Supabase prima di accedere.";
  }
  if (message.includes("invalid login credentials")) {
    return "Email o password non corrette, oppure account creato con Google/Apple.";
  }
  if (message.includes("failed to fetch") || message.includes("network")) {
    return "Connessione a Supabase bloccata. Disattiva Brave Shields per questo sito e riprova.";
  }
  return error?.message || "Accesso non riuscito.";
}

function stop(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function activeRole() {
  return $("[data-role].active")?.dataset.role || profile?.role || "artist";
}

function activeBilling() {
  return $("[data-auth-cycle].active")?.dataset.authCycle || $("[data-pricing-cycle].active")?.dataset.pricingCycle || "monthly";
}

function activeTier() {
  return ($("#authPlanName")?.textContent || "").toLowerCase().includes("free") ? "free" : "premium";
}

function planKey(role = activeRole(), billing = activeBilling()) {
  return `${role}_${billing}`;
}

function readStoredJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function registrationProfile(role = activeRole()) {
  return {
    role,
    display_name: $("#authName")?.value?.trim() || "Utente NovaVision",
    phone: $("#authPhone")?.value?.trim() || null,
    city: $("#authCity")?.value?.trim() || "Milano",
    category: role === "artist" ? $("#authCategory")?.value || null : null,
    birth_date: role === "artist" ? $("#authBirthDate")?.value || null : null,
    instrument: role === "artist" ? $("#authInstrument")?.value?.trim() || null : null,
    diploma: role === "artist" ? $("#authDiploma")?.value?.trim() || null : null,
    education: role === "artist" ? $("#authEducation")?.value?.trim() || null : null
  };
}

function rememberPendingRegistration(role = activeRole()) {
  const pending = registrationProfile(role);
  localStorage.setItem(pendingRegistrationKey, JSON.stringify(pending));
  return pending;
}

function authRedirectUrl(flow) {
  const url = new URL(config.appUrl);
  url.searchParams.set("auth", flow);
  return url.toString();
}

async function createMissingProfile(user) {
  const pending = readStoredJson(pendingRegistrationKey) || {};
  const metadata = user.user_metadata || {};
  const role = pending.role || metadata.role || "client";
  const row = {
    id: user.id,
    email: user.email,
    role,
    display_name: pending.display_name || metadata.display_name || metadata.full_name || "Utente NovaVision",
    phone: pending.phone || null,
    city: pending.city || "Milano",
    category: role === "artist" ? pending.category || null : null,
    birth_date: role === "artist" ? pending.birth_date || null : null,
    instrument: role === "artist" ? pending.instrument || null : null,
    diploma: role === "artist" ? pending.diploma || null : null,
    education: role === "artist" ? pending.education || null : null,
    publication_status: role === "artist" ? "pending_review" : "approved"
  };

  const { data, error } = await supabase.from("profiles").insert(row).select("*").single();
  if (error) throw error;
  return data;
}

function legacySubscription() {
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    return {
      role: profile?.role || "artist",
      tier: "free",
      cycle: "free",
      amount: 0,
      status: "active",
      startedAt: new Date().toISOString(),
      renewsAt: null
    };
  }

  const [, cycle = "monthly"] = (subscription.plan_key || "").split("_");
  return {
    role: profile?.role || "artist",
    tier: "premium",
    cycle,
    amount: 0,
    status: subscription.status,
    startedAt: subscription.created_at || new Date().toISOString(),
    renewsAt: subscription.current_period_end
  };
}

function legacyUserFromProfile(row = profile) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.display_name || row.email || "Utente NovaVision",
    email: row.email,
    phone: row.phone || "",
    role: row.role || "artist",
    city: row.city || "Milano",
    category: row.category,
    birthDate: row.birth_date,
    instrument: row.instrument,
    diploma: row.diploma,
    education: row.education,
    photo: row.avatar_url,
    provider: "supabase",
    subscription: legacySubscription()
  };
}

function persistLegacyUser(row = profile) {
  const user = legacyUserFromProfile(row);
  if (!user) return;
  localStorage.setItem("novavision_user", JSON.stringify(user));
  localStorage.setItem("novavision_registered_account", JSON.stringify(user));
}

function clearLegacyUser() {
  localStorage.removeItem("novavision_user");
  localStorage.removeItem("novavision_registered_account");
}

async function refreshIdentity() {
  if (!supabase) return;
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  session = sessionData.session;

  if (!session?.user) {
    profile = null;
    subscription = null;
    return;
  }

  const [{ data: profileData, error: profileError }, { data: subscriptionData, error: subscriptionError }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
    supabase.from("subscriptions").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }).limit(1).maybeSingle()
  ]);

  if (profileError) throw profileError;
  if (subscriptionError) throw subscriptionError;
  profile = profileData || await createMissingProfile(session.user);
  subscription = subscriptionData;
  if (profile) persistLegacyUser(profile);
}

async function uploadAvatar(userId) {
  const file = $("#authPhoto")?.files?.[0];
  if (!file) return null;
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/avatar-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("profile-assets").upload(path, file, {
    upsert: true,
    contentType: file.type
  });
  if (error) throw error;
  return supabase.storage.from("profile-assets").getPublicUrl(path).data.publicUrl;
}

async function upsertProfile(user, role) {
  const avatarUrl = await uploadAvatar(user.id);
  const row = {
    id: user.id,
    email: user.email,
    role,
    display_name: $("#authName")?.value?.trim() || user.user_metadata?.display_name || "Utente NovaVision",
    phone: $("#authPhone")?.value?.trim() || null,
    city: $("#authCity")?.value?.trim() || "Milano",
    category: role === "artist" ? $("#authCategory")?.value || null : null,
    birth_date: role === "artist" ? $("#authBirthDate")?.value || null : null,
    instrument: role === "artist" ? $("#authInstrument")?.value?.trim() || null : null,
    diploma: role === "artist" ? $("#authDiploma")?.value?.trim() || null : null,
    education: role === "artist" ? $("#authEducation")?.value?.trim() || null : null,
    avatar_url: avatarUrl,
    publication_status: role === "artist" ? "pending_review" : "approved"
  };

  if (!avatarUrl) delete row.avatar_url;

  const { data, error } = await supabase.from("profiles").upsert(row).select("*").single();
  if (error) throw error;
  profile = data;
  persistLegacyUser(data);
  return data;
}

async function handleAuthSubmit(event) {
  if (!isConfigured) return;
  if (event.target?.id !== "authForm") return;
  stop(event);

  const mode = $("[data-auth-mode].active")?.dataset.authMode || "register";
  const email = $("#authEmail")?.value?.trim();
  const password = $("#authPassword")?.value;

  try {
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      session = data.session;
      await refreshIdentity();
      toast("Accesso effettuato con Supabase.");
      window.location.reload();
      return;
    }

    const role = activeRole();
    rememberPendingRegistration(role);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: authRedirectUrl("confirm"),
        data: {
          display_name: $("#authName")?.value?.trim() || "Utente NovaVision",
          role
        }
      }
    });
    if (error) throw error;
    if (!data.session) {
      toast("Account creato. Controlla l'email per confermare l'accesso, poi accedi.");
      return;
    }

    session = data.session;
    await upsertProfile(data.user, role);
    localStorage.removeItem(pendingRegistrationKey);

    if (activeTier() === "premium") {
      await startStripeCheckout(planKey(role, activeBilling()));
      return;
    }

    toast(role === "artist" ? "Account creato. Profilo in revisione." : "Account cliente creato.");
    window.location.reload();
  } catch (error) {
    toast(authErrorMessage(error));
  }
}

async function handleOAuthClick(event) {
  if (!isConfigured) return;
  const button = event.target.closest("[data-social]");
  if (!button) return;
  stop(event);
  const provider = button.dataset.social.toLowerCase();
  rememberPendingRegistration(activeRole());
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: authRedirectUrl(provider) }
  });
  if (error) toast(error.message);
}

function handleRegistrationClick(event) {
  const button = event.target.closest("#registerButton, #gateRegisterButton, [data-mobile-register], [data-open-register], [data-start-plan], [data-start-free]");
  if (!button) return;

  const role = button.dataset.openRegister || button.dataset.startPlan || "artist";
  if (button.matches("[data-start-plan]")) {
    window.startPlanRegistration?.(role);
  } else {
    window.startFreeRegistration?.(role);
  }

  window.setTimeout(() => {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }, 0);
}

function handleLoginModalClick(event) {
  const button = event.target.closest("#loginButton, #gateLoginButton, [data-mobile-login]");
  if (!button) return;

  window.setAuthMode?.("login");
  window.setTimeout(() => {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }, 0);
}

function showLoginModal() {
  window.setAuthMode?.("login");

  $$("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === "login");
  });
  $("#authModalTitle").textContent = "Bentornato";
  $("#roleCards").classList.add("hidden");
  $("#planTierSelector").classList.add("hidden");
  $("#subscriptionChooser").classList.add("hidden");
  $("#locationRegistrationField").classList.add("hidden");
  $$(".artist-only").forEach((element) => element.classList.add("hidden"));
  $("#authName")?.closest(".field")?.classList.add("hidden");
  $("#authCity")?.closest(".field")?.classList.add("hidden");
  $("#authName").required = false;
  $("#authCity").required = false;
  $("#authName").disabled = true;
  $("#authCity").disabled = true;
  $("#authForm button[type='submit']").textContent = "Accedi";
  $("#authModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

async function startStripeCheckout(selectedPlanKey) {
  await refreshIdentity();
  if (!session?.access_token) {
    toast("Accedi prima di attivare un abbonamento.");
    return;
  }

  localStorage.setItem("novavision_plan_key", selectedPlanKey);
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ planKey: selectedPlanKey })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Checkout Stripe non disponibile.");
  window.location.assign(data.url);
}

async function handleCheckoutClick(event) {
  if (!isConfigured) return;
  const submit = event.target.closest("#paymentForm button[type='submit']");
  if (!submit) return;
  stop(event);
  try {
    const selected = localStorage.getItem("novavision_plan_key") || planKey(profile?.role || "artist", activeBilling());
    await startStripeCheckout(selected);
  } catch (error) {
    toast(error.message);
  }
}

async function handlePaymentSubmit(event) {
  if (!isConfigured || event.target?.id !== "paymentForm") return;
  stop(event);
  try {
    const selected = localStorage.getItem("novavision_plan_key") || planKey(profile?.role || "artist", activeBilling());
    await startStripeCheckout(selected);
  } catch (error) {
    toast(error.message);
  }
}

async function handlePortalClick(event) {
  if (!isConfigured) return;
  const button = event.target.closest("#manageSubscriptionButton");
  if (!button) return;
  stop(event);
  try {
    await refreshIdentity();
    if (!session?.access_token) {
      toast("Accedi per gestire l'abbonamento.");
      return;
    }

    if (!subscription || !["active", "trialing"].includes(subscription.status)) {
      await startStripeCheckout(planKey(profile?.role || "artist", "monthly"));
      return;
    }

    const response = await fetch("/api/create-customer-portal-session", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Portale Stripe non disponibile.");
    window.location.assign(data.url);
  } catch (error) {
    toast(error.message);
  }
}

async function handleLogoutClick(event) {
  if (!isConfigured) return;
  if (!event.target.closest("#logoutButton, [data-mobile-logout]")) return;
  stop(event);
  await supabase.auth.signOut();
  clearLegacyUser();
  window.location.reload();
}

function initials(value = "NV") {
  return value.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "NV";
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

function formatCurrency(value) {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value || 0);
}

function formatDate(value) {
  if (!value) return "Data da definire";
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function artistCard(row, index) {
  const name = row.display_name || "Artista NovaVision";
  return `
    <article class="artist-card">
      <div class="artist-cover cover-${(index % 6) + 1}">
        ${row.avatar_url ? `<img src="${escapeHtml(row.avatar_url)}" alt="Foto profilo di ${escapeHtml(name)}">` : initials(name)}
      </div>
      <div class="artist-body">
        <div class="artist-title">
          <h3>${escapeHtml(name)}</h3>
          ${row.verified ? '<span class="check">Verificato</span>' : '<span class="check">Approvato</span>'}
        </div>
        <p>${escapeHtml(row.category || "Professionista")} · ${escapeHtml(row.city || "Italia")}</p>
        <div class="tag-row">
          ${[row.instrument, row.category, row.city].filter(Boolean).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="artist-footer">
          <strong>${row.price_min ? `da ${formatCurrency(row.price_min)}` : "Preventivo su richiesta"}</strong>
          <div>
            <button class="btn btn-secondary btn-small" data-production-message="${row.id}">Messaggio</button>
            <button class="btn btn-primary btn-small" data-production-book="${row.id}" data-production-name="${escapeHtml(name)}">Richiedi</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function jobCard(row) {
  return `
    <article class="job-card">
      <div class="job-card-top">
        <div class="company-logo">${initials(row.owner?.display_name || row.title)}</div>
        <span class="tag">${escapeHtml(row.category || "Evento")}</span>
      </div>
      <h3>${escapeHtml(row.title)}</h3>
      <div class="job-company">${escapeHtml(row.owner?.display_name || "Cliente verificato")} · profilo verificato</div>
      <div class="job-info">
        <span>${escapeHtml(row.city)}</span>
        <span>${formatDate(row.event_date)}</span>
        <span>fino a ${formatCurrency(row.budget_max)}</span>
        ${row.genre ? `<span>${escapeHtml(row.genre)}</span>` : ""}
        ${row.instrument ? `<span>${escapeHtml(row.instrument)}</span>` : ""}
      </div>
      <p>${escapeHtml(row.description)}</p>
      <div class="job-footer">
        <span class="applicants">candidature reali · compenso diretto</span>
        <button class="btn btn-primary btn-small" data-production-apply="${row.id}">Candidati</button>
      </div>
    </article>
  `;
}

async function renderProductionArtists() {
  if (!isConfigured || !supabase) return;
  const city = $("#filterCity")?.value?.trim();
  const category = $("#filterCategory")?.value;
  const maxPrice = Number($("#filterPrice")?.value || 0);

  let query = supabase
    .from("profiles")
    .select("*")
    .eq("role", "artist")
    .eq("publication_status", "approved")
    .order("verified", { ascending: false })
    .order("created_at", { ascending: false });

  if (city) query = query.ilike("city", `%${city}%`);
  if (category) query = query.eq("category", category);
  if (maxPrice) query = query.or(`price_min.is.null,price_min.lte.${maxPrice}`);

  const { data, error } = await query.limit(80);
  if (error) throw error;
  productionArtists = data || [];

  if (!productionArtists.length) return;
  $("#resultsCount").textContent = `${productionArtists.length} ${productionArtists.length === 1 ? "artista trovato" : "artisti trovati"}`;
  $("#artistResults").innerHTML = productionArtists.map(artistCard).join("");
}

async function renderProductionJobs() {
  if (!isConfigured || !supabase || !$("#jobGrid")) return;
  const city = $("#jobFilterCity")?.value?.trim();
  const date = $("#jobFilterDate")?.value;
  const genre = $("#jobFilterGenre")?.value;
  const instrument = $("#jobFilterInstrument")?.value;
  const budget = Number($("#jobFilterBudget")?.value || 0);

  let query = supabase
    .from("jobs")
    .select("*, owner:profiles!jobs_owner_id_fkey(display_name)")
    .eq("publication_status", "approved")
    .order("event_date", { ascending: true });

  if (city) query = query.ilike("city", `%${city}%`);
  if (date) query = query.eq("event_date", date);
  if (genre) query = query.eq("genre", genre);
  if (instrument) query = query.eq("instrument", instrument);
  if (budget) query = query.gte("budget_max", budget);

  const { data, error } = await query.limit(80);
  if (error) throw error;
  productionJobs = data || [];
  if (productionJobs.length) $("#jobGrid").innerHTML = productionJobs.map(jobCard).join("");
}

async function handleJobSubmit(event) {
  if (!isConfigured || event.target?.id !== "jobForm") return;
  stop(event);
  try {
    await refreshIdentity();
    if (!session?.user) {
      toast("Accedi come cliente per pubblicare un annuncio.");
      return;
    }
    const { error } = await supabase.from("jobs").insert({
      owner_id: session.user.id,
      title: $("#jobTitle").value,
      city: $("#jobCity").value,
      event_date: $("#jobDate").value,
      category: $("#jobCategory").value,
      genre: $("#jobGenre").value,
      instrument: $("#jobInstrument").value,
      budget_max: Number($("#jobBudget").value),
      description: $("#jobDescription").value,
      publication_status: "pending_review"
    });
    if (error) throw error;
    if (typeof window.closeModal === "function") window.closeModal("jobModal");
    event.target.reset();
    toast("Annuncio inviato. Sara' pubblicato dopo approvazione admin.");
  } catch (error) {
    toast(error.message);
  }
}

async function handleBookingSubmit(event) {
  if (!isConfigured || event.target?.id !== "bookingForm") return;
  const artistId = $("#bookingArtistId")?.value;
  if (!uuidPattern.test(artistId || "")) return;
  stop(event);
  try {
    await refreshIdentity();
    if (!session?.user) {
      toast("Accedi per inviare una richiesta.");
      return;
    }
    const { error } = await supabase.from("booking_requests").insert({
      client_id: session.user.id,
      artist_id: artistId,
      event_date: $("#bookingDate").value,
      event_type: $("#bookingEventType").value,
      city: $("#bookingCity").value,
      budget: Number($("#bookingBudget").value),
      message: $("#bookingMessage").value,
      status: "pending"
    });
    if (error) throw error;
    if (typeof window.closeModal === "function") window.closeModal("bookingModal");
    event.target.reset();
    toast("Richiesta inviata all'artista.");
  } catch (error) {
    toast(error.message);
  }
}

async function handleApplyClick(event) {
  if (!isConfigured) return;
  const button = event.target.closest("[data-production-apply]");
  if (!button) return;
  stop(event);
  try {
    await refreshIdentity();
    if (!session?.user) {
      toast("Accedi come artista per candidarti.");
      return;
    }
    const message = window.prompt("Messaggio per il cliente");
    if (!message) return;
    const { error } = await supabase.from("applications").insert({
      job_id: button.dataset.productionApply,
      artist_id: session.user.id,
      message,
      status: "pending"
    });
    if (error) throw error;
    toast("Candidatura inviata.");
  } catch (error) {
    toast(error.message);
  }
}

function handleProductionBookClick(event) {
  const button = event.target.closest("[data-production-book]");
  if (!button) return;
  stop(event);
  $("#bookingArtistId").value = button.dataset.productionBook;
  $("#bookingTitle").textContent = `Contatta ${button.dataset.productionName || "artista"}`;
  if (typeof window.openModal === "function") window.openModal("bookingModal");
}

async function handleProductionMessageClick(event) {
  const button = event.target.closest("[data-production-message]");
  if (!button) return;
  stop(event);
  try {
    await refreshIdentity();
    if (!session?.user) {
      toast("Accedi per inviare messaggi.");
      return;
    }
    const { error } = await supabase.from("conversations").upsert({
      client_id: session.user.id,
      artist_id: button.dataset.productionMessage
    }, { onConflict: "client_id,artist_id" });
    if (error) throw error;
    toast("Conversazione creata. Apri Messaggi per continuare.");
    if (typeof window.routeTo === "function") window.routeTo("messages");
  } catch (error) {
    toast(error.message);
  }
}

function scheduleProductionRender() {
  if (!isConfigured) return;
  window.setTimeout(() => {
    renderProductionArtists().catch((error) => toast(error.message));
    renderProductionJobs().catch((error) => toast(error.message));
  }, 80);
}

function installBridge() {
  if (!isConfigured || !supabase) {
    console.info("NovaVision production bridge inactive: Supabase env is missing.");
    return;
  }

  document.documentElement.dataset.backend = "supabase";
  document.addEventListener("submit", handleAuthSubmit, true);
  document.addEventListener("submit", handlePaymentSubmit, true);
  document.addEventListener("submit", handleJobSubmit, true);
  document.addEventListener("submit", handleBookingSubmit, true);
  document.addEventListener("click", handleRegistrationClick, true);
  document.addEventListener("click", handleLoginModalClick, true);
  document.addEventListener("click", handleOAuthClick, true);
  document.addEventListener("click", handleCheckoutClick, true);
  document.addEventListener("click", handlePortalClick, true);
  document.addEventListener("click", handleLogoutClick, true);
  document.addEventListener("click", handleApplyClick, true);
  document.addEventListener("click", handleProductionBookClick, true);
  document.addEventListener("click", handleProductionMessageClick, true);
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-route], [data-job-filter], #resetFilters, #resetJobFilters")) scheduleProductionRender();
  }, true);
  document.addEventListener("input", (event) => {
    if (["filterCity", "filterCategory", "filterPrice", "jobFilterCity", "jobFilterDate", "jobFilterGenre", "jobFilterInstrument", "jobFilterBudget"].includes(event.target?.id)) {
      scheduleProductionRender();
    }
  }, true);

  supabase.auth.onAuthStateChange(async () => {
    await refreshIdentity().catch(() => {});
    scheduleProductionRender();
  });

  window.addEventListener("DOMContentLoaded", async () => {
    const authAction = new URLSearchParams(window.location.search).get("auth");
    if (authAction === "login") {
      showLoginModal();
      window.history.replaceState({}, "", window.location.pathname || "/");
    }

    const legacyUserBeforeRefresh = readStoredJson("novavision_user");
    await refreshIdentity().catch((error) => toast(error.message));

    if (authAction === "login") {
      showLoginModal();
      scheduleProductionRender();
      return;
    }

    if (session?.user && profile) {
      const needsInterfaceReload = legacyUserBeforeRefresh?.id !== session.user.id;
      if (needsInterfaceReload) {
        sessionStorage.setItem(postAuthRouteKey, "dashboard");
        localStorage.removeItem(pendingRegistrationKey);
        window.location.replace(config.appUrl);
        return;
      }

      if (sessionStorage.getItem(postAuthRouteKey) === "dashboard" || new URLSearchParams(window.location.search).has("auth")) {
        sessionStorage.removeItem(postAuthRouteKey);
        localStorage.removeItem(pendingRegistrationKey);
        window.history.replaceState({}, "", new URL(config.appUrl).pathname || "/");
        window.setTimeout(() => {
          if (typeof window.closeModal === "function") window.closeModal("authModal");
          if (typeof window.routeTo === "function") window.routeTo("dashboard");
          toast("Email confermata. Accesso effettuato.");
        }, 0);
      }
    }

    scheduleProductionRender();
  });
}

installBridge();
