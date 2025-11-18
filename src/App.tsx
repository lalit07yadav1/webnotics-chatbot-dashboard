import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRoute from "./components/auth/AuthRoute";
import SuperAdminRoute from "./components/auth/SuperAdminRoute";
import WebsiteUrlManagement from "./pages/ManageScript/WebsiteUrlManagement";
import FaqManagement from "./pages/ManageScript/FaqManagement";
import KnowledgeBaseManagement from "./pages/ManageScript/KnowledgeBaseManagement";
import CustomizeChatbot from "./pages/ManageScript/CustomizeChatbot";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllMessages from "./pages/Admin/AllMessages";
import BotUsersList from "./pages/Admin/BotUsersList";
import Settings from "./pages/Admin/Settings";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Profile/ChangePassword";
import UpgradePlanPage from "./pages/Upgrade/UpgradePlanPage";
import CancelSubscription from "./pages/Upgrade/CancelSubscription";
// Public Home Pages
import Overview from "./pages/Home/Overview";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";
import FAQ from "./pages/Home/FAQ";
import Features from "./pages/Home/Features";
import Pricing from "./pages/Home/Pricing";
import PrivacyPolicy from "./pages/Home/PrivacyPolicy";
import Terms from "./pages/Home/Terms";
import Integration from "./pages/Home/Integration";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Overview />} />
          
          {/* Public Pages - Accessible to all */}
          <Route path="/home/overview" element={<Overview />} />
          <Route path="/home/about" element={<About />} />
          <Route path="/home/contact" element={<Contact />} />
          <Route path="/home/faq" element={<FAQ />} />
          <Route path="/home/features" element={<Features />} />
          <Route path="/home/integration" element={<Integration />} />
          <Route path="/home/pricing" element={<Pricing />} />
          <Route path="/home/privacy-policy" element={<PrivacyPolicy />} />
         
          <Route path="/home/terms" element={<Terms />} />
          
          {/* Auth Pages - Redirect to home if already logged in */}
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/upgrade-plan" element={<UpgradePlanPage />} />
            <Route path="/cancel-subscription" element={<CancelSubscription />} />
            <Route path="/manage-script/website-urls" element={<WebsiteUrlManagement />} />
            <Route path="/manage-script/faq" element={<FaqManagement />} />
            <Route path="/manage-script/knowledge-base" element={<KnowledgeBaseManagement />} />
            <Route path="/manage-script/customize-chatbot" element={<CustomizeChatbot />} />
          </Route>

          {/* Admin Dashboard Layout - SuperAdmin Only Routes */}
          <Route
            element={
              <SuperAdminRoute>
                <AppLayout />
              </SuperAdminRoute>
            }
          >
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-messages" element={<AllMessages />} />
            <Route path="/admin-bot-users" element={<BotUsersList />} />
            <Route path="/admin-settings" element={<Settings />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
