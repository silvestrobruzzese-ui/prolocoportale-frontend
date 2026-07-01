// Privacy Policy page - GDPR, AI Act, and Cookie compliant
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
            <span>Torna Indietro</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
          Privacy Policy e Cookie Policy
        </h1>
        <p className="text-gray-500 mb-8">
          Ultimo aggiornamento: 1 Luglio 2026
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Introduzione */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              1. Introduzione
            </h2>
            <p className="leading-relaxed">
              Benvenuto su Mappix. La presente Privacy Policy descrive come
              raccogliamo, utilizziamo e proteggiamo i tuoi dati personali
              quando utilizzi la nostra applicazione web dedicata al turismo di
              prossimità in Calabria.
            </p>
            <p className="leading-relaxed mt-2">
              Mappix, gestito da MB Consulting, si impegna a proteggere la tua
              privacy in conformità con:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679)</li>
              <li>Regolamento sull'Intelligenza Artificiale (AI Act - Regolamento UE 2024/1689)</li>
              <li>Direttiva ePrivacy e normativa italiana sui cookie</li>
              <li>Codice Privacy italiano (D.Lgs. 196/2003 e s.m.i.)</li>
            </ul>
          </section>

          {/* Titolare del trattamento */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              2. Titolare del Trattamento
            </h2>
            <p className="leading-relaxed">
              <strong>Titolare:</strong> MB Consulting<br />
              <strong>Email:</strong> info@mappix.it<br />
              <strong>Sito web:</strong> https://mappix.it
            </p>
            <p className="leading-relaxed mt-2">
              Per qualsiasi richiesta relativa alla privacy o all'esercizio dei
              tuoi diritti, puoi contattarci all'indirizzo email sopra indicato.
            </p>
          </section>

          {/* Dati raccolti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              3. Dati Raccolti
            </h2>
            <p className="leading-relaxed mb-3">
              Mappix raccoglie i seguenti tipi di dati:
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.1 Dati di navigazione
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Indirizzo IP (anonimizzato)</li>
              <li>Tipo di browser e dispositivo</li>
              <li>Pagine visitate e tempo di permanenza</li>
              <li>Sistema operativo</li>
              <li>Paese di provenienza</li>
            </ul>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.2 Dati di geolocalizzazione
            </h3>
            <p className="leading-relaxed">
              Se autorizzi l'accesso alla tua posizione, raccogliamo le
              coordinate GPS per mostrarti le attività più vicine.
              <strong> Questo dato viene elaborato solo localmente sul tuo
              dispositivo e non viene mai memorizzato sui nostri server.</strong>
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              3.3 Dati di registrazione (opzionale)
            </h3>
            <p className="leading-relaxed">
              Se crei un account, raccogliamo: indirizzo email, password
              (criptata con algoritmo bcrypt) e lista dei preferiti salvati.
            </p>
          </section>

          {/* Base giuridica */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              4. Base Giuridica del Trattamento
            </h2>
            <p className="leading-relaxed mb-3">
              Il trattamento dei tuoi dati si basa su:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Consenso</strong> - Per cookie non essenziali, geolocalizzazione e marketing</li>
              <li><strong>Esecuzione contrattuale</strong> - Per fornire il servizio richiesto</li>
              <li><strong>Legittimo interesse</strong> - Per sicurezza, prevenzione frodi e miglioramento del servizio</li>
              <li><strong>Obbligo legale</strong> - Per adempiere a obblighi di legge</li>
            </ul>
          </section>

          {/* Finalità */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              5. Finalità del Trattamento
            </h2>
            <p className="leading-relaxed mb-3">
              I tuoi dati vengono utilizzati per:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Fornire il servizio di mappa interattiva</li>
              <li>Mostrarti attività commerciali e turistiche nelle vicinanze</li>
              <li>Calcolare sconti basati sulla prossimità geografica</li>
              <li>Tradurre automaticamente i contenuti nella tua lingua</li>
              <li>Migliorare l'esperienza utente</li>
              <li>Analisi statistiche aggregate e anonime</li>
              <li>Mostrare annunci pubblicitari (previo consenso)</li>
              <li>Prevenire abusi e garantire la sicurezza</li>
            </ul>
          </section>

          {/* COOKIE POLICY */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              6. Cookie Policy
            </h2>
            <p className="leading-relaxed mb-4">
              I cookie sono piccoli file di testo che i siti web salvano sul tuo
              dispositivo per migliorare l'esperienza di navigazione.
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-4 mb-2">
              6.1 Cookie Tecnici (Necessari)
            </h3>
            <p className="leading-relaxed mb-2">
              Questi cookie sono essenziali per il funzionamento del sito e non
              richiedono consenso:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Nome</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Scopo</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">auth_token</td>
                    <td className="border border-gray-300 px-3 py-2">Autenticazione utente</td>
                    <td className="border border-gray-300 px-3 py-2">7 giorni</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">language</td>
                    <td className="border border-gray-300 px-3 py-2">Preferenza lingua</td>
                    <td className="border border-gray-300 px-3 py-2">1 anno</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">cookie_consent</td>
                    <td className="border border-gray-300 px-3 py-2">Memorizza consenso cookie</td>
                    <td className="border border-gray-300 px-3 py-2">1 anno</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-6 mb-2">
              6.2 Cookie Analitici
            </h3>
            <p className="leading-relaxed">
              Utilizziamo <strong>Cloudflare Web Analytics</strong>, un servizio
              che <strong>non utilizza cookie</strong> e non traccia gli utenti
              individualmente. Raccoglie solo dati aggregati e anonimi.
            </p>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-6 mb-2">
              6.3 Cookie Pubblicitari (Previo Consenso)
            </h3>
            <p className="leading-relaxed mb-2">
              Se accetti i cookie pubblicitari, Google AdSense potrà installare
              cookie per mostrare annunci personalizzati:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300 mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Fornitore</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Scopo</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Google AdSense</td>
                    <td className="border border-gray-300 px-3 py-2">Annunci personalizzati</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Privacy Google
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">DoubleClick</td>
                    <td className="border border-gray-300 px-3 py-2">Misurazione annunci</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Gestisci preferenze
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-[#1e3a5f] mt-6 mb-2">
              6.4 Come Gestire i Cookie
            </h3>
            <p className="leading-relaxed">
              Puoi gestire le tue preferenze sui cookie in qualsiasi momento:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Tramite le impostazioni del tuo browser</li>
              <li>Visitando <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Your Online Choices</a></li>
              <li>Per Google: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Impostazioni annunci Google</a></li>
            </ul>
            <p className="leading-relaxed mt-2 text-sm text-gray-600">
              Nota: Disabilitare i cookie tecnici potrebbe compromettere alcune
              funzionalità del sito.
            </p>
          </section>

          {/* AI ACT - Sistemi di Intelligenza Artificiale */}
          <section className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              7. Utilizzo di Sistemi di Intelligenza Artificiale (AI Act)
            </h2>
            <p className="leading-relaxed mb-4">
              In conformità al Regolamento UE 2024/1689 (AI Act), ti informiamo che
              Mappix utilizza i seguenti sistemi di intelligenza artificiale:
            </p>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-purple-100">
                <h4 className="font-semibold text-[#1e3a5f]">7.1 Traduzione Automatica</h4>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Sistema:</strong> LibreTranslate (open source)</li>
                  <li><strong>Scopo:</strong> Tradurre automaticamente descrizioni e contenuti</li>
                  <li><strong>Categoria di rischio AI Act:</strong> Rischio minimo</li>
                  <li><strong>Dati elaborati:</strong> Solo testi da tradurre, nessun dato personale</li>
                  <li><strong>Decisioni automatizzate:</strong> Nessuna decisione che ti riguarda</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border border-purple-100">
                <h4 className="font-semibold text-[#1e3a5f]">7.2 Ricerca e Raccomandazioni</h4>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Sistema:</strong> Algoritmo di ricerca proprietario</li>
                  <li><strong>Scopo:</strong> Mostrare attività pertinenti in base a posizione e preferenze</li>
                  <li><strong>Categoria di rischio AI Act:</strong> Rischio minimo</li>
                  <li><strong>Dati elaborati:</strong> Posizione (se autorizzata), categoria selezionata</li>
                  <li><strong>Decisioni automatizzate:</strong> Solo ordinamento risultati, nessun impatto significativo</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border border-purple-100">
                <h4 className="font-semibold text-[#1e3a5f]">7.3 Assistente Virtuale (Futuro)</h4>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                  <li><strong>Sistema:</strong> Google Gemini o equivalente</li>
                  <li><strong>Scopo:</strong> Rispondere a domande turistiche</li>
                  <li><strong>Categoria di rischio AI Act:</strong> Rischio minimo</li>
                  <li><strong>Trasparenza:</strong> L'assistente sarà chiaramente identificato come AI</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-purple-100 rounded">
              <p className="text-sm font-medium text-purple-800">
                I tuoi diritti rispetto ai sistemi AI:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-1 text-sm text-purple-700">
                <li>Essere informato quando interagisci con un sistema AI</li>
                <li>Richiedere intervento umano per decisioni automatizzate</li>
                <li>Contestare decisioni basate esclusivamente su AI</li>
                <li>Ottenere spiegazioni sul funzionamento dei sistemi AI</li>
              </ul>
            </div>
          </section>

          {/* Servizi terze parti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              8. Servizi di Terze Parti
            </h2>
            <p className="leading-relaxed mb-3">
              Mappix utilizza i seguenti servizi di terze parti:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Servizio</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Scopo</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Paese</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Cloudflare</td>
                    <td className="border border-gray-300 px-3 py-2">Hosting, CDN, Analytics</td>
                    <td className="border border-gray-300 px-3 py-2">USA (conforme GDPR)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">MongoDB Atlas</td>
                    <td className="border border-gray-300 px-3 py-2">Database</td>
                    <td className="border border-gray-300 px-3 py-2">UE (Irlanda)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Railway</td>
                    <td className="border border-gray-300 px-3 py-2">Backend hosting</td>
                    <td className="border border-gray-300 px-3 py-2">USA (conforme GDPR)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Google AdSense</td>
                    <td className="border border-gray-300 px-3 py-2">Pubblicità</td>
                    <td className="border border-gray-300 px-3 py-2">USA (conforme GDPR)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">LibreTranslate</td>
                    <td className="border border-gray-300 px-3 py-2">Traduzione AI</td>
                    <td className="border border-gray-300 px-3 py-2">Vari</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">OpenStreetMap</td>
                    <td className="border border-gray-300 px-3 py-2">Mappe</td>
                    <td className="border border-gray-300 px-3 py-2">UE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Trasferimento dati extra-UE */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              9. Trasferimento Dati Extra-UE
            </h2>
            <p className="leading-relaxed">
              Alcuni dei nostri fornitori di servizi hanno sede negli USA. Il
              trasferimento dei dati avviene in conformità al GDPR attraverso:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Data Privacy Framework UE-USA</li>
              <li>Clausole Contrattuali Standard (SCC)</li>
              <li>Misure supplementari di sicurezza</li>
            </ul>
          </section>

          {/* Diritti utente */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              10. I Tuoi Diritti (GDPR)
            </h2>
            <p className="leading-relaxed mb-3">
              In conformità al GDPR, hai i seguenti diritti:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Accesso (Art. 15)</strong> - Richiedere una copia dei tuoi dati personali</li>
              <li><strong>Rettifica (Art. 16)</strong> - Correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione (Art. 17)</strong> - Richiedere la cancellazione dei tuoi dati ("diritto all'oblio")</li>
              <li><strong>Limitazione (Art. 18)</strong> - Limitare il trattamento dei tuoi dati</li>
              <li><strong>Portabilità (Art. 20)</strong> - Ricevere i tuoi dati in formato leggibile da macchina</li>
              <li><strong>Opposizione (Art. 21)</strong> - Opporti al trattamento per finalità di marketing</li>
              <li><strong>Revoca consenso (Art. 7)</strong> - Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Per esercitare questi diritti, contattaci a: <strong>info@mappix.it</strong>
            </p>
            <p className="leading-relaxed mt-2">
              Hai inoltre il diritto di presentare reclamo al <strong>Garante per la
              Protezione dei Dati Personali</strong> (www.garanteprivacy.it).
            </p>
          </section>

          {/* Conservazione dati */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              11. Conservazione dei Dati
            </h2>
            <p className="leading-relaxed mb-3">
              I tuoi dati vengono conservati per il tempo strettamente necessario:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Dati account:</strong> Fino alla cancellazione dell'account</li>
              <li><strong>Dati navigazione:</strong> 90 giorni (in forma anonimizzata)</li>
              <li><strong>Log di sicurezza:</strong> 1 anno</li>
              <li><strong>Dati fiscali:</strong> 10 anni (obbligo di legge)</li>
            </ul>
          </section>

          {/* Sicurezza */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              12. Sicurezza dei Dati
            </h2>
            <p className="leading-relaxed">
              Adottiamo misure di sicurezza tecniche e organizzative per
              proteggere i tuoi dati:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Crittografia HTTPS/TLS per tutte le comunicazioni</li>
              <li>Password criptate con algoritmo bcrypt</li>
              <li>Accesso limitato ai dati (principio del minimo privilegio)</li>
              <li>Backup regolari e crittografati</li>
              <li>Protezione anti-scraping e rate limiting</li>
              <li>Monitoraggio continuo delle minacce</li>
            </ul>
          </section>

          {/* Minori */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              13. Minori
            </h2>
            <p className="leading-relaxed">
              Mappix non è destinato a minori di 16 anni. Non raccogliamo
              consapevolmente dati personali di minori di 16 anni. Se sei un
              genitore o tutore e ritieni che tuo figlio ci abbia fornito dati
              personali, contattaci per richiederne la cancellazione.
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">
              14. Contatti
            </h2>
            <p className="leading-relaxed">
              Per qualsiasi domanda sulla presente Privacy Policy o per
              esercitare i tuoi diritti:
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
          <button onClick={() => navigate("/terms")} className="hover:text-[#1e3a5f]">
            Termini di Servizio
          </button>
        </div>
      </div>
    </div>
  );
}
