// ========================================
// CLOUDFLARE WORKER - GEMINI API PROXY
// This keeps your API key secure on Cloudflare's servers
// ========================================

export default {
    async fetch(request, env) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        // Handle CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        // Allow GET (for browser check)
        if (request.method === "GET") {
            return new Response(
                JSON.stringify({ status: "Worker is running 🚀", endpoint: "POST to /chat with {message: 'your message'}" }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...corsHeaders,
                    },
                }
            );
        }

        // Only allow POST requests for API calls
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                }
            });
        }

        try {
            // Get user message from request
            const { message } = await request.json();

            if (!message) {
                return new Response(JSON.stringify({ error: 'Message is required' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    }
                });
            }

            // Cottage context
            const cottageInfo = `You are the friendly AI assistant for Brae Cottage, a cozy B&B in Winster, Peak District.
            
            Key Details:
            - Location: Winster, Peak District.
            - Vibe: Cozy, historic, digital detox (no Wi-Fi), nature-focused.
            - Amenities: Wood burner, garden, walks nearby.
            - Policies: No pets, no smoking.
            
            Your Goal: Answer visitor questions warmly and accurately based on this info. 
            ALWAYS be warm and welcoming. If the user says "hi" or "hello", respond with a special warm welcome to Brae Cottage.
            If you don't know something, suggest they contact the host directly. 
            Keep answers concise (under 3 sentences).`;

            // Call Gemini API (API key is stored in Cloudflare environment variable)
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${cottageInfo}\n\nUser: ${message}\n\nAssistant:`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 200
                        }
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return new Response(JSON.stringify({ 
                    error: data.error?.message || 'API Error' 
                }), {
                    status: response.status,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    }
                });
            }

            // Return AI response
            const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I'm having a little trouble thinking right now. Please try again.";

            return new Response(JSON.stringify({ response: aiResponse }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                }
            });

        } catch (error) {
            return new Response(JSON.stringify({ 
                error: error.message 
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders,
                }
            });
        }
    }
};
