import React from "react";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-3xl font-bold mb-4">More About Our App</h2>
        <p className="text-gray-600 mb-6">
          Our quiz platform offers a variety of question types, real-time
          scoring, and a seamless user experience. Whether you're an educator,
          student, or quiz enthusiast, our app provides an intuitive way to
          create and take quizzes.
        </p>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
