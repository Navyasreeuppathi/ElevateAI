import { useState } from "react";

export default function Dashboard() {
  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState("paste");
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [selectedSavedJD, setSelectedSavedJD] = useState("");
  const [loading, setLoading] = useState(false);

  const savedJobs = [
    "Frontend Developer - React Required",
    "Python Backend Developer - FastAPI",
    "Full Stack Developer - MERN Stack",
  ];

  const handleResumeUpload = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOCX files allowed.");
      return;
    }

    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleResumeUpload(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (!resumeFile) {
      alert("Please upload resume first.");
      return;
    }

    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      alert("Resume analyzed successfully!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex justify-center p-10">
      <div className="w-full max-w-4xl space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Resume Analyzer
          </h1>
          <p className="text-gray-500 mt-2">
            Upload your resume and compare it with a job description
          </p>
        </div>

        {/* Resume Upload Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload Resume
          </h2>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition duration-300
            ${dragActive
                ? "border-indigo-600 bg-indigo-50"
                : "border-indigo-300 bg-indigo-50/30"}`}
          >
            {!resumeFile ? (
              <>
                <p className="text-lg font-medium text-gray-700">
                  Drag & Drop your resume here
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PDF or DOCX only
                </p>

                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) => handleResumeUpload(e.target.files[0])}
                  className="hidden"
                  id="resumeUpload"
                />

                <label
                  htmlFor="resumeUpload"
                  className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
                >
                  Browse Files
                </label>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-medium">
                    📄 {resumeFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setResumeFile(null)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>

                  <label
                    htmlFor="resumeUpload"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Replace
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => handleResumeUpload(e.target.files[0])}
                    className="hidden"
                    id="resumeUpload"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Description Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Job Description
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {["paste", "upload", "saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {tab === "paste" && "Paste"}
                {tab === "upload" && "Upload File"}
                {tab === "saved" && "Saved Jobs"}
              </button>
            ))}
          </div>

          {activeTab === "paste" && (
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full h-36 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          )}

          {activeTab === "upload" && (
            <>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setJdFile(e.target.files[0])}
                className="hidden"
                id="jdUpload"
              />

              <label
                htmlFor="jdUpload"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
              >
                Upload JD File
              </label>

              {jdFile && (
                <p className="text-green-600 mt-4">
                  📄 {jdFile.name}
                </p>
              )}
            </>
          )}

          {activeTab === "saved" && (
            <select
              value={selectedSavedJD}
              onChange={(e) => setSelectedSavedJD(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select saved job description</option>
              {savedJobs.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Analyze Button with Loading */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition shadow-lg flex items-center justify-center gap-3
          ${loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] text-white"}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing Resume...
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>

      </div>
    </div>
  );
}

