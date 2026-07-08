# Mappix - Log di Sviluppo

## Panoramica Progetto
**Mappix** (precedentemente ProlocoPortale) è un'applicazione web per l'economia di prossimità in Calabria. Permette ai turisti di esplorare attività commerciali, monumenti, spiagge e servizi sulla mappa, con sconti basati sulla prossimità geografica.

---

## STATO ATTUALE: PRODUZIONE ONLINE

**Ultimo aggiornamento: 1 Luglio 2026 - ore 22:00**

L'applicazione è completamente funzionante online su dispositivi mobili e desktop.

**Dominio principale**: https://mappix.it

---

## Infrastruttura di Produzione

### Server e Servizi

| Servizio | Piattaforma | URL |
|----------|-------------|-----|
| **Frontend** | Cloudflare Pages | https://mappix.it (alias: prolocoportale-frontend.pages.dev) |
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
  - `images` - immagini caricate (riferimenti S3)

---

## Struttura Cartelle Progetto

### Frontend (`/frontend/`)

```
frontend/
├── public/
│   ├── sponsor/              # Logo sponsor
│   ├── welcome-hero.png      # Immagine benvenuto
│   ├── bcc-logo.png          # Logo Bancomat
│   ├── bandiera-blu-logo.jpg
│   └── bandiera-verde-logo.jpg
├── src/
│   ├── components/
│   │   ├── ui/               # Componenti shadcn/ui (30+ file)
│   │   ├── MapView.jsx       # Mappa Leaflet con marker
│   │   ├── BusinessDetail.jsx # Pannello dettaglio attività
│   │   ├── CategoryFilters.jsx # Filtri categoria orizzontali
│   │   ├── CamminoSelector.jsx # Selettore cammini/sentieri
│   │   ├── LanguageSwitcher.jsx # Cambio lingua
│   │   ├── SponsorBanner.jsx  # Banner sponsor
│   │   ├── TrailFollower.jsx  # Navigatore sentieri GPS
│   │   ├── AuthModal.jsx      # Login/registrazione
│   │   └── InstallBanner.jsx  # Prompt PWA
│   ├── pages/
│   │   ├── HomePage.jsx       # Pagina principale mappa
│   │   ├── AdminDashboard.jsx # Dashboard superadmin
│   │   ├── PrologoDashboard.jsx # Dashboard Pro Loco
│   │   ├── ProlocoLandingPage.jsx # Landing Pro Loco
│   │   ├── AdminLogin.jsx
│   │   └── PrologoLogin.jsx
│   ├── lib/
│   │   ├── api.js            # Client API Axios
│   │   ├── auth.jsx          # Context autenticazione
│   │   ├── i18n.jsx          # Internazionalizzazione (5 lingue)
│   │   ├── useGeolocation.js # Hook geolocalizzazione
│   │   ├── routing.js        # Calcolo percorsi
│   │   ├── gpxExport.js      # Export GPX
│   │   └── translate.js      # Traduzione dinamica
│   ├── App.js                # Root + routing
│   └── index.css             # Stili globali + Tailwind
├── package.json
├── craco.config.js
└── tailwind.config.js
```

### Backend (`/backend/`)

```
backend/
├── server.py                 # API FastAPI (1159 righe, 50+ endpoint)
├── requirements.txt          # Dipendenze Python
├── Procfile                  # Config Railway
├── .env                      # Variabili ambiente
├── .python-version           # Versione Python (3.11.9)
├── mise.toml                 # Config mise
├── import_sentieri_cammini.py # Import sentieri
├── import_bandiere.py        # Import Bandiera Blu/Verde
├── import_bancomat.py        # Import Bancomat
├── import_new_categories.py  # Import categorie
├── generate_cammini_routes.py # Generazione percorsi
└── fix_sentieri_tracks.py    # Fix dati
```

### Database (`/database/`)

```
database/
├── sentieri e cammini/       # File GPX tracce
├── bandiera blu/             # Dati spiagge certificate
├── bandiera verde/           # Dati spiagge pediatriche
├── businesses.csv            # Export attività
└── prolocos.csv              # Export Pro Loco
```

---

## Flusso Funzionamento App

### 1. Flusso Utente (HomePage)

```
┌─────────────────────────────────────────────────────────┐
│                    UTENTE APRE APP                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              SCHERMATA BENVENUTO                         │
│         (welcome-hero.png + pulsante "Esplora")         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              RICHIESTA GEOLOCALIZZAZIONE                 │
│          (opzionale - può saltare)                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    MAPPA INTERATTIVA                     │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Barra ricerca + Lingua              [🔍] [🌐]  │    │
│  ├─────────────────────────────────────────────────┤    │
│  │  [🍽][🍕][🏨][B&B][🥾][🏛]... Categorie         │    │
│  ├─────────────────────────────────────────────────┤    │
│  │                                                  │    │
│  │              MAPPA LEAFLET                       │    │
│  │         (marker colorati per categoria)          │    │
│  │                 📍 📍 📍                         │    │
│  │                                                  │    │
│  ├─────────────────────────────────────────────────┤    │
│  │  [Sponsor]                      [⊕][🎯]         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                           │
            Utente clicca su categoria
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              API: GET /api/businesses                    │
│         ?category=Restaurant&lat=38.9&lng=16.6          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│            MARKER APPAIONO SULLA MAPPA                   │
│         (max 100 più vicini per performance)            │
└─────────────────────────────────────────────────────────┘
                           │
            Utente clicca su marker
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              PANNELLO DETTAGLIO ATTIVITÀ                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Nome Attività                          [❤️][✕]  │    │
│  │  📍 Indirizzo, Città                            │    │
│  │  📞 Telefono  🌐 Sito web                       │    │
│  │  🕐 Orari apertura                              │    │
│  │  ────────────────────────────────────────────   │    │
│  │  🎁 PROMOZIONE: Sconto Turista 10%              │    │
│  │  ────────────────────────────────────────────   │    │
│  │  Descrizione attività...                        │    │
│  │                                                  │    │
│  │  [🧭 NAVIGA]                                    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                           │
            Utente clicca "Naviga"
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         APRE APP NAVIGAZIONE ESTERNA                     │
│    (Google Maps su Android / Apple Maps su iOS)         │
└─────────────────────────────────────────────────────────┘
```

### 2. Flusso Admin (Superadmin)

```
Admin Login (/admin/login)
        │
        ▼
Dashboard Admin (/admin)
        │
        ├── Tab "Pro Loco" ──► CRUD Pro Loco (create, edit, delete)
        │                      Rigenera PIN
        │                      Assegna territorio
        │
        ├── Tab "Attività" ──► CRUD tutte le attività
        │                      Import bulk (XLSX/CSV)
        │                      Filtri per Pro Loco
        │
        └── Tab "Utenti" ───► Gestione utenti
```

### 3. Flusso Pro Loco Manager

