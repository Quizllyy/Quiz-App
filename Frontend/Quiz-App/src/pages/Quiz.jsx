import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userResponses, setUserResponses] = useState({});
  const [timer, setTimer] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        const data = await response.json();

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

  const handleOptionSelect = (qId, optionIndex) => {
    if (quizStarted) {
      setUserResponses((prev) => ({ ...prev, [qId]: optionIndex }));
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold">Loading quiz...</h2>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 pt-20">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {quiz.title}
        </h1>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow mt-4">
          <p className="text-gray-600">
            ⏳ Time Left: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
          <p className="text-gray-600">📌 Questions: {questions.length}</p>
        </div>

        {!quizStarted ? (
          <button
            onClick={handleStartQuiz}
            className="mt-6 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Start Quiz
          </button>
        ) : (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Questions:
            </h2>
            {questions.map((q, idx) => (
              <div key={q._id} className="border-b py-6">
                <p className="font-semibold text-lg">
                  {idx + 1}. {q.text}
                </p>
                {q.type === "multiple" ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {q.options.map((opt, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 border rounded-md transition text-gray-700 font-medium
                        ${
                          userResponses[q._id]?.includes(index)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-50 hover:bg-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(q._id, index)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : q.type === "text" ? (
                  <input
                    type="text"
                    className="w-full mt-2 px-4 py-2 border rounded-md"
                    placeholder="Type your answer here..."
                    onChange={(e) =>
                      setUserResponses((prev) => ({
                        ...prev,
                        [q._id]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <ul className="mt-2 space-y-2">
                    {q.options.map((opt, index) => (
                      <li
                        key={index}
                        className={`px-4 py-3 border rounded-md cursor-pointer transition text-gray-700 font-medium text-center
                        ${
                          userResponses[q._id] === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-50 hover:bg-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(q._id, index)}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <button className="mt-6 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
