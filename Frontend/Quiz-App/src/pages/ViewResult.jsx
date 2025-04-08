import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewResult = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/results/${resultId}`);
        setResult(res.data);
      } catch (err) {
        console.error("Error fetching result:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!result) return <p className="p-6">Result not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Result Details</h2>
      <p className="mb-2">Quiz: {result.quizId?.title || "N/A"}</p>
      <p className="mb-2">User: {result.userId?.name || "N/A"}</p>
      <p className="mb-4">Score: {result.score}</p>

      {result.answers?.map((answer, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
        >
          <p className="font-medium">
            Q{idx + 1}:{" "}
            {typeof answer.questionId === "object"
              ? answer.questionId.text
              : "Question not found"}
          </p>
          <p>
            <strong>Your Answer:</strong>{" "}
            {Array.isArray(answer.selectedOption)
              ? answer.selectedOption.join(", ")
              : answer.selectedOption || "No Answer"}
          </p>
          <p>
            <strong>Correct Answer:</strong>{" "}
            {typeof answer.questionId === "object"
              ? answer.questionId.correctAnswers?.join(", ")
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewResult;