```
Pro Loco Login (/proloco/login)
        │ (autenticazione con PIN)
        ▼
Dashboard Pro Loco (/proloco)
        │
        ├── Mappa territorio ──► Visualizza confini assegnati
        │
        ├── Attività ──────────► CRUD attività nel territorio
        │                        Import bulk
        │
        └── Branding ──────────► Logo, colori, descrizione
```

---

## API Endpoints Principali

### Autenticazione
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrazione utente |
| POST | `/api/auth/login` | Login utente |
| POST | `/api/admin/login` | Login superadmin |
| POST | `/api/proloco/login` | Login Pro Loco (PIN) |

### Attività (Businesses)
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/businesses` | Lista attività (filtri: category, lat, lng, q, limit) |
| GET | `/api/businesses/{id}` | Dettaglio singola attività |
| GET | `/api/businesses/categories` | Lista categorie disponibili |

### Admin
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/admin/prolocos` | Lista tutte le Pro Loco |
| POST | `/api/admin/prolocos` | Crea Pro Loco |
| PATCH | `/api/admin/prolocos/{id}` | Modifica Pro Loco |
| DELETE | `/api/admin/prolocos/{id}` | Elimina Pro Loco |
| POST | `/api/admin/import` | Import bulk attività |

### Pro Loco
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/proloco/me` | Info Pro Loco corrente |
| GET | `/api/proloco/businesses` | Attività del territorio |
| POST | `/api/proloco/businesses` | Crea attività |
| PATCH | `/api/proloco/branding` | Aggiorna branding |

### Preferiti
| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/favorites` | Lista preferiti utente |
| POST | `/api/favorites` | Aggiungi preferito |
| DELETE | `/api/favorites/{id}` | Rimuovi preferito |

---

