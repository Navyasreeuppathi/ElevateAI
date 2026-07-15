require("dotenv").config();

// =========================
// 📦 IMPORTS
// =========================
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");
// =========================
// 🚀 APP INIT
// =========================
const app = express();

app.use(cors());
app.use(express.json());

const upload = multer();

// =========================
// 🗄️ MONGODB CONNECT
// =========================
console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log("❌ DB Error:", err));
  const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
// =========================
// 👤 USER MODEL
// =========================
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// =========================
// 🔐 SIGNUP API
// =========================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({ name, email, password });

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// 🔐 LOGIN API
// =========================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// 🤖 ANALYZE API
// =========================
app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const jobDesc = req.body.jobDesc;

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!jobDesc) return res.status(400).json({ error: "No job description" });

    const data = await pdfParse(file.buffer);
    const resumeText = data.text;
const jdText = jobDesc;

const prompt = `
You are an ATS Resume Analyzer.

Compare the resume against the job description.

Return ONLY valid JSON.

Do NOT write any explanation.

Do NOT write markdown.

Do NOT use \`\`\`.

Return exactly this format:

{
  "score": 87,
  "matchedSkills": [
    "Java",
    "React"
  ],
  "missingSkills": [
    "Docker"
  ],
  "suggestions": [
    "Learn Docker",
    "Improve ATS formatting"
  ]
}

Resume:

${resumeText.substring(0,4000)}

Job Description:

${jdText}
`;

const result = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
});
console.log(JSON.stringify(result, null, 2));
const response =
  typeof result.text === "string"
    ? result.text
    : result.text();

console.log(response);

const cleanResponse = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let analysis;

try {
  analysis = JSON.parse(cleanResponse);
} catch (e) {
  console.error("Invalid Gemini JSON:", cleanResponse);

  return res.status(500).json({
    score: 0,
    matchedSkills: [],
    missingSkills: [],
    suggestions: [
      "Gemini returned an invalid response. Please try again."
    ]
  });
}

res.json({
  score: analysis.score || 0,
  matchedSkills: analysis.matchedSkills || [],
  missingSkills: analysis.missingSkills || [],
  suggestions: analysis.suggestions || []
});
   
  } catch (err) {
    console.error("Backend Error:", err);

    res.status(500).json({
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      suggestions: ["Server error"]
    });
  }
});

// =========================
// 🚀 START SERVER
// =========================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});