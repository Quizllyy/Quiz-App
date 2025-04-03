import React, { useEffect, useState } from "react";

const AdminResults = ({ quizId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/results/admin/${quizId}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));
  }, [quizId]);

  return (
    <div className="container">
      <h2>Admin - Quiz Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>User:</strong> {result.userId.username} <br />
              <strong>Score:</strong> {result.score}
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