## Categorie Disponibili (19 totali) - Colori Pop

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
CORS_ORIGINS=https://mappix.it,https://www.mappix.it,http://localhost:3000,https://prolocoportale-frontend.pages.dev
```
**Nota**: Il dominio Netlify (`prolocoportale.netlify.app`) è stato rimosso dopo l'eliminazione del progetto Netlify (2 Luglio 2026).

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
- **Mappa Turista**: https://mappix.it
- **Superadmin**: https://mappix.it/admin/login
  - Email: `admin@prolocoportale.it`
  - Password: (configurata su Railway come variabile `ADMIN_PASSWORD`)
- **Pro Loco Soverato**: https://mappix.it/proloco/login
  - PIN: `UW5W4CUD`
- **Landing Pro Loco**: https://mappix.it/p/{slug}
- **Landing Città/Paese**: https://mappix.it/c/{slug}

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

#### Dimensioni Banner

| Elemento | Dimensioni |
|----------|------------|
| **Banner** | 280-360px × 70px |
| **Loghi** | 65px altezza, auto larghezza |
| **Padding** | px-2 (minimo per massimizzare spazio logo) |

#### Sponsor Attivi

| Sponsor | Logo |
|---------|------|
| BCC Banca | `bcc-banca.png` |
| MB Consulting | `mb-consulting.png` |
| Pro Loco Soverato | `proloco-soverato.png` |
| Mirò | `miro.png` |

#### Visibilità Banner

Il banner sponsor si nasconde automaticamente quando:
- Si apre una scheda dettaglio (attività/sentiero/cammino)
- Si apre il modal di login
- È visibile la schermata di benvenuto
- È visibile il prompt di localizzazione

#### Cartella Sponsor Sorgente

I loghi originali vanno caricati in:
```
/Users/gianni/Desktop/ProlocoPortale-main/sponsor/
```
Da lì vengono copiati in `frontend/public/sponsor/` e aggiunti a `sponsors.json`.

---

## Sessione 11 Giugno 2026 (sera) - Fix TrailFollower

### Problema Risolto

Il pulsante X per chiudere il navigatore sentieri (TrailFollower) non funzionava su dispositivi mobile iOS.

### Causa

La mappa Leaflet catturava gli eventi touch, impedendo al pulsante di ricevere il click.

### Soluzione

| Modifica | Descrizione |
|----------|-------------|
| `pointerEvents: "none"` | Applicato al container header |
| `pointerEvents: "auto"` | Applicato ai pulsanti interattivi |
| `onTouchStart` | Aggiunto con `stopPropagation()` |
| `e.stopPropagation()` | Aggiunto a tutti gli handler |
| Stile pulsante | Aumentato contrasto (`bg-white/30`) e dimensione icona |

### File Modificato

| File | Modifica |
|------|----------|
| `src/components/TrailFollower.jsx` | Fix gestione touch su iOS |

---

## Sessione 11 Giugno 2026 (notte) - Riorganizzazione Layout UI

### Modifiche Richieste

Riorganizzazione degli elementi UI sulla mappa per una migliore esperienza utente.

### Modifiche Implementate

| Elemento | Modifica |
|----------|----------|
| **Controlli zoom (+/-)** | Rimossi dalla mappa |
| **Barra ricerca** | Spostata più in alto |
| **Tasto lingue** | Spostato più in alto |
| **Icone categorie** | Spostate in alto a sinistra (dove c'erano i tasti zoom) |
| **Menu lingue dropdown** | Z-index aumentato per apparire in primo piano |
| **Banner sponsor** | Spostato a sinistra, stessa altezza del mirino |
| **Bordo banner sponsor** | Sfumato con effetto glow (non più bordo netto) |
| **Banner sponsor trasparenza** | Semitrasparente al 15% |
| **Puntini indicatore sponsor** | Rimossi |

### File Modificati

| File | Modifica |
|------|----------|
| `src/components/MapView.jsx` | Aggiunto `zoomControl={false}` |
| `src/pages/HomePage.jsx` | Riposizionati elementi UI |
| `src/components/LanguageSwitcher.jsx` | Aggiunto `z-[1100]` al dropdown |
| `src/components/SponsorBanner.jsx` | Spostato a sinistra, bordo sfumato |

### Fix Backend Railway

Durante la sessione, risolto anche un problema di deploy su Railway:

| Problema | Soluzione |
|----------|-----------|
| Python 3.13.14 non esistente | Creato `.python-version` con `3.11.9` |
| Attestazioni GitHub mancanti | Creato `mise.toml` con `python.github_attestations = false` |

---

## Categorie Totali: 19

| # | Categoria | Colore | Icona |
|---|-----------|--------|-------|
| 1 | Restaurant | #E63946 | 🍽 |
| 2 | Pizzerie | #FF6B35 | 🍕 |
| 3 | Hotel | #FBBF24 | 🏨 |
| 4 | B&B | #22C55E | B&B |
| 5 | Sentieri e Cammini | Gradiente | SVG Hiker |
| 6 | Beni Culturali | #8B5CF6 | SVG Column |
| 7 | Itinerari | #10B981 | 🥾 |
| 8 | Monumenti | #A855F7 | ⛪ |
| 9 | Musei | #EC4899 | 🏛 |
| 10 | Spiagge | #06B6D4 | 🏖 |
| 11 | **Bandiera Blu** | #0077B6 | Logo |
| 12 | **Bandiera Verde** | #2E7D32 | Logo |
| 13 | Archeologia | #F59E0B | 🏺 |
| 14 | Discoteche | #D946EF | 🎵 |
| 15 | Supermercati | #3B82F6 | 🛒 |
| 16 | Shop | #14B8A6 | 🛍 |
| 17 | Pharmacy | #22C55E | 💊 |
| 18 | Bancomat | #00843D | Logo BCC |
| 19 | Other | #6366F1 | 📍 |

---

## Sessione 12 Giugno 2026

### Fix Autenticazione Token Conflittuali
Risolto bug dove il token di un ruolo (utente/admin/proloco) interferiva con gli altri:
- Login admin ora pulisce token utente e proloco
- Login proloco ora pulisce token utente e admin
- Login utente ora pulisce token admin e proloco

**File modificati**: `AdminLogin.jsx`, `PrologoLogin.jsx`, `auth.jsx`

### Fix Geocoding per Piccoli Comuni
Migliorato il geocoding con fallback progressivi per trovare indirizzi in piccoli comuni calabresi:
1. Indirizzo completo + CAP + città
2. Indirizzo + città (senza CAP)
3. Solo CAP + città
4. Solo città + regione

**File modificati**: `PrologoDashboard.jsx`, `AdminDashboard.jsx`

### Fix Cache API
Aggiunto header `Cache-Control: no-store` alle risposte API per garantire dati sempre freschi.

**File modificati**: `server.py` (backend)

### Rimosso Limite Territorio Pro Loco
Il controllo del territorio di 5km era troppo restrittivo per comuni con zone mare/montagna. Ora le Pro Loco possono posizionare attività ovunque.

**File modificati**: `server.py` (backend)

### Allineamento Marker Dashboard/Mappa Turista
I marker nel dashboard Pro Loco ora usano gli stessi colori e icone della mappa turistica:
- B&B mostra "B&B" (non più emoji letto)
- Supporto logo per Bancomat, Bandiera Blu/Verde
- Stessi colori per tutte le categorie

**File modificati**: `PrologoDashboard.jsx`

### Avviso Verifica Posizione
Aggiunto avviso nel form di creazione attività per ricordare alle Pro Loco di verificare e correggere la posizione sulla mappa dopo il salvataggio.

**File modificati**: `PrologoDashboard.jsx`

---

## Sessione 14 Giugno 2026 - Sea Park (Parchi Marini)

### Nuova Categoria: Sea Park

Aggiunta la categoria **Sea Park** per i Parchi Marini Regionali della Calabria.

#### Parchi Marini Inclusi (6 totali - 17.390 ettari)

| Parco Marino | Estensione | Sede |
|--------------|------------|------|
| Riviera dei Cedri | 877.4 ha | Praia a Mare |
| Fondali Capocozzo-S.Irene-Vibo Marina-Tropea | 3,706 ha | Belmonte Calabro |
| Scogli di Isca | 69.97 ha | Brancaleone |
| Costa dei Gelsomini | 615.86 ha | Bivona (VV) |
| Baia di Soverato | 77.3 ha | Soverato |
| Secca di Amendolara | 12,044 ha | Amendolara |

#### File Creati

| File | Descrizione |
|------|-------------|
| `database/sea parks/sea_parks_calabria.csv` | Dati 6 parchi marini |
| `backend/import_sea_parks.py` | Script importazione MongoDB |
| `frontend/public/sea-park-logo.png` | Logo ufficiale Parchi Marini |

#### File Modificati

| File | Modifica |
|------|----------|
| `CategoryFilters.jsx` | Aggiunta categoria Sea Park con logo |
| `MapView.jsx` | Aggiunto colore e logo per marker |

#### Dettagli Categoria

| Parametro | Valore |
|-----------|--------|
| Colore | #1A6B8A (Blu petrolio) |
| Icona | Logo Parchi Marini (cavalluccio, tartaruga, pesce) |
| Posizione menu | Dopo Bandiera Verde |

#### Esecuzione Import Produzione

```bash
cd /Users/gianni/Desktop/ProlocoPortale-main/backend
source venv/bin/activate
python import_sea_parks.py
```

**Nota**: Assicurarsi che `MONGO_URL` nel file `.env` punti a MongoDB Atlas per import in produzione.

---

## Sessione 18 Giugno 2026 - Bar e Pub

### Nuova Categoria: Bar e Pub

Aggiunta la categoria **Bar e Pub** unificando 3 dataset di locali calabresi.

#### Dati Importati

| Fonte | Record |
|-------|--------|
| bar_calabria_overture.csv | ~2.500 |
| pub_calabria_overture.csv | ~383 |
| birrerie_calabria_overture.csv | ~68 |
| **Totale importati** | **2.950** |

#### Dettagli Categoria

| Parametro | Valore |
|-----------|--------|
| Nome | Bar e Pub |
| Colore | #8B4513 (Marrone birra) |
| Icona | 🍺 |
| Posizione menu | Dopo Pizzerie |

#### File Creati

| File | Descrizione |
|------|-------------|
| `database/bar e pub/bar_e_pub_calabria.csv` | CSV unificato 2.952 record |
| `backend/import_bar_pub.py` | Script importazione MongoDB |

#### File Modificati

| File | Modifica |
|------|----------|
| `frontend/src/components/CategoryFilters.jsx` | Aggiunta categoria con icona 🍺 |
| `frontend/src/components/MapView.jsx` | Aggiunto colore e emoji per marker |

#### Esecuzione Import

```bash
cd /Users/gianni/Desktop/ProlocoPortale-main/backend
source venv/bin/activate
MONGO_URL="mongodb+srv://..." python import_bar_pub.py
```

#### Risultato Import

- **2.950** locali importati
- **2** duplicati saltati
- **21.315** totale business nel database

---

## Categorie Totali: 21

| # | Categoria | Colore | Icona |
|---|-----------|--------|-------|
| 1 | Restaurant | #E63946 | 🍽 |
| 2 | Pizzerie | #FF6B35 | 🍕 |
| 3 | **Bar e Pub** | #8B4513 | 🍺 |
| 4 | Hotel | #FBBF24 | 🏨 |
| 5 | B&B | #22C55E | B&B |
| 6 | Sentieri e Cammini | Gradiente | SVG Hiker |
| 7 | Beni Culturali | #8B5CF6 | SVG Column |
| 8 | Itinerari | #10B981 | 🥾 |
| 9 | Monumenti | #A855F7 | ⛪ |
| 10 | Musei | #EC4899 | 🏛 |
| 11 | Spiagge | #06B6D4 | 🏖 |
| 12 | Bandiera Blu | #0077B6 | Logo |
| 13 | Bandiera Verde | #2E7D32 | Logo |
| 14 | Sea Park | #1A6B8A | Logo |
| 15 | Archeologia | #F59E0B | 🏺 |
| 16 | Discoteche | #D946EF | 🎵 |
| 17 | Supermercati | #3B82F6 | 🛒 |
| 18 | Shop | #14B8A6 | 🛍 |
| 19 | Pharmacy | #22C55E | 💊 |
| 20 | Bancomat | #00843D | Logo BCC |
| 21 | Other | #6366F1 | 📍 |

---

### Zoom Mappa Aumentato

Aumentato lo zoom iniziale della mappa per una migliore visualizzazione dei marker.

| Parametro | Prima | Dopo |
|-----------|-------|------|
| Zoom con posizione utente | 14 | 18 |
| Zoom default MapView | 14 | 18 |
| Zoom fallback | 14 | 18 |

#### File Modificati

| File | Modifica |
|------|----------|
| `frontend/src/pages/HomePage.jsx` | `currentZoom` da 14 a 18 |
| `frontend/src/components/MapView.jsx` | Default zoom e fallback a 18 |

---

---

## Sessione 27 Giugno 2026 - Città e Paesi: Sistema Completo

### Nuova Funzionalità: Gestione Città e Paesi

Implementato un sistema completo e separato per la gestione delle **Città e Paesi**, parallelo a quello delle Pro Loco ma con link, login e landing page distinti.

#### Problema Risolto

Le Città/Paese avevano PIN generati dal SuperAdmin ma non potevano:
- Fare login (errore "Invalid PIN")
- Vedere le attività della loro città
- Caricare immagini di branding
- Avere una landing page pubblica separata

#### Soluzione Implementata

| Funzionalità | Pro Loco | Città/Paese |
|--------------|----------|-------------|
| **Landing pubblica** | `/p/{slug}` | `/c/{slug}` |
| **Login admin** | `/proloco/login` | `/citta/login` |
| **Dashboard** | `/proloco` | `/proloco` (condivisa) |
| **Colore tema** | Verde | Blu |

### Modifiche Backend

| Endpoint/Funzione | Modifica |
|-------------------|----------|
| `require_proloco()` | Accetta token `role: "proloco"` e `role: "citta_paese"` |
| `/proloco/businesses` | Cerca per `city` sia per Proloco che Città/Paese |
| `/proloco/upload-image` | Salva in collezione corretta (`prolocos` o `citta_paesi`) |
| `/proloco/branding` | Aggiorna collezione corretta |
| `/citta-paese/login` | Endpoint login dedicato (già esistente) |
| `/citta-paese/by-slug/{slug}` | Endpoint per landing page (già esistente) |

### Modifiche Frontend

| File | Modifica |
|------|----------|
| `App.js` | Aggiunte route `/c/:slug` e `/citta/login` |
| `PrologoLogin.jsx` | Prova login Proloco, poi Città/Paese se fallisce |
| `CittaPaeseLandingPage.jsx` | **NUOVO** - Landing page per Città/Paese |
| `CittaPaeseLogin.jsx` | **NUOVO** - Login con tema blu |
| `PrologoDashboard.jsx` | Mostra nome/link corretto per entrambi i tipi |
| `HomePage.jsx` | Supporta parametro `?citta=` per centrare mappa |

### Nuovi File Creati

| File | Descrizione |
|------|-------------|
| `src/pages/CittaPaeseLandingPage.jsx` | Landing page pubblica per Città/Paese |
| `src/pages/CittaPaeseLogin.jsx` | Pagina login admin per Città/Paese |

### Flusso Città/Paese

```
1. SuperAdmin crea Città/Paese → genera PIN e slug
2. Link pubblico: /c/{slug} (es. /c/soverato)
3. Link login: /citta/login
4. Comune inserisce PIN → accede a dashboard
5. Comune carica immagine branding
6. Turista apre /c/soverato → vede immagine Comune
7. Turista clicca "Esplora" → mappa centrata su città
```

### Condivisione Attività

Proloco e Città/Paese dello **stesso territorio** vedono le **stesse attività** perché entrambi cercano per nome città (`city`).

| Entità | Come cerca attività |
|--------|---------------------|
| Pro Loco Soverato | `city = "Soverato"` (usa campo `comune`) |
| Comune Soverato | `city = "Soverato"` (usa campo `nome`) |

### Database

| Collezione | Record | Descrizione |
|------------|--------|-------------|
| `prolocos` | 120 | Pro Loco con slug `/p/` |
| `citta_paesi` | 1.566 | Città e Paesi con slug `/c/` |

### Commit Effettuati

| Repository | Commit | Descrizione |
|------------|--------|-------------|
| Frontend | `3e0b252` | Login supporta PIN Proloco e Città/Paese |
| Frontend | `2817c55` | Landing page e login separato Città/Paese |
| Frontend | `e87674a` | Mappa si centra su Città/Paese |
| Backend | `edf1128` | require_proloco accetta entrambi i token |
| Backend | `b90410d` | CRUD attività cerca per nome città |
| Backend | `d3a8831` | Branding e upload per Città/Paese |

---

## Sessione 30 Giugno 2026 - Protezione Anti-Scraping

### Nuova Funzionalità: Sistema Anti-Clonazione

Implementato un sistema avanzato per proteggere i dati da scraping e tentativi di clonazione.

### Middleware Anti-Scraping

| Componente | Descrizione |
|------------|-------------|
| **AntiScrapingMiddleware** | Rileva e blocca richieste automatizzate |
| **Blocco progressivo** | 5min → 15min → 1h → 24h per violazioni ripetute |
| **Verifica browser** | Controlla user-agent e header tipici dei browser |

### User-Agent Bloccati

```
curl, wget, python-requests, python-urllib, scrapy,
httpclient, java/, go-http-client, php/, perl,
libwww, lwp-, mechanize, selenium, phantomjs,
headless, crawler, spider, scraper, bot,
harvest, extract, grab, fetch, collect
```

### Rate Limiting Rafforzato

| Endpoint | Limite |
|----------|--------|
| `/api/businesses` | 20/minuto |
| `/api/admin/businesses` | 10/minuto |
| `/api/proloco/businesses` | 15/minuto |
| `/api/admin/prolocos` | 10/minuto |
| `/api/admin/citta-paesi` | 10/minuto |

### Soglie Anti-Scraping

| Parametro | Valore |
|-----------|--------|
| Richieste totali/minuto | 60 |
| Richieste dati/minuto | 30 |
| Finestra temporale | 60 secondi |

### Export Bulk con API Key

Nuovo endpoint per partner autorizzati:

```
GET /api/export/businesses
Header: X-API-Key: <chiave>
Limite: 5 richieste/ora
```

#### Configurazione API Keys (Railway)

```
API_KEYS=chiave1:NomePartner1,chiave2:NomePartner2
```

### Sistema Honeypot (Watermark Dati)

Inseriti 5 business "trappola" nel database per rilevare cloni non autorizzati.

#### Honeypot Inseriti

| Nome | Categoria | Città | Telefono |
|------|-----------|-------|----------|
| Trattoria Da Nino Test | Restaurant | Falerna Marina | +39 333 9876543 |
| B&B Villa Serena Test | B&B | Pizzo Calabro | +39 347 1234567 |
| Pizzeria Il Faro Test | Pizzerie | Soverato | +39 320 5551234 |
| Lido Azzurro Test | Spiagge | Tropea | +39 329 8887654 |
| Bar Sport Test | Bar e Pub | Catanzaro Lido | +39 345 6667788 |

#### Come Funziona

1. Gli honeypot hanno `is_honeypot: true` nel database
2. L'API pubblica li **esclude** automaticamente (utenti non li vedono)
3. Chi clona il database MongoDB li prende tutti
4. Se appaiono su altri siti → **prova di furto dati**

#### Come Verificare Cloni

Cerca periodicamente su Google:
```
"Trattoria Da Nino Test"
"+39 333 9876543"
```

#### Script

| File | Comando |
|------|---------|
| `insert_honeypots.py` | `python insert_honeypots.py` - Inserisce honeypot |
| | `python insert_honeypots.py list` - Elenca honeypot |

### Commit

| Repository | Commit | Descrizione |
|------------|--------|-------------|
| Backend | `ea34631` | Add anti-scraping protection with progressive rate limiting |
| Backend | `3da4e74` | Add honeypot system for clone detection |

---

## Sessione 30 Giugno 2026 (sera) - Google AdSense

### Obiettivo: Monetizzazione con Google AdSense

Si vuole integrare Google AdSense per monetizzare l'app con annunci pubblicitari.

### Stato Attuale: PRONTO PER REGISTRAZIONE ADSENSE

Tutte le pagine legali create e link aggiunti alle landing page.

### File Creati/Modificati

| File | Descrizione |
|------|-------------|
| `src/pages/PrivacyPolicy.jsx` | Pagina Privacy Policy conforme GDPR |
| `src/pages/TermsOfService.jsx` | Pagina Termini di Servizio |
| `src/pages/ProlocoLandingPage.jsx` | Aggiunto footer con link legali |
| `src/pages/CittaPaeseLandingPage.jsx` | Aggiunto footer con link legali |

### URL Pagine Legali

| Pagina | URL |
|--------|-----|
| Privacy Policy | https://mappix.it/privacy |
| Termini di Servizio | https://mappix.it/terms |

### Link nelle Landing Page

I link a Privacy Policy e Termini di Servizio sono stati aggiunti in fondo a:
- `/p/:slug` - Landing page Pro Loco
- `/c/:slug` - Landing page Città/Paesi

Formato footer:
```
Privacy Policy | Termini di Servizio
© 2026 MB Consulting. Tutti i diritti riservati.
```

### Requisiti per AdSense

| Requisito | Stato |
|-----------|-------|
| Sito online | ✅ `prolocoportale-frontend.pages.dev` |
| Contenuti originali | ✅ |
| Privacy Policy | ✅ `/privacy` |
| Termini di Servizio | ✅ `/terms` |
| Link legali visibili | ✅ Footer landing pages |
| Account Google | Da verificare |

### URL Consigliato per Registrazione AdSense

Usare un URL con contenuti visibili:
```
https://mappix.it/p/soverato
```

**Nota**: La homepage ora mostra direttamente la mappa (non più paywall).

### Passaggi da Completare

1. **Creare pagine legali**
   - [x] Privacy Policy (`/privacy`) - COMPLETATO
   - [x] Termini di Servizio (`/terms`) - COMPLETATO
   - [x] Routes aggiunte in App.js
   - [x] Link aggiunti alle landing pages

2. **Registrazione AdSense**
   - [ ] Registrarsi su https://www.google.com/adsense/start/
   - [ ] Inserire URL: `https://mappix.it/p/soverato`
   - [ ] Ottenere codice verifica (Publisher ID)
   - [ ] Inserire codice nell'app per verifica proprietà

