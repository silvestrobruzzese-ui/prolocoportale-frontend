// MapView - Leaflet map with user position, business markers, proximity circles, route line
import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polyline, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PRIMARY = "#FF6B35";

// Colori per categoria - più vivaci e pop
const categoryColors = {
  Restaurant: "#E63946",  // Rosso vivace
  Pizzerie: "#FF6B35",    // Arancione pizza
  Cafe: "#A855F7",        // Viola
  Shop: "#14B8A6",        // Teal
  Hotel: "#FBBF24",       // Giallo oro
  "B&B": "#22C55E",       // Verde brillante
  Pharmacy: "#22C55E",    // Verde
  Monumenti: "#A855F7",   // Viola
  Musei: "#EC4899",       // Rosa/Magenta
  Spiagge: "#06B6D4",     // Ciano
  Archeologia: "#F59E0B", // Ambra
  Discoteche: "#D946EF",  // Fucsia
  Supermercati: "#3B82F6", // Blu
  "Beni Culturali": "#8B5CF6", // Viola
  Itinerari: "#10B981",   // Smeraldo
  Other: "#6366F1",       // Indaco
};

const categoryEmoji = {
  Restaurant: "🍽",
  Pizzerie: "🍕",
  Cafe: "☕",
  Shop: "🛍",
  Hotel: "🏨",
  "B&B": "B&B",
  Pharmacy: "💊",
  Monumenti: "⛪",
  Musei: "🏛",
  Spiagge: "🏖",
  Archeologia: "🏺",
  Discoteche: "🎵",
  Supermercati: "🛒",
  "Beni Culturali": "🏛",
  Itinerari: "🥾",
  Other: "📍",
};

function pinIcon(business, inProximity) {
  const color = categoryColors[business.category] || categoryColors.Other;
  const emoji = categoryEmoji[business.category] || categoryEmoji.Other;
  const proximityClass = inProximity ? "in-proximity" : "";
  const html = `<div class="proxi-pin ${proximityClass}" style="background:${color}"><span>${emoji}</span></div>`;
  return L.divIcon({ html, className: "proxi-marker-icon", iconSize: [40, 40], iconAnchor: [20, 40] });
}

function userIcon() {
  return L.divIcon({ html: '<div class="proxi-pin user"></div>', className: "proxi-marker-icon", iconSize: [20, 20], iconAnchor: [10, 10] });
}

function MapRecenter({ center, zoom, trigger }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || map.getZoom() || 14, { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return null;
}

export default function MapView({
  center,
  zoom = 14,
  userPosition,
  hasUserPosition,
  businesses,
  selectedBusinessId,
  onSelect,
  recenterTrigger,
  routeTo, // [lat, lng] or null
  prolocoTerritory, // polygon points
}) {
  const mapRef = useRef(null);

  const selectedBiz = useMemo(
    () => businesses.find((b) => b.business_id === selectedBusinessId),
    [businesses, selectedBusinessId]
  );

  const routeLine = useMemo(() => {
    if (!hasUserPosition || !routeTo) return null;
    return [userPosition, routeTo];
  }, [hasUserPosition, userPosition, routeTo]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="w-full h-full"
      ref={mapRef}
      data-testid="map-container"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapRecenter center={center} zoom={zoom} trigger={recenterTrigger} />

      {hasUserPosition && (
        <Marker position={userPosition} icon={userIcon()} data-testid="user-marker" />
      )}

      {prolocoTerritory && prolocoTerritory.length >= 3 && (
        <Polygon
          positions={prolocoTerritory}
          pathOptions={{ color: "#81B29A", weight: 2, fillOpacity: 0.06, dashArray: "6 8" }}
        />
      )}

      {businesses.map((b) => (
        <Marker
          key={b.business_id}
          position={[b.lat, b.lng]}
          icon={pinIcon(b, b.in_proximity)}
          eventHandlers={{ click: () => onSelect && onSelect(b.business_id) }}
        />
      ))}

      {selectedBiz && (
        <Circle
          center={[selectedBiz.lat, selectedBiz.lng]}
          radius={Number(selectedBiz.proximity_radius_m) || 500}
          pathOptions={{
            color: PRIMARY,
            fillColor: PRIMARY,
            fillOpacity: 0.12,
            weight: 2,
          }}
        />
      )}

      {routeLine && (
        <Polyline
          positions={routeLine}
          pathOptions={{ color: PRIMARY, weight: 5, opacity: 0.85, dashArray: "8 8" }}
        />
      )}
    </MapContainer>
  );
}
