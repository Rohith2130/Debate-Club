// import express from "express";
// import cors from "cors";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// const DIFFICULTY_PROMPTS = {
//   Easy: "Keep the response very concise, limited to one short sentence.",
//   Medium: "Give a balanced response in 2-3 sentences.",
//   Hard: "Provide a detailed response with a logical argument in 4-5 sentences."
// };

// app.post("/chat", async (req, res) => {
//   const { message, character, difficulty } = req.body;

//   if (!message || !character || !difficulty) {
//     return res.status(400).json({ error: "Message, character, and difficulty are required" });
//   }

//   const prompt = `You are ${character}. Debate the user's statement. ${DIFFICULTY_PROMPTS[difficulty]} Here is the user's message:\n\n"${message}"`;

//   try {
//     const response = await axios.post(GEMINI_API_URL, {
//       contents: [{ parts: [{ text: prompt }] }]
//     });

//     let reply = response.data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") || "I don't know how to respond.";

//     res.json({ reply });

//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch response" });
//   }
// });

// // 🔹 New Summary Route
// app.post("/summary", async (req, res) => {
//   const { messages, character } = req.body;

//   if (!messages || messages.length === 0) {
//     return res.status(400).json({ error: "No messages provided" });
//   }

//   // Convert messages to formatted text
//   const conversationText = messages
//     .map((msg) => `${msg.sender === "user" ? "User" : character}: ${msg.text}`)
//     .join("\n");

//   const summaryPrompt = `Summarize this debate between the user and ${character}. Provide a clear conclusion and highlight key points of the discussion. Also, assign a score out of 10 based on engagement, argument strength, and response relevance.\n\n${conversationText}`;

//   try {
//     const response = await axios.post(GEMINI_API_URL, {
//       contents: [{ parts: [{ text: summaryPrompt }] }]
//     });

//     let summaryResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Summary unavailable.";

//     // Extract score (basic logic, can be refined)
//     let scoreMatch = summaryResponse.match(/(\d+)\/10/);
//     let score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 4) + 7; // Default 7-10 range

//     res.json({ summary: summaryResponse, score });

//   } catch (error) {
//     console.error("Error generating summary:", error);
//     res.status(500).json({ error: "Failed to generate summary" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Difficulty level adjustments
const DIFFICULTY_PROMPTS = {
  Easy: "Keep the response very concise, limited to one short sentence.",
  Medium: "Give a balanced response in 2-3 sentences.",
  Hard: "Provide a detailed response with a logical argument in 4-5 sentences."
};

// Tone adjustments for responses
const TONE_PROMPTS = {
  formal: "Respond in a structured, scholarly manner.",
  sarcastic: "Be witty, humorous, and a bit playful.",
  friendly: "Engage in a casual and conversational way.",
  philosophical: "Make the response deep and thought-provoking.",
  dramatic: "Express the response with high intensity and emotion."
};

app.post("/chat", async (req, res) => {
  const { message, character, difficulty, tone } = req.body;

  if (!message || !character || !difficulty || !tone) {
    return res.status(400).json({ error: "Message, character, difficulty, and tone are required" });
  }

  const prompt = `You are ${character}. Debate the user's statement in a ${tone} tone. ${TONE_PROMPTS[tone] || "Use a neutral tone."} ${DIFFICULTY_PROMPTS[difficulty]} Here is the user's message:\n\n"${message}"`;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    let reply = response.data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") || "I don't know how to respond.";

    res.json({ reply });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response" });
  }
});

// Summary Route (no changes needed)
app.post("/summary", async (req, res) => {
  const { messages, character } = req.body;

  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  const conversationText = messages
    .map((msg) => `${msg.sender === "user" ? "User" : character}: ${msg.text}`)
    .join("\n");

  const summaryPrompt = `Summarize this debate between the user and ${character}. Provide a clear conclusion and highlight key points of the discussion. Also, assign a score out of 10 based on engagement, argument strength, and response relevance.\n\n${conversationText}`;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: summaryPrompt }] }]
    });

    let summaryResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Summary unavailable.";

    let scoreMatch = summaryResponse.match(/(\d+)\/10/);
    let score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 4) + 7;

    res.json({ summary: summaryResponse, score });

  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
