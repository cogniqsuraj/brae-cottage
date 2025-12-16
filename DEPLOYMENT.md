# Cloudflare Workers Deployment Guide

## Setup Steps:

### 1. Login to Cloudflare
```bash
npx wrangler login
```

### 2. Set API Key as Secret (Most Important - Keeps Key Secure)
```bash
npx wrangler secret put GEMINI_API_KEY
```
When prompted, paste your API key: `AIzaSyCC5L2GuIUAaamORbvyEoBXydCTjEaNXyA`

### 3. Deploy Worker
```bash
npx wrangler deploy
```

### 4. Your Worker URL
After deployment, you'll get: `https://brae-api.cogniqsuraj.workers.dev`

This URL is already configured in `js/gemini.js`

## How It Works:
1. User sends message → Frontend calls Worker URL
2. Worker receives message → Calls Gemini API with secret key
3. Worker returns AI response → Frontend displays it

## Security Benefits:
✅ API key stored securely in Cloudflare (not in code)
✅ Key never exposed to browser
✅ CORS enabled for your domain only (optional)
✅ Request validation and error handling

## Testing:
After deployment, test with:
```bash
curl -X POST https://brae-api.cogniqsuraj.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## Important:
- The API key is stored as a Cloudflare secret (encrypted)
- Never commit the actual key to Git
- Worker has CORS enabled for all origins (you can restrict this)
