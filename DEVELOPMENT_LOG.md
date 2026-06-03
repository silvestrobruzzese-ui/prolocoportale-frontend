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

## Categorie Disponibili (15 totali) - Colori Pop

| Categoria | Colore | Icona |
|-----------|--------|-------|
| Restaurant | #E63946 (Rosso vivace) | 🍽 |
| Pizzerie | #FF6B35 (Arancione) | 🍕 |
| Hotel | #FBBF24 (Giallo oro) | 🏨 |
| B&B | #22C55E (Verde brillante) | **B&B** (testo) |
| Beni Culturali | #8B5CF6 (Viola) | 🏛 |
| Itinerari | #10B981 (Smeraldo) | 🥾 |
| Monumenti | #A855F7 (Viola) | ⛪ |
| Musei | #EC4899 (Rosa/Magenta) | 🏛 |
| Spiagge | #06B6D4 (Ciano) | 🏖 |
| Archeologia | #F59E0B (Ambra) | 🏺 |
| Discoteche | #D946EF (Fucsia) | 🎵 |
| Supermercati | #3B82F6 (Blu) | 🛒 |
| Shop | #14B8A6 (Teal) | 🛍 |
| Pharmacy | #22C55E (Verde) | 💊 |
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

*Ultimo aggiornamento: 3 Giugno 2026 - ore 18:00*
*Stato: PRODUZIONE ONLINE - Cloudflare Pages + Railway + MongoDB Atlas*
*Security: HARDENING COMPLETATO*
*Analytics: CLOUDFLARE WEB ANALYTICS ATTIVO*
