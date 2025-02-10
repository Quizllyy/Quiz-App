// // src/pages/Home.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   return (
//     <div className="home">
//       <header className="component">
//         <h1 className="heading">Challenge Yourself with Fun & Engaging Quizzes!</h1>
//         <div className="box">
//           <Link to="/quizzes">
//             <button className="btn">
//               Take a Quiz
//             </button>
//           </Link>
//           <Link to="/create-quiz">
//             <button className="btn">
//               Create a Quiz
//             </button>
//           </Link>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { FaPlus, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-600 flex flex-col items-center text-white p-6 relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center mt-20 z-10 animate-fade-in">
        <h1 className="text-7xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-pink-400">QuizMaster</span>
        </h1>
        <p className="text-2xl mb-8 text-gray-200 animate-slide-up">
          Create, Share, and Play Engaging Quizzes
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mt-6 z-10 animate-bounce-in">
      <Link
            to="/create-quiz"
            className="flex items-center gap-2 bg-pink-500 px-8 py-4 rounded-xl shadow-lg text-2xl font-semibold transition-all duration-300 hover:bg-pink-600 hover:scale-105"
          >
      <FaPlus /> Create Quiz
      </Link>
        <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Enter Quiz Code"
            className="p-4 text-black outline-none w-56 text-lg border-r border-gray-300"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="bg-purple-600 p-4 text-white font-semibold transition-all duration-300 flex items-center hover:scale-105 hover:shadow-xl">
            <FaSignInAlt className="mr-2" /> Join
          </button>
        </div>
      </div>

      {/* Modern Artistic Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-[100px]"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
}

