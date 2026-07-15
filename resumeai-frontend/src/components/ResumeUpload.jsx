import { useState } from "react";

export default function ResumeUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF and DOCX allowed");
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  // ✅ REMOVE FILE
  const handleRemove = () => {
    setFileName("");
    onFileSelect(null);
  };

  return (
    <div className="text-center">

      {/* If NO file */}
      {!fileName && (
        <div
          className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition ${
            dragActive ? "border-indigo-400 bg-white/10" : "border-white/30"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleChange}
            className="hidden"
            id="resumeUpload"
          />

          <label htmlFor="resumeUpload" className="cursor-pointer">
            <p className="text-lg">Drag & Drop your resume here</p>
            <p className="text-sm text-gray-300 mt-2">
              or click to browse
            </p>
          </label>
        </div>
      )}

      {/* If file EXISTS */}
      {fileName && (
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 flex justify-between items-center">

          <p className="text-green-300 text-sm">
            📄 {fileName}
          </p>

          <div className="flex gap-3">
            {/* Replace */}
            <label className="cursor-pointer text-indigo-300 hover:underline">
              Replace
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {/* Remove */}
            <button
              onClick={handleRemove}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}

    </div>
  );
}