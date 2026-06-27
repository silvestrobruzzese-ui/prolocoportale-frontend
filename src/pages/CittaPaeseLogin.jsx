// Città/Paese PIN login page
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { formatApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CittaPaeseLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/citta-paese/login", { pin: pin.toUpperCase() });
      if (data?.access_token) {
        // Clear other tokens to ensure citta_paese token takes precedence
        localStorage.removeItem("pm_user_token");
        localStorage.removeItem("pm_admin_token");
        localStorage.setItem("pm_proloco_token", data.access_token);
      }
      toast.success(`Benvenuto ${data?.nome || ""}`);
      navigate("/proloco");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]" data-testid="citta-login-back">
          <ArrowLeft className="w-4 h-4" /> {t("home")}
        </Link>
      </div>
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-[#1e3a5f] text-white p-6">
          <Building2 className="w-8 h-8" />
          <h1 className="font-display text-2xl font-bold mt-2">Accesso Città e Paesi</h1>
          <p className="text-white/85 text-sm mt-1">Inserisci il PIN alfanumerico fornito dal superadmin</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-3">
          <div>
            <Label htmlFor="pin">PIN alfanumerico</Label>
            <Input
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              maxLength={16}
              placeholder="XXXXXXXX"
              className="font-mono text-lg tracking-widest uppercase"
              data-testid="citta-pin-input"
            />
          </div>
          <Button type="submit" disabled={loading || !pin} className="w-full rounded-full bg-[#1e3a5f] hover:bg-[#2d4a6f]" data-testid="citta-login-submit">
            {loading ? "..." : "Conferma"}
          </Button>
        </form>
        <div className="px-6 pb-6">
          <p className="text-xs text-center text-[var(--text-secondary)]">
            Sei una Pro Loco? <Link to="/proloco/login" className="text-[var(--primary)] hover:underline">Accedi qui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
