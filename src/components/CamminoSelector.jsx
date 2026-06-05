// CamminoSelector - Dropdown to select a specific cammino
import React, { useMemo } from "react";
import { Route, ChevronDown, X } from "lucide-react";

export default function CamminoSelector({ businesses, selectedCammino, onSelect }) {
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
  const camminoTappe = useMemo(() => {
    const counts = {};
    businesses.forEach((b) => {
      if (b.cammino_name) {
        counts[b.cammino_name] = (counts[b.cammino_name] || 0) + 1;
      }
    });
    return counts;
  }, [businesses]);

  // Count sentieri (trails without cammino_name)
  const sentieriCount = useMemo(() => {
    return businesses.filter((b) => b.trail_type === "sentiero" && !b.cammino_name).length;
  }, [businesses]);

  if (cammini.length === 0 && sentieriCount === 0) return null;

  return (
    <div className="glass rounded-2xl p-3 mx-4 mb-2">
      <div className="flex items-center gap-2 mb-2">
        <Route className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-medium text-gray-700">Seleziona un percorso</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* All option */}
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            !selectedCammino
              ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
          }`}
        >
          Tutti ({businesses.length})
        </button>

        {/* Sentieri option */}
        {sentieriCount > 0 && (
          <button
            onClick={() => onSelect("__sentieri__")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCammino === "__sentieri__"
                ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
            }`}
          >
            Sentieri ({sentieriCount})
          </button>
        )}

        {/* Cammini options */}
        {cammini.map((cammino) => (
          <button
            key={cammino}
            onClick={() => onSelect(cammino)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCammino === cammino
                ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300"
            }`}
          >
            {cammino.replace("Cammino ", "").replace("di ", "").replace("della ", "").replace("del ", "").replace("dell'", "")} ({camminoTappe[cammino]})
          </button>
        ))}
      </div>

      {/* Clear selection */}
      {selectedCammino && (
        <button
          onClick={() => onSelect(null)}
          className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500"
        >
          <X className="w-3 h-3" /> Mostra tutti
        </button>
      )}
    </div>
  );
}
