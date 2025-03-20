import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        if (!quizId) return;
        const response = await axios.get(
          `http://localhost:8080/api/questions/${quizId}`
        );
        setQuestions(response.data);
      } catch (err) {
        console.error(
          "Error fetching questions:",
          err.response?.data || err.message
        );
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [quizId]);

  const handleEditQuiz = () => {
    navigate(`/edit-quiz/${quizId}`, { state: { questions } });
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
          Review Your Quiz
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Check your questions before finalizing the quiz.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-2">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-6 py-3 text-left border rounded-t-md">
                  Question
                </th>
                <th className="px-6 py-3 text-left border rounded-t-md">
                  Option A
                </th>
                <th className="px-6 py-3 text-left border rounded-t-md">
                  Option B
                </th>
                <th className="px-6 py-3 text-left border rounded-t-md">
                  Option C
                </th>
                <th className="px-6 py-3 text-left border rounded-t-md">
                  Option D
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border font-semibold">{q.text}</td>
                  {q.type !== "write" ? (
                    q.options.map((option, oIdx) => (
                      <td
                        key={oIdx}
                        className={`px-6 py-3 border ${
                          q.correctAnswers.includes(oIdx)
                            ? "bg-green-100"
                            : "bg-white"
                        }`}>
                        {option}
                      </td>
                    ))
                  ) : (
                    <td colSpan="4" className="px-6 py-3 border bg-green-100">
                      <strong>{q.correctAnswers[0]}</strong>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleEditQuiz}
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition font-semibold">
            Edit Quiz
          </button>
          <button
            onClick={() => navigate(`/finalize-quiz/${quizId}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Finalize Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
