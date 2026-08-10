# Vercel Deployment Guide

This project is configured to run smoothly on Vercel with Next.js App Router and Serverless Functions.

## 1. Required Environment Variables

Before deploying, ensure you have all the necessary environment variables configured in your Vercel project settings. The backend relies on these to function securely without hardcoding any secrets.

| Variable Name | Description |
|---|---|
| `GOOGLE_SHEET_WEBHOOK` | The URL of your deployed Google Apps Script Web App (e.g., `https://script.google.com/macros/s/.../exec`). |
| `PHONEPE_MERCHANT_ID` | Your PhonePe Merchant ID. |
| `PHONEPE_CLIENT_SECRET` | Your PhonePe Client Secret (if applicable). |
| `PHONEPE_SALT_KEY` | The Salt Key provided by PhonePe for checksum generation. |
| `PHONEPE_SALT_INDEX` | The Salt Index for checksum generation (typically `1`). |
| `META_ACCESS_TOKEN` | A permanent access token for the Meta WhatsApp Cloud API. |
| `META_PHONE_NUMBER_ID` | The ID of the phone number registered in your Meta Business account. |
| `NEXT_PUBLIC_APP_URL` | The public URL of your deployed application (e.g., `https://your-domain.com`). This is required for PhonePe callback redirects. |

> [!WARNING]
> Do **NOT** prefix secret backend variables with `NEXT_PUBLIC_`. Doing so will expose them to the browser, leading to severe security vulnerabilities. Only `NEXT_PUBLIC_APP_URL` should have this prefix.

## 2. Where to Add Environment Variables in Vercel

1. Go to your Vercel Dashboard and select this project.
2. Navigate to **Settings** > **Environment Variables**.
3. Add each of the variables listed above.
4. Ensure they are available in the **Production** environment (and **Preview/Development** if you plan to test there).

## 3. How to Redeploy

Whenever you change environment variables in Vercel, the changes do not apply to the currently running deployment.
You **must** trigger a redeploy:

1. Go to the **Deployments** tab in Vercel.
2. Click the three dots (`...`) next to your most recent production deployment.
3. Click **Redeploy**.

## 4. Startup Validation

The application uses Next.js `instrumentation` to validate environment variables at startup. If a critical environment variable is missing, you will see a clear warning in the Vercel Runtime Logs immediately after deployment, ensuring you don't discover the issue only when a user tries to register.

## 5. How to Verify the Registration Endpoint

1. Go to your live Vercel URL.
2. Fill out the registration form with test data.
3. Click submit.
4. If successful, you will be redirected to the PhonePe checkout.
5. In your Vercel Dashboard, navigate to the **Logs** tab. You should see detailed logs for:
   - `[REGISTER] Request received for <phone>`
   - `[REGISTER] Environment validated`
   - `[REGISTER] Google Apps Script request started`
   - `[REGISTER] Google Apps Script response: success`

## 6. Common Troubleshooting Steps

**Issue: HTTP 500 Internal Server Error when clicking submit**
- **Cause:** The `GOOGLE_SHEET_WEBHOOK` variable is missing or incorrect.
- **Solution:** Check Vercel Environment Variables. Ensure the URL is exactly as provided by Google, with no trailing spaces or quotes. Redeploy the app.

**Issue: "Failed to submit to Google Sheets" or JSON parsing errors**
- **Cause:** The Google Apps Script is crashing or requiring Google Account authentication.
- **Solution:** Ensure the Google Apps Script Web App is deployed with the access level set to **"Anyone"** (not just "Anyone with Google Account"). Check the Google Apps Script executions log.

**Issue: Callbacks are not updating the Google Sheet after payment**
- **Cause:** PhonePe cannot reach your callback URL.
- **Solution:** Ensure `NEXT_PUBLIC_APP_URL` is set to your correct production domain, without a trailing slash (e.g., `https://example.com`). Check Vercel logs for incoming `POST /api/payment/callback` requests.
