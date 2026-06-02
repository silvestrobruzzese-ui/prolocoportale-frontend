// Geolocation hook with manual fallback
import { useEffect, useState, useCallback } from "react";

const DEFAULT_CENTER = [41.9028, 12.4964]; // Rome

export function useGeolocation(autoAsk = false) {
  const [position, setPosition] = useState(null); // [lat, lng]
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | asking | granted | denied | unsupported

  const request = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("asking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setStatus("granted");
        localStorage.setItem("pm_geo_granted", "1");
      },
      (err) => {
        setError(err.message);
        setStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }, []);

  const watch = useCallback(() => {
    if (!("geolocation" in navigator)) return null;
    const id = navigator.geolocation.watchPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    return id;
  }, []);

  useEffect(() => {
    if (autoAsk && localStorage.getItem("pm_geo_granted") === "1") request();
  }, [autoAsk, request]);

  return { position: position || DEFAULT_CENTER, hasPosition: !!position, error, status, request, watch, DEFAULT_CENTER };
}
