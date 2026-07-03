import { supabase } from "./supabaseClient.js";

export async function fetchProfile(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveProfile(profile) {
  const { data, error } = await supabase.from("profiles").upsert(profile).select("*").single();
  if (error) throw error;
  return data;
}

export async function uploadAvatar(userId, file) {
  if (!file) return null;
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/avatar-${Date.now()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from("profile-assets").upload(path, file, {
    upsert: true,
    contentType: file.type
  });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("profile-assets").getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchArtists(filters = {}) {
  let query = supabase
    .from("profiles")
    .select("id, display_name, city, country, category, instrument, bio, avatar_url, verified, price_min, publication_status")
    .eq("role", "artist")
    .eq("publication_status", "approved")
    .order("verified", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.city) query = query.ilike("city", `%${filters.city}%`);
  if (filters.category && filters.category !== "all") query = query.eq("category", filters.category);
  if (filters.maxPrice) query = query.lte("price_min", Number(filters.maxPrice));

  const { data, error } = await query.limit(80);
  if (error) throw error;
  return data || [];
}

export async function fetchJobs(filters = {}) {
  let query = supabase
    .from("jobs")
    .select("*, owner:profiles!jobs_owner_id_fkey(display_name, city)")
    .eq("publication_status", "approved")
    .order("event_date", { ascending: true });

  if (filters.city) query = query.ilike("city", `%${filters.city}%`);
  if (filters.category && filters.category !== "all") query = query.eq("category", filters.category);
  if (filters.date) query = query.eq("event_date", filters.date);
  if (filters.minBudget) query = query.gte("budget_max", Number(filters.minBudget));

  const { data, error } = await query.limit(80);
  if (error) throw error;
  return data || [];
}

export async function createJob(userId, payload) {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      owner_id: userId,
      title: payload.title,
      city: payload.city,
      event_date: payload.eventDate,
      category: payload.category,
      genre: payload.genre,
      instrument: payload.instrument,
      budget_max: Number(payload.budgetMax || 0),
      description: payload.description,
      publication_status: "pending_review"
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function createApplication(userId, jobId, message) {
  const { data, error } = await supabase
    .from("applications")
    .insert({ artist_id: userId, job_id: jobId, message, status: "pending" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function createBookingRequest(userId, payload) {
  const { data, error } = await supabase
    .from("booking_requests")
    .insert({
      client_id: userId,
      artist_id: payload.artistId,
      event_type: payload.eventType,
      city: payload.city,
      event_date: payload.eventDate,
      budget: Number(payload.budget || 0),
      message: payload.message,
      status: "pending"
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function fetchConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, client:profiles!conversations_client_id_fkey(display_name), artist:profiles!conversations_artist_id_fkey(display_name), messages(id, sender_id, body, created_at)")
    .or(`client_id.eq.${userId},artist_id.eq.${userId}`)
    .order("updated_at", { ascending: false })
    .order("created_at", { referencedTable: "messages", ascending: true });
  if (error) throw error;
  return data || [];
}

export async function startConversation({ clientId, artistId }) {
  const { data, error } = await supabase
    .from("conversations")
    .upsert({ client_id: clientId, artist_id: artistId }, { onConflict: "client_id,artist_id" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function sendMessage(conversationId, senderId, body) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, body })
    .select("*")
    .single();
  if (error) throw error;
  await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
  return data;
}

export async function fetchDashboard(userId) {
  const [jobs, applications, requests, subscription] = await Promise.all([
    supabase.from("jobs").select("*").eq("owner_id", userId).order("created_at", { ascending: false }),
    supabase.from("applications").select("*, job:jobs(title, city, event_date)").eq("artist_id", userId),
    supabase.from("booking_requests").select("*, artist:profiles!booking_requests_artist_id_fkey(display_name)").eq("client_id", userId),
    supabase.from("subscriptions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle()
  ]);

  for (const result of [jobs, applications, requests, subscription]) {
    if (result.error) throw result.error;
  }

  return {
    jobs: jobs.data || [],
    applications: applications.data || [],
    requests: requests.data || [],
    subscription: subscription.data || null
  };
}

export async function fetchAdminQueue() {
  const [profiles, jobs] = await Promise.all([
    supabase.from("profiles").select("*").eq("publication_status", "pending_review").order("created_at", { ascending: true }),
    supabase.from("jobs").select("*").eq("publication_status", "pending_review").order("created_at", { ascending: true })
  ]);
  if (profiles.error) throw profiles.error;
  if (jobs.error) throw jobs.error;
  return { profiles: profiles.data || [], jobs: jobs.data || [] };
}

export async function updateReviewStatus(table, id, status) {
  const { error } = await supabase.from(table).update({ publication_status: status }).eq("id", id);
  if (error) throw error;
}

export async function createCheckoutSession(planKey, accessToken) {
  const response = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ planKey })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Impossibile avviare il checkout.");
  return data;
}

export async function createPortalSession(accessToken) {
  const response = await fetch("/.netlify/functions/create-customer-portal-session", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Impossibile aprire il portale abbonamento.");
  return data;
}
