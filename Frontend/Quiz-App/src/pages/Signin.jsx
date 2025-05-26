import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Get signIn function from AuthContext

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default value
    remember: false,
  });
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Full Backend Response:", data); // Debugging

      if (response.ok) {
        if (!data.user) {
          console.error("Error: No user data received from backend!");
          alert("Error: No user data received. Check backend response.");
          return;
        }

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        signIn(data.user); // ✅ Update global state

        alert("Sign-in successful!");
        navigate("/");
      } else {
        alert(data.message || "Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 px-6 pt-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-300">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Enter your full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-8">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold">
            Sign In
          </button>
        </form>

        <p className="text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
