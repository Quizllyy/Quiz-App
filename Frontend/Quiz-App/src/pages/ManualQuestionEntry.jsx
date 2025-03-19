import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ManualQuestionEntry() {
  const navigate = useNavigate();
  // Extract quizId from URL
  const { quizId } = useParams();
  console.log("🎯 Retrieved quizId from useParams:", quizId);

  if (!quizId) {
    console.error(
      "❌ ERROR: quizId is undefined! Check your route. The URL should include a valid quiz ID."
    );
  }

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswers: [], type: "single" },
  ]);

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

  const handleCorrectAnswerChange = (qIndex, oIndex, checked) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].type === "multiple") {
      let newCorrectAnswers = [...updatedQuestions[qIndex].correctAnswers];
      if (checked) {
        if (!newCorrectAnswers.includes(oIndex)) {
          newCorrectAnswers.push(oIndex);
        }
      } else {
        newCorrectAnswers = newCorrectAnswers.filter((ans) => ans !== oIndex);
      }
      updatedQuestions[qIndex].correctAnswers = newCorrectAnswers;
    } else {
      updatedQuestions[qIndex].correctAnswers = [oIndex];
    }
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    updatedQuestions[index].correctAnswers = [];
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

    const payload = { quizId, questions };
    console.log("🚀 Sending request to backend...");
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    // Validate quizId before sending
    if (!quizId || quizId.includes("${")) {
      console.error("❌ quizId is invalid:", quizId);
      alert(
        "Quiz ID is not set properly! Please navigate with a valid quiz ID in the URL."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/questions/create",
        payload
      );
      console.log("✅ Response from backend:", response.data);
      alert(response.data.message);
      navigate(`/review-quiz/${createdQuizId}`);
    } catch (error) {
      console.error(
        "❌ Error saving questions:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to save questions. Try again later."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-28 pb-28 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Enter Questions Manually
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="text-left border p-4 rounded-lg bg-gray-50">
              <label className="block text-sm font-medium text-gray-700">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500 transition"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Enter your question here"
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
                <option value="" disabled>
                  Select Question Type
                </option>
                <option value="single">Single Correct</option>
                <option value="multiple">Multiple Correct</option>
                <option value="write">Write Answer</option>
              </select>
              {q.type !== "write" && (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500 transition"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                      {q.type === "multiple" ? (
                        <input
                          type="checkbox"
                          checked={q.correctAnswers.includes(oIndex)}
                          onChange={(e) =>
                            handleCorrectAnswerChange(
                              qIndex,
                              oIndex,
                              e.target.checked
                            )
                          }
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswers[0] === oIndex}
                          onChange={() =>
                            handleCorrectAnswerChange(qIndex, oIndex, true)
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
            onClick={addQuestion}>
            + Add Another Question
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Save & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
