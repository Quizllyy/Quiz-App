import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userResponses, setUserResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        const data = response.data;
        console.log("Fetched Quiz Data:", data);

        if (!data.quiz || !data.questions) {
          throw new Error("Invalid API response");
        }

        setQuiz(data.quiz);
        setQuestions(data.questions);
        setTimer(data.quiz.timeLimit * 60); // Convert minutes to seconds
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
  }, [quizStarted, timer]);

  useEffect(() => {
    if (quizStarted && timer === 0) {
      setQuizEnded(true);
      handleSubmitQuiz(); // Auto-submit when time is up
    }
  }, [timer]);

  const handleOptionSelect = (qId, optionIndex, type) => {
    if (!quizStarted || quizEnded) return; // Stop response selection

    setUserResponses((prev) => {
      const newResponses = { ...prev };

      if (type === "multiple") {
        const selectedOptions = newResponses[qId] || [];
        if (selectedOptions.includes(optionIndex)) {
          newResponses[qId] = selectedOptions.filter(
            (idx) => idx !== optionIndex
          );
        } else {
          newResponses[qId] = [...selectedOptions, optionIndex];
        }
      } else {
        newResponses[qId] = [optionIndex];
      }

      return newResponses;
    });
  };

  const handleTextResponse = (qId, value) => {
    if (!quizStarted || quizEnded) return; // Stop input
    setUserResponses((prev) => ({ ...prev, [qId]: value }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSubmitQuiz = async () => {
    console.log("Submitting quiz with userId:", userId); // Debugging log
    console.log("quizId:", quizId);
    console.log("responses:", userResponses);

    if (!userId) {
      console.error("Error: userId is undefined.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          userId,
          responses: userResponses,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      const data = await response.json();
      console.log("Quiz submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) return <div className="text-center">Loading quiz...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-center">{quiz.title}</h1>
      <p className="text-center font-bold text-gray-600 mt-12 mb-12 text-blue-500">
        Time Left: {Math.floor(timer / 60)}:
        {String(timer % 60).padStart(2, "0")}
      </p>

      {!quizStarted ? (
        <button
          onClick={handleStartQuiz}
          className="w-full bg-blue-500 text-white py-2">
          Start Quiz
        </button>
      ) : (
        <div className="mt-4">
          {questions.map((q, idx) => (
            <div key={q._id} className="mb-4 p-4 border rounded-lg">
              <p className="font-semibold">
                {idx + 1}. {q.text}
              </p>
              {q.type === "multiple" ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.options.map((opt, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 border rounded-md transition text-gray-700 font-medium ${
                        userResponses[q._id]?.includes(index)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleOptionSelect(q._id, index, "multiple")
                      }
                      disabled={quizEnded}>
                      {opt}
                    </button>
                  ))}
                </div>
              ) : q.type === "write" ? (
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-md"
                  placeholder="Type your answer here..."
                  onChange={(e) => handleTextResponse(q._id, e.target.value)}
                  disabled={quizEnded}
                />
              ) : (
                <ul className="mt-2 space-y-2">
                  {q.options.map((opt, index) => (
                    <li
                      key={index}
                      className={`px-4 py-3 border rounded-md cursor-pointer transition text-gray-700 font-medium text-center ${
                        userResponses[q._id]?.[0] === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 hover:bg-gray-200"
                      }`}
                      onClick={() => handleOptionSelect(q._id, index, "single")}
                      disabled={quizEnded}>
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            disabled={quizEnded}
            className="w-full bg-green-500 text-white py-3 mt-4">
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
