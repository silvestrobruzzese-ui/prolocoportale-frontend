// Privacy Policy page for Google AdSense compliance
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Torna alla Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-8">
          Ultimo aggiornamento: 30 Giugno 2026
        </p>

        <div className="prose prose-blue max-w-none space-y-6">
          {/* Introduzione */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Introduzione
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Benvenuto su ProlocoPortale. La presente Privacy Policy descrive
              come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali
              quando utilizzi la nostra applicazione web dedicata al turismo di
              prossimità in Calabria.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              ProlocoPortale si impegna a proteggere la tua privacy in
              conformità con il Regolamento Generale sulla Protezione dei Dati
              (GDPR - Regolamento UE 2016/679) e la normativa italiana vigente.
            </p>
          </section>

          {/* Titolare del trattamento */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Titolare del Trattamento
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Il titolare del trattamento dei dati personali è ProlocoPortale.
              <br />
              Per qualsiasi richiesta relativa alla privacy, puoi contattarci
              all'indirizzo email:{" "}
              <a
                href="mailto:privacy@prolocoportale.it"
                className="text-blue-600 hover:underline"
              >
                privacy@prolocoportale.it
              </a>
            </p>
          </section>

          {/* Dati raccolti */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Dati Raccolti
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              ProlocoPortale raccoglie i seguenti tipi di dati:
            </p>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              3.1 Dati di navigazione
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Indirizzo IP</li>
              <li>Tipo di browser e dispositivo</li>
              <li>Pagine visitate e tempo di permanenza</li>
              <li>Sistema operativo</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              3.2 Dati di geolocalizzazione
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Se autorizzi l'accesso alla tua posizione, raccogliamo le
              coordinate GPS per mostrarti le attività più vicine. Questo dato
              viene utilizzato solo localmente sul tuo dispositivo e non viene
              memorizzato sui nostri server.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              3.3 Dati di registrazione (opzionale)
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Se crei un account, raccogliamo:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Indirizzo email</li>
              <li>Password (criptata)</li>
              <li>Preferiti salvati</li>
            </ul>
          </section>

          {/* Finalità */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Finalità del Trattamento
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              I tuoi dati vengono utilizzati per:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Fornire il servizio di mappa interattiva</li>
              <li>Mostrarti attività commerciali e turistiche nelle vicinanze</li>
              <li>Calcolare sconti basati sulla prossimità geografica</li>
              <li>Migliorare l'esperienza utente</li>
              <li>Analisi statistiche aggregate e anonime</li>
              <li>Mostrare annunci pubblicitari pertinenti (Google AdSense)</li>
            </ul>
          </section>

          {/* Cookie e tecnologie */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Cookie e Tecnologie di Tracciamento
            </h2>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              5.1 Cookie tecnici
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Utilizziamo cookie tecnici necessari per il funzionamento
              dell'applicazione (es. autenticazione, preferenze lingua).
            </p>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              5.2 Cookie analitici
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Utilizziamo Cloudflare Web Analytics per raccogliere dati
              statistici anonimi sul traffico. Questo servizio non utilizza
              cookie e rispetta la privacy degli utenti.
            </p>

            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
              5.3 Cookie pubblicitari (Google AdSense)
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Utilizziamo Google AdSense per mostrare annunci pubblicitari.
              Google utilizza cookie per mostrare annunci basati sulle visite
              precedenti dell'utente su questo o altri siti web. Puoi
              disattivare la pubblicità personalizzata visitando le{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Impostazioni annunci di Google
              </a>
              .
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              Per maggiori informazioni su come Google utilizza i dati, visita:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Come Google utilizza i dati
              </a>
              .
            </p>
          </section>

          {/* Servizi terze parti */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Servizi di Terze Parti
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              ProlocoPortale utilizza i seguenti servizi di terze parti:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Google AdSense</strong> - Per la visualizzazione di
                annunci pubblicitari
              </li>
              <li>
                <strong>Cloudflare</strong> - Per hosting, CDN e analytics
              </li>
              <li>
                <strong>MongoDB Atlas</strong> - Per l'archiviazione dei dati
              </li>
              <li>
                <strong>LibreTranslate</strong> - Per la traduzione automatica
                dei contenuti
              </li>
              <li>
                <strong>OpenStreetMap / Leaflet</strong> - Per le mappe
                interattive
              </li>
            </ul>
          </section>

          {/* Conservazione dati */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Conservazione dei Dati
            </h2>
            <p className="text-gray-600 leading-relaxed">
              I dati personali vengono conservati per il tempo strettamente
              necessario alle finalità per cui sono stati raccolti:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
              <li>Dati di navigazione: 90 giorni</li>
              <li>Dati account utente: fino alla cancellazione dell'account</li>
              <li>Dati di geolocalizzazione: non memorizzati (solo uso locale)</li>
            </ul>
          </section>

          {/* Diritti utente */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              8. I Tuoi Diritti (GDPR)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              In conformità al GDPR, hai diritto di:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <strong>Accesso</strong> - Richiedere una copia dei tuoi dati
                personali
              </li>
              <li>
                <strong>Rettifica</strong> - Correggere dati inesatti o
                incompleti
              </li>
              <li>
                <strong>Cancellazione</strong> - Richiedere la cancellazione dei
                tuoi dati
              </li>
              <li>
                <strong>Limitazione</strong> - Limitare il trattamento dei tuoi
                dati
              </li>
              <li>
                <strong>Portabilità</strong> - Ricevere i tuoi dati in formato
                leggibile
              </li>
              <li>
                <strong>Opposizione</strong> - Opporti al trattamento per
                finalità di marketing
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Per esercitare questi diritti, contattaci a:{" "}
              <a
                href="mailto:privacy@prolocoportale.it"
                className="text-blue-600 hover:underline"
              >
                privacy@prolocoportale.it
              </a>
            </p>
          </section>

          {/* Sicurezza */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              9. Sicurezza dei Dati
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Adottiamo misure di sicurezza tecniche e organizzative per
              proteggere i tuoi dati, tra cui:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
              <li>Crittografia HTTPS per tutte le comunicazioni</li>
              <li>Password criptate con algoritmi sicuri (bcrypt)</li>
              <li>Accesso limitato ai dati solo al personale autorizzato</li>
              <li>Backup regolari dei dati</li>
              <li>Protezione anti-scraping e rate limiting</li>
            </ul>
          </section>

          {/* Minori */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              10. Minori
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ProlocoPortale non è destinato a minori di 16 anni. Non
              raccogliamo consapevolmente dati personali di minori. Se sei un
              genitore e ritieni che tuo figlio ci abbia fornito dati personali,
              contattaci per richiederne la cancellazione.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              11. Modifiche alla Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ci riserviamo il diritto di modificare questa Privacy Policy in
              qualsiasi momento. Le modifiche saranno pubblicate su questa
              pagina con la data di aggiornamento. Ti invitiamo a consultare
              periodicamente questa pagina.
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              12. Contatti
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Per qualsiasi domanda sulla presente Privacy Policy o sul
              trattamento dei tuoi dati personali, puoi contattarci a:
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@prolocoportale.it"
                className="text-blue-600 hover:underline"
              >
                privacy@prolocoportale.it
              </a>
            </p>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/terms" className="hover:text-blue-600">
            Termini di Servizio
          </Link>
        </div>
      </div>
    </div>
  );
}
