import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching quiz:", error);
        setError("Failed to load quiz.");
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];

    if (field === "text") {
      updatedQuestions[index].text = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1], 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "correctAnswers") {
      if (updatedQuestions[index].type === "multiple") {
        const selectedAnswers = updatedQuestions[index].correctAnswers.includes(
          value
        )
          ? updatedQuestions[index].correctAnswers.filter(
              (ans) => ans !== value
            )
          : [...updatedQuestions[index].correctAnswers, value];

        updatedQuestions[index].correctAnswers = selectedAnswers;
      } else {
        updatedQuestions[index].correctAnswers = [value];
      }
    } else if (field === "type") {
      updatedQuestions[index].type = value;
      updatedQuestions[index].correctAnswers = value === "write" ? [""] : [];
    }

    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    try {
      console.log("🟢 Sending to API:", JSON.stringify({ questions }, null, 2));

      const response = await axios.put(
        `http://localhost:8080/api/quiz/${quizId}`,
        { questions }
      );

      console.log("✅ API Response:", response.data);

      alert("Quiz updated successfully!");
      navigate(`/review-quiz/${quizId}`);
    } catch (err) {
      console.error("❌ Error saving quiz:", err.response?.data || err.message);
      setError("Failed to save quiz.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Your Quiz
        </h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-8">
            <label className="block text-gray-700 font-semibold mb-1">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleChange(index, "text", e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-700 font-semibold mt-3">
              Question Type
            </label>
            <select
              value={question.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${optionIndex + 1}`}
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
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
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
