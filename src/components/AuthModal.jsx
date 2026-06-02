// AuthModal: tabs for sign in / register
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { formatApiError } from "@/lib/api";

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const { t } = useI18n();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success(t("welcome_user"));
      onClose();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, name);
      toast.success(t("welcome_user"));
      onClose();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden" data-testid="auth-modal">
        <div className="bg-[var(--primary)] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-white">{t("sign_in")}</DialogTitle>
          </DialogHeader>
          <p className="text-white/85 text-sm mt-1">{t("register_to_save")}</p>
        </div>
        <div className="p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-2 rounded-full p-1 bg-[var(--bg)] mb-4">
              <TabsTrigger value="login" className="rounded-full" data-testid="auth-tab-login">{t("login")}</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full" data-testid="auth-tab-register">{t("register")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="auth-email-input" />
                </div>
                <div>
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="auth-password-input" />
                </div>
                <Button type="submit" disabled={loading} className="w-full rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="auth-login-submit">
                  {loading ? "…" : t("login")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} data-testid="auth-name-input" />
                </div>
                <div>
                  <Label htmlFor="email-r">{t("email")}</Label>
                  <Input id="email-r" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="auth-register-email" />
                </div>
                <div>
                  <Label htmlFor="password-r">{t("password")}</Label>
                  <Input id="password-r" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="auth-register-password" />
                </div>
                <Button type="submit" disabled={loading} className="w-full rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]" data-testid="auth-register-submit">
                  {loading ? "…" : t("register")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
