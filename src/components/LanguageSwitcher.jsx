// Language switcher pill button in the top floating bar
import React from "react";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-testid="language-switcher"
          className="glass rounded-full h-10 px-3 inline-flex items-center gap-2 hover:bg-white transition-colors text-sm font-medium text-[var(--text-primary)]"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{current.flag} {current.label}</span>
          <span className="sm:hidden">{current.flag}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            data-testid={`lang-option-${l.code}`}
            onClick={() => setLang(l.code)}
            className="gap-2 cursor-pointer"
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
            {l.code === lang && <span className="ml-auto text-[var(--primary)]">●</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
