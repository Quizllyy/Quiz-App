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

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-captcha" element={<CaptchaPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/create-quiz" element={<Categories />} />
          <Route path="/details" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
