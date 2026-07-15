import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginModal({ close, switchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login successful (demo)");

    // 🔥 Trigger redirect to Dashboard
    if (onLoginSuccess) {
      onLoginSuccess();
    }

    close();
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black backdrop-blur-sm z-20"
        onClick={close}
      />

      {/* Popup */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="fixed inset-0 flex items-center justify-center z-30"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white w-[420px] p-10 rounded-2xl shadow-2xl transition hover:scale-[1.02]"
        >
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-md hover:scale-105 transition"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?
            <span
              onClick={switchToSignup}
              className="text-blue-600 cursor-pointer ml-1 hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
}