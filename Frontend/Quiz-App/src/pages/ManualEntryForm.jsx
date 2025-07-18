import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  // Function to generate a random alphanumeric string
  function generateSecretCode(length = 8) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let secretCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      secretCode += charset[randomIndex];
    }
    return secretCode;
  }

  // Generate and set the secret code when the component mounts
  useEffect(() => {
    const newSecretCode = generateSecretCode();
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      secretCode: newSecretCode,
    }));
  }, []);

  const handleChange = (e) => {
    setQuizDetails({ ...quizDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/quiz/create`,
        quizDetails
      );

      alert(response.data.message);

      const createdQuizId = response.data.quiz._id;

      navigate(`/create-questions/${createdQuizId}`);
    } catch (error) {
      console.error(
        "Error saving quiz:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "Failed to save quiz. Try again later."
      );
    }
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
