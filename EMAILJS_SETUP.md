# EmailJS Setup Guide

Follow these steps to enable email notifications for new bookings.

---

## Step 1 — Create a free EmailJS account

Go to https://www.emailjs.com and sign up for free.
The free tier allows **200 emails/month**, which is plenty to start.

---

## Step 2 — Connect your email service

1. In the EmailJS dashboard, go to **Email Services → Add New Service**
2. Choose **Gmail** (or Outlook / Yahoo / etc.)
3. Click **Connect Account** and sign in with `hello@aboldbeauty.com.au`
4. Click **Create Service** — note the **Service ID** (looks like `service_xxxxxxx`)

---

## Step 3 — Create the Owner Notification template

1. Go to **Email Templates → Create New Template**
2. Set **Template Name**: `Owner Notification`
3. Fill in the template:

**To email:** `hello@aboldbeauty.com.au`  
**From name:** `A Bold Beauty Booking`  
**Subject:**
```
New Booking: {{service}} on {{date}} at {{time}}
```

**Body (HTML or text):**
```
New appointment received!

Customer: {{customer_name}}
Phone:    {{customer_phone}}
Email:    {{customer_email}}
Service:  {{service}}
Date:     {{date}}
Time:     {{time}}
Notes:    {{notes}}

---
A Bold Beauty Cosmetic Clinic
Melbourne, VIC
```

4. Click **Save** — note the **Template ID** (looks like `template_xxxxxxx`)

---

## Step 4 — Create the Customer Confirmation template

1. Create another new template, name it `Customer Confirmation`
2. Fill in:

**To email:** `{{customer_email}}`  
**From name:** `A Bold Beauty Cosmetic Clinic`  
**Subject:**
```
Your appointment is confirmed — {{service}}
```

**Body:**
```
Hi {{customer_name}},

Your appointment at A Bold Beauty Cosmetic Clinic is confirmed! 🎉

  Service:   {{service}}
  Date:      {{date}}
  Time:      {{time}}

Remember: You get 10% OFF on your first visit!

If you need to reschedule or have any questions, please contact us:
  📞 {{clinic_phone}}
  ✉️ {{clinic_email}}
  📍 {{clinic_location}}

We look forward to seeing you!

— The A Bold Beauty Team
Look Bold. Feel Beautiful. Be You.
```

3. Click **Save** — note this **Template ID** too

---

## Step 5 — Get your Public Key

1. Go to **Account → General** in the EmailJS dashboard
2. Copy your **Public Key** (looks like `XXXXXXXXXXXXXXXXXXXX`)

---

## Step 6 — Create your .env file

In the project folder, create a file called `.env` (copy from `.env.example`):

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_yyyyyyy
```

Replace each value with the actual IDs from the steps above.

---

## Step 7 — Restart the dev server

After creating the `.env` file, stop and restart:

```bash
npm run dev
```

Vite only loads `.env` values on startup, so a restart is required.

---

## Testing

Fill out the booking form with a real email address and submit.
You should receive:
- An **owner notification** at hello@aboldbeauty.com.au
- A **customer confirmation** at the email address entered in the form

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Could not send email" error | Check that all 4 `.env` values are set correctly and the dev server was restarted |
| Emails go to spam | Add a custom "From" domain in EmailJS or ask customers to whitelist your address |
| Exceeded free tier | Upgrade to EmailJS paid plan or switch to Resend / SendGrid |
