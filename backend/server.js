import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { OPENAI_API_KEY, PORT, MODEL } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

// Роздаємо статику фронтенду
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ===== Language map =====
const LANGUAGES = {
  uk: "Ukrainian", en: "English", ja: "Japanese",
  zh: "Chinese", ko: "Korean", fr: "French",
  de: "German", es: "Spanish", it: "Italian",
  pl: "Polish", pt: "Portuguese", ar: "Arabic",
};

// ===== Spice descriptions =====
const SPICE = [
  "Calm, traditional, contemplative haiku about nature and transience.",
  "A light, quiet sketch with a gentle mood.",
  "Slightly unexpected, with subtle irony.",
  "Playful, with humor and a surprising twist.",
  "Bold and sharp, with an absurd image.",
  "Very spicy, chaotic, grotesque and funny.",
  "Maximum heat: absurd, chaotic, surreal and dark-humored — yet still three lines of haiku.",
];

// ===== POST /generate =====
app.post("/generate", async (req, res) => {
  const { keywords, language, spiceLevel } = req.body;

  // --- validation ---
  if (!keywords || typeof keywords !== "string") {
    return res.status(400).json({ error: "Keywords are required" });
  }
  const parts = keywords.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length < 3) {
    return res.status(400).json({ error: "At least 3 keywords required" });
  }
  if (parts.length > 7) {
    return res.status(400).json({ error: "Maximum 7 keywords allowed" });
  }
  if (!language || !LANGUAGES[language]) {
    return res.status(400).json({ error: "Valid language required" });
  }
  const spice = typeof spiceLevel === "number" ? Math.max(0, Math.min(6, Math.round(spiceLevel))) : 0;

  const langName = LANGUAGES[language];

  // --- build system prompt ---
  const systemPrompt = [
    `You are a poet specializing in haiku. Write a haiku in ${langName}.`,
    "A haiku is a short three-line poem capturing a moment, an image, a mood.",
    "Be concise and poetic. Do NOT use 5-7-5 syllable counting.",
    "",
    `Spice level: ${spice}/6`,
    ...SPICE[spice].split("\n").map((l) => l.trim()),
    "",
    "CRITICAL RULES:",
    "- Output ONLY the haiku text — three lines, each on its own line.",
    "- No titles, no numbering, no quotation marks, no explanations, no translation.",
    "- NO profanity, aggression, hate speech, or illegal content.",
    "- If spice level is high, be creative and absurd but NEVER offensive.",
    `- Match the mood and cultural context of ${langName}.`,
  ].join("\n");

  const userPrompt = `Keywords: ${parts.join(", ")}`;

  // --- call OpenAI ---
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1,
        max_completion_tokens: 2000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text().catch(() => "");
      console.error("OpenAI error:", openaiRes.status, errBody);
      const status = openaiRes.status;
      if (status === 401 || status === 403) {
        return res.status(502).json({ error: "OpenAI authentication failed" });
      }
      if (status === 429) {
        return res.status(429).json({ error: "Too many requests, please wait" });
      }
      if (status >= 500) {
        return res.status(502).json({ error: "OpenAI server error" });
      }
      return res.status(502).json({ error: `OpenAI returned ${status}` });
    }

    const data = await openaiRes.json();
    let content = (data.choices?.[0]?.message?.content || "").trim();

    if (!content) {
      return res.status(500).json({ error: "Model returned empty response" });
    }

    // Clean up: remove markdown, numbering, quotes
    const lines = content
      .split("\n")
      .map((l) => l.replace(/^[\s\-\d.)»«"']+/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

    if (lines.length === 0) {
      return res.status(500).json({ error: "Could not parse haiku" });
    }

    const haiku = lines.join("\n");
    return res.json({ haiku, lines });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return res.status(504).json({ error: "Request timed out" });
    }
    console.error("OpenAI error:", err.message);
    return res.status(502).json({ error: "Failed to reach OpenAI" });
  }
});

// ===== Health check =====
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Haiku 50 backend → http://localhost:${PORT}`);
});
