// CamminoSelector - Two-level menu: Tutti/Cammini/Sentieri with submenus
import React, { useMemo, useState } from "react";
import { Route, ChevronDown, ChevronUp, X, Mountain, Footprints } from "lucide-react";

export default function CamminoSelector({ businesses, selectedCammino, onSelect }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'cammini' | 'sentieri' | null

  // Extract unique cammino names from businesses
  const cammini = useMemo(() => {
    const camminoSet = new Set();
    businesses.forEach((b) => {
      if (b.cammino_name) {
        camminoSet.add(b.cammino_name);
      }
    });
    return Array.from(camminoSet).sort();
  }, [businesses]);

  // Count tappe per cammino
  const camminoTappeCounts = useMemo(() => {
    const counts = {};
    businesses.forEach((b) => {
      if (b.cammino_name) {
        counts[b.cammino_name] = (counts[b.cammino_name] || 0) + 1;
      }
    });
    return counts;
  }, [businesses]);

  // Get sentieri (trails without cammino_name)
  const sentieri = useMemo(() => {
    return businesses.filter((b) => b.trail_type === "sentiero" && !b.cammino_name);
  }, [businesses]);

  // Total counts
  const totalCamminiTappe = useMemo(() => {
    return businesses.filter((b) => b.cammino_name).length;
  }, [businesses]);

  if (cammini.length === 0 && sentieri.length === 0) return null;

  // Get display name for selected item
  const getDisplayName = () => {
    if (!selectedCammino) return null;
    if (selectedCammino === "__sentieri__") return "Tutti i Sentieri";
    if (selectedCammino.startsWith("__sentiero__")) {
      const sentieroId = selectedCammino.replace("__sentiero__", "");
      const sentiero = sentieri.find(s => s.business_id === sentieroId);
      return sentiero?.name || "Sentiero";
    }
    // It's a cammino name
    return selectedCammino;
  };

  const handleSelectTutti = () => {
    onSelect(null);
    setActiveSubmenu(null);
  };

  const handleSelectCammino = (camminoName) => {
    onSelect(camminoName);
    setActiveSubmenu(null);
  };

  const handleSelectSentiero = (sentieroId) => {
    onSelect(`__sentiero__${sentieroId}`);
    setActiveSubmenu(null);
  };

  const handleSelectAllSentieri = () => {
    onSelect("__sentieri__");
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const displayName = getDisplayName();

  return (
    <div className="glass rounded-2xl mx-4 mb-2 overflow-hidden">
      {/* Header with current selection */}
      <div className="p-3 flex items-center gap-2">
        <Route className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {displayName ? (
            <>
              <span className="text-gray-500">Percorso:</span>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 text-white text-xs truncate max-w-[200px]">
                {displayName}
              </span>
              <button
                onClick={handleSelectTutti}
                className="ml-1 text-gray-400 hover:text-orange-500"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            "Seleziona un percorso"
          )}
        </span>
      </div>

      {/* Main options: Tutti, Cammini, Sentieri */}
      <div className="px-3 pb-3 flex gap-2">
        {/* Tutti */}
        <button
          onClick={handleSelectTutti}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedCammino && !activeSubmenu
              ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
          }`}
        >
          Tutti ({businesses.length})
        </button>

        {/* Cammini */}
        {cammini.length > 0 && (
          <button
            onClick={() => toggleSubmenu("cammini")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              activeSubmenu === "cammini" || (selectedCammino && !selectedCammino.startsWith("__"))
                ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300"
            }`}
          >
            <Footprints className="w-4 h-4" />
            Cammini ({totalCamminiTappe})
            {activeSubmenu === "cammini" ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        )}

        {/* Sentieri */}
        {sentieri.length > 0 && (
          <button
            onClick={() => toggleSubmenu("sentieri")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              activeSubmenu === "sentieri" || (selectedCammino && selectedCammino.startsWith("__sentier"))
                ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
            }`}
          >
            <Mountain className="w-4 h-4" />
            Sentieri ({sentieri.length})
            {activeSubmenu === "sentieri" ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        )}
      </div>

      {/* Cammini submenu */}
      {activeSubmenu === "cammini" && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {cammini.map((cammino) => (
              <button
                key={cammino}
                onClick={() => handleSelectCammino(cammino)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCammino === cammino
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100"
                }`}
              >
                {cammino.replace("Cammino ", "").replace("di ", "").replace("della ", "").replace("del ", "").replace("dell'", "")} ({camminoTappeCounts[cammino]})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sentieri submenu */}
      {activeSubmenu === "sentieri" && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {/* All sentieri option */}
            <button
              onClick={handleSelectAllSentieri}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCammino === "__sentieri__"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100"
              }`}
            >
              Tutti i sentieri ({sentieri.length})
            </button>

            {/* Individual sentieri */}
            {sentieri.map((sentiero) => (
              <button
                key={sentiero.business_id}
                onClick={() => handleSelectSentiero(sentiero.business_id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCammino === `__sentiero__${sentiero.business_id}`
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100"
                }`}
              >
                {sentiero.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
