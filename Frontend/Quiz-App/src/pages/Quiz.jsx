import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-attempt">
      <h2>{quizData.title}</h2>
      {/* Render quiz questions and options */}
    </div>
  );
};

export default Quiz;
