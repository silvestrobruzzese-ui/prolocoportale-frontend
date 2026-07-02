// Install PWA Banner - Multilingual with Safari detection
import React, { useState, useEffect, useCallback } from "react";
import { X, Share, Plus, MoreVertical, Download, Copy, Check, Compass } from "lucide-react";

const translations = {
  it: {
    title: "Salva questo sito",
    subtitle: "Aggiungi un'icona alla schermata Home per accedere velocemente",
    step1ios: "Tocca ··· in basso, poi \"Condividi\"",
    step2ios: "Scorri e tocca \"Aggiungi a Home\"",
    step3ios: "Tocca \"Aggiungi\" in alto a destra",
    step1android: "Tocca il menu (⋮) in alto a destra",
    step2android: "Tocca \"Aggiungi a schermata Home\"",
    btnOk: "Ho capito",
    btnNever: "Non mostrare più",
    btnInstall: "Aggiungi icona",
    safariTitle: "Apri con Safari",
    safariMsg: "Per salvare questo sito sulla Home, aprilo con Safari",
    btnCopyLink: "Copia link",
    linkCopied: "Link copiato!",
    iosInstructions: "Per salvare sulla schermata Home:",
    androidInstructions: "Per salvare sulla schermata Home:"
  },
  en: {
    title: "Save this site",
    subtitle: "Add an icon to your Home screen for quick access",
    step1ios: "Tap ··· at the bottom, then \"Share\"",
    step2ios: "Scroll and tap \"Add to Home Screen\"",
    step3ios: "Tap \"Add\" in the top right corner",
    step1android: "Tap the menu (⋮) in the top right",
    step2android: "Tap \"Add to Home screen\"",
    btnOk: "Got it",
    btnNever: "Don't show again",
    btnInstall: "Add icon",
    safariTitle: "Open with Safari",
    safariMsg: "To save this site to your Home screen, open it in Safari",
    btnCopyLink: "Copy link",
    linkCopied: "Link copied!",
    iosInstructions: "To save to Home screen:",
    androidInstructions: "To save to Home screen:"
  },
  es: {
    title: "Guarda este sitio",
    subtitle: "Añade un icono a la pantalla de inicio para acceder rápidamente",
    step1ios: "Toca ··· abajo, luego \"Compartir\"",
    step2ios: "Desplázate y toca \"Añadir a inicio\"",
    step3ios: "Toca \"Añadir\" en la esquina superior derecha",
    step1android: "Toca el menú (⋮) en la esquina superior derecha",
    step2android: "Toca \"Añadir a pantalla de inicio\"",
    btnOk: "Entendido",
    btnNever: "No mostrar más",
    btnInstall: "Añadir icono",
    safariTitle: "Abrir con Safari",
    safariMsg: "Para guardar este sitio en tu pantalla de inicio, ábrelo en Safari",
    btnCopyLink: "Copiar enlace",
    linkCopied: "¡Enlace copiado!",
    iosInstructions: "Para guardar en la pantalla de inicio:",
    androidInstructions: "Para guardar en la pantalla de inicio:"
  },
  fr: {
    title: "Enregistrez ce site",
    subtitle: "Ajoutez une icône à l'écran d'accueil pour un accès rapide",
    step1ios: "Appuyez sur ··· en bas, puis \"Partager\"",
    step2ios: "Faites défiler et appuyez sur \"Sur l'écran d'accueil\"",
    step3ios: "Appuyez sur \"Ajouter\" en haut à droite",
    step1android: "Appuyez sur le menu (⋮) en haut à droite",
    step2android: "Appuyez sur \"Ajouter à l'écran d'accueil\"",
    btnOk: "Compris",
    btnNever: "Ne plus afficher",
    btnInstall: "Ajouter icône",
    safariTitle: "Ouvrir avec Safari",
    safariMsg: "Pour enregistrer ce site sur votre écran d'accueil, ouvrez-le dans Safari",
    btnCopyLink: "Copier le lien",
    linkCopied: "Lien copié!",
    iosInstructions: "Pour enregistrer sur l'écran d'accueil:",
    androidInstructions: "Pour enregistrer sur l'écran d'accueil:"
  },
  de: {
    title: "Diese Seite speichern",
    subtitle: "Fügen Sie ein Symbol zum Startbildschirm hinzu",
    step1ios: "Tippen Sie auf ··· unten, dann \"Teilen\"",
    step2ios: "Scrollen Sie und tippen Sie auf \"Zum Home-Bildschirm\"",
    step3ios: "Tippen Sie oben rechts auf \"Hinzufügen\"",
    step1android: "Tippen Sie auf das Menü (⋮) oben rechts",
    step2android: "Tippen Sie auf \"Zum Startbildschirm hinzufügen\"",
    btnOk: "Verstanden",
    btnNever: "Nicht mehr anzeigen",
    btnInstall: "Symbol hinzufügen",
    safariTitle: "Mit Safari öffnen",
    safariMsg: "Um diese Seite zu speichern, öffnen Sie sie in Safari",
    btnCopyLink: "Link kopieren",
    linkCopied: "Link kopiert!",
    iosInstructions: "Um auf dem Startbildschirm zu speichern:",
    androidInstructions: "Um auf dem Startbildschirm zu speichern:"
  },
  pt: {
    title: "Salve este site",
    subtitle: "Adicione um ícone à tela inicial para acesso rápido",
    step1ios: "Toque em ··· na parte inferior, depois \"Compartilhar\"",
    step2ios: "Role e toque em \"Adicionar à Tela de Início\"",
    step3ios: "Toque em \"Adicionar\" no canto superior direito",
    step1android: "Toque no menu (⋮) no canto superior direito",
    step2android: "Toque em \"Adicionar à tela inicial\"",
    btnOk: "Entendi",
    btnNever: "Não mostrar novamente",
    btnInstall: "Adicionar ícone",
    safariTitle: "Abrir com Safari",
    safariMsg: "Para salvar este site na tela inicial, abra-o no Safari",
    btnCopyLink: "Copiar link",
    linkCopied: "Link copiado!",
    iosInstructions: "Para salvar na tela inicial:",
    androidInstructions: "Para salvar na tela inicial:"
  }
};

