import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ManualQuestionEntry() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswers: [], type: "single" },
  ]);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };
  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];

    if (updatedQuestions[qIndex].type === "write") {
      updatedQuestions[qIndex].correctAnswers = [oIndex];
    } else if (updatedQuestions[qIndex].type === "multiple") {
      const selectedOption = updatedQuestions[qIndex].options[oIndex];
      const currentAnswers = updatedQuestions[qIndex].correctAnswers || [];

      if (currentAnswers.includes(selectedOption)) {
        // Remove the option if it's already selected
        updatedQuestions[qIndex].correctAnswers = currentAnswers.filter(
          (opt) => opt !== selectedOption
        );
      } else {
        // Add the option to correctAnswers
        updatedQuestions[qIndex].correctAnswers = [
          ...currentAnswers,
          selectedOption,
        ];
      }
    } else {
      // Single correct answer type
      const selectedOption = updatedQuestions[qIndex].options[oIndex];
      updatedQuestions[qIndex].correctAnswers = [selectedOption];
    }

    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    updatedQuestions[index].correctAnswers = [];
    if (value === "write") {
      updatedQuestions[index].options = [];
    } else {
      updatedQuestions[index].options = ["", "", "", ""];
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correctAnswers: [],
        type: "single",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.text.trim()) {
        alert(`❌ Question ${i + 1} cannot be empty.`);
        return;
      }

      if (q.type !== "write") {
        if (q.correctAnswers.length === 0) {
          alert(`❌ Question ${i + 1} must have at least one correct answer.`);
          return;
        }
        for (let option of q.options) {
          if (!option.trim()) {
            alert(`❌ Question ${i + 1} has an empty option.`);
            return;
          }
        }
      } else {
        if (!q.correctAnswers[0]?.trim()) {
          alert(`❌ Question ${i + 1} must have a valid written answer.`);
          return;
        }
      }
    }

    const payload = { quizId, questions };
    console.log("🚀 Sending request to backend...", payload);

    try {
      const response = await axios.post(
        `${baseURL}/api/questions/create`,
        payload
      );
      alert(response.data.message);
      navigate(`/review-quiz/${quizId}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save questions. Try again later."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-20 pb-8 px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Enter Questions Manually
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="text-left border p-4 rounded-md bg-gray-50 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500 transition"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Question Type
              </label>
              <select
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500 transition"
                value={q.type}
                onChange={(e) => handleTypeChange(qIndex, e.target.value)}
                required>
                <option value="single">Single Correct</option>
                <option value="multiple">Multiple Correct</option>
                <option value="write">Write Answer</option>
              </select>
              {q.type !== "write" ? (
                q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500 transition"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      required
                    />
                    <input
                      type={q.type === "multiple" ? "checkbox" : "radio"}
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswers.includes(option)}
                      onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                    />
                  </div>
                ))
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500 transition"
                    value={q.correctAnswers[0] || ""}
                    onChange={(e) =>
                      handleCorrectAnswerChange(qIndex, e.target.value)
                    }
                    required
                  />
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded-md"
            onClick={addQuestion}>
            + Add Another Question
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md">
            Save & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
