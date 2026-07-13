// Proloco Dashboard - territorial CRUD
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api, { formatApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash2, Upload, LogOut, Edit3, MapPin, Map, Search, Link2, Image, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Category colors (same as MapView)
const categoryColors = {
  Restaurant: "#E63946",
  Pizzerie: "#FF6B35",
  Cafe: "#A855F7",
  Shop: "#14B8A6",
  Hotel: "#FBBF24",
  "B&B": "#22C55E",
  Pharmacy: "#22C55E",
  Monumenti: "#A855F7",
  Musei: "#EC4899",
  Spiagge: "#06B6D4",
  "Bandiera Blu": "#0077B6",
  "Bandiera Verde": "#2E7D32",
  Archeologia: "#F59E0B",
  Discoteche: "#D946EF",
  Supermercati: "#3B82F6",
  "Beni Culturali": "#8B5CF6",
  Itinerari: "#10B981",
  "Sentieri e Cammini": "#F97316",
  Bancomat: "#00843D",
  Other: "#6366F1",
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
  "Bandiera Blu": "🏳️",
  "Bandiera Verde": "🏳️",
  Archeologia: "🏺",
  Discoteche: "🎵",
  Supermercati: "🛒",
  "Beni Culturali": "🏛",
  Itinerari: "🥾",
  "Sentieri e Cammini": "🏔",
  Bancomat: "🏧",
  Other: "📍",
};

// Map of categories that use image logos (same as MapView)
const categoryLogos = {
  Bancomat: "/bcc-logo.png",
  "Bandiera Blu": "/bandiera-blu-logo.jpg",
  "Bandiera Verde": "/bandiera-verde-logo.jpg",
};

// Draggable marker icon with category color and emoji (same style as MapView)
function createMarkerIcon(category) {
  const color = categoryColors[category] || categoryColors.Other;
  const emoji = categoryEmoji[category] || categoryEmoji.Other;
  const logoUrl = categoryLogos[category];

  let iconContent;
  let markerStyle = `background:${color};cursor:move;`;

  if (logoUrl) {
    iconContent = `<img src="${logoUrl}" alt="${category}" style="width:28px;height:28px;object-fit:contain;border-radius:4px;" />`;
    markerStyle = `background:white;border:3px solid ${color};cursor:move;`;
  } else {
    iconContent = `<span>${emoji}</span>`;
  }

  return L.divIcon({
    html: `<div class="proxi-pin" style="${markerStyle}"><span class="marker-icon">${iconContent}</span></div>`,
    className: "proxi-marker-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
}

// Draggable marker component
function DraggableMarker({ business, onDragEnd, onDelete }) {
  const icon = useMemo(() => createMarkerIcon(business.category), [business.category]);
  const emoji = categoryEmoji[business.category] || categoryEmoji.Other;

  return (
    <Marker
      position={[business.lat, business.lng]}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng();
          onDragEnd(business.business_id, lat, lng);
        },
      }}
    >
      <Popup>
        <div className="min-w-[200px]">
          <div className="font-bold text-base flex items-center gap-2">
            <span>{emoji}</span>
            <span>{business.name}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{business.category}</div>
          {business.address && <div className="text-sm mt-2">{business.address}</div>}
          {business.city && <div className="text-sm text-gray-600">{business.city}</div>}
          <div className="text-xs text-gray-400 mt-2 font-mono">
            {business.lat.toFixed(5)}, {business.lng.toFixed(5)}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
            <span className="text-xs text-blue-600 italic">Trascina per spostare</span>
            <button
              onClick={() => onDelete(business.business_id, business.name)}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              🗑 Elimina
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// Map center component
function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function PrologoBusinessForm({ initial, onSave, onCancel }) {
  const { t } = useI18n();
  const [form, setForm] = useState(() => initial || {
    name: "", category: "Restaurant", description: "", address: "", cap: "", city: "",
    phone: "", website: "", hours: "", image_url: "",
    base_discount: 0, proximity_discount: 0, proximity_radius_m: 500,
    promotion_title: "", promotion_description: "",
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.address || !form.city) {
      toast.error("Inserisci indirizzo e città");
      return;
    }
    setLoading(true);
    try {
      // Try progressively less specific queries for better results in small towns
      const queries = [
        `${form.address}, ${form.cap} ${form.city}, Italia`,
        `${form.address}, ${form.city}, Italia`,
        `${form.cap} ${form.city}, Italia`,
        `${form.city}, Calabria, Italia`,
      ];

      let result = null;
      for (const query of queries) {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const data = await res.json();
        if (data && data.length > 0) {
          result = data[0];
          break;
        }
      }

      if (!result) {
        toast.error(t("geocode_error"));
        setLoading(false);
        return;
      }
      const { lat, lon } = result;
      onSave({
        ...form,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        base_discount: Number(form.base_discount),
        proximity_discount: Number(form.proximity_discount),
        proximity_radius_m: Number(form.proximity_radius_m),
      });
    } catch (err) {
      toast.error("Errore geocoding: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("name_field")}</Label>
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required data-testid="prl-business-name" />
        </div>
        <div>
          <Label>{t("category")}</Label>
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger data-testid="prl-business-category"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Restaurant", "Pizzerie", "Bar e Pub", "Hotel", "B&B", "Sentieri e Cammini", "Beni Culturali", "Itinerari", "Monumenti", "Musei", "Spiagge", "Bandiera Blu", "Bandiera Verde", "Sea Park", "Archeologia", "Discoteche", "Supermercati", "Shop", "Pharmacy", "Bancomat", "Other"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>{t("description")}</Label>
        <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} />
      </div>
      <div>
        <Label>{t("address")} *</Label>
        <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Via Roma, 1" required />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>{t("cap")} *</Label>
          <Input value={form.cap} onChange={(e) => set("cap", e.target.value)} placeholder="88068" maxLength={5} required />
        </div>
        <div className="col-span-2">
          <Label>{t("city")} *</Label>
          <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Soverato" required />
        </div>
      </div>
      <div className="text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium">Posizione automatica.</span> Dopo il salvataggio, vai nella tab <strong>Mappa</strong> per verificare e correggere la posizione trascinando il marker.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("phone")}</Label>
          <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <Label>{t("website")}</Label>
          <Input value={form.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("hours")}</Label>
          <Input value={form.hours} onChange={(e) => set("hours", e.target.value)} />
        </div>
        <div>
          <Label>{t("image")}</Label>
          <Input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>{t("base_discount")} %</Label>
          <Input type="number" step="0.1" value={form.base_discount} onChange={(e) => set("base_discount", e.target.value)} />
        </div>
        <div>
          <Label>{t("proximity_discount")} %</Label>
          <Input type="number" step="0.1" value={form.proximity_discount} onChange={(e) => set("proximity_discount", e.target.value)} />
        </div>
        <div>
          <Label>{t("proximity_radius")}</Label>
          <Input type="number" value={form.proximity_radius_m} onChange={(e) => set("proximity_radius_m", e.target.value)} />
        </div>
      </div>
      <div>
        <Label>{t("promotion_title")}</Label>
        <Input value={form.promotion_title} onChange={(e) => set("promotion_title", e.target.value)} />
      </div>
      <div>
        <Label>{t("promotion_description")}</Label>
        <Textarea value={form.promotion_description} onChange={(e) => set("promotion_description", e.target.value)} rows={2} />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>{t("cancel")}</Button>
        <Button type="submit" disabled={loading} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="prl-business-save">
          {loading ? "Geocoding..." : t("save")}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function PrologoDashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [proloco, setProloco] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchBusiness, setSearchBusiness] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  // Get the personalized link for this Pro Loco or Città/Paese
  const personalizedLink = proloco?.slug
    ? `${window.location.origin}/${proloco.citta_paese_id ? 'c' : 'p'}/${proloco.slug}`
    : null;

  // Filtered businesses for list (sorted alphabetically)
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((b) => {
        // Filtro per categoria
        if (filterCategory && b.category !== filterCategory) return false;
        // Filtro per ricerca testo
        if (!searchBusiness) return true;
        const q = searchBusiness.toLowerCase();
        return (
          b.name?.toLowerCase().includes(q) ||
          b.city?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [businesses, searchBusiness, filterCategory]);

  // All available categories (fixed list to show all options even if no businesses in that category yet)
  const categories = useMemo(() => {
    const allCategories = [
      "Restaurant", "Pizzerie", "Bar e Pub", "Hotel", "B&B",
      "Sentieri e Cammini", "Beni Culturali", "Itinerari",
      "Monumenti", "Musei", "Spiagge", "Bandiera Blu", "Bandiera Verde",
      "Sea Park", "Archeologia", "Discoteche", "Supermercati",
      "Shop", "Pharmacy", "Bancomat", "Other"
    ];
    return allCategories.sort();
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [{ data: me }, { data: list }] = await Promise.all([
        api.get("/proloco/me"),
        api.get("/proloco/businesses"),
      ]);
      setProloco(me);
      setBusinesses(list);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/proloco/login");
      } else {
        toast.error(formatApiError(err.response?.data?.detail) || err.message);
      }
    }
  }, [navigate]);

  const uploadImage = async (file) => {
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("image_type", "cover");
      await api.post("/proloco/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Immagine caricata!");
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const copyLink = () => {
    if (personalizedLink) {
      navigator.clipboard.writeText(personalizedLink);
      toast.success("Link copiato!");
    }
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const logout = () => {
    localStorage.removeItem("pm_proloco_token");
    navigate("/proloco/login");
  };

  const save = async (data) => {
    try {
      if (editing) {
        await api.patch(`/proloco/businesses/${editing.business_id}`, data);
        toast.success(`"${data.name}" aggiornato`);
      } else {
        await api.post(`/proloco/businesses`, data);
        toast.success(`"${data.name}" aggiunto alla mappa`);
      }
      setShowModal(false);
      setEditing(null);
      await fetchAll(); // Attende il refresh dei dati
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const del = async (id) => {
    const biz = businesses.find(b => b.business_id === id);
    if (!window.confirm(`Eliminare "${biz?.name || 'attività'}"?`)) return;
    try {
      await api.delete(`/proloco/businesses/${id}`);
      toast.success(`"${biz?.name}" eliminato`);
      await fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const onImport = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const { data } = await api.post(`/proloco/import`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(`Importati: ${data.inserted}, Saltati: ${data.skipped}`);
      await fetchAll(); // Refresh completo
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  // Update coordinates when marker is dragged
  const updateCoordinates = async (businessId, lat, lng) => {
    try {
      await api.patch(`/proloco/businesses/${businessId}`, { lat, lng });
      toast.success(`Coordinate aggiornate: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      // Update local state
      setBusinesses((prev) =>
        prev.map((b) =>
          b.business_id === businessId ? { ...b, lat, lng } : b
        )
      );
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  // Calculate map center from businesses
  const mapCenter = useMemo(() => {
    if (proloco?.center) return proloco.center;
    if (businesses.length === 0) return [38.9, 16.6]; // Calabria default
    const avgLat = businesses.reduce((sum, b) => sum + b.lat, 0) / businesses.length;
    const avgLng = businesses.reduce((sum, b) => sum + b.lng, 0) / businesses.length;
    return [avgLat, avgLng];
  }, [proloco, businesses]);

  // Category filter for map
  const [mapCategory, setMapCategory] = useState("");
  const filteredMapBusinesses = useMemo(() => {
    if (!mapCategory) return businesses;
    return businesses.filter((b) => b.category === mapCategory);
  }, [businesses, mapCategory]);

  // Delete from map
  const deleteFromMap = async (businessId, businessName) => {
    if (!window.confirm(`Eliminare "${businessName}"?`)) return;
    try {
      await api.delete(`/proloco/businesses/${businessId}`);
      toast.success(`"${businessName}" eliminato dalla mappa`);
      await fetchAll(); // Refresh completo per sincronizzare tutto
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="bg-white border-b border-[var(--border)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--secondary-hover)] font-semibold">{proloco?.citta_paese_id ? "Città/Paese" : "Proloco"}</div>
            <h1 className="font-display text-2xl font-bold">{proloco?.name || proloco?.nome || t("proloco_panel")}</h1>
            {proloco && <div className="text-xs text-[var(--text-secondary)]">{proloco.region || proloco.provincia || ""} • {proloco.country || "IT"} • {(proloco.territory_polygon || []).length} pts</div>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowBrandingModal(true)} className="rounded-full" data-testid="proloco-branding-btn">
              <Image className="w-4 h-4 mr-2" />Branding
            </Button>
            <Button variant="outline" onClick={logout} className="rounded-full" data-testid="proloco-logout-btn"><LogOut className="w-4 h-4 mr-2" />{t("logout")}</Button>
          </div>
        </div>

        {/* Personalized Link Section */}
        {personalizedLink && (
          <div className="mt-4 bg-[var(--bg)] rounded-xl p-4 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--text)]">Il tuo link per i turisti</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-[var(--border)] rounded-lg px-3 py-2 text-sm font-mono text-[var(--primary)] truncate">
                {personalizedLink}
              </code>
              <Button size="sm" variant="outline" onClick={copyLink} className="rounded-lg" title="Copia link">
                <Copy className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.open(personalizedLink, '_blank')} className="rounded-lg" title="Apri link">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Condividi questo link con i turisti. Vedranno la tua immagine di copertina e logo.
            </p>
          </div>
        )}
      </header>
      <main className="p-6">
        <Tabs defaultValue="businesses">
          <TabsList className="bg-white rounded-full p-1 mb-6">
            <TabsTrigger value="businesses" className="rounded-full px-6" data-testid="prl-tab-businesses">{t("businesses")}</TabsTrigger>
            <TabsTrigger value="map" className="rounded-full px-6" data-testid="prl-tab-map"><Map className="w-4 h-4 mr-1 inline" /> Mappa</TabsTrigger>
            <TabsTrigger value="import" className="rounded-full px-6" data-testid="prl-tab-import">{t("import_xlsx")}</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <h2 className="font-display text-xl font-semibold">{t("businesses")} ({filteredBusinesses.length}/{businesses.length})</h2>
                <div className="flex items-center gap-2 flex-1 max-w-2xl">
                  <Select value={filterCategory || "_all"} onValueChange={(v) => setFilterCategory(v === "_all" ? "" : v)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tutte le categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">Tutte</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                    <Input
                      placeholder="Cerca attività..."
                      value={searchBusiness}
                      onChange={(e) => setSearchBusiness(e.target.value)}
                      className="pl-9 rounded-full"
                    />
                  </div>
                  <Button onClick={() => { setEditing(null); setShowModal(true); }} className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="prl-add-business">
                    <Plus className="w-4 h-4 mr-2" /> {t("add_business")}
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("city")}</TableHead>
                    <TableHead>Discounts</TableHead>
                    <TableHead>Coords</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-[var(--text-secondary)] py-8">{searchBusiness ? "Nessun risultato" : "—"}</TableCell></TableRow>
                  )}
                  {filteredBusinesses.map((b) => (
                    <TableRow key={b.business_id} data-testid={`prl-business-row-${b.business_id}`}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell>{b.category}</TableCell>
                      <TableCell>{b.city || "—"}</TableCell>
                      <TableCell><span className="text-xs">{b.base_discount}% + {b.proximity_discount}% @ {b.proximity_radius_m}m</span></TableCell>
                      <TableCell><span className="text-xs text-[var(--text-secondary)]"><MapPin className="w-3 h-3 inline" /> {b.lat.toFixed(4)}, {b.lng.toFixed(4)}</span></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => { setEditing(b); setShowModal(true); }} data-testid={`prl-business-edit-${b.business_id}`}><Edit3 className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => del(b.business_id)} data-testid={`prl-business-delete-${b.business_id}`}><Trash2 className="w-4 h-4 text-[var(--danger)]" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="font-display text-xl font-semibold">
                  <Map className="w-5 h-5 inline mr-2" />
                  Mappa Attività ({filteredMapBusinesses.length}/{businesses.length})
                </h2>
                <Select value={mapCategory || "_all"} onValueChange={(v) => setMapCategory(v === "_all" ? "" : v)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tutte le categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">Tutte le categorie</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3 bg-[var(--bg)] rounded-lg p-3">
                <MapPin className="w-4 h-4 inline mr-1" />
                <strong>Trascina i segnaposti</strong> per correggere la posizione delle attività.
              </p>
              <div className="rounded-xl overflow-hidden border border-[var(--border)]" style={{ height: "75vh" }}>
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap"
                  />
                  <MapCenterUpdater center={mapCenter} />
                  {filteredMapBusinesses.map((b) => (
                    <DraggableMarker
                      key={b.business_id}
                      business={b}
                      onDragEnd={updateCoordinates}
                      onDelete={deleteFromMap}
                    />
                  ))}
                </MapContainer>
              </div>
              <div className="mt-3 text-xs text-[var(--text-secondary)]">
                {filteredMapBusinesses.length} attività visualizzate
              </div>
            </div>
          </TabsContent>

          <TabsContent value="import">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 max-w-2xl">
              <h2 className="font-display text-xl font-semibold mb-2"><Upload className="inline w-5 h-5 mr-2" />{t("import_xlsx")}</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{t("import_tip")}</p>
              <Input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
                data-testid="prl-import-input"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-3xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("add_business")}</DialogTitle>
            <DialogDescription className="sr-only">Business</DialogDescription>
          </DialogHeader>
          <PrologoBusinessForm initial={editing} onSave={save} onCancel={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>

      {/* Branding Modal */}
      <Dialog open={showBrandingModal} onOpenChange={setShowBrandingModal}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle><Image className="w-5 h-5 inline mr-2" />Personalizza la tua Landing Page</DialogTitle>
            <DialogDescription>
              Carica le immagini per personalizzare la pagina di benvenuto per i turisti.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Cover Image Upload */}
            <div>
              <Label className="text-base font-semibold">Immagine di copertina</Label>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                L'immagine principale che i turisti vedranno (max 2MB, JPG/PNG/WebP)
              </p>
              {proloco?.cover_image_url && (
                <div className="mb-3 border rounded-lg overflow-hidden">
                  <img
                    src={proloco.cover_image_url.startsWith('/images')
                      ? `${api.defaults.baseURL}${proloco.cover_image_url}`
                      : proloco.cover_image_url}
                    alt="Copertina attuale"
                    className="w-full h-40 object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploadingCover}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file);
                }}
              />
              {uploadingCover && <p className="text-sm text-[var(--primary)] mt-1">Caricamento in corso...</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBrandingModal(false)}>Chiudi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
