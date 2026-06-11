# ProlocoPortale - Log di Sviluppo

## Panoramica Progetto
**ProlocoPortale** è un'applicazione web per l'economia di prossimità in Calabria. Permette ai turisti di esplorare attività commerciali, monumenti, spiagge e servizi sulla mappa, con sconti basati sulla prossimità geografica.

---

## STATO ATTUALE: PRODUZIONE ONLINE

**Ultimo aggiornamento: 3 Giugno 2026 - ore 02:15**

L'applicazione è completamente funzionante online su dispositivi mobili e desktop.

---

## Infrastruttura di Produzione

### Server e Servizi

| Servizio | Piattaforma | URL |
|----------|-------------|-----|
| **Frontend** | Cloudflare Pages | https://prolocoportale-frontend.pages.dev |
| **Backend API** | Railway | https://web-production-b3201.up.railway.app |
| **Database** | MongoDB Atlas | Cluster0 (vedi credenziali sotto) |
| **Traduzione** | LibreTranslate | https://libretranslate.com (API pubblica) |

### Credenziali Database MongoDB Atlas
**ATTENZIONE**: Le credenziali sono memorizzate nelle variabili ambiente di Railway.
Non committare mai credenziali in file pubblici.

### Repository GitHub
- **Frontend**: https://github.com/silvestrobruzzese-ui/prolocoportale-frontend

### Deploy Automatico
- **Cloudflare Pages**: Deploy automatico ad ogni push su `main`
- **Railway**: Deploy automatico ad ogni push su `main`

---

## Architettura Tecnica

### Frontend
- **Framework**: React 19 + React Router
- **Build Tool**: Craco (Create React App Configuration Override)
- **Mappa**: Leaflet + react-leaflet
- **UI Components**: Tailwind CSS + shadcn/ui
- **Internazionalizzazione**: Sistema i18n custom (5 lingue: IT, EN, FR, DE, ES)
- **Traduzione dinamica**: LibreTranslate API
- **Tema**: Pop/Vibrant con gradienti e colori saturi

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB (Motor async driver)
- **Autenticazione**: JWT + bcrypt
- **Hosting**: Railway

### Database
- **Nome**: `prolocoportale`
- **Hosting**: MongoDB Atlas (cloud)
- **Collezioni**:
  - `businesses` - ~18.121 attività (inclusi Beni Culturali e Itinerari)
  - `prolocos` - 120 Pro Loco
  - `users` - utenti e superadmin

---

## Categorie Disponibili (18 totali) - Colori Pop

| Categoria | Colore | Icona |
|-----------|--------|-------|
| Restaurant | #E63946 (Rosso vivace) | 🍽 |
| Pizzerie | #FF6B35 (Arancione) | 🍕 |
| Hotel | #FBBF24 (Giallo oro) | 🏨 |
| B&B | #22C55E (Verde brillante) | **B&B** (testo) |
| Sentieri e Cammini | Gradiente #F97316→#38BDF8 | 🥾 (SVG Hiker) |
| Beni Culturali | #8B5CF6 (Viola) | 🏛 (SVG Column) |
| Itinerari | #10B981 (Smeraldo) | 🥾 |
| Monumenti | #A855F7 (Viola) | ⛪ |
| Musei | #EC4899 (Rosa/Magenta) | 🏛 |
| Spiagge | #06B6D4 (Ciano) | 🏖 |
| **Bandiera Blu** | #0077B6 (Blu oceano) | Logo (immagine) |
| **Bandiera Verde** | #2E7D32 (Verde pediatrico) | Logo (immagine) |
| Archeologia | #F59E0B (Ambra) | 🏺 |
| Discoteche | #D946EF (Fucsia) | 🎵 |
| Supermercati | #3B82F6 (Blu) | 🛒 |
| Shop | #14B8A6 (Teal) | 🛍 |
| Pharmacy | #22C55E (Verde) | 💊 |
| Bancomat | #00843D (Verde BCC) | Logo BCC (immagine) |
| Other | #6366F1 (Indaco) | 📍 |

---

## Funzionalità Implementate

### Interfaccia Utente Mobile
- [x] **Schermata di benvenuto** con logo Pro Loco Soverato
- [x] **Mappa interattiva** con marker colorati per categoria
- [x] **Barra categorie orizzontale** scorrevole (sotto la ricerca)
- [x] **Pulsanti rotondi 14x14** con bordo colorato 3px e icona emoji/testo
- [x] **Dettaglio attività** in pannello laterale con pulsante "Chiudi" visibile
- [x] **Menu/ricerca nascosti** quando si apre il dettaglio attività
- [x] **Limite 100 marker** più vicini per performance
- [x] **Geolocalizzazione** funzionante su mobile
- [x] **Safe area iOS** - margine superiore per evitare sovrapposizione con barra browser
- [x] **Menu dropdown** con z-index corretto (sopra le categorie)

