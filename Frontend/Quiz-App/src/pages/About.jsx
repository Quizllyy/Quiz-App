import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-32">
      {/* Heading Section */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center mt-4">
        About Quizly
      </h1>
      <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
        Empowering Education with Smart Assessments
      </h3>

      {/* Content Section */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8 border border-gray-300">
        {/* Description Card */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg bg-blue-50">
          <h5 className="text-xl font-semibold mb-4">What We Offer</h5>
          <p className="text-gray-600 mb-6">
            We simplify online assessments for students & educators with an
            intuitive platform.
          </p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/")}>
            Get Started
          </button>
        </div>

        {/* Learn More Card */}
        <div className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105 text-center border border-gray-300 hover:shadow-lg bg-purple-50">
          <h5 className="text-xl font-semibold mb-4">Learn More</h5>
          <p className="text-gray-600 mb-6">
            Discover how our platform can transform learning with data-driven
            insights.
          </p>
          <button
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            onClick={() => navigate("/details")}>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
