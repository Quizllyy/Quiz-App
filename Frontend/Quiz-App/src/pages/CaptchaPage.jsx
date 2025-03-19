import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CaptchaPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("captchaInput")?.focus();
  }, []);

  const handleSubmit = () => {
    if (code.trim() === "123456") {
      navigate("/quiz"); // Redirect after successful verification
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Enter Verification Code
        </h2>
        <p className="text-gray-600 mb-6">
          Please enter the code provided to access the quiz.
        </p>

        <input
          id="captchaInput"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Code"
          className="border border-gray-300 rounded-md p-3 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition font-semibold"
          onClick={handleSubmit}>
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
