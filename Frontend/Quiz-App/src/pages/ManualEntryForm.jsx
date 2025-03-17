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

  const handleChange = (e) => {
    setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Details:", quizDetails);
    alert("Quiz Details Saved! Proceed to question entry.");
    navigate("/create-questions");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Enter Quiz Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            className="p-2 border rounded-md w-full"
            value={quizDetails.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numQuestions"
            placeholder="Number of Questions"
            className="p-2 border rounded-md w-full"
            value={quizDetails.numQuestions}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="timeLimit"
            placeholder="Time Limit (minutes)"
            className="p-2 border rounded-md w-full"
            value={quizDetails.timeLimit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="secretCode"
            placeholder="Enter Secret Captcha"
            className="p-2 border rounded-md w-full"
            value={quizDetails.secretCode}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Proceed to Question Entry
          </button>
        </form>
      </div>
    </div>
  );
}
