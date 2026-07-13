// Superadmin Dashboard
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Trash2, RefreshCw, Upload, LogOut, MapPin, Edit3, Copy, KeyRound, CheckCircle2, Search, Link2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

function PrologoForm({ initial, onSave, onCancel }) {
  const { t } = useI18n();
  const [form, setForm] = useState(() => initial || {
    name: "", region: "", country: "IT",
    via: "", comune: "", cap: "",
    email: "", phone: "",
  });
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-3">
      <div>
        <Label>{t("name")}</Label>
        <Input value={form.name} onChange={(e) => setField("name", e.target.value)} required data-testid="proloco-form-name" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("region")}</Label>
          <Input value={form.region} onChange={(e) => setField("region", e.target.value)} required data-testid="proloco-form-region" />
        </div>
        <div>
          <Label>{t("country")}</Label>
          <Input value={form.country} onChange={(e) => setField("country", e.target.value)} maxLength={2} data-testid="proloco-form-country" />
        </div>
      </div>
      <div>
        <Label>{t("via")}</Label>
        <Input value={form.via} onChange={(e) => setField("via", e.target.value)} required placeholder="Via Roma, 12" data-testid="proloco-form-via" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>{t("cap")}</Label>
          <Input value={form.cap} onChange={(e) => setField("cap", e.target.value)} required maxLength={10} placeholder="88068" data-testid="proloco-form-cap" />
        </div>
        <div className="col-span-2">
          <Label>{t("comune")}</Label>
          <Input value={form.comune} onChange={(e) => setField("comune", e.target.value)} required placeholder="Soverato" data-testid="proloco-form-comune" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("email_field")}</Label>
          <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} required data-testid="proloco-form-email" />
        </div>
        <div>
          <Label>{t("phone_field")}</Label>
          <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} required placeholder="+39 ..." data-testid="proloco-form-phone" />
        </div>
      </div>
      <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg)] rounded-lg p-3 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--secondary-hover)]" />
        <span>{t("auto_geocode")}</span>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} data-testid="proloco-form-cancel">{t("cancel")}</Button>
        <Button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="proloco-form-save">{t("save")}</Button>
      </DialogFooter>
    </form>
  );
}

