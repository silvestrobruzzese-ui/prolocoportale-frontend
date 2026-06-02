// Install PWA Banner - shows once to encourage adding to home screen
import React, { useState, useEffect } from "react";
import { X, Share, Plus, MoreVertical, Download } from "lucide-react";

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Check if already dismissed
    const dismissed = localStorage.getItem("pm_install_banner_dismissed");

    // Detect device
    const ua = navigator.userAgent || "";
    const iOS = /iPad|iPhone|iPod/.test(ua);
    const android = /Android/.test(ua);

    setIsIOS(iOS);
    setIsAndroid(android);

    // Show banner after 3 seconds if on mobile and not dismissed/installed
    if ((iOS || android) && !dismissed && !standalone) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("pm_install_banner_dismissed", "1");
  };

  if (!show || isStandalone) return null;

  return (
    <div className="fixed bottom-20 left-3 right-3 z-[1100] slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D96C4A] to-[#e07f5f] p-4 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Apri a schermo intero</h3>
                <p className="text-white/80 text-sm">Senza barra del browser</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4">
          {isIOS && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">
                Per aprire a schermo intero su iPhone/iPad:
              </p>
              <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-xl">
                <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
                  <Share className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">1. Tocca l'icona Condividi</p>
                  <p className="text-xs text-[var(--text-secondary)]">In basso nella barra di Safari</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-xl">
                <div className="w-8 h-8 bg-[var(--text-primary)] rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">2. "Aggiungi a Home"</p>
                  <p className="text-xs text-[var(--text-secondary)]">Scorri e tocca l'opzione</p>
                </div>
              </div>
            </div>
          )}

          {isAndroid && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">
                Per aprire a schermo intero su Android:
              </p>
              <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-xl">
                <div className="w-8 h-8 bg-[var(--text-primary)] rounded-lg flex items-center justify-center">
                  <MoreVertical className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">1. Tocca il menu (⋮)</p>
                  <p className="text-xs text-[var(--text-secondary)]">In alto a destra in Chrome</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-xl">
                <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">2. "Aggiungi a schermata Home"</p>
                  <p className="text-xs text-[var(--text-secondary)]">Tocca l'opzione nel menu</p>
                </div>
              </div>
            </div>
          )}

          {!isIOS && !isAndroid && (
            <p className="text-sm text-[var(--text-secondary)]">
              Aggiungi questa pagina ai preferiti per accedervi rapidamente!
            </p>
          )}

          <button
            onClick={handleDismiss}
            className="w-full mt-4 py-3 bg-[var(--bg)] hover:bg-[var(--border)] text-[var(--text-primary)] rounded-xl font-medium transition-colors text-sm"
          >
            Ho capito, non mostrare più
          </button>
        </div>
      </div>
    </div>
  );
}
