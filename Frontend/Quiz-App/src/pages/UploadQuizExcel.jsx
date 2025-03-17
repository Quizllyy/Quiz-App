import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadQuizExcel() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an Excel file.");
      return;
    }
    console.log("Uploaded File:", file);
    alert("File uploaded successfully! Proceed to review questions.");
    navigate("/review-questions");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Upload Quiz via Excel</h2>
        <p className="text-gray-600 mb-4">
          Please upload an Excel file containing your quiz questions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept=".xlsx, .xls"
            className="p-2 border rounded-md w-full"
            onChange={handleFileChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Upload & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