### Marker sulla Mappa
- [x] **Marker 40x40px** più grandi e visibili
- [x] **Colore fisso per categoria** (non cambia in prossimità)
- [x] **Bordo pulsante** per indicare prossimità (animazione CSS)
- [x] **Emoji/testo categoria** visibile nel marker
- [x] **Ombre più pronunciate** per effetto pop

### Navigazione
- [x] **Navigatore esterno** - Apre Google Maps (Android) o Apple Maps (iOS)
- [x] **Indicazioni stradali reali** - Percorso con voce e indicazioni turn-by-turn
- [x] **Auto-detect piattaforma** - Rileva iOS vs Android e apre l'app giusta

### Traduzione Automatica
- [x] **LibreTranslate** integrato per traduzione gratuita
- [x] **Cache traduzioni** per evitare chiamate API ripetute
- [x] **Spinner caricamento** durante la traduzione
- [x] **Campi tradotti**: nome, descrizione, promozione, indirizzo, città, orari

### Nuove Categorie Database (3 Giugno 2026)
- [x] **Beni Culturali** - 124 record importati da CSV
- [x] **Itinerari** - 202 record importati da CSV
- [x] Script di import: `backend/import_new_categories.py`

---

## Sessione 3 Giugno 2026 - Tutte le Modifiche

### Traduzione e Contenuti
1. **Traduzione automatica** - LibreTranslate integrato per dettagli attività
2. **Immagine benvenuto** - Sostituita con logo Pro Loco Soverato (`welcome-hero.png`)

### UI/UX Mobile
3. **Menu dropdown z-index** - Risolto problema menu coperto da categorie
4. **Marker colori** - Rimosso cambio colore in prossimità, mantenuto colore categoria
5. **Indicatore prossimità** - Bordo pulsante animato invece di cambio colore
6. **Categorie** - Spostate da sidebar sinistra a barra orizzontale scorrevole
7. **Pulsanti categoria** - Rotondi 14x14 con bordo 3px, sfondo bianco/colorato se attivo
8. **Dettaglio attività** - Rimossa immagine, aggiunto pulsante "Chiudi" prominente
9. **Safe area** - Aggiunto margine `mt-12` su mobile per iOS browser bar
10. **Nascondi menu** - Menu e categorie nascosti quando dettaglio aperto

