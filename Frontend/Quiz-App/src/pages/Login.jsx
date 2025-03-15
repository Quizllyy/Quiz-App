import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.data.token); // ✅ Store JWT Token
      alert("Logged in successfully!");
      navigate("/"); // ✅ Redirect to Home
    } catch (error) {
      alert("Invalid credentials. Try again.");
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] bg-gray-100 pt-32">
    <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded-md w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded-md w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Log In
        </button>
      </form>
      <p className="text-gray-600 mt-4">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/signin")}>
          Sign In
        </span>
      </p>
    </div>
  </div>
  );
}
