import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditQuiz() {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [loading, setLoading] = useState(!location.state?.questions);
  const [error, setError] = useState("");

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/quizzes/${quizId}`
      );
      setQuestions(response.data.questions); // ✅ Update UI with fresh data
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // Call this when the component loads
  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "text") {
      updatedQuestions[index].text = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1], 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "correctAnswers") {
      updatedQuestions[index].correctAnswers = [value];
    }
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    try {
      console.log("🟢 Sending Questions:", JSON.stringify(questions, null, 2));

      await axios.put(`http://localhost:8080/api/quizzes/${quizId}`, {
        questions,
      });

      alert("Quiz updated successfully!");

      // 🛠️ Refetch the updated quiz
      fetchQuiz();
    } catch (err) {
      console.error("❌ Error saving quiz:", err.response?.data || err.message);
      setError("Failed to save quiz.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-28">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Your Quiz
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Modify your questions and answers below.
        </p>
        {questions.map((question, index) => (
          <div key={index} className="mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Question {index + 1}
              </label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleChange(index, "text", e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <label className="block text-gray-700 mb-1">
                  Option {String.fromCharCode(65 + optionIndex)}
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleChange(index, `option-${optionIndex}`, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Correct Answer
              </label>
              <select
                value={questions[index].options.indexOf(
                  question.correctAnswers[0]
                )} // Convert text to index
                onChange={(e) =>
                  handleChange(index, "correctAnswers", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    {String.fromCharCode(65 + optionIndex)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