3. **Integrazione tecnica (dopo approvazione)**
   - [ ] Aggiungere script AdSense in `public/index.html`
   - [ ] Creare componente `AdBanner.jsx`
   - [ ] Decidere posizione annunci (sostituire sponsor o aggiungere)
   - [ ] Configurare slot annuncio

### Posizioni Possibili per Annunci

| Posizione | Descrizione |
|-----------|-------------|
| Banner sponsor | Sostituire carousel attuale |
| Dettaglio attività | Dentro il pannello info |
| Header | Sopra la mappa |
| Interstitial | Tra le interazioni |

### Commit Effettuati

| Commit | Descrizione |
|--------|-------------|
| `b24b7bb` | Add Privacy Policy and Terms of Service pages |
| `e0b5632` | Fix Privacy Policy and Terms pages structure |
| `f92b2d2` | Add Privacy/Terms links to landing pages |

### Tempi Stimati

- Approvazione AdSense: 2-14 giorni
- Integrazione tecnica: 1 ora (dopo approvazione)

---

## Sessione 1 Luglio 2026 - Fix UI Landing Page e Attribuzione Mappa

### Fix Attribuzione Mappa

Rimosso il rettangolo bianco duplicato dell'attribuzione OpenStreetMap che appariva sulla mappa.

| Problema | Soluzione |
|----------|-----------|
| Due attribuzioni visibili | Rimosso div personalizzato in MapView.jsx (righe 325-339) |
| Rettangolo bianco in basso a destra | Era un div con `backgroundColor: rgba(255,255,255,0.7)`, non l'attribuzione Leaflet |

