// MapView - Leaflet map with user position, business markers, proximity circles, route line
import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polyline, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PRIMARY = "#D96C4A";

// Colori per categoria
const categoryColors = {
  Restaurant: "#E63946",  // Rosso
  Pizzerie: "#FF6B35",    // Arancione pizza
  Cafe: "#8B4513",        // Marrone caffè
  Shop: "#2A9D8F",        // Verde acqua
  Hotel: "#FFD700",       // Giallo oro
  "B&B": "#228B22",       // Verde
  Pharmacy: "#4CAF50",    // Verde chiaro
  Monumenti: "#8B4513",   // Marrone (chiese, castelli, palazzi)
  Musei: "#9C27B0",       // Viola
  Spiagge: "#00CED1",     // Turchese
  Archeologia: "#FF8C00", // Arancione
  Discoteche: "#E040FB",  // Fucsia/Magenta
  Supermercati: "#3498DB", // Blu
  Other: "#6C757D",       // Grigio
};

const categoryEmoji = {
  Restaurant: "🍽",
  Pizzerie: "🍕",
  Cafe: "☕",
  Shop: "🛍",
  Hotel: "🏨",
  "B&B": "🛏",
  Pharmacy: "💊",
  Monumenti: "⛪",
  Musei: "🏛",
  Spiagge: "🏖",
  Archeologia: "🏺",
  Discoteche: "🎵",
  Supermercati: "🛒",
  Other: "📍",
};

function pinIcon(business, inProximity) {
  const baseColor = categoryColors[business.category] || categoryColors.Other;
  const color = inProximity ? PRIMARY : baseColor;
  const emoji = categoryEmoji[business.category] || categoryEmoji.Other;
  const html = `<div class="proxi-pin" style="background:${color}"><span>${emoji}</span></div>`;
  return L.divIcon({ html, className: "proxi-marker-icon", iconSize: [36, 36], iconAnchor: [18, 36] });
}

function userIcon() {
  return L.divIcon({ html: '<div class="proxi-pin user"></div>', className: "proxi-marker-icon", iconSize: [18, 18], iconAnchor: [9, 9] });
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
