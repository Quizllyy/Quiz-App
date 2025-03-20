import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quiz/${quizId}`
        );
        console.log("Fetched Quiz Data:", response.data);

        if (response.data.quiz && response.data.questions) {
          setQuiz(response.data.quiz);
          setQuestions(response.data.questions);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>Time Limit: {quiz.timeLimit} minutes</p>
      <p>Number of Questions: {quiz.numQuestions}</p>

      <h2>Questions:</h2>
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q._id}>
            <p>{q.text}</p>
            <ul>
              {q.options.map((opt, index) => (
                <li key={index}>{opt}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Quiz;
