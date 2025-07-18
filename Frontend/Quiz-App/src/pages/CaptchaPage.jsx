import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptchaPage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const trimmedCode = code.trim();
      const response = await axios.post(
        `http://localhost:8080/api/verify/secret-code`,
        {
          secretCode: trimmedCode,
        }
      );

      if (response.data.valid) {
        navigate(`/quiz/${response.data.quizId}`);
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Invalid code. Please try again.");
      } else {
        console.error("Error verifying secret code:", err);
        setError("An error occurred. Please try again later.");
      }
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
        <form onSubmit={handleSubmit}>
          <input
            id="captchaInput"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            className="border border-gray-300 rounded-md p-3 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition font-semibold">
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptchaPage;
