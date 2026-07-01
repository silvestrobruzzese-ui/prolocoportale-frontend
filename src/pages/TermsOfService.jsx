// Terms of Service page - GDPR and AI Act compliant
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
            <span>Torna Indietro</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
          Termini di Servizio
        </h1>
        <p className="text-gray-500 mb-8">
          Ultimo aggiornamento: 1 Luglio 2026
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Accettazione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              1. Accettazione dei Termini
            </h2>
            <p className="leading-relaxed">
              Utilizzando Mappix, accetti di essere vincolato dai presenti
              Termini di Servizio. Se non accetti questi termini, ti preghiamo
              di non utilizzare il servizio.
            </p>
            <p className="leading-relaxed mt-2">
              Mappix, gestito da MB Consulting, si riserva il diritto di
              modificare questi termini in qualsiasi momento. L'uso continuato
              del servizio dopo eventuali modifiche costituisce accettazione dei
              nuovi termini.
            </p>
          </section>

          {/* Descrizione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              2. Descrizione del Servizio
            </h2>
            <p className="leading-relaxed">
              Mappix è una piattaforma web che permette ai turisti di:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Esplorare attività commerciali e turistiche in Calabria</li>
              <li>Visualizzare sulla mappa ristoranti, hotel, B&B, monumenti e altro</li>
              <li>Scoprire sentieri e cammini con tracciati GPS</li>
              <li>Trovare spiagge certificate Bandiera Blu e Verde</li>
              <li>Usufruire di sconti basati sulla prossimità geografica</li>
              <li>Navigare verso le destinazioni tramite app di navigazione</li>
              <li>Utilizzare la traduzione automatica dei contenuti</li>
            </ul>
          </section>

          {/* Uso consentito */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              3. Uso Consentito
            </h2>
            <p className="leading-relaxed mb-3">
              L'utente si impegna a utilizzare Mappix in modo lecito e
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
              <li>Tentare di aggirare le misure di sicurezza</li>
              <li>Rivendere o redistribuire i dati senza autorizzazione</li>
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
              <li>Devi avere almeno 16 anni di età</li>
              <li>Sei responsabile della sicurezza del tuo account</li>
              <li>Devi notificarci immediatamente eventuali accessi non autorizzati</li>
              <li>Non puoi trasferire il tuo account a terzi</li>
            </ul>
            <p className="leading-relaxed mt-2">
              Ci riserviamo il diritto di sospendere o eliminare account che
              violano questi termini, senza preavviso.
            </p>
          </section>

          {/* AI Act - Sistemi AI */}
          <section className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              5. Utilizzo di Intelligenza Artificiale
            </h2>
            <p className="leading-relaxed mb-3">
              In conformità al Regolamento UE 2024/1689 (AI Act), ti informiamo
              che Mappix utilizza sistemi di intelligenza artificiale per:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Traduzione automatica:</strong> I contenuti vengono tradotti
                automaticamente tramite LibreTranslate. Le traduzioni potrebbero
                contenere imprecisioni.</li>
              <li><strong>Ricerca intelligente:</strong> Un algoritmo ordina i risultati
                in base alla tua posizione e preferenze.</li>
              <li><strong>Assistente virtuale (futuro):</strong> Un chatbot AI potrà
                rispondere a domande turistiche.</li>
            </ul>

            <div className="mt-4 p-3 bg-purple-100 rounded">
              <p className="text-sm font-medium text-purple-800">Trasparenza AI:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-1 text-sm text-purple-700">
                <li>I contenuti generati da AI sono identificati come tali</li>
                <li>Nessuna decisione significativa viene presa esclusivamente da AI</li>
                <li>Puoi richiedere intervento umano contattando info@mappix.it</li>
              </ul>
            </div>
          </section>

          {/* Proprietà intellettuale */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              6. Contenuti e Proprietà Intellettuale
            </h2>
            <p className="leading-relaxed">
              Tutti i contenuti di Mappix (testi, immagini, loghi, database,
              software) sono protetti da diritti di proprietà intellettuale e
              sono di proprietà di MB Consulting o dei rispettivi titolari.
            </p>
            <p className="leading-relaxed mt-2">
              L'utente può utilizzare i contenuti solo per uso personale e non
              commerciale. È vietata la riproduzione, distribuzione o
              modificazione dei contenuti senza autorizzazione scritta.
            </p>
            <p className="leading-relaxed mt-2">
              I dati delle attività commerciali sono forniti dalle Pro Loco e
              dai Comuni partner. Mappix non garantisce l'accuratezza o la
              completezza di tali informazioni.
            </p>
          </section>

          {/* Limitazione responsabilità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              7. Limitazione di Responsabilità
            </h2>
            <p className="leading-relaxed">
              Mappix è fornito "così com'è" senza garanzie di alcun tipo. In particolare:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Non garantiamo che il servizio sia sempre disponibile o privo di errori</li>
              <li>Non siamo responsabili per informazioni inesatte sulle attività</li>
              <li>Non siamo responsabili per la qualità dei servizi offerti dalle attività elencate</li>
              <li>Non garantiamo la validità o disponibilità degli sconti indicati</li>
              <li>Non siamo responsabili per danni derivanti dall'uso del servizio</li>
              <li>Non siamo responsabili per errori nelle traduzioni automatiche</li>
              <li>Non siamo responsabili per risposte fornite dall'assistente AI</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 rounded">
              <p className="text-amber-800 font-medium">
                Avviso per Sentieri e Cammini
              </p>
              <p className="text-amber-700 text-sm mt-1">
                I tracciati GPS dei sentieri sono forniti a scopo indicativo.
                Per escursioni in montagna, utilizza sempre app offline dedicate,
                porta mappe cartacee di backup e informa qualcuno del tuo percorso.
                Mappix non è responsabile per incidenti durante le escursioni.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded">
              <p className="text-blue-800 font-medium">
                Avviso sull'Intelligenza Artificiale
              </p>
              <p className="text-blue-700 text-sm mt-1">
                Le traduzioni automatiche e le risposte dell'assistente virtuale
                sono generate da sistemi AI e potrebbero contenere errori o
                imprecisioni. Verifica sempre le informazioni importanti
                direttamente con le attività interessate.
              </p>
            </div>
          </section>

          {/* Pubblicità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              8. Pubblicità
            </h2>
            <p className="leading-relaxed">
              Mappix può mostrare annunci pubblicitari tramite Google AdSense e
              altri network pubblicitari. Utilizzando il servizio, accetti di
              visualizzare tali annunci.
            </p>
            <p className="leading-relaxed mt-2">
              Puoi gestire le tue preferenze pubblicitarie tramite le
              impostazioni dei cookie o visitando le Impostazioni annunci di
              Google. Consulta la nostra Privacy Policy per maggiori dettagli.
            </p>
            <p className="leading-relaxed mt-2">
              Non siamo responsabili per il contenuto degli annunci di terze
              parti. L'interazione con gli annunci è a tuo rischio e pericolo.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              9. Modifiche al Servizio
            </h2>
            <p className="leading-relaxed">
              Ci riserviamo il diritto di:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Modificare o interrompere il servizio in qualsiasi momento</li>
              <li>Aggiornare funzionalità e caratteristiche</li>
              <li>Modificare i presenti Termini di Servizio</li>
              <li>Limitare l'accesso a determinate funzionalità</li>
              <li>Introdurre nuovi sistemi AI o modificare quelli esistenti</li>
            </ul>
            <p className="leading-relaxed mt-2">
              Ti informeremo di modifiche sostanziali tramite avviso sul sito o
              via email (se registrato).
            </p>
          </section>

          {/* Indennizzo */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              10. Indennizzo
            </h2>
            <p className="leading-relaxed">
              Accetti di indennizzare e manlevare MB Consulting, i suoi
              dipendenti e collaboratori da qualsiasi reclamo, danno, perdita o
              spesa (incluse le spese legali) derivanti dalla tua violazione dei
              presenti Termini di Servizio o dall'uso improprio del servizio.
            </p>
          </section>

          {/* Legge applicabile */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              11. Legge Applicabile e Foro Competente
            </h2>
            <p className="leading-relaxed">
              I presenti Termini di Servizio sono regolati dalla legge italiana
              e dalle normative europee applicabili, inclusi GDPR e AI Act.
            </p>
            <p className="leading-relaxed mt-2">
              Per qualsiasi controversia derivante dall'uso di Mappix sarà
              competente il Foro di Catanzaro, fatto salvo il foro del
              consumatore ove applicabile.
            </p>
          </section>

          {/* Risoluzione controversie */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              12. Risoluzione delle Controversie
            </h2>
            <p className="leading-relaxed">
              In caso di controversie, ti invitiamo a contattarci prima
              all'indirizzo info@mappix.it per cercare una soluzione amichevole.
            </p>
            <p className="leading-relaxed mt-2">
              Ai sensi dell'art. 14 del Regolamento UE 524/2013, ti informiamo
              che è disponibile la piattaforma ODR (Online Dispute Resolution)
              per la risoluzione alternativa delle controversie:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              13. Contatti
            </h2>
            <p className="leading-relaxed">
              Per qualsiasi domanda sui presenti Termini di Servizio:
            </p>
            <div className="bg-gray-100 p-4 rounded mt-3">
              <p><strong>MB Consulting</strong></p>
              <p><strong>Email:</strong> info@mappix.it</p>
              <p><strong>Sito web:</strong> https://mappix.it</p>
            </div>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-gray-300 flex flex-wrap gap-4 text-sm text-gray-500">
          <button onClick={() => navigate(-1)} className="hover:text-[#1e3a5f]">
            Torna Indietro
          </button>
          <button onClick={() => navigate("/privacy")} className="hover:text-[#1e3a5f]">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
