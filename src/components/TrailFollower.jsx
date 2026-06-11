// TrailFollower - Real-time trail following with GPS position
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, AlertTriangle, Navigation, MapPin, Locate, Download } from "lucide-react";
import { downloadGpx, calculateTrackStats } from "@/lib/gpxExport";

// User position icon (blue dot with direction)
function userPositionIcon(heading) {
  const rotation = heading || 0;
  return L.divIcon({
    html: `<div class="user-position-marker" style="transform: rotate(${rotation}deg)">
      <div class="pulse"></div>
      <div class="dot"></div>
      <div class="arrow"></div>
    </div>`,
    className: "user-position-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

// Start/End markers
function trailPointIcon(type) {
  const color = type === "start" ? "#22C55E" : "#EF4444";
  const label = type === "start" ? "P" : "A";
  return L.divIcon({
    html: `<div style="background:${color};color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${label}</div>`,
    className: "trail-point-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

// Map component that follows user position and detects user interaction
function MapFollower({ userPosition, shouldFollow, onUserInteraction }) {
  const map = useMap();

  // Follow user position when enabled
  useEffect(() => {
    if (shouldFollow && userPosition) {
      map.setView(userPosition, map.getZoom(), { animate: true });
    }
  }, [map, userPosition, shouldFollow]);

  // Detect user interaction to stop auto-follow
  useEffect(() => {
    const handleInteraction = () => {
      if (onUserInteraction) {
        onUserInteraction();
      }
    };

    map.on('dragstart', handleInteraction);
    map.on('zoomstart', handleInteraction);

    return () => {
      map.off('dragstart', handleInteraction);
      map.off('zoomstart', handleInteraction);
    };
  }, [map, onUserInteraction]);

  return null;
}

export default function TrailFollower({ trail, onClose }) {
  const [userPosition, setUserPosition] = useState(null);
  const [userHeading, setUserHeading] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [followUser, setFollowUser] = useState(true);
  const [gpsError, setGpsError] = useState(null);
  const [showWarning, setShowWarning] = useState(true);

  // Extract track coordinates
  const trackCoords = useMemo(() => {
    if (!trail?.geojson_data?.geometry?.coordinates) return [];
    return trail.geojson_data.geometry.coordinates.map((c) => [c[1], c[0]]);
  }, [trail]);

  // Calculate track stats
  const stats = useMemo(() => {
    return calculateTrackStats(trail?.geojson_data);
  }, [trail]);

  // Start/End points
  const startPoint = trackCoords[0];
  const endPoint = trackCoords[trackCoords.length - 1];

  // Calculate center of track for initial view
  const trackCenter = useMemo(() => {
    if (trackCoords.length === 0) return [38.9, 16.6];
    const lats = trackCoords.map((c) => c[0]);
    const lngs = trackCoords.map((c) => c[1]);
    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
    ];
  }, [trackCoords]);

  // Calculate distance from user to start point
  const distanceToStart = useMemo(() => {
    if (!userPosition || !startPoint) return null;
    const R = 6371; // km
    const dLat = ((startPoint[0] - userPosition[0]) * Math.PI) / 180;
    const dLng = ((startPoint[1] - userPosition[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userPosition[0] * Math.PI) / 180) *
        Math.cos((startPoint[0] * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, [userPosition, startPoint]);

  // Start watching position
  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError("Geolocalizzazione non supportata");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        if (position.coords.heading) {
          setUserHeading(position.coords.heading);
        }
        setGpsError(null);
      },
      (error) => {
        console.error("GPS error:", error);
        setGpsError("Impossibile ottenere la posizione GPS");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  // Handle download GPX
  const handleDownloadGpx = useCallback(() => {
    if (trail?.geojson_data) {
      downloadGpx(trail.geojson_data, trail.name, trail.description || "");
    }
  }, [trail]);

  // Center on user
  const centerOnUser = useCallback(() => {
    setFollowUser(true);
  }, []);

  if (!trail || trackCoords.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-black">
      {/* Safety Warning Modal */}
      {showWarning && (
        <div
          className="absolute inset-0 z-[2100] bg-black/80 flex items-center justify-center p-4"
          style={{ pointerEvents: "auto" }}
          onClick={(e) => e.target === e.currentTarget && setShowWarning(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            style={{ pointerEvents: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertTriangle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Avviso Importante</h2>
            </div>
            <div className="space-y-3 text-gray-700 text-sm mb-6">
              <p>
                <strong>Questa funzione è solo indicativa.</strong> Per escursioni in montagna:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Scarica il file GPX e usa un'app offline (Wikiloc, Komoot, OruxMaps)</li>
                <li>Porta una mappa cartacea di backup</li>
                <li>Controlla le previsioni meteo</li>
                <li>Informa qualcuno del tuo percorso</li>
                <li>Porta batteria di riserva per il telefono</li>
              </ul>
              <p className="text-amber-700 font-medium">
                In aree senza segnale, questa app non funzionerà!
              </p>
            </div>
            <div className="flex gap-2 relative z-10" style={{ pointerEvents: "auto" }}>
              <a
                href="#scarica"
                role="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDownloadGpx(); }}
                style={{ pointerEvents: "auto" }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm active:bg-gray-100 no-underline cursor-pointer select-none"
              >
                <Download className="w-4 h-4" />
                Scarica GPX
              </a>
              <a
                href="#continua"
                role="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowWarning(false); }}
                style={{ pointerEvents: "auto" }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-orange-500 text-white font-medium text-sm active:bg-orange-700 no-underline cursor-pointer select-none"
              >
                Ho capito, continua
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[2050] bg-gradient-to-b from-black/70 to-transparent p-4 pt-12 sm:pt-4" style={{ pointerEvents: "none" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
              onTouchStart={(e) => { e.stopPropagation(); }}
              onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
              className="w-10 h-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white active:bg-white/50"
              style={{ touchAction: "manipulation", pointerEvents: "auto", WebkitTapHighlightColor: "transparent" }}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-white">
              <h1 className="font-bold text-lg leading-tight">{trail.name}</h1>
              {stats && (
                <p className="text-white/70 text-sm">
                  {stats.distance.toFixed(1)} km · {stats.elevationGain}m D+
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDownloadGpx(); }}
            onTouchStart={(e) => { e.stopPropagation(); }}
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); handleDownloadGpx(); }}
            className="w-10 h-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white active:bg-white/50"
            style={{ touchAction: "manipulation", pointerEvents: "auto", WebkitTapHighlightColor: "transparent" }}
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={trackCenter}
        zoom={14}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* Trail track */}
        <Polyline
          positions={trackCoords}
          pathOptions={{
            color: "#F97316",
            weight: 5,
            opacity: 0.9,
          }}
        />

        {/* Start point */}
        {startPoint && (
          <Marker position={startPoint} icon={trailPointIcon("start")} />
        )}

        {/* End point */}
        {endPoint && startPoint !== endPoint && (
          <Marker position={endPoint} icon={trailPointIcon("end")} />
        )}

        {/* User position */}
        {userPosition && (
          <>
            <Marker
              position={userPosition}
              icon={userPositionIcon(userHeading)}
            />
            <Circle
              center={userPosition}
              radius={30}
              pathOptions={{
                color: "#3B82F6",
                fillColor: "#3B82F6",
                fillOpacity: 0.15,
                weight: 2,
              }}
            />
          </>
        )}

        <MapFollower
          userPosition={userPosition}
          shouldFollow={followUser}
          onUserInteraction={() => setFollowUser(false)}
        />
      </MapContainer>

      {/* Bottom info panel */}
      <div className="absolute bottom-0 left-0 right-0 z-[2050] bg-gradient-to-t from-black/80 to-transparent p-4 pb-8">
        <div className="flex items-center justify-between text-white mb-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {distanceToStart !== null
                  ? distanceToStart < 1
                    ? `${Math.round(distanceToStart * 1000)}m`
                    : `${distanceToStart.toFixed(1)}km`
                  : "—"}
              </div>
              <div className="text-xs text-white/70">alla partenza</div>
            </div>
            {stats && (
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.distance.toFixed(1)}km</div>
                <div className="text-xs text-white/70">totale sentiero</div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => { e.preventDefault(); centerOnUser(); }}
            onTouchEnd={(e) => { e.preventDefault(); centerOnUser(); }}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              followUser ? "bg-blue-500" : "bg-white/20"
            }`}
            style={{ touchAction: "manipulation" }}
          >
            <Locate className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* GPS Error */}
        {gpsError && (
          <div className="bg-red-500/80 rounded-lg px-4 py-2 text-white text-sm text-center">
            {gpsError}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-white/70 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">P</div>
            <span>Partenza</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">A</div>
            <span>Arrivo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
            <span>Tu</span>
          </div>
        </div>
      </div>

      {/* CSS for user position marker */}
      <style>{`
        .user-position-icon {
          background: transparent !important;
          border: none !important;
        }
        .user-position-marker {
          position: relative;
          width: 24px;
          height: 24px;
        }
        .user-position-marker .pulse {
          position: absolute;
          inset: -8px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: pulse 2s ease-out infinite;
        }
        .user-position-marker .dot {
          position: absolute;
          inset: 4px;
          background: #3B82F6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .user-position-marker .arrow {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 10px solid #3B82F6;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
