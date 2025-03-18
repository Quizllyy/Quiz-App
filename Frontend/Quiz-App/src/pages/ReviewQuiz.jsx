import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewQuiz() {
  const navigate = useNavigate();

  // Sample questions for review (Replace this with actual data)
  const quizData = [
    {
      text: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswers: [0], // Index of correct option(s)
      type: "single",
    },
    {
      text: "Select the prime numbers",
      options: ["2", "3", "4", "5"],
      correctAnswers: [0, 1, 3], // Multiple correct answers
      type: "multiple",
    },
    {
      text: "Who wrote 'Hamlet'?",
      options: [],
      correctAnswers: ["William Shakespeare"],
      type: "write",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-20 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Review Your Quiz
        </h2>
        <p className="text-gray-600 mb-4">
          Check your questions before finalizing the quiz.
        </p>

        <div className="flex flex-col gap-6">
          {quizData.map((q, index) => (
            <div
              key={index}
              className="text-left border p-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">{`Q${
                index + 1
              }: ${q.text}`}</h3>

              {q.type !== "write" ? (
                <ul className="mt-2">
                  {q.options.map((option, oIndex) => (
                    <li
                      key={oIndex}
                      className={`p-2 rounded-md ${
                        q.correctAnswers.includes(oIndex)
                          ? "bg-green-100 border-l-4 border-green-500"
                          : "bg-gray-100"
                      }`}>
                      {option}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 p-2 bg-green-100 border-l-4 border-green-500 rounded-md">
                  Correct Answer: <strong>{q.correctAnswers[0]}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition font-semibold">
            Edit Quiz
          </button>
          <button
            onClick={() => alert("Quiz finalized successfully!")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold">
            Finalize Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
