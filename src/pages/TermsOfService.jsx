// Terms of Service page for Google AdSense compliance
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
          Termini di Servizio
        </h1>
        <p className="text-gray-500 mb-8">
          Ultimo aggiornamento: 30 Giugno 2026
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Accettazione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              1. Accettazione dei Termini
            </h2>
            <p className="leading-relaxed">
              Utilizzando ProlocoPortale, accetti di essere vincolato dai
              presenti Termini di Servizio. Se non accetti questi termini, ti
              preghiamo di non utilizzare il servizio.
            </p>
            <p className="leading-relaxed mt-2">
              ProlocoPortale si riserva il diritto di modificare questi termini
              in qualsiasi momento. L'uso continuato del servizio dopo eventuali
              modifiche costituisce accettazione dei nuovi termini.
            </p>
          </section>

          {/* Descrizione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              2. Descrizione del Servizio
            </h2>
            <p className="leading-relaxed">
              ProlocoPortale è una piattaforma web che permette ai turisti di:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Esplorare attività commerciali e turistiche in Calabria</li>
              <li>Visualizzare sulla mappa ristoranti, hotel, B&B, monumenti e altro</li>
              <li>Scoprire sentieri e cammini con tracciati GPS</li>
              <li>Trovare spiagge certificate Bandiera Blu e Verde</li>
              <li>Usufruire di sconti basati sulla prossimità geografica</li>
              <li>Navigare verso le destinazioni tramite app di navigazione</li>
            </ul>
          </section>

          {/* Uso consentito */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              3. Uso Consentito
            </h2>
            <p className="leading-relaxed mb-3">
              L'utente si impegna a utilizzare ProlocoPortale in modo lecito e
              rispettoso. In particolare, l'utente NON deve:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Utilizzare sistemi automatizzati (bot, scraper) per estrarre dati</li>
              <li>Tentare di accedere a dati o aree non autorizzate</li>
              <li>Interferire con il funzionamento del servizio</li>
              <li>Violare i diritti di proprietà intellettuale</li>
              <li>Utilizzare il servizio per scopi illegali</li>
              <li>Creare account falsi o multipli</li>
              <li>Condividere credenziali di accesso con terzi</li>
            </ul>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              4. Account Utente
            </h2>
            <p className="leading-relaxed">
              La registrazione di un account è facoltativa. Se scegli di registrarti:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Devi fornire informazioni accurate e veritiere</li>
              <li>Sei responsabile della sicurezza del tuo account</li>
              <li>Devi notificarci immediatamente eventuali accessi non autorizzati</li>
              <li>Non puoi trasferire il tuo account a terzi</li>
            </ul>
            <p className="leading-relaxed mt-2">
              Ci riserviamo il diritto di sospendere o eliminare account che violano questi termini.
            </p>
          </section>

          {/* Proprietà intellettuale */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              5. Contenuti e Proprietà Intellettuale
            </h2>
            <p className="leading-relaxed">
              Tutti i contenuti di ProlocoPortale (testi, immagini, loghi,
              database, software) sono protetti da diritti di proprietà intellettuale.
            </p>
            <p className="leading-relaxed mt-2">
              L'utente può utilizzare i contenuti solo per uso personale e non
              commerciale. È vietata la riproduzione, distribuzione o
              modificazione dei contenuti senza autorizzazione scritta.
            </p>
            <p className="leading-relaxed mt-2">
              I dati delle attività commerciali sono forniti dalle Pro Loco e
              dai Comuni partner. ProlocoPortale non garantisce l'accuratezza o
              la completezza di tali informazioni.
            </p>
          </section>

          {/* Limitazione responsabilità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              6. Limitazione di Responsabilità
            </h2>
            <p className="leading-relaxed">
              ProlocoPortale è fornito "così com'è" senza garanzie di alcun tipo. In particolare:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Non garantiamo che il servizio sia sempre disponibile o privo di errori</li>
              <li>Non siamo responsabili per informazioni inesatte sulle attività</li>
              <li>Non siamo responsabili per la qualità dei servizi offerti dalle attività elencate</li>
              <li>Non garantiamo la validità o disponibilità degli sconti indicati</li>
              <li>Non siamo responsabili per danni derivanti dall'uso del servizio</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 rounded">
              <p className="text-amber-800 font-medium">
                Avviso per Sentieri e Cammini
              </p>
              <p className="text-amber-700 text-sm mt-1">
                I tracciati GPS dei sentieri sono forniti a scopo indicativo.
                Per escursioni in montagna, utilizza sempre app offline dedicate,
                porta mappe cartacee di backup e informa qualcuno del tuo percorso.
                ProlocoPortale non è responsabile per incidenti durante le escursioni.
              </p>
            </div>
          </section>

          {/* Pubblicità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              7. Pubblicità
            </h2>
            <p className="leading-relaxed">
              ProlocoPortale può mostrare annunci pubblicitari tramite Google
              AdSense e altri network pubblicitari. Utilizzando il servizio,
              accetti di visualizzare tali annunci.
            </p>
            <p className="leading-relaxed mt-2">
              Non siamo responsabili per il contenuto degli annunci di terze
              parti. L'interazione con gli annunci è a tuo rischio e pericolo.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              8. Modifiche al Servizio
            </h2>
            <p className="leading-relaxed">
              Ci riserviamo il diritto di:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Modificare o interrompere il servizio in qualsiasi momento</li>
              <li>Aggiornare funzionalità e caratteristiche</li>
              <li>Modificare i presenti Termini di Servizio</li>
              <li>Limitare l'accesso a determinate funzionalità</li>
            </ul>
          </section>

          {/* Legge applicabile */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              9. Legge Applicabile e Foro Competente
            </h2>
            <p className="leading-relaxed">
              I presenti Termini di Servizio sono regolati dalla legge italiana.
              Per qualsiasi controversia derivante dall'uso di ProlocoPortale
              sarà competente il Foro di Catanzaro.
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              10. Contatti
            </h2>
            <p className="leading-relaxed">
              Per qualsiasi domanda sui presenti Termini di Servizio, puoi contattarci a:
              <br />
              <strong>Email:</strong> info@prolocoportale.it
            </p>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-wrap gap-4 text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-[#1e3a5f]">
            Home
          </button>
          <button onClick={() => navigate("/privacy")} className="hover:text-[#1e3a5f]">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
