import React from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 pt-56 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          How do you want to upload questions?
        </h2>
        <div className="flex flex-col gap-5">
          <button
            className="flex items-center justify-center gap-3 w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition transform hover:scale-105 font-semibold"
            onClick={() => navigate("/manual-entry")}>
            Manual Entry
          </button>

          <button
            className="flex items-center justify-center gap-3 w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition transform hover:scale-105 font-semibold"
            onClick={() => navigate("/excel-upload")}>
            Upload via File
          </button>
        </div>
      </div>
    </div>
  );
}
