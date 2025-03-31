import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FinalizeQuiz = () => {
  const { quizId } = useParams();
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/quizzes/${quizId}`)
      .then((response) => {
        setSecretCode(response.data.secretCode);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setError("Failed to fetch secret code.");
        setLoading(false);
      });
  }, [quizId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/quiz/${quizId}/secret`)
      .then((response) => {
        console.log("API Response:", response.data); // ✅ Check this in browser console
        setSecretCode(response.data.secretCode);
      })
      .catch((error) => {
        console.error("Error fetching secret code:", error);
      });
  }, [quizId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-300">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quiz Finalized Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Share the following secret code with your students:
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <span className="text-xl font-mono">{secretCode}</span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold">
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalizeQuiz;
