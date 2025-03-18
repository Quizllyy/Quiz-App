import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-3xl font-extrabold tracking-wide">
          Quizly
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition font-medium">
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-200 transition font-medium">
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition font-medium">
            Contact Us
          </Link>
          <Link
            to="/signin"
            className="text-white hover:text-gray-200 transition font-medium">
            Sign In
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-gray-200 transition font-medium">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-2xl"
            onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 p-4 space-y-3 shadow-lg">
          <Link
            to="/"
            className="block text-white hover:text-gray-200 transition font-medium"
            onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-200 transition font-medium"
            onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-gray-200 transition font-medium"
            onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
          <Link
            to="/signin"
            className="block text-white hover:text-gray-200 transition font-medium"
            onClick={() => setIsOpen(false)}>
            Sign In
          </Link>
          <Link
            to="/login"
            className="block text-white hover:text-gray-200 transition font-medium"
            onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