function CittaPaeseForm({ initial, onSave, onCancel }) {
  const { t } = useI18n();
  const [form, setForm] = useState(() => initial || {
    nome: "", provincia: "CS", tipo: "Paese", comune: "",
    popolazione: "", region: "Calabria", country: "IT",
    via: "", cap: "",
    referente_nome: "", referente_cognome: "",
    email: "", phone: "",
  });
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!form.referente_nome.trim() || !form.referente_cognome.trim()) {
      toast.error("Nome e Cognome del referente sono obbligatori");
      return;
    }
    onSave({
      ...form,
      popolazione: form.popolazione ? parseInt(form.popolazione) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label>Nome Città/Paese *</Label>
        <Input value={form.nome} onChange={(e) => setField("nome", e.target.value)} required placeholder="Es. Soverato" data-testid="citta-paese-form-nome" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>Provincia *</Label>
          <Select value={form.provincia} onValueChange={(v) => setField("provincia", v)}>
            <SelectTrigger data-testid="citta-paese-form-provincia"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CS">CS - Cosenza</SelectItem>
              <SelectItem value="RC">RC - Reggio Calabria</SelectItem>
              <SelectItem value="CZ">CZ - Catanzaro</SelectItem>
              <SelectItem value="KR">KR - Crotone</SelectItem>
              <SelectItem value="VV">VV - Vibo Valentia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Tipo</Label>
          <Select value={form.tipo} onValueChange={(v) => setField("tipo", v)}>
            <SelectTrigger data-testid="citta-paese-form-tipo"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Città">Città</SelectItem>
              <SelectItem value="Paese">Paese</SelectItem>
              <SelectItem value="Frazione">Frazione</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Popolazione</Label>
          <Input type="number" value={form.popolazione} onChange={(e) => setField("popolazione", e.target.value)} placeholder="Es. 10000" data-testid="citta-paese-form-popolazione" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Comune *</Label>
          <Input value={form.comune} onChange={(e) => setField("comune", e.target.value)} required placeholder="Es. Soverato" data-testid="citta-paese-form-comune" />
        </div>
        <div>
          <Label>{t("cap")}</Label>
          <Input value={form.cap} onChange={(e) => setField("cap", e.target.value)} maxLength={10} placeholder="88068" data-testid="citta-paese-form-cap" />
        </div>
      </div>
      <div>
        <Label>Via e numero civico</Label>
        <Input value={form.via} onChange={(e) => setField("via", e.target.value)} placeholder="Via Roma, 12" data-testid="citta-paese-form-via" />
      </div>

      {/* Sezione Referente */}
      <div className="border-t border-[var(--border)] pt-3 mt-3">
        <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Persona di Riferimento *</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Nome *</Label>
            <Input value={form.referente_nome} onChange={(e) => setField("referente_nome", e.target.value)} required placeholder="Mario" data-testid="citta-paese-form-referente-nome" />
          </div>
          <div>
            <Label>Cognome *</Label>
            <Input value={form.referente_cognome} onChange={(e) => setField("referente_cognome", e.target.value)} required placeholder="Rossi" data-testid="citta-paese-form-referente-cognome" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("email_field")} *</Label>
          <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} required data-testid="citta-paese-form-email" />
        </div>
        <div>
          <Label>{t("phone_field")} *</Label>
          <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} required placeholder="+39 ..." data-testid="citta-paese-form-phone" />
        </div>
      </div>
      <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg)] rounded-lg p-3 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--secondary-hover)]" />
        <span>{t("auto_geocode")}</span>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} data-testid="citta-paese-form-cancel">{t("cancel")}</Button>
        <Button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="citta-paese-form-save">{t("save")}</Button>
      </DialogFooter>
    </form>
  );
}

