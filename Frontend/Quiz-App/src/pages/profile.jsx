import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <FaUserCircle className="text-7xl text-gray-400 mx-auto mb-4" />
        {user ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            <button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="mt-6 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 ease-in-out">
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500 mt-4">Loading user details...</p>
        )}
      </div>
    </div>
  );
}
