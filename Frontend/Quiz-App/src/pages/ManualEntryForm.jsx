import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManualQuizEntry() {
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    numQuestions: "",
    timeLimit: "",
    secretCode: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (
      !quizDetails.title ||
      !quizDetails.numQuestions ||
      !quizDetails.timeLimit ||
      !quizDetails.secretCode
    ) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Quiz Details:", quizDetails);
    alert("Quiz Details Saved! Proceed to question entry.");
    navigate("/create-questions");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-40 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Enter Quiz Details
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 transition"
            value={quizDetails.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numQuestions"
            placeholder="Number of Questions"
            min="1"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 transition"
            value={quizDetails.numQuestions}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="timeLimit"
            placeholder="Time Limit (minutes)"
            min="1"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 transition"
            value={quizDetails.timeLimit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="secretCode"
            placeholder="Enter Secret Captcha"
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 transition"
            value={quizDetails.secretCode}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Proceed to Question Entry
          </button>
        </form>
      </div>
    </div>
  );
}
