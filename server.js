const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load .env
const dotenvPath = path.resolve(__dirname, '.env');
const envExists = fs.existsSync(dotenvPath);
console.log(`✅ .env file loaded: ${envExists}`);

if (envExists) {
  const parsed = dotenv.parse(fs.readFileSync(dotenvPath, 'utf-8'));
  console.log('🌱 ENV VALUES:', parsed);
}

dotenv.config({ path: dotenvPath });
console.log('🔑 Loaded API Key:', process.env.GEMINI_API_KEY);

// Setup Express
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve static frontend

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gemini API Route (free version using direct axios call)
app.post('/gemini', async (req, res) => {
  const userMessage = req.body.message;
  console.log("📩 Received message:", userMessage);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const geminiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response.";
    console.log("🤖 Gemini replied:", geminiReply);
    res.json({ reply: geminiReply });

  } catch (error) {
    console.error("❌ Gemini API Error:");
    if (error.response) {
      console.error("📛 Status:", error.response.status);
      console.error("📦 Response Data:", error.response.data);
    } else {
      console.error("💥 Message:", error.message);
    }

    res.json({ reply: "❌ Error talking to Gemini." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
