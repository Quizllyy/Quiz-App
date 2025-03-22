import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));// Check if user is logged in

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
    // access_key: process.env.REACT_APP_WEB3_API_KEY,
  });  

  const [status, setStatus] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) { 
      alert("You must be signed in to send a message.");
      navigate("/signin");
      return;
    }
    setLoading(true);
  
    const formDataWithKey = {
      ...formData,
      access_key: process.env.REACT_APP_WEB3_API_KEY,
      honeypot: "",  // Add an empty hidden field
    };
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithKey),
      });
  
      const result = await response.json();
      setLoading(false);
  
      if (result.success) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        console.error("Web3Forms error:", result);
        setStatus({
          success: false,
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        success: false,
        message: "Network error. Please try again.",
      });
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 px-6 pt-28">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-gray-700 mb-8 text-center max-w-lg">
        Have any questions or feedback? Fill out the form below, and we'll get
        back to you as soon as possible!
      </p>

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-300">
        {status.message && (
          <div
            className={`p-3 mb-4 text-center font-semibold rounded-md ${
              status.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
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
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
            disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