**File modificato**: `src/components/MapView.jsx`

### Fix Navigazione "Torna alla Home"

Il pulsante "Torna alla Home" nelle pagine Privacy Policy e Termini di Servizio riportava alla homepage con paywall invece che alla landing page di provenienza.

| Prima | Dopo |
|-------|------|
| `navigate("/")` | `navigate(-1)` |

**File modificati**: `src/pages/PrivacyPolicy.jsx`, `src/pages/TermsOfService.jsx`

### Fix Layout Landing Page Mobile

Riorganizzato il footer delle landing page per evitare sovrapposizioni su mobile.

#### Modifiche Layout

| Elemento | Prima | Dopo |
|----------|-------|------|
| Immagine copertina | `max-h-[75vh]` | `max-h-[60vh]` |
| Container | `justify-center` | `justify-end` |
| Footer | `position: absolute` | `position: relative` |
| Descrizione | "Scopri le attività, i prodotti e le tradizioni del territorio" | "Scopri le attività e tutti i servizi della Calabria" |

#### Struttura Footer

```
Scopri le attività e tutti i servizi della Calabria
Privacy Policy | Termini di Servizio
© 2026 MB Consulting. Tutti i diritti riservati.
```

**File modificati**: `src/pages/ProlocoLandingPage.jsx`, `src/pages/CittaPaeseLandingPage.jsx`

