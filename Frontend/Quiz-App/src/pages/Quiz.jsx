import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        const data = await response.json();

        if (!data.quiz || !data.questions) {
          throw new Error("Invalid API response");
        }

        setQuiz(data.quiz);
        setQuestions(data.questions);
        setTimer(data.quiz.timeLimit * 60);
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
      handleSubmitQuiz();
    }
  }, [quizStarted, timer]);

  const handleOptionSelect = (qId, optionIndex, type) => {
    if (!quizStarted || timer === 0) return;

    setUserResponses((prev) => {
      const updatedResponses = { ...prev };

      if (type === "multiple") {
        const selectedOptions = updatedResponses[qId] || [];
        if (selectedOptions.includes(optionIndex)) {
          updatedResponses[qId] = selectedOptions.filter(
            (opt) => opt !== optionIndex
          );
        } else {
          updatedResponses[qId] = [...selectedOptions, optionIndex];
        }
      } else {
        updatedResponses[qId] = optionIndex;
      }

      return updatedResponses;
    });
  };

  const handleTextAnswer = (qId, value) => {
    if (!quizStarted || timer === 0) return;
    setUserResponses((prev) => ({ ...prev, [qId]: value }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSubmitQuiz = async () => {
    if (!quizStarted) return;
    setQuizStarted(false);
  
    // Format answers as required by backend
    const answers = questions.map((q) => {
      const userAnswer = userResponses[q._id];
  
      return {
        questionId: q._id,
        selectedOption:
          q.type === "write"
            ? userAnswer || ""
            : Array.isArray(userAnswer)
            ? userAnswer
            : userAnswer !== undefined
            ? [userAnswer]
            : [],
      };
    });
  
    try {
      console.log("📤 Submitting answers:", {
        quizId,
        userId: user?._id,
        answers,
      });
    
      const response = await fetch("http://localhost:8080/api/results/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          userId: user?._id,
          answers,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // ✅ Navigate correctly with state to view result
        navigate(`/quiz/${quizId}/viewresult`, { state: { result } });
      } else {
        console.error("Quiz submission failed:", result.message);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading)
    return <div className="text-center text-2xl">Loading quiz...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto pt-24">
      <h1 className="text-3xl font-bold text-center">{quiz.title}</h1>
      <div className="bg-gray-100 p-4 rounded-lg mt-4 flex justify-between">
        <p>
          ⏳ Time Left: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </p>
        <p>📌 Questions: {questions.length}</p>
      </div>

      {!quizStarted ? (
        <button
          onClick={handleStartQuiz}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        >
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
                      }`}
                      onClick={() =>
                        handleOptionSelect(q._id, index, "multiple")
                      }
                      disabled={timer === 0}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : q.type === "write" ? (
                <textarea
                  className="w-full px-4 py-2 border rounded-md mt-2"
                  placeholder="Type your answer..."
                  onChange={(e) => handleTextAnswer(q._id, e.target.value)}
                  value={userResponses[q._id] || ""}
                  disabled={timer === 0}
                />
              ) : (
                <ul className="mt-2 space-y-2">
                  {q.options.map((opt, index) => (
                    <li
                      key={index}
                      className={`px-4 py-3 border rounded-md text-center cursor-pointer ${
                        userResponses[q._id] === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50"
                      }`}
                      onClick={() =>
                        handleOptionSelect(q._id, index, "single")
                      }
                      disabled={timer === 0}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button
            onClick={handleSubmitQuiz}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
