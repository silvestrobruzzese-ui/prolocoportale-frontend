// SuperAdmin login page (email + password)
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { formatApiError } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { email, password });
      if (data?.access_token) {
        // Clear other tokens to ensure admin token takes precedence
        localStorage.removeItem("pm_user_token");
        localStorage.removeItem("pm_proloco_token");
        localStorage.setItem("pm_admin_token", data.access_token);
      }
      toast.success("Welcome");
      navigate("/admin");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]" data-testid="admin-login-back">
          <ArrowLeft className="w-4 h-4" /> {t("home")}
        </Link>
      </div>
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-[var(--text-primary)] text-white p-6">
          <ShieldCheck className="w-8 h-8" />
          <h1 className="font-display text-2xl font-bold mt-2">{t("sign_in_admin")}</h1>
          <p className="text-white/70 text-sm mt-1">{t("superadmin_panel")}</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-3">
          <div>
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="admin-email-input" />
          </div>
          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required data-testid="admin-password-input" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="admin-login-submit">
            {loading ? "…" : t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
