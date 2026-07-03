const requiredPublic = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY", "VITE_APP_URL"];
const requiredPrivate = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "APP_URL",
  "STRIPE_PRICE_ARTIST_MONTHLY",
  "STRIPE_PRICE_ARTIST_YEARLY",
  "STRIPE_PRICE_CLIENT_MONTHLY",
  "STRIPE_PRICE_CLIENT_YEARLY"
];

const missingPublic = requiredPublic.filter((key) => !process.env[key]);
const missingPrivate = requiredPrivate.filter((key) => !process.env[key]);

if (missingPublic.length || missingPrivate.length) {
  console.log("NovaVision environment checklist");
  if (missingPublic.length) console.log(`Public env missing: ${missingPublic.join(", ")}`);
  if (missingPrivate.length) console.log(`Server env missing: ${missingPrivate.join(", ")}`);
  process.exitCode = 0;
} else {
  console.log("All NovaVision environment variables are present.");
}
