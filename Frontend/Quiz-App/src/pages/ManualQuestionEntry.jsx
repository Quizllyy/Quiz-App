import React, { useReducer, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 🎯 Reducer Function for Optimized State Updates
const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUIZ":
      return action.payload;
    case "UPDATE_QUESTION":
      return state.map((q, index) =>
        index === action.index ? { ...q, ...action.payload } : q
      );
    default:
      return state;
  }
};

export default function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, dispatch] = useReducer(quizReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null); // Track which question is being updated

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        dispatch({ type: "SET_QUIZ", payload: response.data.questions });
      } catch (err) {
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const updateQuestionInDB = async (index, updates) => {
    setUpdating(index);
    try {
      await axios.put(
        `http://localhost:8080/api/quiz/${quizId}/question/${index}`,
        updates
      );
    } catch (err) {
      console.error("❌ Update failed:", err);
      setError("Failed to update question.");
    } finally {
      setUpdating(null);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedQuestion = { [field]: value };

    if (field === "type") {
      updatedQuestion.correctAnswers = value === "write" ? [""] : [];
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1], 10);
      updatedQuestion.options = [...questions[index].options];
      updatedQuestion.options[optionIndex] = value;
    } else if (field === "correctAnswers") {
      updatedQuestion.correctAnswers =
        questions[index].type === "multiple"
          ? questions[index].correctAnswers.includes(value)
            ? questions[index].correctAnswers.filter((ans) => ans !== value)
            : [...questions[index].correctAnswers, value]
          : [value];
    }

    dispatch({ type: "UPDATE_QUESTION", index, payload: updatedQuestion });
    updateQuestionInDB(index, updatedQuestion);
  };

  if (loading) return <h2 className="text-center text-2xl">Loading...</h2>;
  if (error)
    return <h2 className="text-center text-2xl text-red-500">{error}</h2>;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Your Quiz
        </h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-8 p-4 border-b">
            <label className="block text-gray-700 font-semibold mb-1">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleChange(index, "text", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {updating === index && (
              <p className="text-sm text-gray-500">Updating...</p>
            )}

            <label className="block text-gray-700 font-semibold mt-3">
              Question Type
            </label>
            <select
              value={question.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="single">Single Correct</option>
              <option value="multiple">Multiple Correct</option>
              <option value="write">Write Answer</option>
            </select>

            {question.type !== "write" && (
              <>
                <label className="block text-gray-700 font-semibold mt-3">
                  Options
                </label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleChange(
                          index,
                          `option-${optionIndex}`,
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {question.type === "multiple" ? (
                      <input
                        type="checkbox"
                        checked={question.correctAnswers.includes(option)}
                        onChange={() =>
                          handleChange(index, "correctAnswers", option)
                        }
                      />
                    ) : (
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correctAnswers[0] === option}
                        onChange={() =>
                          handleChange(index, "correctAnswers", option)
                        }
                      />
                    )}
                  </div>
                ))}
              </>
            )}

            {question.type === "write" && (
              <>
                <label className="block text-gray-700 font-semibold mt-3">
                  Correct Answer
                </label>
                <input
                  type="text"
                  value={question.correctAnswers[0]}
                  onChange={(e) =>
                    handleChange(index, "correctAnswers", e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate(`/review-quiz/${quizId}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Back to Review
          </button>
        </div>
      </div>
    </div>
  );
}
