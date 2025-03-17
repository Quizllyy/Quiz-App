import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManualQuestionEntry() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswers: [], type: "single" },
  ]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, oIndex, checked) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].type === "multiple") {
      let newCorrectAnswers = [...updatedQuestions[qIndex].correctAnswers];
      if (checked) {
        if (!newCorrectAnswers.includes(oIndex)) {
          newCorrectAnswers.push(oIndex);
        }
      } else {
        newCorrectAnswers = newCorrectAnswers.filter((ans) => ans !== oIndex);
      }
      updatedQuestions[qIndex].correctAnswers = newCorrectAnswers;
    } else {
      updatedQuestions[qIndex].correctAnswers = [oIndex];
    }
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    updatedQuestions[index].correctAnswers = [];
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correctAnswers: [],
        type: "single",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Questions:", questions);
    alert("Questions saved successfully!");
    navigate("/review-quiz");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[40rem] text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Enter Questions Manually</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="text-left border p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              />
              <label className="block text-sm font-medium text-gray-700">
                Question Type
              </label>
              <select
                className="w-full p-2 border rounded-md mb-2"
                value={q.type}
                onChange={(e) => handleTypeChange(qIndex, e.target.value)}
                required>
                <option value="" disabled>
                  Select Question Type
                </option>
                <option value="single">Single Correct</option>
                <option value="multiple">Multiple Correct</option>
                <option value="write">Write Answer</option>
              </select>
              {q.type !== "write" && (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-2"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                      {q.type === "multiple" ? (
                        <input
                          type="checkbox"
                          checked={q.correctAnswers.includes(oIndex)}
                          onChange={(e) =>
                            handleCorrectAnswerChange(
                              qIndex,
                              oIndex,
                              e.target.checked
                            )
                          }
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswers[0] === oIndex}
                          onChange={() =>
                            handleCorrectAnswerChange(qIndex, oIndex, true)
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
              {q.type === "write" && (
                <>
                  <label className="block text-sm font-medium text-gray-700">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-2"
                    value={q.correctAnswers[0] || ""}
                    onChange={(e) => handleCorrectAnswerChange(qIndex, 0, true)}
                    required
                  />
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            onClick={addQuestion}>
            Add Another Question
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Save & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
