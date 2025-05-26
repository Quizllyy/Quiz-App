import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FinalizeQuiz = () => {
  const { quizId } = useParams();
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch secret code based on quizId for manual quiz first
    fetchManualQuizSecret()
      .then((response) => {
        setSecretCode(response.data.secretCode);
        setLoading(false);
      })
      .catch((error) => {
        // Log the error for better debugging
        console.error(
          "Error fetching manual quiz secret:",
          error.response ? error.response.data : error.message
        );

        // If manual quiz secret code not found, proceed to fetch for Excel quiz
        fetchExcelQuizSecret()
          .then((response) => {
            setSecretCode(response.data.secretCode);
            setLoading(false);
          })
          .catch((error) => {
            console.error(
              "Error fetching secret code:",
              error.response ? error.response.data : error.message
            );
            setError("Failed to fetch secret code.");
            setLoading(false);
          });
      });
  }, [quizId]);

  // Function to fetch secret code for manually updated quiz
  const fetchManualQuizSecret = () => {
    return axios.get(`${baseURL}/api/quiz/${quizId}/secret`);
  };

  // Function to fetch secret code for Excel quiz
  const fetchExcelQuizSecret = () => {
    return axios.get(`${baseURL}/api/excel/${quizId}/secret`);
  };

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
