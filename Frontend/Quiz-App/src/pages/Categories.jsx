import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] bg-gray-100 pt-44">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          How do you want to upload questions?
        </h2>
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            onClick={() => navigate("/manual-entry")}>
            Manual Entry
          </button>
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
            onClick={() => navigate("/excel-upload")}>
            Upload via File
          </button>
        </div>
      </div>
    </div>
  );
}
