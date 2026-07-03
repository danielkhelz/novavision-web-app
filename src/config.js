const runtimeConfig = typeof window !== "undefined" ? window.NOVAVISION_CONFIG || {} : {};

export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || runtimeConfig.SUPABASE_URL || "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || runtimeConfig.SUPABASE_ANON_KEY || "",
  appUrl: import.meta.env.VITE_APP_URL || runtimeConfig.APP_URL || window.location.origin
};

export const isConfigured = Boolean(config.supabaseUrl && config.supabaseAnonKey);

export const planLabels = {
  artist_monthly: "Premium artista mensile",
  artist_yearly: "Premium artista annuale",
  client_monthly: "Premium cliente mensile",
  client_yearly: "Premium cliente annuale"
};