### Fix Copyright MB Consulting su Mobile

La scritta "© 2026 MB Consulting" si sovrapponeva all'attribuzione OpenStreetMap su mobile.

| Prima | Dopo |
|-------|------|
| `bottom-1` | `bottom-6` |

**File modificato**: `src/pages/HomePage.jsx`

### Commit Effettuati

| Commit | Descrizione |
|--------|-------------|
| `33fa593` | Remove duplicate white attribution box from MapView |
| `d04dd3d` | Fix back button to return to previous page |
| `6e574be` | Fix landing page footer layout and text |
| `4c085ad` | Reduce image to 60vh |
| `ead8974` | Restore image size and align content to bottom |
| `e0e9db3` | Move MB Consulting copyright higher on mobile |

---

---

## Sessione 1 Luglio 2026 (sera) - Dominio Mappix.it e Rebranding

### Nuovo Dominio: mappix.it

Configurato il nuovo dominio `mappix.it` acquistato su Aruba e collegato a Cloudflare Pages.

#### Configurazione DNS

| Parametro | Valore |
|-----------|--------|
| **Registrar** | Aruba |
| **Nameservers** | `buck.ns.cloudflare.com`, `gene.ns.cloudflare.com` |
| **CNAME @** | `prolocoportale-frontend.pages.dev` |
| **CNAME www** | `prolocoportale-frontend.pages.dev` |

#### Cloudflare Pages - Custom Domains

| Dominio | Stato | SSL |
|---------|-------|-----|
| `mappix.it` | Active | Enabled |
| `www.mappix.it` | Active | Enabled |

#### CORS Update Railway

```
CORS_ORIGINS=https://prolocoportale-frontend.pages.dev,http://localhost:3000,https://mappix.it,https://www.mappix.it
```

### Rebranding: ProlocoPortale/ProxiMap → Mappix

Completato il rebranding dell'applicazione da "ProlocoPortale" e "ProxiMap" a "Mappix".

#### File Modificati

| File | Modifica |
|------|----------|
| `public/index.html` | Title e meta tags aggiornati a "Mappix" |
| `public/manifest.json` | Nome PWA: "Mappix - Turismo Calabria" |
| `src/pages/PaywallPage.js` | Testo e email aggiornati |
| `src/lib/gpxExport.js` | Creator GPX: "Mappix", URL: mappix.it |

### Cookie Consent Banner

Implementato banner cookie conforme GDPR che blocca l'app fino all'accettazione.

#### Componente: CookieConsent.jsx

| Caratteristica | Dettaglio |
|----------------|-----------|
| **Tipo** | Blocking modal |
| **Storage** | `localStorage.cookie_consent` |
| **Data consenso** | `localStorage.cookie_consent_date` |
| **Stile** | Glass effect con backdrop blur |

#### Funzionalità

- Mostra banner overlay su tutta l'app
- Link a Privacy Policy per dettagli
- Bottone "Accetta" salva consenso
- Una volta accettato, non riappare più
- Wrapper component che avvolge tutte le route

### Compliance AI Act (EU 2024/1689)

Aggiornate Privacy Policy e Termini di Servizio con sezione dedicata all'AI Act.

#### Privacy Policy - Sezioni Aggiunte

| Sezione | Contenuto |
|---------|-----------|
| **Cookie Policy** | Tabella dettagliata tutti i cookie |
| **AI Act Compliance** | Dichiarazione sistemi AI utilizzati |
| **Diritti GDPR** | Lista completa diritti utente |
| **Data Retention** | Periodi conservazione dati |
| **Third Party Services** | Tabella servizi terzi con link privacy |

#### Sistemi AI Dichiarati

| Sistema | Provider | Scopo |
|---------|----------|-------|
| Claude Code | Anthropic | Assistenza sviluppo |
| Google Gemini | Google | Chatbot turistico (futuro) |
| LibreTranslate | Open Source | Traduzione contenuti |

### Route Change: Homepage

Modificato il comportamento della root URL:

| Route | Prima | Dopo |
|-------|-------|------|
| `/` | PaywallPage | HomePage |
| `/portale` | HomePage | HomePage |

#### Motivo

La PaywallPage non è necessaria attualmente (tutto è gratis). Ogni Pro Loco e Città/Paese ha il proprio QR code con link diretto (`/p/slug` o `/c/slug`).

### File Creati

| File | Descrizione |
|------|-------------|
| `src/components/CookieConsent.jsx` | Banner consenso cookie GDPR |

### Commit Effettuati

| Descrizione |
|-------------|
| Add GDPR cookie consent banner |
| Update Privacy Policy with AI Act and Cookie Policy |
| Update Terms of Service with AI Act section |
| Change root route from PaywallPage to HomePage |
| Rebrand to Mappix throughout the app |

---

## Sessione 1 Luglio 2026 (notte) - Integrazione Google AdSense

### Google AdSense Configurato

Completata l'integrazione di Google AdSense per la monetizzazione dell'app.

#### Credenziali AdSense

| Parametro | Valore |
|-----------|--------|
| **Publisher ID** | `ca-pub-6371841208008674` |
| **Ad Slot** | `5526727212` |
| **Nome unità** | Banner Mappix |
| **Formato** | Orizzontale, Responsivo |

#### File Creati/Modificati

| File | Modifica |
|------|----------|
| `public/index.html` | Aggiunto script AdSense |
| `public/ads.txt` | Creato per verifica AdSense |
| `src/components/AdBanner.jsx` | Nuovo componente banner pubblicitario |
| `src/pages/HomePage.jsx` | Aggiunto AdBanner, SponsorBanner commentato |

#### Posizione Banner AdSense

| Parametro | Valore |
|-----------|--------|
| **Posizione** | `bottom-14 left-3` (sotto il mirino) |
| **Dimensioni** | 280-360px x 70px |
| **Stile** | Glass effect, rounded |

#### Configurazione AdSense Completata

| Passaggio | Stato |
|-----------|-------|
| Registrazione sito | Completato |
| Verifica proprietà | Completato |
| Script AdSense | Installato |
| ads.txt | Funzionante |
| Unità annuncio creata | Completato |
| Consenso GDPR (CMP Google) | Configurato |
| Revisione richiesta | In attesa di Google |

#### Commit Effettuati

| Commit | Descrizione |
|--------|-------------|
| `a9bdab1` | Add Google AdSense integration |
| `9e1524d` | Add ads.txt for AdSense verification |

#### Prossimi Passi

- Attendere approvazione Google (2-14 giorni)
- Gli annunci appariranno automaticamente dopo l'approvazione
- Possibilità futura: mix sponsor + AdSense in rotazione

---

### Google Analytics 4 Configurato

