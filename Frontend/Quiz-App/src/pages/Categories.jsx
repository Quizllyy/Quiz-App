import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizCategories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleUploadOption = (option) => {
    if (option === "Manual") {
      setManualEntry(true);
    } else {
      navigate("/create-quiz"); // Adjust to your actual create quiz route
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] bg-gray-100 pt-32">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Select Quiz Type</h2>
        {!selectedCategory ? (
          <div className="flex flex-col gap-4">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => handleCategoryClick("Single Correct Answer")}>
              Single Correct Answer
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => handleCategoryClick("Multiple Correct Answer")}>
              Multiple Correct Answer
            </button>
            <button
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition"
              onClick={() => handleCategoryClick("Write Answer")}>
              Write Answer
            </button>
          </div>
        ) : !manualEntry ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">
              How do you want to upload questions?
            </h3>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
              onClick={() => handleUploadOption("Manual")}>
              Manual Entry
            </button>
            <button
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
              onClick={() => handleUploadOption("Excel Sheet")}>
              Upload via File
            </button>
          </div>
        ) : (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Enter Quiz Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <input type="number" className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Time for Test (in minutes)
              </label>
              <input type="number" className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Secret Captcha
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => alert("Quiz Created Successfully!")}>
              Start creating Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
