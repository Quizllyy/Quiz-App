import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-3xl font-bold mb-4">About Our App</h2>
        <p className="text-gray-600 mb-6">
          Our quiz platform helps you create and participate in interactive
          quizzes with ease. Choose different question formats, set time limits,
          and challenge your knowledge!
        </p>
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/")}>
            Get Started
          </button>
          <button
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => navigate("/details")}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