function getLanguage() {
  const lang = navigator.language || navigator.userLanguage || "it";
  const shortLang = lang.split("-")[0];
  return translations[shortLang] ? shortLang : "it";
}

function getText() {
  return translations[getLanguage()];
}

function isIOSSafari() {
  const ua = navigator.userAgent || "";
  const isIos = /iPhone|iPad|iPod/.test(ua) && !window.MSStream;
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return isIos && isSafari;
}

export default function InstallBanner({ forceShow = false }) {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const t = getText();

  useEffect(() => {
    // Check if already installed as PWA
    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Check if opted out (clicked "Non mostrare più")
    const optedOut = localStorage.getItem("pm_install_banner_opted_out") === "true";

    // Detect device
    const ua = navigator.userAgent || "";
    const iOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const android = /Android/.test(ua);
    const safari = isIOSSafari();

    setIsIOS(iOS);
    setIsAndroid(android);
    setIsSafari(safari);

    // Capture Android install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show banner if conditions are met
    if (forceShow || ((iOS || android) && !optedOut && !standalone)) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [forceShow]);

  const handleDismiss = useCallback(() => {
    setShow(false);
    // Will show again next time
  }, []);

  const handleOptOut = useCallback(() => {
    setShow(false);
    localStorage.setItem("pm_install_banner_opted_out", "true");
  }, []);

  const handleInstallAndroid = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA installed");
        }
        setDeferredPrompt(null);
        setShow(false);
      });
    }
  }, [deferredPrompt]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, []);

  if (!show || isStandalone) return null;

  // iOS but NOT Safari - show "Open with Safari" message
  if (isIOS && !isSafari) {
    return (
      <div className="fixed bottom-44 left-3 right-3 z-[1100] animate-slide-up">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-md mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D96C4A] to-[#e07f5f] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.safariTitle}</h3>
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

          {/* Content */}
          <div className="p-4">
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 text-center">
                {t.safariMsg}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#D96C4A] hover:bg-[#c55d3d] text-white rounded-xl font-medium transition-colors"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.linkCopied}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.btnCopyLink}
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleOptOut}
              className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              {t.btnNever}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari - show instructions
  if (isIOS && isSafari) {
    return (
      <div className="fixed bottom-44 left-3 right-3 z-[1100] animate-slide-up">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-md mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D96C4A] to-[#e07f5f] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p className="text-white/80 text-sm">{t.subtitle}</p>
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
            <p className="text-sm text-gray-600 mb-3">
              {t.iosInstructions}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Share className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">1. {t.step1ios}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">2. {t.step2ios}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-[#34C759] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">3. {t.step3ios}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDismiss}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors text-sm"
              >
                {t.btnOk}
              </button>
              <button
                onClick={handleOptOut}
                className="flex-1 py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                {t.btnNever}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Android - show install button or instructions
  if (isAndroid) {
    return (
      <div className="fixed bottom-44 left-3 right-3 z-[1100] animate-slide-up">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-md mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D96C4A] to-[#e07f5f] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p className="text-white/80 text-sm">{t.subtitle}</p>
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

          {/* Content */}
          <div className="p-4">
            {deferredPrompt ? (
              // Native install prompt available
              <div className="flex gap-2">
                <button
                  onClick={handleInstallAndroid}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#D96C4A] hover:bg-[#c55d3d] text-white rounded-xl font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t.btnInstall}
                </button>
              </div>
            ) : (
              // Fallback instructions
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  {t.androidInstructions}
                </p>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">1. {t.step1android}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">2. {t.step2android}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              {!deferredPrompt && (
                <button
                  onClick={handleDismiss}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors text-sm"
                >
                  {t.btnOk}
                </button>
              )}
              <button
                onClick={handleOptOut}
                className={`${deferredPrompt ? 'w-full' : 'flex-1'} py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors`}
              >
                {t.btnNever}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop or other - don't show
  return null;
}

// Export function to trigger banner manually (e.g., after cookie consent)
export function triggerInstallBanner() {
  const event = new CustomEvent("showInstallBanner");
  window.dispatchEvent(event);
}
