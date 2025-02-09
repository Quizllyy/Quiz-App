import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-600 flex flex-col items-center text-white p-6 relative overflow-hidden">
      <div className="text-center mt-24 z-10 animate-fade-in">
        <h1 className="text-6xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Have questions or feedback? Reach out to us, and we'll be happy to assist you!
        </p>
      </div>
      <form className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-lg">
        <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <textarea placeholder="Your Message" className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full transition-all duration-300 hover:bg-purple-700 hover:scale-105">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact