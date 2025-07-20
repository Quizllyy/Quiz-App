import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewUploadedQuiz() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState(""); // New state for title
  const [timeLimit, setTimeLimit] = useState(""); // State for time limit
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const storedData = localStorage.getItem("quizData");
    if (!storedData) {
      alert("No quiz data found. Please upload a quiz file first.");
      navigate("/");
    } else {
      setQuizData(JSON.parse(storedData));
    }
  }, [navigate]);

  const handleSaveQuiz = async () => {
    if (!quizTitle.trim()) {
      alert("Please enter a quiz title.");
      return;
    }
    if (!timeLimit) {
      alert("Please set a time limit for the quiz.");
      return;
    }

    const quizPayload = {
      title: quizTitle.trim(),
      timeLimit: Number(timeLimit),
      questions: quizData,
    };

    try {
      const response = await fetch(
        `https://quiz-app-vrxp.onrender.com/api/excel/save-quiz`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quizPayload),
        }
      );

      const data = await response.json();
      if (data.success) {
        navigate(`/finalize-quiz/${data.quizId}`); // ✅ Redirect to FinalizeQuiz page
      } else {
        alert("Error saving quiz. Try again.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[40rem] text-center border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Review Quiz Questions
        </h2>

        {/* Quiz Title Input */}
        <div className="mt-4">
          <label className="text-gray-700 font-semibold">Quiz Title:</label>
          <input
            type="text"
            className="border p-2 mt-2 rounded w-full"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        {quizData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(quizData[0]).map((key, index) => (
                  <th key={index} className="border p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quizData.map((row, index) => (
                <tr key={index} className="border">
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">No quiz data found!</p>
        )}

        {/* Time Limit Input */}
        <div className="mt-6">
          <label className="text-gray-700 font-semibold">
            Set Time Limit (in minutes):
          </label>
          <input
            type="number"
            className="border p-2 mt-2 rounded w-full"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            placeholder="Enter time limit"
          />
        </div>

        {/* Save Quiz Button */}
        <button
          onClick={handleSaveQuiz}
          className="mt-6 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
        >
          Finalize & Save Quiz
        </button>
      </div>
    </div>
  );
}
