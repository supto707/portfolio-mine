# EmailJS Setup Guide

This guide will help you set up EmailJS to enable email functionality in your portfolio contact form.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. Once logged in, go to the **Email Services** section
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the prompts to connect your email account
5. **Copy the Service ID** - you'll need this later

### Recommended: Gmail Setup
- Select Gmail as your service
- Click "Connect Account" and authorize EmailJS
- Your Service ID will look like: `service_xxxxxxx`

## Step 3: Create an Email Template

1. Go to the **Email Templates** section
2. Click **Create New Template**
3. **Copy the Template ID** - you'll need this later
4. Configure your template with the following variables:

### Template Configuration

**Subject Line:**
```
New Contact Form Submission from {{from_name}}
```

**Email Body:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent via Portfolio Contact Form
```

### Template Variables
Make sure your template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - The message content

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. Copy this key - you'll need it for configuration

## Step 5: Configure Your Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

### Example:
```env
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
```

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your portfolio
3. Fill out the contact form with test data
4. Submit the form
5. Check your email inbox for the test message

## Troubleshooting

### Emails Not Sending

**Check your credentials:**
- Verify all three environment variables are set correctly
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env.local`

**Check EmailJS dashboard:**
- Go to your EmailJS dashboard
- Check the **Email History** section
- Look for error messages or failed sends

**Common issues:**
- **403 Forbidden**: Your public key is incorrect
- **Service not found**: Your service ID is wrong
- **Template not found**: Your template ID is incorrect
- **Invalid email**: The sender's email format is invalid

### Gmail-Specific Issues

If using Gmail:
- Make sure you've authorized EmailJS in your Google account
- Check your Google account's "Less secure app access" settings
- Verify the service is still connected in EmailJS dashboard

### Rate Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- Unlimited templates

If you exceed the limit, emails will fail to send.

## Security Notes

- ✅ `.env.local` is already in `.gitignore` - your credentials are safe
- ✅ Never commit your actual credentials to version control
- ✅ The public key is safe to use in client-side code
- ✅ EmailJS handles rate limiting and spam protection

## Need Help?

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- Check the browser console for error messages
