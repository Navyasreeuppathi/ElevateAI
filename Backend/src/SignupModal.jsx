import { motion } from "framer-motion";
import { useState } from "react";

export default function SignupModal({ close, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Account created successfully (demo)");
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
          className="relative bg-white w-[450px] p-10 rounded-2xl shadow-2xl transition hover:scale-[1.02]"
        >
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Create Your Account
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-md hover:scale-105 transition"
            >
              Create Account
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?
            <span
              onClick={switchToLogin}
              className="text-blue-600 cursor-pointer ml-1 hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
}