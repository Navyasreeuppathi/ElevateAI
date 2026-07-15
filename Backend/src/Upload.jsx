import { useState } from "react";
import { motion } from "framer-motion";
import ResumeUpload from "./components/ResumeUpload";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume first");
      return;
    }

    if (!jobDesc) {
      alert("Please enter job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDesc);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      navigate("/results", { state: data });

    } catch (err) {
      console.error("REAL ERROR:", err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800 text-white flex items-center justify-center p-10 relative overflow-hidden">

      {/* 🔥 Blue Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-blue-500/10 backdrop-blur-lg border border-blue-300/20 rounded-2xl shadow-2xl p-10 w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Resume Analyzer
        </h1>

        <div className="space-y-6">

          {/* Upload */}
          <ResumeUpload onFileSelect={setFile} />

          {/* File Name */}
          {file && (
            <p className="text-sm text-green-400 text-center">
              Uploaded: {file.name}
            </p>
          )}

          {/* Textarea */}
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste Job Description Here..."
            className="w-full bg-blue-500/10 border border-blue-300/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-32"
          />

          {/* Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>
      </motion.div>
    </div>
  );
}