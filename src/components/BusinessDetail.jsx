// Business detail sheet (full info, promo, navigate button)
import React, { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { translateFields } from "@/lib/translate";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe, MapPin, Navigation2, Clock, Heart, Sparkles, X, Loader2, Mountain, Route, Timer, TrendingUp, RotateCcw, ChevronRight, List, Download, Compass } from "lucide-react";
import { downloadGpx } from "@/lib/gpxExport";
import TrailFollower from "@/components/TrailFollower";

function formatDistance(km) {
  if (km == null) return "—";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(2)} km`;
}

// Fields to translate
const TRANSLATABLE_FIELDS = ["name", "description", "promotion_title", "promotion_description", "address", "city", "hours"];

export default function BusinessDetail({ open, onClose, business, onNavigate, onToggleFavorite, isFavorite, allBusinesses = [], onSelectBusiness }) {
  const { t, lang } = useI18n();
  const [translatedBusiness, setTranslatedBusiness] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTappeList, setShowTappeList] = useState(false);
  const [showTrailFollower, setShowTrailFollower] = useState(false);

  // Check if business has GPS track
  const hasGpsTrack = business?.geojson_data?.geometry?.coordinates?.length > 0;

  // Get other tappe of the same cammino
  const camminoTappe = React.useMemo(() => {
    if (!business?.cammino_name || !allBusinesses.length) return [];
    return allBusinesses
      .filter((b) => b.cammino_name === business.cammino_name)
      .sort((a, b) => {
        const numA = parseInt(a.tappa_number) || 999;
        const numB = parseInt(b.tappa_number) || 999;
        return numA - numB;
      });
  }, [business, allBusinesses]);

  // Translate business content when language changes or business changes
  useEffect(() => {
    if (!business || !open) {
      setTranslatedBusiness(null);
      return;
    }

    // If Italian, no translation needed
    if (lang === "it") {
      setTranslatedBusiness(business);
      return;
    }

    // Translate the content
    setIsTranslating(true);
    translateFields(business, TRANSLATABLE_FIELDS, lang)
      .then((translated) => {
        setTranslatedBusiness(translated);
      })
      .catch(() => {
        setTranslatedBusiness(business); // Fallback to original
      })
      .finally(() => {
        setIsTranslating(false);
      });
  }, [business, lang, open]);

  if (!business) return null;

  // Use translated content or original
  const biz = translatedBusiness || business;

  const inProx = !!business.in_proximity;
  const base = Number(business.base_discount || 0);
  const bonus = Number(business.proximity_discount || 0);
  const eff = business.effective_discount != null ? Number(business.effective_discount) : base;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto rounded-t-3xl sm:rounded-l-3xl sm:rounded-t-none"
        data-testid="business-detail-sheet"
      >
        {/* Close button - prominent at top */}
        <div className="p-4 pb-2 flex items-center justify-between border-b border-[var(--border)]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[var(--primary)] font-medium"
            data-testid="business-detail-close"
          >
            <X className="w-5 h-5" />
            <span>{t("back")}</span>
          </button>
          <div className="flex items-center gap-2">
            {isTranslating && (
              <Loader2 className="w-4 h-4 animate-spin text-[var(--text-secondary)]" />
            )}
            {eff > 0 && business.category !== "Sentieri e Cammini" && (
              <div className={`px-3 py-1.5 rounded-full text-white font-bold text-sm ${inProx ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}`}
                data-testid="proximity-discount-badge"
              >
                -{Math.round(eff)}%
              </div>
            )}
          </div>
        </div>

        <div className="p-5 pt-4 pb-0">
          <Badge className="bg-[var(--bg)] text-[var(--text-secondary)] rounded-full mb-2">{business.category}</Badge>
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">{biz.name}</h2>
          {(biz.description || biz.promotion_description) && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">{biz.description || biz.promotion_description}</p>
          )}
        </div>

        <SheetHeader className="sr-only">
          <SheetTitle>{biz.name}</SheetTitle>
          <SheetDescription>{business.category}</SheetDescription>
        </SheetHeader>

        <div className="p-5 space-y-4">
          {/* Trail info panel - only for Sentieri e Cammini */}
          {business.category === "Sentieri e Cammini" && (business.difficulty || business.distance || business.duration || business.cammino_name) && (
            <div className="rounded-2xl p-4 bg-gradient-to-r from-orange-50 to-sky-50 border border-orange-200">
              {business.cammino_name && (
                <div className="flex items-center gap-2 mb-3">
                  <Route className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-700">{business.cammino_name}</span>
                  {business.tappa_number && (
                    <Badge className="bg-sky-100 text-sky-700 text-xs">Tappa {business.tappa_number}</Badge>
                  )}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {business.difficulty && (
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-xs text-orange-600 uppercase tracking-wide">Difficoltà</div>
                      <div className="text-sm font-medium text-orange-800 capitalize">{business.difficulty}</div>
                    </div>
                  </div>
                )}
                {business.distance && (
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-sky-500" />
                    <div>
                      <div className="text-xs text-sky-600 uppercase tracking-wide">Distanza</div>
                      <div className="text-sm font-medium text-sky-800">{business.distance}</div>
                    </div>
                  </div>
                )}
                {business.duration && (
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-xs text-orange-600 uppercase tracking-wide">Durata</div>
                      <div className="text-sm font-medium text-orange-800">{business.duration}</div>
                    </div>
                  </div>
                )}
                {business.elevation_gain && (
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-500" />
                    <div>
                      <div className="text-xs text-sky-600 uppercase tracking-wide">Dislivello</div>
                      <div className="text-sm font-medium text-sky-800">{business.elevation_gain} m</div>
                    </div>
                  </div>
                )}
              </div>
              {business.is_loop && (
                <div className="mt-3 flex items-center gap-2 text-orange-600">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-medium">Percorso ad anello</span>
                </div>
              )}
              {business.geojson_data && (
                <div className="mt-3 text-xs text-sky-600 flex items-center gap-1">
                  <span className="w-3 h-1 bg-orange-500 rounded-full"></span>
                  Tracciato GPS disponibile sulla mappa
                </div>
              )}

              {/* Button to show all tappe of the cammino */}
              {camminoTappe.length > 1 && (
                <button
                  onClick={() => setShowTappeList(!showTappeList)}
                  className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/70 hover:bg-white text-sky-700 text-sm font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Vedi tutte le {camminoTappe.length} tappe
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showTappeList ? "rotate-90" : ""}`} />
                </button>
              )}

              {/* List of tappe */}
              {showTappeList && camminoTappe.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-sky-100">
                  {camminoTappe.map((tappa, index) => (
                    <button
                      key={tappa.business_id}
                      onClick={() => {
                        onSelectBusiness && onSelectBusiness(tappa.business_id);
                        setShowTappeList(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-sky-50 transition-colors ${
                        tappa.business_id === business.business_id ? "bg-sky-100 font-medium" : "bg-white"
                      } ${index > 0 ? "border-t border-sky-50" : ""}`}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 text-white text-xs flex items-center justify-center font-bold">
                        {tappa.tappa_number || index + 1}
                      </span>
                      <span className="truncate">{tappa.name}</span>
                      {tappa.tappa_type && tappa.tappa_type !== "tappa" && tappa.tappa_type !== "borgo" && (
                        <Badge className="ml-auto bg-sky-100 text-sky-600 text-xs">{tappa.tappa_type}</Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Proximity panel - hidden for trails */}
          {business.category !== "Sentieri e Cammini" && (
            <div className={`rounded-2xl p-4 border ${inProx ? "border-[var(--primary)] bg-[var(--proximity)]" : "border-[var(--border)] bg-white"}`}>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                  {t("effective_discount")}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {t("distance")}: <span className="font-semibold text-[var(--text-primary)]">{formatDistance(business.distance_km)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-4xl font-display font-bold text-[var(--primary)]">{Math.round(eff)}%</div>
                <div className="text-sm text-[var(--text-secondary)] pb-1">
                  {t("base_discount")} {base}% {bonus > 0 && `+ ${t("proximity_discount")} ${bonus}%`}
                </div>
              </div>
              <div className={`mt-2 text-sm font-medium ${inProx ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"}`}>
                {inProx ? `✓ ${t("within_radius")}` : t("outside_radius")}
              </div>
            </div>
          )}

          {biz.promotion_title && (
            <div className="rounded-2xl p-4 bg-[var(--warning)]/30 border border-[var(--warning)]">
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                {biz.promotion_title}
              </div>
              {biz.promotion_description && (
                <div className="text-sm text-[var(--text-secondary)] mt-1">{biz.promotion_description}</div>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm">
            {biz.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{biz.address}{biz.city ? `, ${biz.city}` : ""}</span>
              </div>
            )}
            {biz.hours && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{biz.hours}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <a href={`tel:${business.phone}`} className="text-[var(--primary)] hover:underline">{business.phone}</a>
              </div>
            )}
            {business.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <a href={business.website} target="_blank" rel="noreferrer" className="text-[var(--primary)] hover:underline truncate">{business.website}</a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              onClick={() => onNavigate(business)}
              className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              data-testid="business-navigate-btn"
            >
              <Navigation2 className="w-4 h-4 mr-2" /> {t("navigate")}
            </Button>
            <Button
              variant="outline"
              onClick={onToggleFavorite}
              className="rounded-full border-[var(--border)]"
              data-testid="business-favorite-btn"
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-[var(--primary)] text-[var(--primary)]" : ""}`} />
              {isFavorite ? t("remove_favorite") : t("add_favorite")}
            </Button>
          </div>

          {/* Trail-specific buttons for GPS tracks */}
          {hasGpsTrack && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                onClick={() => downloadGpx(business.geojson_data, business.name, business.description || "")}
                variant="outline"
                className="rounded-full border-sky-300 text-sky-700 hover:bg-sky-50"
              >
                <Download className="w-4 h-4 mr-2" /> Scarica GPX
              </Button>
              <Button
                onClick={() => setShowTrailFollower(true)}
                className="rounded-full bg-gradient-to-r from-orange-500 to-sky-500 hover:from-orange-600 hover:to-sky-600 text-white"
              >
                <Compass className="w-4 h-4 mr-2" /> Segui Sentiero
              </Button>
            </div>
          )}
        </div>
      </SheetContent>

      {/* Trail Follower Modal */}
      {showTrailFollower && hasGpsTrack && (
        <TrailFollower
          trail={business}
          onClose={() => setShowTrailFollower(false)}
        />
      )}
    </Sheet>
  );
}
