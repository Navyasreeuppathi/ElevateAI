import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignupModal from "./SignupModal";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800 text-white">

      {/* 🔥 Glow Background */}
      <div className="absolute w-[700px] h-[700px] bg-blue-500 opacity-20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-400 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* 🔝 Navbar */}
      <header className="relative flex justify-between items-center px-16 py-6 z-10">
        <h1 className="text-2xl font-bold tracking-wide">ResumeAI</h1>

        <div className="space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-white transition"
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* 🚀 HERO SECTION */}
      <section className="relative px-16 py-28 flex flex-col lg:flex-row items-center justify-between gap-16 z-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Optimize your resume <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get more interviews 🚀
            </span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            AI-powered resume analyzer that compares your resume with job
            descriptions and gives smart, actionable suggestions.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-xl text-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            >
              🚀 Scan Resume
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="border border-blue-300/30 px-6 py-3 rounded-xl hover:bg-blue-500/10 transition"
            >
              Get Started
            </button>
          </div>
        </motion.div>

        {/* RIGHT AI CARD */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-[400px] h-[500px] backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-300/20 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] p-6">

            <h3 className="text-xl font-semibold mb-4">
              🤖 AI Match Report
            </h3>

            {/* Progress */}
            <div className="h-4 bg-white/20 rounded-full mb-4">
              <div className="h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-3/4"></div>
            </div>

            {/* Fake lines */}
            <div className="space-y-3">
              <div className="h-3 bg-white/20 rounded"></div>
              <div className="h-3 bg-white/20 rounded w-5/6"></div>
              <div className="h-3 bg-white/20 rounded w-2/3"></div>
            </div>

            {/* AI Suggestions Panel */}
            <div className="mt-6 bg-black/30 rounded-xl p-4 text-sm space-y-2">
              <p className="text-green-400">✔ Strong in Java, DSA</p>
              <p className="text-yellow-400">⚠ Missing React, System Design</p>
              <p className="text-blue-300">💡 Add projects to boost score</p>
            </div>

          </div>
        </motion.div>

      </section>

      {/* 🔥 FEATURES */}
      <section className="px-16 pb-20 grid md:grid-cols-3 gap-8">

        {[
          {
            title: "Smart Matching",
            desc: "AI compares resumes intelligently with job descriptions"
          },
          {
            title: "Skill Gap Detection",
            desc: "Instantly find missing skills and improve profile"
          },
          {
            title: "ATS Optimization",
            desc: "Increase your chances of getting shortlisted"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500/10 backdrop-blur-lg border border-blue-300/20 rounded-xl p-6 shadow-lg hover:shadow-blue-500/20 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && <SignupModal close={() => setOpen(false)} />}
      </AnimatePresence>

    </div>
  );
}