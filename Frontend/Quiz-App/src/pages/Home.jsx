// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <header className="component">
        <h1 className="heading">Challenge Yourself with Fun & Engaging Quizzes!</h1>
        <div className="box">
          <Link to="/quizzes">
            <button className="btn">
              Start a Quiz
            </button>
          </Link>
          <Link to="/create-quiz">
            <button className="btn">
              Create a Quiz
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
