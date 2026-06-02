// HomePage - main map experience
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Crosshair, User, Menu, LogOut, Heart, ShieldCheck, KeyRound, Navigation2 } from "lucide-react";

import MapView from "@/components/MapView";
import CategoryFilters from "@/components/CategoryFilters";
import BusinessList from "@/components/BusinessList";
import BusinessDetail from "@/components/BusinessDetail";
import AuthModal from "@/components/AuthModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import InstallBanner from "@/components/InstallBanner";

import { useI18n } from "@/lib/i18n";
import { useGeolocation } from "@/lib/useGeolocation";
import { useAuth } from "@/lib/auth";
import api, { formatApiError } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Default center: Calabria
const CALABRIA_CENTER = [38.9, 16.6];
const CALABRIA_ZOOM = 8;

export default function HomePage() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const { position, hasPosition, status, request } = useGeolocation(true);

  const [businesses, setBusinesses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);
  const [navigatingTo, setNavigatingTo] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchedCenter, setSearchedCenter] = useState(null);
  const [searchZoom, setSearchZoom] = useState(null);

  // Use searched location first, then user position, then default Calabria
  const mapCenter = searchedCenter || (hasPosition ? position : CALABRIA_CENTER);
  const currentZoom = searchZoom || (hasPosition ? 14 : CALABRIA_ZOOM);

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
      const params = { category };
      if (hasPosition) {
        params.lat = position[0];
        params.lng = position[1];
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
      setShowLocationPrompt(false);
      // Centra la mappa sulla posizione utente quando viene ottenuta
      setRecenterTrigger((n) => n + 1);
    }
  }, [hasPosition]);

  const selected = useMemo(() => businesses.find((b) => b.business_id === selectedId), [businesses, selectedId]);
  const isFav = useMemo(() => favorites.some((f) => f.business_id === selectedId), [favorites, selectedId]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  const handleRecenter = () => {
    if (hasPosition) setRecenterTrigger((n) => n + 1);
    else request();
  };

  const handleNavigate = (b) => {
    if (!hasPosition) {
      toast.info(t("enable_geolocation_browser"));
      request();
      return;
    }
    setNavigatingTo([b.lat, b.lng]);
    setDetailOpen(false);
    toast.success(t("navigator_running"));
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

  const distanceFmt = (km) => km == null ? "—" : (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(2)} km`);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--bg)]">
      {/* Floating top bar */}
      <div className="absolute top-0 inset-x-0 z-[1000] p-3 sm:p-4 flex items-center gap-2">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="glass rounded-full h-12 w-12 inline-flex items-center justify-center hover:bg-white" data-testid="user-menu-btn">
              <Menu className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-56">
            {user ? (
              <>
                <DropdownMenuItem className="font-medium" disabled data-testid="user-menu-name">
                  <User className="w-4 h-4 mr-2" /> {user.name || user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info(`${favorites.length} ${t("favorites")}`)} data-testid="user-menu-favorites">
                  <Heart className="w-4 h-4 mr-2" /> {t("favorites")} ({favorites.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} data-testid="user-menu-logout">
                  <LogOut className="w-4 h-4 mr-2" /> {t("logout")}
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => setAuthOpen(true)} data-testid="user-menu-login">
                <User className="w-4 h-4 mr-2" /> {t("login")} / {t("register")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild data-testid="user-menu-admin-link">
              <Link to="/admin/login"><ShieldCheck className="w-4 h-4 mr-2" /> {t("sign_in_admin")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild data-testid="user-menu-proloco-link">
              <Link to="/proloco/login"><KeyRound className="w-4 h-4 mr-2" /> {t("sign_in_proloco")}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Left sidebar category filters */}
      <div className="absolute left-3 top-20 bottom-4 z-[999] overflow-y-auto">
        <CategoryFilters value={category} onChange={setCategory} />
      </div>

      {/* Recenter / locate fab */}
      <div className="absolute right-3 sm:right-4 bottom-44 sm:bottom-8 z-[1000] flex flex-col gap-2">
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
            businesses={businesses}
            selectedBusinessId={selectedId}
            onSelect={handleSelect}
            recenterTrigger={recenterTrigger}
            routeTo={navigatingTo}
          />
        </main>
      </div>

      {/* Mobile bottom carousel of nearest businesses */}
      <div className="lg:hidden absolute bottom-0 inset-x-0 z-[1000] pb-3 pointer-events-none">
        <div className="overflow-x-auto no-scrollbar pointer-events-auto">
          <div className="flex gap-3 px-3 w-max">
            {businesses.slice(0, 12).map((b) => (
              <button
                key={b.business_id}
                onClick={() => handleSelect(b.business_id)}
                className="glass rounded-2xl w-64 p-3 text-left hover:bg-white transition-colors"
                data-testid={`mobile-card-${b.business_id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display font-semibold truncate">{b.name}</div>
                  {b.effective_discount > 0 && (
                    <div className={`text-xs font-bold px-2 py-1 rounded-full text-white ${b.in_proximity ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}`}>
                      -{Math.round(b.effective_discount)}%
                    </div>
                  )}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 truncate">{b.category} • {distanceFmt(b.distance_km)}</div>
                {b.promotion_title && (
                  <div className="text-xs text-[var(--text-primary)] mt-1 truncate">{b.promotion_title}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome screen overlay */}
      {showWelcome && (
        <div className="absolute inset-0 z-[1200] flex flex-col items-center justify-center bg-[#F9F6F1] overflow-auto">
          <div className="relative w-full min-h-full flex flex-col items-center justify-center p-4">
            <img
              src="/welcome-hero.jpg"
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
          </div>
        </div>
      )}

      {/* Location prompt overlay */}
      {!showWelcome && showLocationPrompt && !hasPosition && status !== "asking" && (
        <div className="absolute inset-0 z-[1100] flex items-end sm:items-center justify-center bg-black/30 p-4">
          <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden slide-up grain">
            <div className="bg-[var(--primary)] p-6 text-white">
              <div className="text-3xl">📍</div>
              <h2 className="font-display text-2xl font-bold mt-2">{t("enable_location")}</h2>
              <p className="text-white/85 mt-1 text-sm">{t("enable_location_desc")}</p>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <Button
                onClick={() => { request(); setShowLocationPrompt(false); }}
                className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
                data-testid="enable-location-btn"
              >
                <MapPin className="w-4 h-4 mr-2" /> {t("share_location")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowLocationPrompt(false)}
                className="rounded-full"
                data-testid="skip-location-btn"
              >
                {t("skip_location")}
              </Button>
            </div>
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
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <InstallBanner />
    </div>
  );
}
