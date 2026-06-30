// Privacy Policy page for Google AdSense compliance
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1e3a5f] hover:text-[#2d5a8f]"
          >
            <ArrowLeft size={20} />
            <span>Torna alla Home</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-8">
          Ultimo aggiornamento: 30 Giugno 2026
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Introduzione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              1. Introduzione
            </h2>
            <p className="leading-relaxed">
              Benvenuto su ProlocoPortale. La presente Privacy Policy descrive
              come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali
              quando utilizzi la nostra applicazione web dedicata al turismo di
              prossimità in Calabria.
            </p>
            <p className="leading-relaxed mt-2">
              ProlocoPortale si impegna a proteggere la tua privacy in
              conformità con il Regolamento Generale sulla Protezione dei Dati
              (GDPR - Regolamento UE 2016/679) e la normativa italiana vigente.
            </p>
          </section>

          {/* Titolare del trattamento */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              2. Titolare del Trattamento
            </h2>
            <p className="leading-relaxed">
              Il titolare del trattamento dei dati personali è ProlocoPortale.
              Per qualsiasi richiesta relativa alla privacy, puoi contattarci
              all'indirizzo email: privacy@prolocoportale.it
            </p>
          </section>

          {/* Dati raccolti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              3. Dati Raccolti
            </h2>
            <p className="leading-relaxed mb-3">
              ProlocoPortale raccoglie i seguenti tipi di dati:
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.1 Dati di navigazione
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Indirizzo IP</li>
              <li>Tipo di browser e dispositivo</li>
              <li>Pagine visitate e tempo di permanenza</li>
              <li>Sistema operativo</li>
            </ul>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.2 Dati di geolocalizzazione
            </h3>
            <p className="leading-relaxed">
              Se autorizzi l'accesso alla tua posizione, raccogliamo le
              coordinate GPS per mostrarti le attività più vicine. Questo dato
              viene utilizzato solo localmente sul tuo dispositivo e non viene
              memorizzato sui nostri server.
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.3 Dati di registrazione (opzionale)
            </h3>
            <p className="leading-relaxed">
              Se crei un account, raccogliamo: indirizzo email, password (criptata) e preferiti salvati.
            </p>
          </section>

          {/* Finalità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              4. Finalità del Trattamento
            </h2>
            <p className="leading-relaxed mb-3">
              I tuoi dati vengono utilizzati per:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Fornire il servizio di mappa interattiva</li>
              <li>Mostrarti attività commerciali e turistiche nelle vicinanze</li>
              <li>Calcolare sconti basati sulla prossimità geografica</li>
              <li>Migliorare l'esperienza utente</li>
              <li>Analisi statistiche aggregate e anonime</li>
              <li>Mostrare annunci pubblicitari pertinenti (Google AdSense)</li>
            </ul>
          </section>

          {/* Cookie */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              5. Cookie e Tecnologie di Tracciamento
            </h2>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              5.1 Cookie tecnici
            </h3>
            <p className="leading-relaxed">
              Utilizziamo cookie tecnici necessari per il funzionamento
              dell'applicazione (es. autenticazione, preferenze lingua).
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              5.2 Cookie analitici
            </h3>
            <p className="leading-relaxed">
              Utilizziamo Cloudflare Web Analytics per raccogliere dati
              statistici anonimi sul traffico. Questo servizio non utilizza
              cookie e rispetta la privacy degli utenti.
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              5.3 Cookie pubblicitari (Google AdSense)
            </h3>
            <p className="leading-relaxed">
              Utilizziamo Google AdSense per mostrare annunci pubblicitari.
              Google utilizza cookie per mostrare annunci basati sulle visite
              precedenti dell'utente. Puoi disattivare la pubblicità
              personalizzata visitando le Impostazioni annunci di Google.
            </p>
          </section>

          {/* Servizi terze parti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              6. Servizi di Terze Parti
            </h2>
            <p className="leading-relaxed mb-3">
              ProlocoPortale utilizza i seguenti servizi di terze parti:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Google AdSense - Per la visualizzazione di annunci pubblicitari</li>
              <li>Cloudflare - Per hosting, CDN e analytics</li>
              <li>MongoDB Atlas - Per l'archiviazione dei dati</li>
              <li>LibreTranslate - Per la traduzione automatica dei contenuti</li>
              <li>OpenStreetMap / Leaflet - Per le mappe interattive</li>
            </ul>
          </section>

          {/* Diritti utente */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              7. I Tuoi Diritti (GDPR)
            </h2>
            <p className="leading-relaxed mb-3">
              In conformità al GDPR, hai diritto di:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Accesso</strong> - Richiedere una copia dei tuoi dati personali</li>
              <li><strong>Rettifica</strong> - Correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione</strong> - Richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Limitazione</strong> - Limitare il trattamento dei tuoi dati</li>
              <li><strong>Portabilità</strong> - Ricevere i tuoi dati in formato leggibile</li>
              <li><strong>Opposizione</strong> - Opporti al trattamento per finalità di marketing</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Per esercitare questi diritti, contattaci a: privacy@prolocoportale.it
            </p>
          </section>

          {/* Sicurezza */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              8. Sicurezza dei Dati
            </h2>
            <p className="leading-relaxed">
              Adottiamo misure di sicurezza tecniche e organizzative per
              proteggere i tuoi dati, tra cui: crittografia HTTPS, password
              criptate con bcrypt, accesso limitato ai dati, backup regolari
              e protezione anti-scraping.
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              9. Contatti
            </h2>
            <p className="leading-relaxed">
              Per qualsiasi domanda sulla presente Privacy Policy, puoi contattarci a:
              <br />
              <strong>Email:</strong> privacy@prolocoportale.it
            </p>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-wrap gap-4 text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-[#1e3a5f]">
            Home
          </button>
          <button onClick={() => navigate("/terms")} className="hover:text-[#1e3a5f]">
            Termini di Servizio
          </button>
        </div>
      </div>
    </div>
  );
}
