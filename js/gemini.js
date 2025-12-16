// ========================================
// GEMINI AI API LOGIC (via Cloudflare Worker)
// ========================================

const GeminiAPI = {
    // Cloudflare Worker URL (API key is stored securely in Cloudflare)
    WORKER_URL: "https://brae-cottage.cogniqsuraj.workers.dev",

    async getAIResponse(userMessage) {
        try {
            const response = await fetch(this.WORKER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("❌ API Error:", data.error);
                return `AI Error: ${data.error || response.statusText}`;
            }

            console.log("✅ AI Response received successfully");
            return data.response || "I'm having a little trouble thinking right now. Please try again.";

        } catch (err) {
            console.error("❌ Network Error:", err);
            return `Connection Error: ${err.message}`;
        }
    }
};
