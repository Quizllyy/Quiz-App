import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CaptchaPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code === "123456") {
      // Replace with actual verification logic
      navigate("/quiz");
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
        <p className="text-gray-600 mb-6">
          Please enter the code provided to access the quiz.
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Code"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleSubmit}>
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
