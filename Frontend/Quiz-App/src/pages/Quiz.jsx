import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userResponses, setUserResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/quiz/${quizId}`
        );

        const data = await response.json();

        if (!data.quiz || !data.questions)
          throw new Error("Invalid API response");

        setQuiz(data.quiz);
        setQuestions(data.questions);
        setTimer(data.quiz.timeLimit * 60); // timeLimit in minutes
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && quizStarted) {
      alert("⏰ Time's up! Submitting your quiz.");
      handleSubmitQuiz(true); // auto submit
    }
  }, [quizStarted, timer]);

  const handleOptionSelect = (qId, optionIndex, type) => {
    if (!quizStarted || timer === 0) return;
    setUserResponses((prev) => {
      const updated = { ...prev };
      if (type === "multiple") {
        const selected = updated[qId] || [];
        updated[qId] = selected.includes(optionIndex)
          ? selected.filter((i) => i !== optionIndex)
          : [...selected, optionIndex];
      } else {
        updated[qId] = [optionIndex]; // wrap in array for consistency
      }
      return updated;
    });
  };

  const handleTextAnswer = (qId, value) => {
    if (!quizStarted || timer === 0) return;
    setUserResponses((prev) => ({ ...prev, [qId]: [value.trim()] }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSubmitQuiz = async (autoSubmit = false) => {
    if (!quizStarted || !userId || submitting) return;

    if (!autoSubmit) {
      const confirm = window.confirm(
        "Are you sure you want to submit the quiz?"
      );
      if (!confirm) return;
    }

    setSubmitting(true);
    setQuizStarted(false);

    const formattedAnswers = questions.map((question) => {
      const response = userResponses[question._id] || [];
      let selectedOption;

      if (question.type === "multiple") {
        selectedOption = response.map((i) => question.options[i]);
      } else if (question.type === "single") {
        selectedOption =
          response.length > 0 ? question.options[response[0]] : null;
      } else if (question.type === "write") {
        selectedOption = response[0] || "";
      }

      return {
        questionId: question._id,
        selectedOption,
      };
    });

    try {
      const response = await fetch(
        `http://localhost:8080/api/results/submit
`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId,
            userId,
            answers: formattedAnswers,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");

      navigate(`/quiz/${quizId}/result`, { state: { result } });
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit quiz: " + err.message);
    }
  };

  if (loading)
    return <div className="text-center text-2xl">Loading quiz...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!quiz) return <p>Quiz not found.</p>;

  const unanswered = questions.filter((q) => !userResponses[q._id]).length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-24">
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center">{quiz.title}</h1>
          <div className="bg-gray-100 p-4 rounded-lg mt-4 flex justify-between">
            <p>
              ⏳ Time Left: {Math.floor(timer / 60)}:
              {String(timer % 60).padStart(2, "0")}
            </p>
            <p>📌 Questions: {questions.length}</p>
          </div>

          {quizStarted && unanswered > 0 && (
            <p className="text-red-500 mt-2">🔴 Unanswered: {unanswered}</p>
          )}

          {!quizStarted ? (
            <button
              onClick={handleStartQuiz}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
              Start Quiz
            </button>
          ) : (
            <div className="mt-6">
              {questions.map((q, idx) => (
                <div key={q._id} className="border-b py-4">
                  <p className="font-semibold">
                    {idx + 1}. {q.text}
                  </p>
                  {q.type === "multiple" ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {q.options.map((opt, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 border rounded-md ${
                            userResponses[q._id]?.includes(index)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-50"
                          } ${
                            timer === 0 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() =>
                            timer !== 0 &&
                            handleOptionSelect(q._id, index, "multiple")
                          }>
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : q.type === "write" ? (
                    <textarea
                      className="w-full px-4 py-2 border rounded-md mt-2"
                      placeholder="Type your answer..."
                      onChange={(e) => handleTextAnswer(q._id, e.target.value)}
                      value={userResponses[q._id]?.[0] || ""}
                      disabled={timer === 0}
                    />
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {q.options.map((opt, index) => (
                        <li
                          key={index}
                          className={`px-4 py-3 border rounded-md text-center cursor-pointer ${
                            userResponses[q._id]?.[0] === index
                              ? "bg-blue-500 text-white"
                              : "bg-gray-50"
                          } ${
                            timer === 0 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() => {
                            if (timer !== 0)
                              handleOptionSelect(q._id, index, "single");
                          }}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <button
                onClick={() => handleSubmitQuiz(false)}
                disabled={submitting}
                className={`mt-4 px-6 py-2 text-white rounded ${
                  submitting ? "bg-gray-400" : "bg-green-500"
                }`}>
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// F0VE3B
