import { Routes, Route } from "react-router-dom";

import Navbar from './Navbar'
import LandingPage from "./LandingPage.jsx"; 

import AboutUs from "./AboutUs";
import AdminBulletin from "./AdminBulletin";
import ComplaintForm from "./ComplaintForm";
import ComplaintsAdmin from "./ComplaintsAdmin.jsx";
import ComplaintsHistory from "./ComplaintsHistory";
import ContactUs from "./ContactUs";
import UserBulletin from "./UserBulletin";
import UserDashboard from "./UserDashboard";

import RegisterPage from './RegisterPage';
import LoginPage from "./LoginPage";

import Footer from "./Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="page">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/bulletin" element={<UserBulletin />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/file-report" element={
            <ProtectedRoute>
              <ComplaintForm />
            </ProtectedRoute>
          } />
          <Route path="/check-complaints" element={
            <ProtectedRoute>
              <ComplaintsHistory />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
