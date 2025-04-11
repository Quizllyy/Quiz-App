import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminResults = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/results/admin/${quizId}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching admin results:", err));
  }, [quizId]);

  return (
    <div className="container pt-24 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin - Quiz Results</h2>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>User:</strong>{" "}
                {result.userId?.username || "Unknown User"}
              </p>
              <p>
                <strong>Score:</strong> {result.score}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default AdminResults;
