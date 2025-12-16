/**
 * Cloudflare Worker - Gemini API Proxy
 * 
 * This worker securely proxies requests to the Gemini API,
 * keeping the API key hidden from the client.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Cottage information for the AI assistant
const COTTAGE_INFO = `You are the friendly AI assistant for Brae Cottage, a cozy B&B in Winster, Peak District.

Key Details:
- Location: Winster, Peak District.
- Vibe: Cozy, historic, digital detox (no Wi-Fi), nature-focused.
- Amenities: Wood burner, garden, walks nearby.
- Policies: No pets, no smoking.

Your Goal: Answer visitor questions warmly and accurately based on this info. 
ALWAYS be warm and welcoming. If the user says "hi" or "hello", respond with a special warm welcome to Brae Cottage.
If you don't know something, suggest they contact the host directly. 
Keep answers concise (under 3 sentences).`;

export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }

        // Only allow POST requests
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            const { message } = await request.json();

            if (!message) {
                return new Response(JSON.stringify({ error: 'Message is required' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // Call Gemini API with the secret key
            const response = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${COTTAGE_INFO}\n\nUser: ${message}\n\nAssistant:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 200
                    }
                })
            });

            const data = await response.json();

            if (!response.ok) {
                return new Response(JSON.stringify({
                    error: data.error?.message || 'API Error'
                }), {
                    status: response.status,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                'I\'m having trouble right now. Please try again.';

            return new Response(JSON.stringify({ response: aiResponse }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};
