export async function register() {
  // Run startup validation on the server only
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const requiredEnvVars = [
      "GOOGLE_SHEET_WEBHOOK",
      "NEXT_PUBLIC_APP_URL",
    ];

    const optionalEnvVars = [
      "PHONEPE_MERCHANT_ID",
      "PHONEPE_SALT_KEY",
      "META_ACCESS_TOKEN",
      "META_PHONE_NUMBER_ID",
    ];

    const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
      console.warn("\n========================================================");
      console.warn("⚠️  WARNING: Missing required environment variables!");
      console.warn("========================================================");
      missingVars.forEach((envVar) => {
        console.warn(`- ${envVar}`);
      });
      console.warn("========================================================");
      console.warn("The application may not function correctly until these are set in Vercel.");
      console.warn("========================================================\n");
    } else {
      console.log("[SYSTEM] All required environment variables are present.");
    }

    const missingOptionalVars = optionalEnvVars.filter((envVar) => !process.env[envVar]);
    if (missingOptionalVars.length > 0) {
      console.log("[SYSTEM] Note: Some optional features (like PhonePe or Meta WhatsApp) are disabled because their environment variables are missing.");
      missingOptionalVars.forEach((envVar) => {
        console.log(`- Missing optional feature variable: ${envVar}`);
      });
    }
  }
}
