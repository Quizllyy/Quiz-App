import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl w-full flex flex-row gap-8 border border-gray-300">
        {/* Start Quiz Section */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg">
          <h5 className="text-xl font-semibold mb-4">Start a Quiz</h5>
          <p className="text-gray-600 mb-6">
            Enter your unique quiz code and begin the test.
          </p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/verify-captcha")}>
            Start Quiz
          </button>
        </div>

        {/* Create Quiz Section */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg">
          <h5 className="text-xl font-semibold mb-4">Create a Quiz</h5>
          <p className="text-gray-600 mb-6">
            Upload questions and generate a quiz code.
          </p>
          <button
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            onClick={() => navigate("/categories")}>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
