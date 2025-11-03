import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRoute from "./components/auth/AuthRoute";
import WebsiteUrlManagement from "./pages/ManageScript/WebsiteUrlManagement";
import FaqManagement from "./pages/ManageScript/FaqManagement";
import KnowledgeBaseManagement from "./pages/ManageScript/KnowledgeBaseManagement";
import CustomizeChatbot from "./pages/ManageScript/CustomizeChatbot";
import { getValidToken } from "./utils/tokenUtils";

export default function App() {
  // Check token validity on app load
  const validToken = getValidToken();
  
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout - Redirect if already logged in */}
          <Route
            path="/"
            element={
              validToken ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />
          <Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />

          {/* Dashboard Layout - Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Home />} />
            <Route path="/manage-script/website-urls" element={<WebsiteUrlManagement />} />
            <Route path="/manage-script/faq" element={<FaqManagement />} />
            <Route path="/manage-script/knowledge-base" element={<KnowledgeBaseManagement />} />
            <Route path="/manage-script/customize-chatbot" element={<CustomizeChatbot />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
