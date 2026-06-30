// HomePage - main map experience
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Search, Crosshair, Navigation2, Maximize2, Minimize2 } from "lucide-react";

import MapView from "@/components/MapView";
import CategoryFilters from "@/components/CategoryFilters";
import BusinessDetail from "@/components/BusinessDetail";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import InstallBanner from "@/components/InstallBanner";
import CamminoSelector from "@/components/CamminoSelector";
import AuthModal from "@/components/AuthModal";
import SponsorBanner from "@/components/SponsorBanner";

import { useI18n } from "@/lib/i18n";
import { useGeolocation } from "@/lib/useGeolocation";
import { useAuth } from "@/lib/auth";
import api, { formatApiError } from "@/lib/api";
import { getWalkingRoute } from "@/lib/routing";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Default center: Calabria
const CALABRIA_CENTER = [38.9, 16.6];
const CALABRIA_ZOOM = 8;

export default function HomePage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { position, hasPosition, status, request } = useGeolocation(true);
  const [searchParams] = useSearchParams();

  const [businesses, setBusinesses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);
  const [navigatingTo, setNavigatingTo] = useState(null);
  // Hide welcome screen if coming from a landing page (citta or proloco param in URL)
  const [showWelcome, setShowWelcome] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return !params.get("citta") && !params.get("proloco");
  });
  const [searchedCenter, setSearchedCenter] = useState(null);
  const [searchZoom, setSearchZoom] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prolocoSlug, setProlocoSlug] = useState(null);
  const [selectedCammino, setSelectedCammino] = useState(null);
  const [camminoRoute, setCamminoRoute] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Check if user came from a Pro Loco or Città/Paese landing page (via URL param)
  useEffect(() => {
    const prolocoParam = searchParams.get("proloco");
    const cittaParam = searchParams.get("citta");

    if (prolocoParam && prolocoParam !== prolocoSlug) {
      setProlocoSlug(prolocoParam);
      // Fetch Pro Loco data to get center coordinates
      api.get(`/proloco/by-slug/${prolocoParam}`)
        .then(({ data }) => {
          if (data.center) {
            setSearchedCenter(data.center);
            setSearchZoom(13);
            setShowWelcome(false);
            setRecenterTrigger((n) => n + 1);
          }
        })
        .catch(() => {
          // Pro Loco not found, ignore
        });
    } else if (cittaParam) {
      // Fetch Città/Paese data to get center coordinates
      api.get(`/citta-paese/by-slug/${cittaParam}`)
        .then(({ data }) => {
          if (data.center) {
            setSearchedCenter(data.center);
            setSearchZoom(14);
            setShowWelcome(false);
            setRecenterTrigger((n) => n + 1);
          }
        })
        .catch(() => {
          // Città/Paese not found, ignore
        });
    } else if (!prolocoParam && !cittaParam) {
      setProlocoSlug(null);
    }
  }, [searchParams, prolocoSlug]);

  // Check if fullscreen API is available
  const canFullscreen = typeof document !== 'undefined' && (
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullscreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.msRequestFullscreen
  );

  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    const elem = document.documentElement;

    if (isIOS) {
      // iOS doesn't support fullscreen API - show install prompt
      toast.info("Per schermo intero: Condividi → Aggiungi a Home", { duration: 5000 });
      return;
    }

    const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
    const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    const isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

    if (!isFS) {
      requestFS?.call(elem).then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        toast.info("Per schermo intero: Condividi → Aggiungi a Home", { duration: 5000 });
      });
    } else {
      exitFS?.call(document).then(() => {
        setIsFullscreen(false);
      });
    }
  }, [isIOS]);

  // Listen for fullscreen changes (e.g., user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      setIsFullscreen(!!isFS);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // Use searched location first, then user position, then default Calabria
  const mapCenter = searchedCenter || (hasPosition ? position : CALABRIA_CENTER);
  const currentZoom = searchZoom || (hasPosition ? 18 : CALABRIA_ZOOM);

  // Geocode location using Nominatim (OpenStreetMap)
  const geocodeLocation = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) return;
    try {
      // Cerca in Italia con più risultati per poter scegliere la città invece della provincia
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=it&limit=5&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        // Preferisci risultati con place_rank >= 16 (città) rispetto a province (rank 12)
        // Filtra anche per Calabria se possibile
        let best = data[0];
        for (const item of data) {
          const inCalabria = item.display_name?.toLowerCase().includes("calabria");
          const isCity = (item.place_rank || 0) >= 16;
          const bestIsCity = (best.place_rank || 0) >= 16;

          // Priorità: città in Calabria > città altrove > provincia in Calabria > altro
          if (isCity && inCalabria) {
            best = item;
            break;
          } else if (isCity && !bestIsCity) {
            best = item;
          } else if (inCalabria && !best.display_name?.toLowerCase().includes("calabria")) {
            best = item;
          }
        }

        const { lat, lon } = best;
        setSearchedCenter([parseFloat(lat), parseFloat(lon)]);
        // Zoom 13 per mostrare un'area ampia (~10km) con attività visibili
        setSearchZoom(13);
        setRecenterTrigger((n) => n + 1);
        const locationName = best.display_name.split(",")[0];
        toast.success(`Mappa centrata su: ${locationName}`);
      } else {
        toast.error("Località non trovata");
      }
    } catch (err) {
      toast.error("Errore nella ricerca della località");
    }
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      geocodeLocation(query);
    }
  };

  const fetchBusinesses = useCallback(async () => {
    // Don't fetch if no category is selected (null = no markers shown)
    if (!category) {
      setBusinesses([]);
      return;
    }
    try {
      // For "Sentieri e Cammini" and "Sea Park", fetch ALL without location filter (they're few)
      const isSentieriCammini = category === "Sentieri e Cammini";
      const isSeaPark = category === "Sea Park";
      const fetchAll = isSentieriCammini || isSeaPark;
      const params = { category, limit: fetchAll ? 500 : 100 };

      // Only add location params for other categories
      if (!fetchAll) {
        if (searchedCenter) {
          params.lat = searchedCenter[0];
          params.lng = searchedCenter[1];
        } else if (hasPosition) {
          params.lat = position[0];
          params.lng = position[1];
        }
      }
      if (query) params.q = query;
      const { data } = await api.get("/businesses", { params });
      setBusinesses(data);
      // Se ci sono attività e non siamo già centrati sulla posizione utente, centra sulla prima attività
      if (data.length > 0 && !hasPosition && !searchedCenter) {
        const firstBiz = data[0];
        setSearchedCenter([firstBiz.lat, firstBiz.lng]);
        setSearchZoom(13);
        setRecenterTrigger((n) => n + 1);
      }
    } catch (err) {
      console.error("fetchBusinesses error:", err);
      const msg = err.response?.data?.detail;
      if (msg) {
        toast.error(formatApiError(msg));
      }
      // Non mostrare errore generico per problemi di rete
    }
  }, [hasPosition, position, category, query, searchedCenter]);

  useEffect(() => { fetchBusinesses(); }, [fetchBusinesses]);

  const fetchFavorites = useCallback(async () => {
    if (!user) { setFavorites([]); return; }
    try {
      const { data } = await api.get("/favorites");
      setFavorites(data);
    } catch (_) { /* ignore */ }
  }, [user]);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  useEffect(() => {
    if (hasPosition) {
      // Centra la mappa sulla posizione utente quando viene ottenuta
      setRecenterTrigger((n) => n + 1);
    }
  }, [hasPosition]);

  // Reset cammino selection when category changes
  useEffect(() => {
    setSelectedCammino(null);
  }, [category]);

  // Auto-select business when a single sentiero is selected
  useEffect(() => {
    if (selectedCammino && selectedCammino.startsWith("__sentiero__")) {
      const sentieroId = selectedCammino.replace("__sentiero__", "");
      setSelectedId(sentieroId);
    }
  }, [selectedCammino]);

  // Filter businesses by selected cammino/sentiero
  const filteredBusinesses = useMemo(() => {
    if (!selectedCammino) return businesses;
    if (selectedCammino === "__sentieri__") {
      // All sentieri
      return businesses.filter((b) => b.trail_type === "sentiero" && !b.cammino_name);
    }
    if (selectedCammino.startsWith("__sentiero__")) {
      // Single sentiero
      const sentieroId = selectedCammino.replace("__sentiero__", "");
      return businesses.filter((b) => b.business_id === sentieroId);
    }
    // Cammino name
    return businesses.filter((b) => b.cammino_name === selectedCammino);
  }, [businesses, selectedCammino]);

  // Get all tappe of selected cammino for drawing line
  const camminoTappe = useMemo(() => {
    if (!selectedCammino || selectedCammino.startsWith("__")) return null;
    const tappe = businesses
      .filter((b) => b.cammino_name === selectedCammino)
      .sort((a, b) => {
        // Sort by tappa_number if available
        const numA = parseInt(a.tappa_number) || 999;
        const numB = parseInt(b.tappa_number) || 999;
        return numA - numB;
      });
    return tappe.length > 1 ? tappe : null;
  }, [businesses, selectedCammino]);

  // Get cammino route - prefer pre-generated from database, fallback to OSRM
  useEffect(() => {
    if (!camminoTappe || camminoTappe.length < 2) {
      setCamminoRoute(null);
      return;
    }

    // First, check if we have a pre-generated route in the database
    // The route is stored in the first tappa (with is_cammino_start: true)
    const startTappa = camminoTappe.find(t => t.is_cammino_start && t.geojson_data);

    if (startTappa?.geojson_data?.geometry?.coordinates) {
      // Use pre-generated route - convert from GeoJSON [lng, lat] to Leaflet [lat, lng]
      const coords = startTappa.geojson_data.geometry.coordinates;
      const route = coords.map(c => [c[1], c[0]]);
      setCamminoRoute(route);
      setIsLoadingRoute(false);
      return;
    }

    // Fallback: calculate route on-the-fly using OSRM
    setIsLoadingRoute(true);
    getWalkingRoute(camminoTappe)
      .then((route) => {
        setCamminoRoute(route);
      })
      .catch(() => {
        setCamminoRoute(null);
      })
      .finally(() => {
        setIsLoadingRoute(false);
      });
  }, [camminoTappe]);

  const selected = useMemo(() => filteredBusinesses.find((b) => b.business_id === selectedId), [filteredBusinesses, selectedId]);
  const isFav = useMemo(() => favorites.some((f) => f.business_id === selectedId), [favorites, selectedId]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  const handleRecenter = () => {
    if (hasPosition) {
      setSearchedCenter(null);  // Resetta la località cercata
      setSearchZoom(null);       // Resetta lo zoom
      setRecenterTrigger((n) => n + 1);
    } else {
      request();
    }
  };

  const handleNavigate = (b) => {
    if (!hasPosition) {
      toast.info(t("enable_geolocation_browser"));
      request();
      return;
    }

    // Open external navigation app
    const origin = `${position[0]},${position[1]}`;
    const destination = `${b.lat},${b.lng}`;

    // Detect platform and open appropriate maps app
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    let navUrl;
    if (isIOS) {
      // Apple Maps (or Google Maps if installed)
      navUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`;
    } else {
      // Google Maps for Android and others
      navUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    }

    // Navigate in same tab - on mobile this opens Maps app directly
    // When user returns, they'll be back on this page
    window.location.href = navUrl;
    setDetailOpen(false);
  };

  const handleToggleFavorite = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (!selected) return;
    try {
      if (isFav) {
        await api.delete(`/favorites/${selected.business_id}`);
      } else {
        await api.post(`/favorites`, { business_id: selected.business_id });
      }
      fetchFavorites();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--bg)]">
      {/* Floating top bar - hidden when detail is open */}
      {!detailOpen && (
      <div className="absolute top-0 inset-x-0 z-[1000]">
        <div className="p-2 sm:p-3 flex items-center gap-2">
          <div className="glass rounded-full h-12 flex items-center px-4 gap-2 flex-1 max-w-2xl" data-testid="search-bar">
            <Search className="w-4 h-4 text-[var(--text-secondary)]" />
            <Input
              placeholder={t("search_placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-0"
              data-testid="search-input"
            />
          </div>

          <LanguageSwitcher />
        </div>
      </div>
      )}

      {/* Category filters - top left where zoom controls were */}
      {!detailOpen && (
      <div className="absolute top-16 left-0 right-0 z-[1000]">
        <CategoryFilters value={category} onChange={setCategory} />

        {/* Cammino selector - only for Sentieri e Cammini category */}
        {category === "Sentieri e Cammini" && businesses.length > 0 && (
          <CamminoSelector
            businesses={businesses}
            selectedCammino={selectedCammino}
            onSelect={setSelectedCammino}
          />
        )}
      </div>
      )}

      {/* Sponsor banner at bottom - hidden when any panel/modal is open */}
      {!detailOpen && !authOpen && !showWelcome && <SponsorBanner />}

      {/* Map attribution - bottom left */}
      <div
        className="absolute bottom-1 left-3 z-[999]"
        style={{ fontSize: '10px', color: '#1F2937' }}
      >
        © OpenStreetMap contributors, Overture Maps Foundation
      </div>

      {/* Copyright MB Consulting - bottom right */}
      <div
        className="absolute bottom-1 right-3 z-[999]"
        style={{ fontSize: '10px', color: '#1F2937' }}
      >
        © 2026 MB Consulting
      </div>

      {/* Recenter / locate / fullscreen fab */}
      <div className="absolute right-3 sm:right-4 bottom-28 z-[1000] flex flex-col gap-2">
        <button
          onClick={toggleFullscreen}
          className="glass rounded-full w-12 h-12 inline-flex items-center justify-center hover:bg-white"
          data-testid="fullscreen-btn"
          aria-label="fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-[var(--primary)]" />
          ) : (
            <Maximize2 className="w-5 h-5 text-[var(--primary)]" />
          )}
        </button>
        <button
          onClick={handleRecenter}
          className="glass rounded-full w-12 h-12 inline-flex items-center justify-center hover:bg-white"
          data-testid="recenter-btn"
          aria-label="recenter"
        >
          <Crosshair className="w-5 h-5 text-[var(--primary)]" />
        </button>
        {navigatingTo && (
          <button
            onClick={() => setNavigatingTo(null)}
            className="rounded-full w-12 h-12 inline-flex items-center justify-center bg-[var(--primary)] text-white shadow-lg"
            data-testid="stop-navigate-btn"
            aria-label="stop navigation"
          >
            <Navigation2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main map layout */}
      <div className="h-full w-full">
        <main className="h-full w-full relative">
          <MapView
            center={mapCenter}
            zoom={currentZoom}
            userPosition={position}
            hasUserPosition={hasPosition}
            businesses={filteredBusinesses}
            selectedBusinessId={selectedId}
            onSelect={handleSelect}
            recenterTrigger={recenterTrigger}
            routeTo={navigatingTo}
            camminoTappe={camminoTappe}
            camminoRoute={camminoRoute}
            showAllTracks={selectedCammino === "__sentieri__"}
          />
        </main>
      </div>

      {/* Welcome screen overlay */}
      {showWelcome && (
        <div className="absolute inset-0 z-[1200] flex flex-col items-center justify-center bg-[#F9F6F1] overflow-auto">
          <div className="relative w-full min-h-full flex flex-col items-center justify-center p-4">
            <img
              src="/welcome-hero.png"
              alt="Pro Loco in Calabria"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-6 flex flex-col items-center gap-3">
              <Button
                onClick={() => setShowWelcome(false)}
                className="rounded-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-10 py-6 text-lg font-semibold shadow-xl"
                data-testid="enter-app-btn"
              >
                <MapPin className="w-5 h-5 mr-2" /> {t("explore_map") || "Esplora la Mappa"}
              </Button>
              <p className="text-[#1e3a5f]/70 text-sm text-center max-w-xs">
                {t("welcome_desc") || "Scopri le attività, i prodotti e le tradizioni del territorio"}
              </p>
            </div>
            {/* Copyright */}
            <p className="absolute bottom-4 text-[#1e3a5f]/50 text-xs text-center">
              © 2026 MB Consulting. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      )}

      <BusinessDetail
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        business={selected}
        onNavigate={handleNavigate}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFav}
        allBusinesses={businesses}
        onSelectBusiness={handleSelect}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <InstallBanner />
    </div>
  );
}
// Build 1780438771
