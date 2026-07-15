import { motion } from "framer-motion";

export default function SignupPanel({ close }) {
  return (
    <>
      {/* Background Blur Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black backdrop-blur-sm"
        onClick={close}
      />

      {/* 3D Slide Panel */}
      <motion.div
        initial={{ x: "100%", rotateY: 30 }}
        animate={{ x: 0, rotateY: 0 }}
        exit={{ x: "100%", rotateY: 30 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Already have an account? <span className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </motion.div>
    </>
  );
}