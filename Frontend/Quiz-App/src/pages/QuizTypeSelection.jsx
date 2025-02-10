import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizTypeSelection from "./QuizTypeSelection";
import UploadOptionSelection from "./UploadOptionSelection";
import ManualEntryForm from "./ManualEntryForm";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Select Quiz Type</h2>
        {!selectedCategory ? (
          <QuizTypeSelection onSelect={handleCategoryClick} />
        ) : !manualEntry ? (
          <UploadOptionSelection onSelect={handleUploadOption} />
        ) : (
          <ManualEntryForm
            secretCode={secretCode}
            setSecretCode={setSecretCode}
          />
        )}
      </div>
    </div>
  );
}
