// ========================================
// GEMINI AI API LOGIC
// ========================================

const GeminiAPI = {
    API_KEY: "AIzaSyCC5L2GuIUAaamORbvyEoBXydCTjEaNXyA",

    async getAIResponse(userMessage) {
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

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${cottageInfo}\n\nUser: ${userMessage}\n\nAssistant:`
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
                console.error("❌ API Error:", JSON.stringify(data, null, 2));
                return `AI Error: ${data.error?.message || response.statusText}`;
            }

            console.log("✅ AI Response received successfully");
            return data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I'm having a little trouble thinking right now. Please try again.";

        } catch (err) {
            console.error("❌ Network Error:", err);
            return `Connection Error: ${err.message}`;
        }
    }
};