Integrato Google Analytics 4 per tracciare visitatori, geolocalizzazione e comportamento utenti.

#### Credenziali GA4

| Parametro | Valore |
|-----------|--------|
| **Measurement ID** | `G-VZNMR09J0Z` |
| **Stream ID** | `15182687844` |
| **Nome Stream** | Mappix |
| **URL** | https://mappix.it |

#### Funzionalità Attive

| Funzionalità | Stato |
|--------------|-------|
| Visualizzazioni pagina | Attivo |
| Scroll tracking | Attivo |
| Click in uscita | Attivo |
| Ricerca sito | Attivo |
| Coinvolgimento video | Attivo |
| Download file | Attivo |

#### Dati Disponibili

- **Tempo reale**: Utenti attivi, pagine visitate, eventi
- **Geolocalizzazione**: Paese, regione, città degli utenti
- **Dispositivi**: Mobile, desktop, tablet
- **Sorgenti traffico**: Diretto, QR code, ricerca, social
- **Comportamento**: Pagine più viste, tempo di permanenza

#### Commit Effettuato

| Commit | Descrizione |
|--------|-------------|
| `a72badc` | Add Google Analytics 4 tracking |

---

## Sessione 2 Luglio 2026 - Rimozione Netlify

### Problema Rilevato

Nonostante la migrazione a Cloudflare Pages (3 Giugno 2026), il repository GitHub era ancora collegato a Netlify. Ogni push causava deploy su entrambe le piattaforme, consumando crediti Netlify inutilmente.

**Email ricevuta**: "silvestrobruzzese's team has run out of credits"

### Soluzione

Eliminato completamente il progetto `prolocoportale` da Netlify.

| Azione | Dettaglio |
|--------|-----------|
| **Piattaforma** | Netlify |
| **Progetto eliminato** | `prolocoportale` |
| **Metodo** | Project configuration → Danger zone → Delete this project |

### Stato Attuale

| Servizio | Piattaforma | Note |
|----------|-------------|------|
| **Frontend** | Cloudflare Pages | Unica piattaforma attiva |
| **Backend** | Railway | Invariato |
| **Database** | MongoDB Atlas | Invariato |

### Vantaggi

- Nessun costo aggiuntivo (Cloudflare Pages = gratuito con bandwidth illimitato)
- Deploy più veloci (una sola piattaforma)
- Nessuna confusione su quale URL usare

---

## DA FARE: QR Code Dinamici

