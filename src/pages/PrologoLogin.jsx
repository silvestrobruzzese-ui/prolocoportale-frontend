// Proloco PIN login page
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { formatApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PrologoLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/proloco/login", { pin: pin.toUpperCase() });
      if (data?.access_token) localStorage.setItem("pm_proloco_token", data.access_token);
      toast.success(`Welcome ${data?.name || ""}`);
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
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]" data-testid="proloco-login-back">
          <ArrowLeft className="w-4 h-4" /> {t("home")}
        </Link>
      </div>
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-[var(--secondary)] text-white p-6">
          <KeyRound className="w-8 h-8" />
          <h1 className="font-display text-2xl font-bold mt-2">{t("sign_in_proloco")}</h1>
          <p className="text-white/85 text-sm mt-1">{t("pin_login_hint")}</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-3">
          <div>
            <Label htmlFor="pin">{t("pin")}</Label>
            <Input
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              maxLength={16}
              placeholder="XXXXXXXX"
              className="font-mono text-lg tracking-widest uppercase"
              data-testid="proloco-pin-input"
            />
          </div>
          <Button type="submit" disabled={loading || !pin} className="w-full rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="proloco-login-submit">
            {loading ? "…" : t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
