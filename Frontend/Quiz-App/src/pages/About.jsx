import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-600 flex flex-col items-center text-white p-6 relative overflow-hidden">
      <div className="text-center mt-24 z-10 animate-fade-in">
        <h1 className="text-6xl font-extrabold mb-4">About QuizMaster</h1>
        <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          QuizMaster is an innovative platform that allows users to create, share, and participate in engaging quizzes.
          Whether you're a student, teacher, or just someone who loves challenges, our platform provides an easy and fun way to test knowledge and compete with friends.
        </p>
      </div>
      <div className="mt-10 flex gap-6">
        <button className="bg-pink-500 px-6 py-3 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-pink-600 hover:scale-105">
          Get Started
        </button>
        <button className="bg-purple-500 px-6 py-3 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-purple-600 hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default About