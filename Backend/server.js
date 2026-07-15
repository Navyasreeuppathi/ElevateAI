require("dotenv").config();

// =========================
// 📦 IMPORTS
// =========================
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

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

    const resumeText = data.text.toLowerCase();
    const jdText = jobDesc.toLowerCase();

    // 🔥 SKILLS LIST
    const skillsList = [
      "java", "python", "c++", "javascript", "react", "node", "express",
      "mongodb", "sql", "html", "css", "machine learning", "deep learning",
      "nlp", "data analysis", "aws", "docker", "kubernetes",
      "system design", "dsa", "problem solving", "git"
    ];

    let matchedSkills = [];
    let missingSkills = [];

    // ✅ MATCHING
    skillsList.forEach(skill => {
      if (jdText.includes(skill)) {
        if (resumeText.includes(skill)) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      }
    });

    // ✅ SCORE
    const total = matchedSkills.length + missingSkills.length;
    let score = total === 0 ? 0 : Math.round((matchedSkills.length / total) * 100);

    // =========================
    // 💡 SMART SUGGESTIONS
    // =========================
    const suggestions = [];

    // Skill-based suggestions
    missingSkills.forEach(skill => {
      suggestions.push(`Include ${skill} in your resume with a project or hands-on experience.`);
    });

    // Score-based suggestions
    if (score < 50) {
      suggestions.push("Your resume lacks key required skills. Focus on improving technical strength.");
    } else if (score < 80) {
      suggestions.push("You have partial match. Improving missing skills will increase your chances.");
    } else {
      suggestions.push("Good match! Strengthen your profile with real-world projects and achievements.");
    }

    // Role-specific improvements
    if (missingSkills.includes("react")) {
      suggestions.push("Build a frontend project using React to demonstrate your skills.");
    }

    if (missingSkills.includes("aws")) {
      suggestions.push("Deploy a project on AWS to showcase cloud experience.");
    }

    if (missingSkills.includes("dsa")) {
      suggestions.push("Practice DSA problems on platforms like LeetCode.");
    }

    if (missingSkills.includes("machine learning")) {
      suggestions.push("Work on ML projects like prediction models or NLP applications.");
    }

    // General improvements
    suggestions.push("Add quantified achievements (e.g., improved performance by 30%).");
    suggestions.push("Ensure your resume is well-structured and ATS-friendly.");
    suggestions.push("Use keywords from the job description.");

    // =========================
    // ✅ RESPONSE
    // =========================
    res.json({
      score,
      matchedSkills,
      missingSkills,
      suggestions
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