// Root App component with routing + providers + sonner toaster
import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";

import HomePage from "@/pages/HomePage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import PrologoLogin from "@/pages/PrologoLogin";
import PrologoDashboard from "@/pages/PrologoDashboard";
import ProlocoLandingPage from "@/pages/ProlocoLandingPage";
import PaywallPage from "@/pages/PaywallPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaywallPage />} />
      <Route path="/portale" element={<HomePage />} />
      <Route path="/p/:slug" element={<ProlocoLandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/proloco/login" element={<PrologoLogin />} />
      <Route path="/proloco" element={<PrologoDashboard />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="App">
      <I18nProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </div>
  );
}
