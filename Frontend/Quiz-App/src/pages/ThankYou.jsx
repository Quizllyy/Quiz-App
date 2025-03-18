import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center border border-gray-300">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
        <p className="text-gray-700 mb-6">
          Your message has been successfully sent. We’ll get back to you soon!
        </p>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
