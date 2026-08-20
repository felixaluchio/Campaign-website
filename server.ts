import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy initialization of GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not set. Please configure GEMINI_API_KEY in the Settings/Secrets panel.");
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey: key });
  }
  return genAIClient;
}

const CAMPAIGN_SYSTEM_INSTRUCTION = `You are the official digital campaign AI assistant for Wakili Phyllis Wangui Kamau, Advocate of the High Court of Kenya and candidate for Kiambu County Woman Representative (2027).

Campaign Identity & Manifesto Pillars:
- Vision: "Pamoja Tujenge Kiambu Bora Kwa Wote" (Together, let's build a better Kiambu for all).
- Guiding Motto: "Law with purpose, Leadership with impact."
- 4 Core Pillars:
  1. Empowering Women: Access to capital, table banking, SME capacity building, market stall infrastructure, and financial literacy.
  2. Educating Our Girl Child & Youth: NGAAF scholarships, STEM mentorship, dignity hygiene drives, technical skills TVET hubs.
  3. Growing Our Local Economy: Support for Kiambu farmers (tea, coffee, dairy, horticulture), agro-processing value addition, cooperative access, local business incubation.
  4. Uniting Our Communities: Grassroots dialogue, accountable representation, civic inclusion across all 12 Kiambu sub-counties (Ruiru, Thika, Kiambaa, Kikuyu, Limuru, Juja, Githunguri, Kabete, Lari, Gatundu South, Gatundu North, Kiambu Town).

Instructions:
- Use Google Search Grounding to provide up-to-date, accurate, fact-checked information regarding Kiambu County, local Kenyan governance, IEBC voter guidelines, national policies, and current socio-economic initiatives.
- Maintain a warm, dignified, accessible, and knowledgeable tone.
- Communicate fluently in English and Kiswahili when addressed in either language.
- When answering queries, give clear, concise, and helpful responses. Highlight how policy and legislative leadership can address community issues.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Phyllis Wangui Campaign API", timestamp: new Date().toISOString() });
  });

  // AI Chat with Google Search Grounding
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGenAI();

      // Format conversation contents
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        history.slice(-6).forEach((h: { role: string; text: string }) => {
          if (h.text && (h.role === "user" || h.role === "assistant" || h.role === "model")) {
            contents.push({
              role: h.role === "assistant" ? "model" : "user",
              parts: [{ text: h.text }]
            });
          }
        });
      }

      contents.push({
        role: "user",
        parts: [{ text: message.trim() }]
      });

      // Call Gemini with Google Search Grounding enabled
      // Using gemini-2.5-flash which provides fast and accurate search grounding
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: CAMPAIGN_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          tools: [{ googleSearch: {} }]
        }
      });

      const replyText = response.text || "Thank you for reaching out. Please feel free to ask any question about Wakili Phyllis Wangui's campaign vision or Kiambu County development priorities.";

      // Extract Grounding Sources & Search Queries if available
      const candidate = response.candidates?.[0];
      const groundingMeta = candidate?.groundingMetadata;
      const sources: Array<{ title: string; url: string }> = [];
      const searchQueries: string[] = [];

      if (groundingMeta) {
        if (Array.isArray(groundingMeta.webSearchQueries)) {
          searchQueries.push(...groundingMeta.webSearchQueries);
        }

        if (Array.isArray(groundingMeta.groundingChunks)) {
          groundingMeta.groundingChunks.forEach((chunk: any) => {
            if (chunk?.web?.uri) {
              const url = chunk.web.uri;
              const title = chunk.web.title || new URL(url).hostname;
              // Avoid duplicates
              if (!sources.some(s => s.url === url)) {
                sources.push({ title, url });
              }
            }
          });
        }
      }

      return res.json({
        reply: replyText,
        sources: sources.slice(0, 5),
        searchQueries: searchQueries.slice(0, 3),
        grounded: sources.length > 0 || searchQueries.length > 0
      });

    } catch (error: any) {
      console.error("Gemini Search Grounding Error:", error);

      // Provide informative fallback response if API key is missing or quota reached
      const fallbackText = "Wakili Phyllis Wangui Kamau is an Advocate of the High Court of Kenya running for Kiambu County Woman Representative (2027). Her campaign focuses on: 1) Empowering Women with capital & markets, 2) Educating the Girl Child & Youth, 3) Economic Growth for Kiambu's farmers & MSMEs, and 4) Uniting Our Communities. How can I assist you with her manifesto or upcoming county events?";

      return res.json({
        reply: fallbackText,
        sources: [
          { title: "Phyllis Wangui Campaign Portal", url: "/vision-manifesto" },
          { title: "Kiambu County Development Pillars", url: "/meet-phyllis" }
        ],
        grounded: false,
        notice: error?.message || "Using campaign knowledge base fallback"
      });
    }
  });

  // AI Live Search Grounding for News & Kiambu County Information
  app.post("/api/grounded-search", async (req, res) => {
    try {
      const { query: searchQuery } = req.body;

      if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.trim()) {
        return res.status(400).json({ error: "Search query is required" });
      }

      const ai = getGenAI();

      const prompt = `Provide an up-to-date, fact-checked summary with key facts regarding the following query in the context of Kiambu County, Kenyan elections/governance, or Wakili Phyllis Wangui's campaign:
Query: "${searchQuery}"

Provide 3 to 4 concise bullet points with verified real-world information, and explain how this relates to Kiambu County community leadership and civic progress.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a factual research assistant for Kiambu County civic information. Use Google Search Grounding to retrieve accurate, verified data.",
          temperature: 0.3,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "No information found.";
      const candidate = response.candidates?.[0];
      const groundingMeta = candidate?.groundingMetadata;
      const sources: Array<{ title: string; url: string }> = [];

      if (groundingMeta?.groundingChunks) {
        groundingMeta.groundingChunks.forEach((chunk: any) => {
          if (chunk?.web?.uri) {
            const url = chunk.web.uri;
            const title = chunk.web.title || new URL(url).hostname;
            if (!sources.some(s => s.url === url)) {
              sources.push({ title, url });
            }
          }
        });
      }

      return res.json({
        summary: text,
        sources: sources.slice(0, 5),
        searchQueries: groundingMeta?.webSearchQueries || []
      });

    } catch (error: any) {
      console.error("Live Search Grounding Error:", error);
      return res.status(500).json({
        error: error?.message || "Failed to perform search grounding query"
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Phyllis Wangui Campaign Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
