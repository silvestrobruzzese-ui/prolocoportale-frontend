// Root App component with routing + providers + sonner toaster
import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import CookieConsent from "@/components/CookieConsent";

import HomePage from "@/pages/HomePage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import PrologoLogin from "@/pages/PrologoLogin";
import PrologoDashboard from "@/pages/PrologoDashboard";
import ProlocoLandingPage from "@/pages/ProlocoLandingPage";
import CittaPaeseLandingPage from "@/pages/CittaPaeseLandingPage";
import CittaPaeseLogin from "@/pages/CittaPaeseLogin";
import PaywallPage from "@/pages/PaywallPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portale" element={<HomePage />} />
      <Route path="/p/:slug" element={<ProlocoLandingPage />} />
      <Route path="/c/:slug" element={<CittaPaeseLandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/proloco/login" element={<PrologoLogin />} />
      <Route path="/proloco" element={<PrologoDashboard />} />
      <Route path="/citta/login" element={<CittaPaeseLogin />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="App">
      <I18nProvider>
        <AuthProvider>
          <BrowserRouter>
            <CookieConsent>
              <AppRoutes />
            </CookieConsent>
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </div>
  );
}
