import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    const { email, password } = form;

    // ✅ Basic validation
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); // ❌ show backend error
        setLoading(false);
        return;
      }

      // ✅ SUCCESS LOGIN
      setError("");
      navigate("/upload");

    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 w-[420px] p-10 rounded-2xl shadow-xl text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-sm mt-4">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-medium shadow-md disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-300 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}