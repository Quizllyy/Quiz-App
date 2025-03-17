import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-24 px-4">
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 text-center leading-tight mb-4">
        Test Your Knowledge, <br />
        <span className="text-blue-600">Track Your Progress</span>
      </h1>
      <h3 className="text-xl md:text-2xl font-semibold text-gray-700 text-center mb-8">
        Simplified Assessment for Students & Educators
      </h3>

      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8 border border-gray-300">
        {/* Start Quiz Section */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg bg-blue-50">
          <h5 className="text-2xl font-semibold text-blue-700 mb-4">Start a Quiz</h5>
          <p className="text-gray-600 mb-6">
            Enter your unique quiz code and begin the test.
          </p>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
            onClick={() => navigate("/verify-captcha")}>
            Start Quiz 🚀
          </button>
        </div>

        {/* Create Quiz Section */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg bg-purple-50">
          <h5 className="text-2xl font-semibold text-purple-700 mb-4">Create a Quiz</h5>
          <p className="text-gray-600 mb-6">
            Upload questions and generate a quiz code.
          </p>
          <button
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition transform hover:scale-105"
            onClick={() => navigate("/categories")}>
            Create Quiz ✍️
          </button>
        </div>
      </div>
    </div>
  );
}
