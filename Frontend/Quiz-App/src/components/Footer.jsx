import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-8">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Quizly. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
