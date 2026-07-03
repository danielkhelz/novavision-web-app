export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  appUrl: import.meta.env.VITE_APP_URL || window.location.origin
};

export const isConfigured = Boolean(config.supabaseUrl && config.supabaseAnonKey);

export const planLabels = {
  artist_monthly: "Premium artista mensile",
  artist_yearly: "Premium artista annuale",
  client_monthly: "Premium cliente mensile",
  client_yearly: "Premium cliente annuale"
};
