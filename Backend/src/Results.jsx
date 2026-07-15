import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // If no data (direct access)
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>No data found. Please analyze again.</p>
      </div>
    );
  }

  const { score, matchedSkills, missingSkills, suggestions } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 text-white p-10 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold">Resume Analysis Report</h1>
          <p className="text-gray-300 mt-2">
            AI-powered insights for your resume
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 text-center shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-4">Match Score</h2>

          {/* Circular Score */}
          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-white/20"></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-blue-400"
              style={{
                clipPath: `inset(${100 - score}% 0 0 0)`
              }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
              {score ?? 0}%
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Matched Skills */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              ✅ Matched Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {(matchedSkills || []).map((skill, i) => (
                <span
                  key={i}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Missing Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-red-400">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {(missingSkills || []).map((skill, i) => (
                <span
                  key={i}
                  className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-300">
            💡 Suggestions to Improve
          </h3>

          <ul className="space-y-3 text-gray-300">
            {(suggestions || []).map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/upload")}
            className="mt-6 bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow-lg"
          >
            Analyze Another Resume
          </button>
        </div>

      </div>
    </div>
  );
}