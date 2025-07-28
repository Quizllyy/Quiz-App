import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CaptchaPage from "./pages/CaptchaPage.jsx";
import Categories from "./pages/Categories.jsx";
import Details from "./pages/Details.jsx";
import ManualQuizEntry from "./pages/ManualEntryForm.jsx";
import UploadQuizExcel from "./pages/UploadQuizExcel.jsx";
// import Footer from "./components/Footer.jsx";
import ManualQuestionEntry from "./pages/ManualQuestionEntry.jsx";
import ReviewQuiz from "./pages/ReviewQuiz.jsx";
import EditQuiz from "./pages/EditQuiz";
import FinalizeQuiz from "./pages/FinalizeQuiz.jsx";
import Quiz from "./pages/Quiz.jsx";
import ReviewUploadedQuiz from "./pages/ReviewUploadedQuiz";
import Profile from "./pages/profile.jsx";
import ViewResult from "./pages/ViewResult.jsx";
import AdminResults from "./pages/AdminResults.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify-captcha" element={<CaptchaPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/create-quiz" element={<Categories />} />
            <Route path="/manual-entry" element={<ManualQuizEntry />} />
            <Route
              path="/create-questions/:quizId"
              element={<ManualQuestionEntry />}
            />
            <Route path="/review-quiz/:quizId" element={<ReviewQuiz />} />
            <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
            <Route path="/excel-upload" element={<UploadQuizExcel />} />
            <Route path="/finalize-quiz/:quizId" element={<FinalizeQuiz />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/details" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/review-questions" element={<ReviewUploadedQuiz />} />
            <Route path="/quiz/:quizId/result" element={<ViewResult />} />
            <Route
              path="/quiz/:quizId/admin-results"
              element={<AdminResults />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