**Descrizione**: Webapp che genera QR code dinamici (il QR resta uguale ma l'URL di destinazione può cambiare)

**Obiettivo**: Collegare i QR code alle landing page di Mappix:
- `https://mappix.it/p/{slug}` - Landing Pro Loco
- `https://mappix.it/c/{slug}` - Landing Città/Paese

**Passaggi:**
1. [ ] Configurare URL destinazione QR → Mappix
2. [ ] Testare scansione QR → apertura landing page
3. [ ] Eventuale tracking visite da QR

---

## Sessione 7 Luglio 2026 - Google Analytics 4 con Eventi Personalizzati

### Nuovo Account Google Analytics 4

Creato nuovo account GA4 per tracciare visite e comportamento utenti con dettaglio per Pro Loco/Città.

#### Credenziali GA4

| Parametro | Valore |
|-----------|--------|
| **Account** | MB Consulting |
| **Proprietà** | Mappix proloco soverato |
| **Measurement ID** | `G-YTTLPWV7ZQ` |
| **Stream ID** | 15213330768 |
| **URL Stream** | https://www.mappix.it/p/soverato |

### Eventi Personalizzati Implementati

Creato sistema di tracking personalizzato per sapere esattamente quale Pro Loco o Città visitano gli utenti.

#### File Creato

| File | Descrizione |
|------|-------------|
| `src/lib/analytics.js` | Utility per eventi GA4 personalizzati |

#### Eventi Tracciati

| Evento | Quando si attiva | Parametri |
|--------|------------------|-----------|
| `proloco_landing_view` | Visita a `/p/{slug}` | proloco_slug, proloco_name, comune, provincia |
| `citta_landing_view` | Visita a `/c/{slug}` | citta_slug, citta_name, provincia |
| `explore_map_click` | Click su "Esplora la Mappa" | source_type, source_slug, source_name |

#### File Modificati

| File | Modifica |
|------|----------|
| `public/index.html` | Aggiornato Measurement ID a G-YTTLPWV7ZQ |
| `src/lib/analytics.js` | Creato utility con tutte le funzioni di tracking |
| `src/pages/ProlocoLandingPage.jsx` | Aggiunto tracking `proloco_landing_view` e `explore_map_click` |
| `src/pages/CittaPaeseLandingPage.jsx` | Aggiunto tracking `citta_landing_view` e `explore_map_click` |
| `src/components/BusinessDetail.jsx` | Aggiunto tracking `business_view`, `navigate_click`, `gpx_download`, `trail_follow_start` |
| `src/components/CategoryFilters.jsx` | Aggiunto tracking `category_filter` |

#### Tutti gli Eventi Tracciati

| Evento | Quando si attiva | Parametri |
|--------|------------------|-----------|
| `proloco_landing_view` | Visita landing `/p/{slug}` | proloco_slug, proloco_name, comune, provincia |
| `citta_landing_view` | Visita landing `/c/{slug}` | citta_slug, citta_name, provincia |
| `explore_map_click` | Click "Esplora la Mappa" | source_type, source_slug, source_name |
| `business_view` | Apertura dettaglio attività | business_id, business_name, business_category, business_city, has_promotion |
| `navigate_click` | Click "Naviga" (apre Maps) | business_id, business_name, business_category, business_city |
| `category_filter` | Selezione categoria | category |
| `gpx_download` | Download file GPX | trail_name |
| `trail_follow_start` | Avvio navigazione sentiero | trail_name |

#### Funzioni Analytics Disponibili

```javascript
import {
  trackProlocoLanding,    // Visita landing Pro Loco
  trackCittaLanding,      // Visita landing Città/Paese
  trackExploreClick,      // Click "Esplora la Mappa"
  trackBusinessView,      // Visualizzazione dettaglio attività
  trackNavigateClick,     // Click "Naviga" (apre Maps)
  trackCategoryFilter,    // Selezione categoria
  trackSearch,            // Ricerca
  trackGpxDownload,       // Download GPX
  trackTrailFollowStart   // Avvio navigazione sentiero
} from '@/lib/analytics';
```

#### Come Vedere i Dati in GA4

1. **Tempo Reale**: Rapporti → Panoramica in tempo reale → Conteggio eventi
2. **Storico**: Rapporti → Coinvolgimento → Eventi
3. **Geolocalizzazione**: Rapporti → Utente → Attributi utente → Dettagli demografici

#### Commit Effettuati

| Commit | Descrizione |
|--------|-------------|
| `9f1dc27` | Update Google Analytics 4 Measurement ID to G-YTTLPWV7ZQ |
| `5265ff1` | Add GA4 custom event tracking for Pro Loco and Città landing pages |
| `bf5261e` | Add GA4 tracking for business views, navigation, and category filters |

---

## Sessione 8 Luglio 2026 - Nuovo Design Categorie Pill Style

### Redesign Completo Filtri Categorie

Sostituito il design delle icone categorie (emoji/SVG/immagini) con un nuovo stile "pill" più pulito e professionale.

#### Nuovo Design

| Elemento | Descrizione |
|----------|-------------|
| **Forma** | Ovale/pillola (rounded-full) |
| **Sfondo** | Bianco |
| **Bordo** | 2px colorato (colore specifico per categoria) |
| **Testo** | Nero, tradotto in base alla lingua selezionata |
| **Stato attivo** | Sfondo colorato, testo bianco |

#### Prima vs Dopo

| Prima | Dopo |
|-------|------|
| Bottoni rotondi 14x14 | Bottoni ovali con padding orizzontale |
| Emoji (🍽, 🍕, 🏨...) | Testo tradotto |
| Icone SVG custom | Testo tradotto |
| Loghi immagine | Testo tradotto |
| Testo fisso italiano | Testo multilingua (5 lingue) |

#### Categorie e Colori Bordo (21 totali)

| Categoria | Colore | IT | EN | FR | DE | ES |
|-----------|--------|----|----|----|----|-----|
| Restaurant | #E63946 | Ristoranti | Restaurants | Restaurants | Restaurants | Restaurantes |
| Pizzerie | #FF6B35 | Pizzerie | Pizzerias | Pizzerias | Pizzerien | Pizzerías |
| Bar e Pub | #8B4513 | Bar e Pub | Bars & Pubs | Bars et Pubs | Bars & Kneipen | Bares y Pubs |
| Hotel | #FFD700 | Hotel | Hotels | Hôtels | Hotels | Hoteles |
| B&B | #22C55E | B&B | B&B | B&B | B&B | B&B |
| Sentieri e Cammini | #F97316 | Sentieri e Cammini | Trails and Paths | Sentiers et Chemins | Wanderwege und Pfade | Senderos y Caminos |
| Beni Culturali | #8B5CF6 | Beni Culturali | Cultural Heritage | Patrimoine Culturel | Kulturerbe | Patrimonio Cultural |
| Itinerari | #10B981 | Itinerari | Itineraries | Itinéraires | Routen | Itinerarios |
| Monumenti | #A855F7 | Monumenti | Monuments | Monuments | Denkmäler | Monumentos |
| Musei | #EC4899 | Musei | Museums | Musées | Museen | Museos |
| Spiagge | #06B6D4 | Spiagge | Beaches | Plages | Strände | Playas |
| Bandiera Blu | #0077B6 | Bandiera Blu | Blue Flag | Pavillon Bleu | Blaue Flagge | Bandera Azul |
| Bandiera Verde | #2E7D32 | Bandiera Verde | Green Flag | Pavillon Vert | Grüne Flagge | Bandera Verde |
| Sea Park | #1A6B8A | Parchi Marini | Marine Parks | Parcs Marins | Meeresparks | Parques Marinos |
| Archeologia | #F59E0B | Archeologia | Archaeology | Archéologie | Archäologie | Arqueología |
| Discoteche | #D946EF | Discoteche | Nightclubs | Discothèques | Diskotheken | Discotecas |
| Supermercati | #3B82F6 | Supermercati | Supermarkets | Supermarchés | Supermärkte | Supermercados |
| Shop | #14B8A6 | Negozi | Shops | Boutiques | Geschäfte | Tiendas |
| Pharmacy | #22C55E | Farmacie | Pharmacies | Pharmacies | Apotheken | Farmacias |
| Bancomat | #00843D | Bancomat | ATM | Distributeur | Geldautomat | Cajero |
| Other | #6366F1 | Altro | Other | Autre | Andere | Otros |

#### File Modificati

| File | Modifica |
|------|----------|
| `src/components/CategoryFilters.jsx` | Nuovo stile pill per tutte le categorie, import useI18n |
| `src/lib/i18n.jsx` | Aggiunte traduzioni per 8 nuove categorie in 5 lingue |

#### Nuove Traduzioni Aggiunte

| Chiave i18n | Descrizione |
|-------------|-------------|
| `bar_pub` | Bar e Pub |
| `beni_culturali` | Beni Culturali |
| `itinerari` | Itinerari |
| `bandiera_blu` | Bandiera Blu |
| `bandiera_verde` | Bandiera Verde |
| `sea_park` | Parchi Marini |
| `bancomat` | Bancomat/ATM |
| `supermercati` | Supermercati |

#### Commit Effettuati

| Commit | Descrizione |
|--------|-------------|
| `eda822a` | Change Restaurant category to pill style with translated text |
| `e09d511` | Change all categories to pill style with translations |

---

*Ultimo aggiornamento: 8 Luglio 2026 - ore 20:30*
*Dominio: https://mappix.it (Cloudflare Pages)*
*Stato: PRODUZIONE ONLINE - Cloudflare Pages + Railway + MongoDB Atlas (Netlify RIMOSSO)*
*Branding: MAPPIX (precedentemente ProlocoPortale/ProxiMap)*
*Cookie Consent: GDPR COMPLIANT - Banner blocking implementato*
*AI Act: EU 2024/1689 COMPLIANT - Dichiarazione sistemi AI in Privacy Policy*
*AdSense: CONFIGURATO - In attesa approvazione Google (ca-pub-6371841208008674)*
*Google Analytics 4: ATTIVO (G-YTTLPWV7ZQ) - 8 eventi personalizzati attivi*
*Security: HARDENING COMPLETATO + ANTI-SCRAPING + HONEYPOT ATTIVI*
*Analytics: CLOUDFLARE WEB ANALYTICS + GOOGLE ANALYTICS 4 + 8 EVENTI CUSTOM*
*Landing Page Pro Loco: PERSONALIZZATE (/p/) - Layout ottimizzato mobile*
*Landing Page Città/Paesi: PERSONALIZZATE (/c/) - Layout ottimizzato mobile*
*Sentieri e Cammini: FUNZIONALITÀ COMPLETA CON GPS*
*Bandiere Blu/Verde: 50 SPIAGGE CERTIFICATE*
*Sea Park: 6 PARCHI MARINI REGIONALI*
*Bar e Pub: 2.950 LOCALI*
*Zoom Mappa: 18 (massimo dettaglio)*
*Banner Ads: ADSENSE INTEGRATO (sostituisce sponsor temporaneamente)*
*Categorie: 21 CATEGORIE - NUOVO DESIGN PILL STYLE CON TESTO MULTILINGUA*
*Totale Business: 21.320 (di cui 5 honeypot)*
*Totale Pro Loco: 120*
*Totale Città/Paesi: 1.566*