### Tema Pop/Vibrant
11. **Palette colori** - Colori più saturi e vivaci
12. **Sfondo gradiente** - Blu chiaro sfumato (#F0F4FF → #E8EFFF)
13. **Glass effect** - Pannelli con blur e saturazione aumentati
14. **Marker 40px** - Più grandi con ombre pronunciate
15. **Pulsanti categoria** - Effetto hover con scale e shadow
16. **Animazioni** - popIn, float, slideUp migliorate
17. **CSS variables** - Nuovi gradienti (--gradient-primary, --gradient-hero)

### Icone Categorie
18. **B&B** - Cambiato da emoji 🛏 a testo "B&B" (più leggibile)
19. **Colori aggiornati** - Tutti i colori più vivaci e moderni

### Navigazione
20. **Navigatore esterno** - Pulsante "Naviga" apre Google Maps (Android) o Apple Maps (iOS)
21. **Indicazioni stradali reali** - Non più linea retta, ma percorso con navigatore vero

### Performance
22. **Limite marker** - Solo 100 marker più vicini alla posizione utente
23. **API limit** - Parametro `limit` aggiunto all'endpoint `/businesses`

---

## Sessione 3 Giugno 2026 (pomeriggio) - Migrazione Cloudflare

### Migrazione da Netlify a Cloudflare Pages
Il sito Netlify ha raggiunto il limite di bandwidth (100GB/mese). Migrato a Cloudflare Pages per bandwidth illimitato.

### Passaggi Migrazione
1. **Creato progetto Cloudflare Pages** collegato a GitHub
2. **Configurato build settings**:
   - Build command: `npm install --force && npm run build`
   - Output directory: `build`
   - Node version: 20
3. **Risolto errore overrides** - Rimossa sezione `overrides` da package.json su GitHub
4. **Aggiunta variabile SKIP_DEPENDENCY_INSTALL** per bypassare npm ci
5. **Configurato REACT_APP_BACKEND_URL** su Cloudflare
6. **Aggiornato CORS su Railway** - Aggiunto dominio Cloudflare

### Fix Emoji Firefox
7. **Aggiunto font emoji** ai marker in `index.css`
8. **Aggiunto font emoji** ai pulsanti categoria in `CategoryFilters.jsx`
9. **Font utilizzato**: `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla"`

### Variabili Ambiente Cloudflare Pages
| Nome | Valore |
|------|--------|
| `NODE_VERSION` | `20` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |
| `REACT_APP_BACKEND_URL` | `https://web-production-b3201.up.railway.app` |

### Variabili Ambiente Railway (CORS)
```
CORS_ORIGINS=https://prolocoportale.netlify.app,http://localhost:3000,https://prolocoportale-frontend.pages.dev
```

### Risultato
- ✅ Sito online su Cloudflare Pages
- ✅ Bandwidth illimitato
- ✅ Emoji funzionanti su Chrome, Safari, Firefox
- ✅ Deploy automatico da GitHub

---

## File Principali

### Frontend
| File | Descrizione |
|------|-------------|
| `src/pages/HomePage.jsx` | Mappa turista, welcome screen, logica principale |
| `src/components/MapView.jsx` | Mappa Leaflet con marker colorati (40px) |
| `src/components/CategoryFilters.jsx` | Barra categorie orizzontale (15 categorie, B&B testo) |
| `src/components/BusinessDetail.jsx` | Dettaglio attività con traduzione |
| `src/lib/translate.js` | Integrazione LibreTranslate |
| `src/lib/i18n.jsx` | Traduzioni UI (5 lingue) |
| `src/lib/api.js` | Configurazione API |
| `src/index.css` | Tema Pop/Vibrant con gradienti e animazioni |
| `public/welcome-hero.png` | Logo Pro Loco Soverato |

### Backend
| File | Descrizione |
|------|-------------|
| `server.py` | API FastAPI |
| `import_new_categories.py` | Script import Beni Culturali e Itinerari |

---

## Comandi Sviluppo Locale

```bash
# 1. Avviare Backend
cd /Users/gianni/Desktop/ProlocoPortale-main/backend
source venv/bin/activate
uvicorn server:app --reload --port 8000

# 2. Avviare Frontend
cd /Users/gianni/Desktop/ProlocoPortale-main/frontend
npm start
```

### URL Produzione
- **Mappa Turista**: https://prolocoportale-frontend.pages.dev
- **Superadmin**: https://prolocoportale-frontend.pages.dev/admin/login
  - Email: `admin@prolocoportale.it`
  - Password: (configurata su Railway come variabile `ADMIN_PASSWORD`)
- **Pro Loco Soverato**: https://prolocoportale-frontend.pages.dev/proloco/login
  - PIN: `UW5W4CUD`

### URL Sviluppo Locale
- **Mappa Turista**: http://localhost:3000
- **Superadmin**: http://localhost:3000/admin/login
- **Pro Loco Soverato**: http://localhost:3000/proloco/login

---

## Note Tecniche Importanti

1. **CORS**: Configurato per accettare richieste da Cloudflare Pages
2. **Geolocalizzazione**: Richiede HTTPS (funziona su Netlify, non su localhost HTTP)
3. **LibreTranslate**: API pubblica gratuita, possibili rate limit
4. **iOS Safari**: Fullscreen API non supportata, suggerito "Aggiungi a Home"
5. **Marker limit**: 100 per performance mobile
6. **Z-index**: Menu dropdown ha z-[1100] per stare sopra categorie

---

## Struttura Ruoli

| Ruolo | Accesso | Funzionalità |
|-------|---------|--------------|
| **Superadmin** | `/admin` | Gestisce tutte le Pro Loco, crea PIN, importa dati |
| **Pro Loco** | `/proloco/login` | Gestisce attività del proprio territorio |
| **Turista** | `/` | Esplora mappa, cerca attività, usa filtri |

---

## Prossimi Passi - PRIORITÀ

### 1. Chatbot AI Assistente Turistico
Implementare un assistente AI che conosce il territorio:

**Come funziona:**
1. Turista chiede es. "Dove posso mangiare pesce a Soverato?"
2. Backend cerca nel database MongoDB i ristoranti pertinenti
3. Invia i dati trovati + domanda a Google Gemini (gratuito)
4. Gemini risponde con i nostri dati in modo naturale e cordiale

**Cosa serve:**
- [ ] API Key Google Gemini (gratuito: 60 richieste/minuto)
- [ ] Endpoint backend `/api/chat` che:
  - Riceve domanda utente
  - Cerca attività rilevanti nel database
  - Invia contesto + domanda a Gemini
  - Restituisce risposta AI
- [ ] Widget chat frontend (pulsante flottante + finestra chat)
- [ ] Prompt di sistema per far rispondere l'AI come assistente Pro Loco

**Alternative AI:**
- Google Gemini: GRATUITO (consigliato per iniziare)
- OpenAI GPT-3.5: ~€0.001/messaggio
- OpenAI GPT-4: ~€0.01/messaggio
- Groq: gratuito con limiti

### 2. Altre Funzionalità Future
- [ ] Cluster marker per zoom bassi (performance con molti marker)
- [ ] Notifiche push prossimità
- [ ] Sistema preferiti persistente (richiede login utente)
- [ ] Self-hosted LibreTranslate (evitare rate limit)
- [ ] Immagini attività (storage cloud)
- [ ] PWA completa con offline support
- [x] ~~Navigazione turn-by-turn~~ → **FATTO** (apre Google Maps/Apple Maps)

---

## Sessione 3 Giugno 2026 (sera) - Security + Ricerca Località

### Security Hardening

| # | Vulnerabilita | Rischio | Stato | Fix |
|---|--------------|---------|-------|-----|
| 1 | NoSQL Injection via parametro `q` | HIGH | RISOLTO | Sanitizzazione input con `re.escape()` |
| 2 | Nessuna policy password | HIGH | RISOLTO | Min 8 char, 1 maiuscola, 1 minuscola, 1 numero |
| 3 | Security headers mancanti | HIGH | RISOLTO | Middleware con X-Frame-Options, CSP, HSTS |
| 4 | No rate limiting su endpoint pubblici | MEDIUM | RISOLTO | Rate limiting su tutti gli endpoint |
| 5 | Credenziali in file pubblico | MEDIUM | RISOLTO | Rimosse da DEVELOPMENT_LOG.md |
| 6 | Password admin default | MEDIUM | RISOLTO | Configurata su Railway come variabile ambiente |

### Security Headers Aggiunti

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains (solo HTTPS)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(self), microphone=(), camera=()
```

### Nuova Logica Ricerca e Raggio 20km

1. **Raggio 20km** - Mostra TUTTI i business entro 20km dalla posizione
2. **Ricerca località** - Quando cerchi una città (es. "Reggio Calabria"), i marker mostrano i business entro 20km da quella città
3. **Priorità coordinate**:
   - Se cerchi una località → usa coordinate della località cercata
   - Se non cerchi → usa geolocalizzazione utente
   - Se nessuna posizione → mostra tutto senza filtro distanza

### Variabili Ambiente Railway

| Nome | Descrizione |
|------|-------------|
| `MONGO_URL` | Connection string MongoDB Atlas |
| `DB_NAME` | Nome database (`prolocoportale`) |
| `JWT_SECRET` | Secret per token JWT |
| `CORS_ORIGINS` | Domini autorizzati per CORS |
| `ADMIN_EMAIL` | Email superadmin |
| `ADMIN_PASSWORD` | Password superadmin (cambiata da default) |

### Cloudflare Web Analytics (Attivo)

Analytics gratuito senza cookie, no banner GDPR richiesto.

- **Configurazione**: Script aggiunto in `public/index.html`
- **Token**: `a283742a83d346fea69b351443892f5e`
- **Dashboard**: Cloudflare → Analytics → Web Analytics
- **Dati disponibili**: Visite, visitatori unici, paesi, pagine, dispositivi

### Raccomandazioni Residue

1. **Ruotare JWT_SECRET** - Impostare un secret forte e persistente su Railway
2. **Backup MongoDB** - Configurare backup automatici su MongoDB Atlas
3. **Monitoraggio** - Configurare alerting per tentativi di accesso anomali
4. **WAF** - Considerare Cloudflare WAF per protezione aggiuntiva

---

## Sessione 3 Giugno 2026 (notte) - Landing Page Personalizzate Pro Loco

### Nuova Funzionalità: Landing Page per ogni Pro Loco

Ogni Pro Loco ha ora una **pagina di benvenuto personalizzata** con la propria immagine di copertina. Questo permette alle Pro Loco di condividere un link dedicato ai turisti invece del link generico.

### Come Funziona

| Pro Loco | Link Turisti | Cosa Vede il Turista |
|----------|--------------|---------------------|
| Soverato | `/p/soverato` | Immagine copertina Soverato |
| Catanzaro | `/p/catanzaro` | Immagine copertina Catanzaro |
| Tropea | `/p/tropea` | Immagine copertina Tropea |

### Flusso Utente

1. **Superadmin** crea Pro Loco → viene generato automaticamente uno **slug** dal nome
2. **Pro Loco** accede con PIN → vede il proprio **link turisti** nella dashboard
3. **Pro Loco** clicca "Branding" → carica **immagine di copertina** dal PC
4. **Turista** apre link `/p/nome-proloco` → vede immagine personalizzata
5. **Turista** clicca "Esplora la Mappa" → mappa centrata sulla Pro Loco
6. **Turista** aggiorna pagina → **rimane centrata** (parametro URL `?proloco=slug`)

### Modifiche Backend

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/proloco/by-slug/{slug}` | GET | Ottiene dati Pro Loco per landing page |
| `/api/proloco/upload-image` | POST | Carica immagine copertina (max 2MB) |
| `/api/images/{image_id}` | GET | Serve immagine da MongoDB |

### Nuovi Campi Pro Loco

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `slug` | string | URL-friendly identifier (auto-generato dal nome) |
| `cover_image_url` | string | URL immagine copertina |

### Nuova Collezione MongoDB

**Collezione `images`**:
```javascript
{
  image_id: "img_xxxxxxxxxxxx",
  proloco_id: "prl_xxxxxxxxxx",
  image_type: "cover",
  content_type: "image/jpeg",
  data: "base64...",  // Immagine codificata
  filename: "copertina.jpg",
  size: 123456,
  created_at: "2026-06-03T..."
}
```

### Nuove Pagine Frontend

| Pagina | Route | Descrizione |
|--------|-------|-------------|
| `ProlocoLandingPage.jsx` | `/p/:slug` | Landing personalizzata per turisti |

### Modifiche Dashboard Pro Loco

- **Link turisti** visibile nell'header con pulsanti copia/apri
- **Pulsante "Branding"** per caricare immagine di copertina
- **Modal upload** con anteprima immagine caricata

### Modifiche Dashboard Superadmin

- **Colonna "Link Turisti"** nella tabella Pro Loco
- **Link mostrato nel modal** dopo creazione nuova Pro Loco
- **Pulsanti copia/apri** per ogni link

### Migrazione Automatica

All'avvio del backend, le Pro Loco esistenti senza slug ricevono automaticamente:
- `slug` generato dal nome (es. "Pro Loco Soverato" → "soverato")
- `cover_image_url` vuoto (useranno immagine default)

### Limiti Upload Immagini

| Parametro | Valore |
|-----------|--------|
| Dimensione massima | 2MB |
| Formati accettati | JPG, PNG, WebP, GIF |
| Storage | MongoDB (base64) |
| Cache | 1 anno (Cache-Control header) |

### URL Persistente dopo Refresh

Quando il turista arriva da una landing Pro Loco:
- URL diventa `/?proloco=soverato`
- Il parametro persiste dopo refresh
- La mappa rimane centrata sulla Pro Loco

---

## Repository GitHub

| Repository | URL |
|------------|-----|
| **Frontend** | https://github.com/silvestrobruzzese-ui/prolocoportale-frontend |
| **Backend** | https://github.com/silvestrobruzzese-ui/prolocoportale-backend |

---

---

## Sessione 5 Giugno 2026 - Sentieri e Cammini + Mobile UX

### Nuova Categoria: Sentieri e Cammini

Aggiunta una nuova categoria dedicata ai percorsi escursionistici della Calabria, con supporto completo per tracciati GPS e navigazione in tempo reale.

#### Tipi di Percorsi

| Tipo | Descrizione | Esempio |
|------|-------------|---------|
| **Cammino** | Percorso multi-tappa (pellegrinaggio/trekking) | Cammino di San Francesco di Paola |
| **Sentiero** | Percorso singolo (escursione giornaliera) | Anelli sull'Alaco |

#### Struttura Dati Sentieri

```javascript
{
  category: "Sentieri e Cammini",
  trail_type: "cammino" | "sentiero",
  cammino_name: "Nome del cammino",      // Solo per tappe di cammini
  tappa_number: "1",                      // Numero tappa
  tappa_type: "tappa" | "variante",       // Tipo tappa
  difficulty: "facile" | "medio" | "difficile",
  distance: "12.5 km",
  duration: "4 ore",
  elevation_gain: 450,                    // Dislivello positivo in metri
  is_loop: true,                          // Percorso ad anello
  geojson_data: {                         // Tracciato GPS
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [[lng, lat, ele], ...]
    }
  }
}
```

### CamminoSelector - Menu a Due Livelli

Nuovo componente per selezionare cammini e sentieri con menu a tendina organizzato.

#### Struttura Menu

```
├── Tutti (mostra tutti i percorsi)
├── Cammini ▼
│   ├── San Francesco di Paola (15 tappe)
│   ├── Magna Graecia (8 tappe)
│   └── ...
└── Sentieri ▼
    ├── Tutti i sentieri
    ├── Anelli sull'Alaco
    ├── Archiforo
    └── ...
```

#### Caratteristiche
- [x] Menu collassabile per mobile
- [x] Scroll touch-friendly nelle liste
- [x] Selezione singola o tutti
- [x] Indicatore percorso selezionato
- [x] Pulsante X per deselezionare

### TrailFollower - Navigazione Sentieri in Tempo Reale

Nuovo componente full-screen per seguire un sentiero con GPS.

#### Funzionalità
- [x] **Mappa interattiva** con tracciato GPS evidenziato
- [x] **Posizione utente** in tempo reale con freccia direzione
- [x] **Marker Partenza/Arrivo** (P verde, A rosso)
- [x] **Distanza alla partenza** calcolata in tempo reale
- [x] **Auto-follow** che segue la posizione (disattivabile)
- [x] **Zoom/Pan** libero quando auto-follow disattivato
- [x] **Pulsante "Centra su di me"** per riattivare auto-follow
- [x] **Avviso sicurezza** obbligatorio prima dell'uso

#### Modal Avviso Sicurezza
```
⚠️ Avviso Importante

Questa funzione è solo indicativa. Per escursioni in montagna:
• Scarica il file GPX e usa un'app offline (Wikiloc, Komoot, OruxMaps)
• Porta una mappa cartacea di backup
• Controlla le previsioni meteo
• Informa qualcuno del tuo percorso
• Porta batteria di riserva per il telefono

⚠️ In aree senza segnale, questa app non funzionerà!

[Scarica GPX]  [Ho capito, continua]
```

### GPX Export

Nuova funzionalità per scaricare tracciati GPS in formato GPX.

#### File: `src/lib/gpxExport.js`

| Funzione | Descrizione |
|----------|-------------|
| `geojsonToGpx()` | Converte GeoJSON in formato GPX |
| `downloadGpx()` | Scarica file GPX (con Web Share API su mobile) |
| `calculateTrackStats()` | Calcola distanza, dislivello, quota min/max |

#### Formato GPX Generato
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="ProlocoPortale - Sentieri e Cammini">
  <metadata>
    <name>Nome Sentiero</name>
    <desc>Descrizione</desc>
    <author><name>ProlocoPortale</name></author>
  </metadata>
  <trk>
    <trkseg>
      <trkpt lat="38.9" lon="16.6"><ele>450</ele></trkpt>
      ...
    </trkseg>
  </trk>
</gpx>
```

### Modifiche BusinessDetail per Sentieri

La scheda dettaglio mostra informazioni specifiche per i sentieri:

#### Pannello Info Sentiero
- Difficoltà con icona montagna
- Distanza con icona percorso
- Durata con icona timer
- Dislivello con icona trend
- Indicatore "Percorso ad anello"
- Badge "Tracciato GPS disponibile"

#### Lista Tappe Cammino
- Pulsante "Vedi tutte le X tappe"
- Lista scrollabile delle tappe
- Navigazione tra tappe dello stesso cammino

#### Pulsanti Azione Sentieri
```
[🧭 Naviga]  [❤️ Preferiti]
[⬇️ Scarica GPX]  [🧭 Segui Sentiero]
```

#### Sezione Sconto Nascosta
Per la categoria "Sentieri e Cammini" la sezione sconto/prossimità è nascosta perché non applicabile ai percorsi naturali.

### Miglioramenti Mobile Touch

Risolti problemi di touch su iOS Safari:

#### Problemi Risolti
- [x] Pulsanti non cliccabili su iPhone
- [x] Modal bloccato su touch
- [x] Scroll liste dropdown non funzionante
- [x] Navigazione apriva nuova scheda

#### Soluzioni Implementate

| Problema | Soluzione |
|----------|-----------|
| Touch non rilevato | `onTouchEnd` + `onClick` handlers |
| Ritardo 300ms iOS | `touchAction: "manipulation"` |
| Eventi bloccati | `e.preventDefault()` + `e.stopPropagation()` |
| Overlay blocca click | `pointerEvents: "auto"` esplicito |
| Nuova scheda navigatore | `window.location.href` invece di `window.open` |
| Scroll dropdown | `overflow-y-auto` + `WebkitOverflowScrolling: "touch"` |
| Auto-follow bloccante | Detect drag/zoom per disattivare follow |

### Nuovi File Creati

| File | Descrizione |
|------|-------------|
| `src/components/TrailFollower.jsx` | Componente navigazione sentieri |
| `src/components/CamminoSelector.jsx` | Selettore cammini/sentieri |
| `src/lib/gpxExport.js` | Funzioni export GPX |

### File Modificati

| File | Modifiche |
|------|-----------|
| `BusinessDetail.jsx` | Pannello info sentiero, pulsanti GPX/Follow, nasconde sconto |
| `HomePage.jsx` | Integrazione CamminoSelector, navigazione senza nuova scheda |
| `MapView.jsx` | Visualizzazione tracciato GPS sulla mappa |

### Script Backend

| File | Descrizione |
|------|-------------|
| `fix_sentieri_tracks.py` | Associa manualmente tracciati GPS ai sentieri |

### Categorie Aggiornate (16 totali)

| Categoria | Colore | Icona |
|-----------|--------|-------|
| **Sentieri e Cammini** | Gradiente Arancio→Blu | 🥾 |
| ... (altre 15 categorie invariate) |

---

## Struttura Completa del Portale

### Architettura Frontend

```
src/
├── components/
│   ├── ui/                    # Componenti shadcn/ui
│   ├── MapView.jsx            # Mappa Leaflet principale
│   ├── CategoryFilters.jsx    # Barra categorie orizzontale
│   ├── BusinessDetail.jsx     # Scheda dettaglio attività
│   ├── CamminoSelector.jsx    # Selettore cammini/sentieri
│   ├── TrailFollower.jsx      # Navigazione sentieri GPS
│   ├── AuthModal.jsx          # Login/Registrazione utenti
│   ├── LanguageSwitcher.jsx   # Cambio lingua (5 lingue)
│   └── InstallBanner.jsx      # Banner installazione PWA
├── pages/
│   ├── HomePage.jsx           # Mappa turista (pagina principale)
│   ├── ProlocoLandingPage.jsx # Landing personalizzata Pro Loco
│   ├── AdminLogin.jsx         # Login Superadmin
│   ├── AdminDashboard.jsx     # Dashboard Superadmin
│   ├── PrologoLogin.jsx       # Login Pro Loco (PIN)
│   └── PrologoDashboard.jsx   # Dashboard Pro Loco
├── lib/
│   ├── api.js                 # Configurazione Axios
│   ├── auth.jsx               # Context autenticazione
│   ├── i18n.jsx               # Traduzioni UI (IT/EN/FR/DE/ES)
│   ├── translate.js           # LibreTranslate API
│   ├── useGeolocation.js      # Hook geolocalizzazione
│   ├── routing.js             # Calcolo percorsi OSRM
│   └── gpxExport.js           # Export tracciati GPX
└── index.css                  # Tema Pop/Vibrant + animazioni
```

### Flusso Utente Turista

```
1. Apertura App
   ├── Da link generico → Schermata benvenuto default
   └── Da link Pro Loco (/p/slug) → Landing personalizzata

2. Mappa Principale
   ├── Visualizza marker (100 più vicini)
   ├── Filtra per categoria
   ├── Cerca per nome/località
   └── Seleziona Cammini/Sentieri

3. Dettaglio Attività
   ├── Info base (nome, indirizzo, orari)
   ├── Sconto prossimità (se applicabile)
   ├── Pulsante Naviga → Apre Maps nativo
   └── Pulsante Preferiti → Richiede login

4. Dettaglio Sentiero
   ├── Info percorso (difficoltà, distanza, dislivello)
   ├── Lista tappe (per cammini)
   ├── Scarica GPX → Salva file
   └── Segui Sentiero → TrailFollower

5. TrailFollower
   ├── Avviso sicurezza (obbligatorio)
   ├── Mappa con tracciato + posizione
   ├── Auto-follow o navigazione libera
   └── Chiudi → Torna a dettaglio
```

### API Backend Principali

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/businesses` | GET | Lista attività (filtri: category, lat, lng, limit) |
| `/api/businesses/{id}` | GET | Dettaglio singola attività |
| `/api/proloco/by-slug/{slug}` | GET | Dati Pro Loco per landing |
| `/api/auth/login` | POST | Login utente |
| `/api/auth/register` | POST | Registrazione utente |
| `/api/favorites` | GET/POST/DELETE | Gestione preferiti |

### Collezioni MongoDB

| Collezione | Record | Descrizione |
|------------|--------|-------------|
| `businesses` | ~18.500+ | Attività, monumenti, sentieri |
| `prolocos` | 120 | Pro Loco con slug e immagini |
| `users` | - | Utenti e superadmin |
| `images` | - | Immagini copertina Pro Loco |

---

---

## Sessione 11 Giugno 2026 - Bandiera Blu e Bandiera Verde

### Nuove Categorie Aggiunte

Aggiunte due nuove categorie per le spiagge premiate in Calabria:

| Categoria | Descrizione | Record | Colore |
|-----------|-------------|--------|--------|
| **Bandiera Blu** | Spiagge con certificazione FEE | 28 | #0077B6 (Blu oceano) |
| **Bandiera Verde** | Spiagge raccomandate dai pediatri | 22 | #2E7D32 (Verde) |

### File Modificati

| File | Modifiche |
|------|-----------|
| `frontend/src/components/CategoryFilters.jsx` | Aggiunte categorie con `isImage: true` |
| `frontend/src/components/MapView.jsx` | Aggiunto `categoryLogos` map per gestire loghi |
| `frontend/public/bandiera-blu-logo.jpg` | Logo Bandiera Blu |
| `frontend/public/bandiera-verde-logo.jpg` | Logo Bandiera Verde |

### File Backend Creati

| File | Descrizione |
|------|-------------|
| `backend/import_bandiere.py` | Script importazione dati Bandiere |
| `database/bandiera blu/bandiera_blu_calabria.csv` | 28 spiagge Bandiera Blu |
| `database/bandiera verde/bandiera_verde_calabria.csv` | 22 spiagge Bandiera Verde |

### Esecuzione Import Produzione

Per importare in produzione (MongoDB Atlas), impostare la variabile `MONGO_URL` nel file `.env` con la connection string di Atlas, poi eseguire:

```bash
cd backend
source venv/bin/activate
python import_bandiere.py
```

### Posizione Categorie

Le nuove categorie sono posizionate **dopo Spiagge** nella barra filtri:
```
... → Spiagge → Bandiera Blu → Bandiera Verde → Archeologia → ...
```

---

---

## Sessione 11 Giugno 2026 (pomeriggio) - Banner Sponsor

### Nuova Funzionalità: Carousel Sponsor

Aggiunto un banner scorrevole in basso per mostrare i loghi degli sponsor.

#### Caratteristiche
- **Posizione**: Centro-basso della schermata, sopra la barra browser
- **Stile**: Ovale con effetto glass (blur)
- **Rotazione**: Ogni logo visibile per 3 secondi
- **Loop infinito**: I loghi si ripetono continuamente
- **Fade transition**: Transizione fluida tra i loghi
- **Indicatori**: Pallini per mostrare lo sponsor corrente
- **Click**: Apre il sito dello sponsor in una nuova scheda

#### Come Aggiungere Sponsor

1. Aggiungi il logo nella cartella `public/sponsor/`
2. Modifica `public/sponsor/sponsors.json`:

```json
[
  {
    "id": "sponsor1",
    "logo": "/sponsor/logo-sponsor1.png",
    "name": "Nome Sponsor",
    "url": "https://sitosponsor.it",
    "showName": false
  },
  {
    "id": "sponsor2",
    "logo": "/sponsor/logo-sponsor2.png",
    "name": "Altro Sponsor",
    "url": "https://altrosponsor.it",
    "showName": false
  }
]
```

#### Campi JSON Sponsor

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | string | Identificativo univoco |
| `logo` | string | Percorso logo (da public/) |
| `name` | string | Nome sponsor |
| `url` | string | Sito web (opzionale) |
| `showName` | boolean | Mostra nome accanto al logo |

#### File Creati

| File | Descrizione |
|------|-------------|
| `src/components/SponsorBanner.jsx` | Componente carousel sponsor |
| `public/sponsor/sponsors.json` | Configurazione sponsor |
| `public/sponsor/` | Cartella per i loghi |

---

*Ultimo aggiornamento: 11 Giugno 2026*
*Stato: PRODUZIONE ONLINE - Cloudflare Pages + Railway + MongoDB Atlas*
*Security: HARDENING COMPLETATO*
*Analytics: CLOUDFLARE WEB ANALYTICS ATTIVO*
*Landing Page: PERSONALIZZATE PER OGNI PRO LOCO*
*Sentieri e Cammini: FUNZIONALITÀ COMPLETA CON GPS*
*Bandiere Blu/Verde: 50 SPIAGGE CERTIFICATE*
