import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

const handleSignup = async () => {
  if (!form.name || !form.email || !form.password) {
    setError("Please fill all the fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    setError("");
    setSuccess("Signup successful!");

  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full bottom-20 right-20"></div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10 w-[400px]"
      >

     
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && (
  <motion.div
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    exit={{ y: -100 }}
    className="fixed top-0 left-0 w-full bg-green-500 text-white py-3 px-6 flex justify-between items-center shadow-lg z-50"
  >
    <span className="font-medium">
      🎉 Signup Successful!
    </span>

    <button
      onClick={() => {
        setSuccess("");
        navigate("/");
      }}
      className="bg-white text-green-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
    >
      OK
    </button>
  </motion.div>
)}

          <button
  type="button"
  onClick={handleSignup}
  disabled={success}
  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
>
  Sign Up
</button>
        </div>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}