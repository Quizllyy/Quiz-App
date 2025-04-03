import React, { useEffect, useState } from "react";

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const userId = "USER_ID"; // Replace with actual user ID (from context/auth)

  useEffect(() => {
    fetch(`http://localhost:8080/api/results/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));
  }, [userId]);

  return (
    <div className="container">
      <h2>Your Quiz Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>Quiz:</strong> {result.quizId.title} <br />
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

export default ViewResults;
