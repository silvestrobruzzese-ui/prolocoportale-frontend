// Cookie Consent Banner - Simple accept-only version
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CookieConsent({ children }) {
  const [hasConsent, setHasConsent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie_consent");
    setHasConsent(consent === "accepted");
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setHasConsent(true);
  };

  // Still loading consent status
  if (hasConsent === null) {
    return null;
  }

  // User has not accepted cookies - show banner
  if (!hasConsent) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="mx-4 max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🍪</span> Cookie Policy
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-gray-700 leading-relaxed mb-4">
              Questo sito utilizza cookie essenziali per garantire il corretto
              funzionamento e cookie pubblicitari per mostrare annunci pertinenti.
            </p>

            <p className="text-gray-600 text-sm mb-4">
              Continuando a navigare, accetti l'utilizzo dei cookie in conformità
              con la nostra{" "}
              <button
                onClick={() => navigate("/privacy")}
                className="text-[#1e3a5f] underline hover:text-[#2d5a8f] font-medium"
              >
                Privacy Policy
              </button>
              .
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500">
                <strong>Cookie utilizzati:</strong> Autenticazione, preferenze lingua,
                Google AdSense (pubblicità), Cloudflare (sicurezza e analytics).
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="px-6 pb-6">
            <button
              onClick={handleAccept}
              className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#2d5a8f] hover:to-[#3d6a9f] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Accetta e continua
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User has accepted cookies - render children
  return <>{children}</>;
}
