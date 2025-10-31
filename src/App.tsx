import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UserProfile from "./pages/UserProfile";
import Subscription from "./pages/Subscription";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRoute from "./components/auth/AuthRoute";
import Overview from "./pages/Home/Overview";
import React from "react";
const Features = React.lazy(() => import("./pages/Home/Features"));
const Pricing = React.lazy(() => import("./pages/Home/Pricing"));
const About = React.lazy(() => import("./pages/Home/About"));
const Contact = React.lazy(() => import("./pages/Home/Contact"));
const FAQ = React.lazy(() => import("./pages/Home/FAQ"));
const Terms = React.lazy(() => import("./pages/Home/Terms"));
const PrivacyPolicy = React.lazy(() => import("./pages/Home/PrivacyPolicy"));
const RefundPolicy = React.lazy(() => import("./pages/Home/RefundPolicy"));

export default function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Home landing page (public) */}
          <Route path="/" element={<Overview />} />
          <Route path="/home" element={<Overview />} />
          <Route path="/home/features" element={<Features />} />
          <Route path="/home/pricing" element={<Pricing />} />
          <Route path="/home/about" element={<About />} />
          <Route path="/home/contact" element={<Contact />} />
          <Route path="/home/faq" element={<FAQ />} />
          <Route path="/home/terms" element={<Terms />} />
          <Route path="/home/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/home/refund-policy" element={<RefundPolicy />} />

          {/* Auth Layout - Redirect if already logged in */}
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />

          {/* Dashboard Layout - Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}
