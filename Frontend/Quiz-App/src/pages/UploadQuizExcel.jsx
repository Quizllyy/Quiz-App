import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadQuizExcel() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (file) => {
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setFile(file);
    } else {
      alert("Invalid file type! Please upload an Excel (.xlsx or .xls) file.");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an Excel file before proceeding.");
      return;
    }
    console.log("Uploaded File:", file);
    alert("File uploaded successfully! Proceeding to review questions.");
    navigate("/review-questions");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-40">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[32rem] text-center border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Upload Quiz via Excel
        </h2>
        <p className="text-gray-600 mb-4">
          Upload an Excel file (.xlsx, .xls) containing your quiz questions.
        </p>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed ${
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}>
          <p className="text-gray-600">Drag & Drop your file here</p>
          <p className="text-gray-400 text-sm">or</p>
          <label className="cursor-pointer text-blue-600 hover:underline">
            Browse file
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">{file.name}</span>
            </div>
            <button onClick={removeFile}></button>
          </div>
        )}

        {/* Submit Button */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
            Upload & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
