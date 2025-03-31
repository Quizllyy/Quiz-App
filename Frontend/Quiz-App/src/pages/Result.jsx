import { useState } from "react";
import axios from "axios";

const Result = ({ quizId, questions }) => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleAnswerChange = (questionId, answer) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { quizId, responses };
      await axios.post("http://localhost:8080/api/quiz/submit", payload);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit quiz.");
    }
  };

  return (
    <div>
      {submitted ? (
        <h2>✅ Quiz Submitted Successfully!</h2>
      ) : (
        <div>
          <h2>Quiz</h2>
          {questions.map((q) => (
            <div key={q._id}>
              <p>{q.text}</p>
              <input
                type="text"
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Result;
