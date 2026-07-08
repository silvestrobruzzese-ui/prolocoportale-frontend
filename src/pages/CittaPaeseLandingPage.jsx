// CittaPaeseLandingPage - Custom landing page for each Città/Paese
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import api from "@/lib/api";
import { trackCittaLanding, trackExploreClick } from "@/lib/analytics";

export default function CittaPaeseLandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [citta, setCitta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitta = async () => {
      try {
        const { data } = await api.get(`/citta-paese/by-slug/${slug}`);
        setCitta(data);
        // Track landing page view in Google Analytics
        trackCittaLanding(slug, data.nome, data.provincia);
      } catch (err) {
        setError(err.response?.status === 404 ? "Città o Paese non trovato" : "Errore nel caricamento");
      } finally {
        setLoading(false);
      }
    };
    fetchCitta();
  }, [slug]);

  const handleExplore = () => {
    // Track explore click in Google Analytics
    trackExploreClick('citta', citta.slug, citta.nome);

    // Request geolocation before navigating (fix Safari iOS - needs user interaction)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Success - navigate to homepage
          navigate(`/portale?citta=${citta.slug}`);
        },
        () => {
          // Error or denied - still navigate to homepage
          navigate(`/portale?citta=${citta.slug}`);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      // Geolocation not supported - navigate anyway
      navigate(`/portale?citta=${citta.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] flex items-center justify-center">
        <div className="animate-pulse text-[#1e3a5f]">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] flex flex-col items-center justify-center p-4">
        <div className="text-[#1e3a5f] text-xl mb-4">{error}</div>
        <Button onClick={() => navigate("/portale")} className="rounded-full">
          Vai alla mappa
        </Button>
      </div>
    );
  }

  // Build full image URLs (handle both /images/... paths and full URLs)
  const buildImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('/images')) {
      return `${api.defaults.baseURL}${url}`;
    }
    return url;
  };

  const coverImage = buildImageUrl(citta?.cover_image_url) || "/welcome-hero.png";

  return (
    <div className="absolute inset-0 z-[1200] flex flex-col items-center justify-center bg-[#F9F6F1] overflow-auto">
      <div className="relative w-full min-h-full flex flex-col items-center justify-end p-4 pt-8 pb-2">
        {/* Cover image */}
        <img
          src={coverImage}
          alt={citta?.nome || "Città"}
          className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl"
          onError={(e) => {
            // Fallback to default image if image fails to load
            e.target.src = "/welcome-hero.png";
          }}
        />

        <div className="mt-4 flex flex-col items-center gap-2">
          {/* Città/Paese name */}
          <h1 className="text-2xl font-bold text-[#1e3a5f] text-center">
            {citta?.nome}
          </h1>
          {citta?.provincia && (
            <p className="text-[#1e3a5f]/70 text-sm">
              {citta.comune || citta.nome}, {citta.provincia} - {citta.region || "Calabria"}
            </p>
          )}

          <Button
            onClick={handleExplore}
            className="rounded-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-10 py-6 text-lg font-semibold shadow-xl mt-2"
            data-testid="enter-app-btn"
          >
            <MapPin className="w-5 h-5 mr-2" /> {t("explore_map") || "Esplora la Mappa"}
          </Button>
        </div>
        {/* Footer with Copyright and Legal Links */}
        <div className="mt-4 pb-4 flex flex-col items-center gap-1">
          <p className="text-[#1e3a5f]/70 text-sm text-center">
            Scopri le attività e tutti i servizi della Calabria
          </p>
          <div className="flex gap-3 text-[#1e3a5f]/60 text-xs">
            <button onClick={() => navigate("/privacy")} className="hover:text-[#1e3a5f] underline">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => navigate("/terms")} className="hover:text-[#1e3a5f] underline">
              Termini di Servizio
            </button>
          </div>
          <p className="text-[#1e3a5f]/50 text-xs text-center">
            © 2026 MB Consulting. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </div>
  );
}
