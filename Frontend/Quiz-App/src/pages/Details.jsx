import React from "react";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* Subtle shadow card for a clean UI */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Discover More About Us ✨
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Our quiz platform provides interactive quizzes, real-time scoring, and
          a seamless user experience. Whether you're a student or educator, who
          wants to make quiz attempting easy, we’ve got you covered!
        </p>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-all"
          onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