function BusinessForm({ initial, onSave, onCancel, prolocos }) {
  const { t } = useI18n();
  const [form, setForm] = useState(() => initial || {
    name: "", category: "Restaurant", description: "", address: "", cap: "", city: "",
    phone: "", website: "", hours: "", image_url: "",
    base_discount: 0, proximity_discount: 0, proximity_radius_m: 500,
    promotion_title: "", promotion_description: "", proloco_id: "",
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
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required data-testid="business-form-name" />
        </div>
        <div>
          <Label>{t("category")}</Label>
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger data-testid="business-form-category"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Restaurant", "Pizzerie", "Bar e Pub", "Hotel", "B&B", "Sentieri e Cammini", "Beni Culturali", "Itinerari", "Monumenti", "Musei", "Spiagge", "Bandiera Blu", "Bandiera Verde", "Sea Park", "Archeologia", "Discoteche", "Supermercati", "Shop", "Pharmacy", "Bancomat", "Bar e Pasticcerie"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>{t("description")}</Label>
        <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} data-testid="business-form-description" />
      </div>
      <div>
        <Label>{t("address")} *</Label>
        <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Via Roma, 1" required data-testid="business-form-address" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>{t("cap")} *</Label>
          <Input value={form.cap} onChange={(e) => set("cap", e.target.value)} placeholder="88068" maxLength={5} required data-testid="business-form-cap" />
        </div>
        <div className="col-span-2">
          <Label>{t("city")} *</Label>
          <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Soverato" required data-testid="business-form-city" />
        </div>
      </div>
      <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg)] rounded-lg p-3 flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--secondary-hover)]" />
        <span>{t("auto_geocode")}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("phone")}</Label>
          <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} data-testid="business-form-phone" />
        </div>
        <div>
          <Label>{t("website")}</Label>
          <Input value={form.website} onChange={(e) => set("website", e.target.value)} data-testid="business-form-website" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t("hours")}</Label>
          <Input value={form.hours} onChange={(e) => set("hours", e.target.value)} data-testid="business-form-hours" />
        </div>
        <div>
          <Label>{t("image")}</Label>
          <Input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} data-testid="business-form-image" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>{t("base_discount")} %</Label>
          <Input type="number" step="0.1" value={form.base_discount} onChange={(e) => set("base_discount", e.target.value)} data-testid="business-form-base" />
        </div>
        <div>
          <Label>{t("proximity_discount")} %</Label>
          <Input type="number" step="0.1" value={form.proximity_discount} onChange={(e) => set("proximity_discount", e.target.value)} data-testid="business-form-bonus" />
        </div>
        <div>
          <Label>{t("proximity_radius")}</Label>
          <Input type="number" value={form.proximity_radius_m} onChange={(e) => set("proximity_radius_m", e.target.value)} data-testid="business-form-radius" />
        </div>
      </div>
      <div>
        <Label>{t("promotion_title")}</Label>
        <Input value={form.promotion_title} onChange={(e) => set("promotion_title", e.target.value)} data-testid="business-form-promo-title" />
      </div>
      <div>
        <Label>{t("promotion_description")}</Label>
        <Textarea value={form.promotion_description} onChange={(e) => set("promotion_description", e.target.value)} rows={2} data-testid="business-form-promo-desc" />
      </div>
      {prolocos && (
        <div>
          <Label>Proloco (optional)</Label>
          <Select value={form.proloco_id || "_none"} onValueChange={(v) => set("proloco_id", v === "_none" ? "" : v)}>
            <SelectTrigger data-testid="business-form-proloco"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="_none">—</SelectItem>
              {prolocos.map((p) => <SelectItem key={p.proloco_id} value={p.proloco_id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} data-testid="business-form-cancel">{t("cancel")}</Button>
        <Button type="submit" disabled={loading} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="business-form-save">
          {loading ? "Geocoding..." : t("save")}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AdminDashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [prolocos, setProlocos] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [editingProloco, setEditingProloco] = useState(null);
  const [showPrologoModal, setShowPrologoModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [importTarget, setImportTarget] = useState(null);
  const [pinModal, setPinModal] = useState(null); // { proloco } or { cittaPaese } shown after create
  const [searchProloco, setSearchProloco] = useState("");
  const [searchBusiness, setSearchBusiness] = useState("");
  const [filterProloco, setFilterProloco] = useState("");

  // Città e Paesi state
  const [cittaPaesi, setCittaPaesi] = useState([]);
  const [editingCittaPaese, setEditingCittaPaese] = useState(null);
  const [showCittaPaeseModal, setShowCittaPaeseModal] = useState(false);
  const [searchCittaPaese, setSearchCittaPaese] = useState("");

  // Filtered lists
  const filteredCittaPaesi = cittaPaesi.filter((c) => {
    if (!searchCittaPaese) return true;
    const q = searchCittaPaese.toLowerCase();
    return (
      c.nome?.toLowerCase().includes(q) ||
      c.comune?.toLowerCase().includes(q) ||
      c.provincia?.toLowerCase().includes(q) ||
      c.pin?.toLowerCase().includes(q) ||
      c.referente_nome?.toLowerCase().includes(q) ||
      c.referente_cognome?.toLowerCase().includes(q)
    );
  });

  const filteredProlocos = prolocos.filter((p) => {
    if (!searchProloco) return true;
    const q = searchProloco.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.comune?.toLowerCase().includes(q) ||
      p.region?.toLowerCase().includes(q) ||
      p.pin?.toLowerCase().includes(q)
    );
  });

  const filteredBusinesses = businesses.filter((b) => {
    // Filtro per Pro Loco
    if (filterProloco && b.proloco_id !== filterProloco) return false;
    // Filtro per ricerca testo
    if (!searchBusiness) return true;
    const q = searchBusiness.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  const fetchAll = useCallback(async () => {
    try {
      const [{ data: p }, { data: b }, { data: cp }] = await Promise.all([
        api.get("/admin/prolocos"),
        api.get("/admin/businesses"),
        api.get("/admin/citta-paesi"),
      ]);
      setProlocos(p);
      setBusinesses(b);
      setCittaPaesi(cp);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/admin/login");
      } else {
        toast.error(formatApiError(err.response?.data?.detail) || err.message);
      }
    }
  }, [navigate]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const logout = () => {
    localStorage.removeItem("pm_admin_token");
    navigate("/admin/login");
  };

  const saveProloco = async (data) => {
    try {
      if (editingProloco) {
        await api.patch(`/admin/prolocos/${editingProloco.proloco_id}`, data);
        toast.success("Updated");
        setShowPrologoModal(false);
        setEditingProloco(null);
      } else {
        const { data: created } = await api.post(`/admin/prolocos`, data);
        setShowPrologoModal(false);
        setEditingProloco(null);
        setPinModal({ proloco: created });
      }
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const deleteProloco = async (id) => {
    if (!window.confirm("Delete this Proloco?")) return;
    try {
      await api.delete(`/admin/prolocos/${id}`);
      toast.success("Deleted");
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const regenPin = async (id) => {
    try {
      const { data } = await api.post(`/admin/prolocos/${id}/regen-pin`);
      toast.success(`New PIN: ${data.pin}`);
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  // Città e Paesi CRUD
  const saveCittaPaese = async (data) => {
    try {
      if (editingCittaPaese) {
        await api.patch(`/admin/citta-paesi/${editingCittaPaese.citta_paese_id}`, data);
        toast.success("Aggiornato");
        setShowCittaPaeseModal(false);
        setEditingCittaPaese(null);
      } else {
        const { data: created } = await api.post(`/admin/citta-paesi`, data);
        setShowCittaPaeseModal(false);
        setEditingCittaPaese(null);
        setPinModal({ cittaPaese: created });
      }
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const deleteCittaPaese = async (id) => {
    if (!window.confirm("Eliminare questa città/paese?")) return;
    try {
      await api.delete(`/admin/citta-paesi/${id}`);
      toast.success("Eliminato");
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const regenCittaPaesePin = async (id) => {
    try {
      const { data } = await api.post(`/admin/citta-paesi/${id}/regen-pin`);
      toast.success(`Nuovo PIN: ${data.pin}`);
      fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const saveBusiness = async (data) => {
    try {
      const { proloco_id, ...rest } = data;
      if (editingBusiness) {
        await api.patch(`/admin/businesses/${editingBusiness.business_id}`, rest);
      } else {
        const url = proloco_id ? `/admin/businesses?proloco_id=${proloco_id}` : `/admin/businesses`;
        await api.post(url, rest);
      }
      toast.success(editingBusiness ? `"${data.name}" aggiornato` : `"${data.name}" aggiunto`);
      setShowBusinessModal(false);
      setEditingBusiness(null);
      await fetchAll(); // Attende il refresh dei dati
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const deleteBusiness = async (id) => {
    const biz = businesses.find(b => b.business_id === id);
    if (!window.confirm(`Eliminare "${biz?.name || 'attività'}"?`)) return;
    try {
      await api.delete(`/admin/businesses/${id}`);
      toast.success(`"${biz?.name}" eliminato`);
      await fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const onImport = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    if (importTarget && importTarget !== "_all") fd.append("proloco_id", importTarget);
    try {
      const { data } = await api.post(`/admin/import`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(`Importati: ${data.inserted}, Saltati: ${data.skipped}`);
      await fetchAll(); // Refresh completo
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  const onImportCittaPaesi = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const { data } = await api.post(`/admin/import-citta-paesi`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(`Importati: ${data.inserted}, Saltati: ${data.skipped}, Duplicati: ${data.duplicates}`);
      if (data.errors && data.errors.length > 0) {
        console.warn("Errori importazione:", data.errors);
      }
      await fetchAll();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">Super Admin</div>
          <h1 className="font-display text-2xl font-bold">{t("superadmin_panel")}</h1>
        </div>
        <Button variant="outline" onClick={logout} className="rounded-full" data-testid="admin-logout-btn"><LogOut className="w-4 h-4 mr-2" />{t("logout")}</Button>
      </header>
      <main className="p-6">
        <Tabs defaultValue="citta-paesi">
          <TabsList className="bg-white rounded-full p-1 mb-6">
            <TabsTrigger value="citta-paesi" className="rounded-full px-6" data-testid="admin-tab-citta-paesi">Città e Paesi</TabsTrigger>
            <TabsTrigger value="prolocos" className="rounded-full px-6" data-testid="admin-tab-prolocos">{t("prolocos")}</TabsTrigger>
            <TabsTrigger value="businesses" className="rounded-full px-6" data-testid="admin-tab-businesses">{t("businesses")}</TabsTrigger>
            <TabsTrigger value="import" className="rounded-full px-6" data-testid="admin-tab-import">{t("import_xlsx")}</TabsTrigger>
          </TabsList>

          {/* Città e Paesi Tab */}
          <TabsContent value="citta-paesi">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="font-display text-xl font-semibold">Città e Paesi ({filteredCittaPaesi.length}/{cittaPaesi.length})</h2>
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                    <Input
                      placeholder="Cerca Pro Loco, città o paese..."
                      value={searchCittaPaese}
                      onChange={(e) => setSearchCittaPaese(e.target.value)}
                      className="pl-9 rounded-full"
                      data-testid="search-citta-paese"
                    />
                  </div>
                  <Button onClick={() => { setEditingCittaPaese(null); setShowCittaPaeseModal(true); }} className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="add-citta-paese-btn">
                    <Plus className="w-4 h-4 mr-2" /> Aggiungi Città o Paese
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Comune</TableHead>
                    <TableHead>Referente</TableHead>
                    <TableHead>PIN</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCittaPaesi.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-[var(--text-secondary)] py-8">{searchCittaPaese ? "Nessun risultato" : "Nessuna città o paese ancora"}</TableCell></TableRow>
                  )}
                  {filteredCittaPaesi.map((c) => {
                    const cittaPaeseLink = c.slug ? `${window.location.origin}/c/${c.slug}` : null;
                    return (
                    <TableRow key={c.citta_paese_id} data-testid={`citta-paese-row-${c.citta_paese_id}`}>
                      <TableCell className="font-medium">
                        {c.nome}
                        <div className="text-xs text-[var(--text-secondary)] font-normal">{c.provincia} • {c.tipo}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{c.comune || "—"}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{c.popolazione ? `${c.popolazione.toLocaleString()} ab.` : ""}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{c.referente_nome} {c.referente_cognome}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{c.email || "—"}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{c.phone || ""}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <code className="bg-[var(--bg)] px-2 py-1 rounded font-mono text-sm" data-testid={`citta-paese-pin-${c.citta_paese_id}`}>{c.pin}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => {
                              navigator.clipboard.writeText(c.pin);
                              toast.success("PIN copiato");
                            }}
                            title="Copia PIN"
                            data-testid={`citta-paese-copy-pin-${c.citta_paese_id}`}
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {cittaPaeseLink ? (
                          <div className="flex items-center gap-1">
                            <code className="bg-[var(--bg)] px-2 py-1 rounded text-xs font-mono text-[var(--primary)] max-w-[150px] truncate" title={cittaPaeseLink}>
                              /c/{c.slug}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => {
                                navigator.clipboard.writeText(cittaPaeseLink);
                                toast.success("Link copiato!");
                              }}
                              title="Copia link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => window.open(cittaPaeseLink, '_blank')}
                              title="Apri link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-secondary)]">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => regenCittaPaesePin(c.citta_paese_id)} title="Rigenera PIN" data-testid={`citta-paese-regen-${c.citta_paese_id}`}><RefreshCw className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditingCittaPaese(c); setShowCittaPaeseModal(true); }} data-testid={`citta-paese-edit-${c.citta_paese_id}`}><Edit3 className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteCittaPaese(c.citta_paese_id)} data-testid={`citta-paese-delete-${c.citta_paese_id}`}><Trash2 className="w-4 h-4 text-[var(--danger)]" /></Button>
                      </TableCell>
                    </TableRow>
                  );})}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="prolocos">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="font-display text-xl font-semibold">{t("prolocos")} ({filteredProlocos.length}/{prolocos.length})</h2>
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                    <Input
                      placeholder="Cerca Pro Loco, città o paese..."
                      value={searchProloco}
                      onChange={(e) => setSearchProloco(e.target.value)}
                      className="pl-9 rounded-full"
                      data-testid="search-proloco"
                    />
                  </div>
                  <Button onClick={() => { setEditingProloco(null); setShowPrologoModal(true); }} className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="add-proloco-btn">
                    <Plus className="w-4 h-4 mr-2" /> {t("add_proloco")}
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("comune")}</TableHead>
                    <TableHead>{t("contact")}</TableHead>
                    <TableHead>PIN</TableHead>
                    <TableHead>Link Turisti</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProlocos.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-[var(--text-secondary)] py-8">{searchProloco ? "Nessun risultato" : t("no_proloco_yet")}</TableCell></TableRow>
                  )}
                  {filteredProlocos.map((p) => {
                    const prolocoLink = p.slug ? `${window.location.origin}/p/${p.slug}` : null;
                    return (
                    <TableRow key={p.proloco_id} data-testid={`proloco-row-${p.proloco_id}`}>
                      <TableCell className="font-medium">
                        {p.name}
                        <div className="text-xs text-[var(--text-secondary)] font-normal">{p.region} • {p.country}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{p.comune || "—"}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{p.via || ""}{p.cap ? ` • ${p.cap}` : ""}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">{p.email || p.contact_email || "—"}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{p.phone || ""}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <code className="bg-[var(--bg)] px-2 py-1 rounded font-mono text-sm" data-testid={`proloco-pin-${p.proloco_id}`}>{p.pin}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => {
                              navigator.clipboard.writeText(p.pin);
                              toast.success(t("pin_copied"));
                            }}
                            title={t("pin_copy")}
                            data-testid={`proloco-copy-pin-${p.proloco_id}`}
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {prolocoLink ? (
                          <div className="flex items-center gap-1">
                            <code className="bg-[var(--bg)] px-2 py-1 rounded text-xs font-mono text-[var(--primary)] max-w-[150px] truncate" title={prolocoLink}>
                              /p/{p.slug}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => {
                                navigator.clipboard.writeText(prolocoLink);
                                toast.success("Link copiato!");
                              }}
                              title="Copia link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => window.open(prolocoLink, '_blank')}
                              title="Apri link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-secondary)]">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => regenPin(p.proloco_id)} title={t("regen_pin")} data-testid={`proloco-regen-${p.proloco_id}`}><RefreshCw className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditingProloco(p); setShowPrologoModal(true); }} data-testid={`proloco-edit-${p.proloco_id}`}><Edit3 className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteProloco(p.proloco_id)} data-testid={`proloco-delete-${p.proloco_id}`}><Trash2 className="w-4 h-4 text-[var(--danger)]" /></Button>
                      </TableCell>
                    </TableRow>
                  );})}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="businesses">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <h2 className="font-display text-xl font-semibold">{t("businesses")} ({filteredBusinesses.length}/{businesses.length})</h2>
                <div className="flex items-center gap-2 flex-1 max-w-2xl">
                  <Select value={filterProloco || "_all"} onValueChange={(v) => setFilterProloco(v === "_all" ? "" : v)}>
                    <SelectTrigger className="w-48" data-testid="filter-proloco">
                      <SelectValue placeholder="Tutte le Pro Loco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">Tutte le Pro Loco</SelectItem>
                      {prolocos.sort((a, b) => (a.name || "").localeCompare(b.name || "")).map((p) => (
                        <SelectItem key={p.proloco_id} value={p.proloco_id}>{p.name}</SelectItem>
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
                      data-testid="search-business"
                    />
                  </div>
                  <Button onClick={() => { setEditingBusiness(null); setShowBusinessModal(true); }} className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="add-business-btn">
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
                    <TableHead>Proloco</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.map((b) => (
                    <TableRow key={b.business_id} data-testid={`business-row-${b.business_id}`}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell>{b.category}</TableCell>
                      <TableCell>{b.city || "—"}</TableCell>
                      <TableCell><span className="text-xs">{b.base_discount}% + {b.proximity_discount}% @ {b.proximity_radius_m}m</span></TableCell>
                      <TableCell>{prolocos.find((p) => p.proloco_id === b.proloco_id)?.name || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => { setEditingBusiness(b); setShowBusinessModal(true); }} data-testid={`business-edit-${b.business_id}`}><Edit3 className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteBusiness(b.business_id)} data-testid={`business-delete-${b.business_id}`}><Trash2 className="w-4 h-4 text-[var(--danger)]" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="import">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Import Attività */}
              <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
                <h2 className="font-display text-xl font-semibold mb-2"><Upload className="inline w-5 h-5 mr-2" />Importa Attività</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{t("import_tip")}</p>
                <div className="space-y-3">
                  <div>
                    <Label>Assegna a Proloco (opzionale)</Label>
                    <Select value={importTarget || "_all"} onValueChange={(v) => setImportTarget(v)}>
                      <SelectTrigger data-testid="import-target-select"><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_all">— Nessuna Proloco —</SelectItem>
                        {prolocos.map((p) => <SelectItem key={p.proloco_id} value={p.proloco_id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>File (.xlsx, .xls, .csv)</Label>
                    <Input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
                      data-testid="admin-import-input"
                    />
                  </div>
                </div>
              </div>

              {/* Import Città e Paesi */}
              <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
                <h2 className="font-display text-xl font-semibold mb-2"><Upload className="inline w-5 h-5 mr-2" />Importa Città e Paesi</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Importa da CSV con colonne: Nome, Prov., Tipo, Comune, Popolazione, Lat, Lon
                </p>
                <div className="space-y-3">
                  <div className="text-xs text-[var(--warning)] bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-lg p-3">
                    <strong>Nota:</strong> I campi "Referente" saranno impostati a "Da inserire" e dovranno essere aggiornati manualmente dopo l'importazione.
                  </div>
                  <div>
                    <Label>File (.xlsx, .xls, .csv)</Label>
                    <Input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => e.target.files?.[0] && onImportCittaPaesi(e.target.files[0])}
                      data-testid="admin-import-citta-paesi-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showPrologoModal} onOpenChange={setShowPrologoModal}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProloco ? t("edit") : t("add_proloco")}</DialogTitle>
            <DialogDescription className="sr-only">Proloco</DialogDescription>
          </DialogHeader>
          <PrologoForm initial={editingProloco} onSave={saveProloco} onCancel={() => setShowPrologoModal(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showBusinessModal} onOpenChange={setShowBusinessModal}>
        <DialogContent className="rounded-3xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBusiness ? t("edit") : t("add_business")}</DialogTitle>
            <DialogDescription className="sr-only">Business</DialogDescription>
          </DialogHeader>
          <BusinessForm initial={editingBusiness} onSave={saveBusiness} onCancel={() => setShowBusinessModal(false)} prolocos={prolocos} />
        </DialogContent>
      </Dialog>

      {/* Modal Città/Paese */}
      <Dialog open={showCittaPaeseModal} onOpenChange={setShowCittaPaeseModal}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCittaPaese ? "Modifica Città/Paese" : "Aggiungi Città o Paese"}</DialogTitle>
            <DialogDescription className="sr-only">Città o Paese</DialogDescription>
          </DialogHeader>
          <CittaPaeseForm initial={editingCittaPaese} onSave={saveCittaPaese} onCancel={() => setShowCittaPaeseModal(false)} />
        </DialogContent>
      </Dialog>

      {/* PIN Modal - gestisce sia Proloco che Città/Paese */}
      <Dialog open={!!pinModal} onOpenChange={(v) => !v && setPinModal(null)}>
        <DialogContent className="rounded-3xl max-w-md p-0 overflow-hidden" data-testid="pin-modal">
          <div className="bg-[var(--secondary)] text-white p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              <div className="text-sm uppercase tracking-widest font-semibold">
                {pinModal?.proloco ? "Proloco" : "Città/Paese"}
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold mt-1">
              {pinModal?.proloco?.name || pinModal?.cittaPaese?.nome}
            </h2>
            <div className="text-white/85 text-xs mt-1">
              {pinModal?.proloco
                ? `${pinModal.proloco.comune} • ${pinModal.proloco.region}`
                : `${pinModal?.cittaPaese?.comune} • ${pinModal?.cittaPaese?.provincia}`
              }
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-2">
                <KeyRound className="w-3.5 h-3.5 inline mr-1" />
                {t("pin_generated")}
              </div>
              <div className="flex items-center gap-2">
                <code
                  className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-2xl px-4 py-4 font-mono text-3xl font-bold tracking-[0.3em] text-center text-[var(--primary)]"
                  data-testid="generated-pin-value"
                >
                  {pinModal?.proloco?.pin || pinModal?.cittaPaese?.pin}
                </code>
                <Button
                  variant="outline"
                  className="rounded-2xl h-[60px] w-[60px] p-0"
                  onClick={() => {
                    const pin = pinModal?.proloco?.pin || pinModal?.cittaPaese?.pin;
                    if (pin) {
                      navigator.clipboard.writeText(pin);
                      toast.success(t("pin_copied"));
                    }
                  }}
                  data-testid="copy-pin-btn"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] bg-[var(--warning)]/20 border border-[var(--warning)] rounded-xl p-3">
              {t("pin_info")}
            </p>
            {/* Link per Proloco */}
            {pinModal?.proloco?.slug && (
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-2">
                  <Link2 className="w-3.5 h-3.5 inline mr-1" />
                  Link per i turisti
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm font-mono text-[var(--primary)] truncate">
                    {window.location.origin}/p/{pinModal.proloco.slug}
                  </code>
                  <Button
                    variant="outline"
                    className="rounded-lg h-10 w-10 p-0"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/p/${pinModal.proloco.slug}`);
                      toast.success("Link copiato!");
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            {/* Link per Città/Paese */}
            {pinModal?.cittaPaese?.slug && (
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-2">
                  <Link2 className="w-3.5 h-3.5 inline mr-1" />
                  Link pubblico
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm font-mono text-[var(--primary)] truncate">
                    {window.location.origin}/c/{pinModal.cittaPaese.slug}
                  </code>
                  <Button
                    variant="outline"
                    className="rounded-lg h-10 w-10 p-0"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/c/${pinModal.cittaPaese.slug}`);
                      toast.success("Link copiato!");
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            {/* Referente per Città/Paese */}
            {pinModal?.cittaPaese && (
              <div className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold">Referente:</span> {pinModal.cittaPaese.referente_nome} {pinModal.cittaPaese.referente_cognome}
              </div>
            )}
            {/* Coordinate */}
            {(pinModal?.proloco?.center || pinModal?.cittaPaese?.center) && (
              <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {(pinModal?.proloco?.center || pinModal?.cittaPaese?.center)[0].toFixed(4)},
                {(pinModal?.proloco?.center || pinModal?.cittaPaese?.center)[1].toFixed(4)}
              </div>
            )}
            <Button
              className="w-full rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
              onClick={() => setPinModal(null)}
              data-testid="pin-modal-close"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
