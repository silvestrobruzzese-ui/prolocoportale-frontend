# ProlocoPortale - Log di Sviluppo

## Panoramica Progetto
**ProlocoPortale** è un'applicazione web per l'economia di prossimità in Calabria. Permette ai turisti di esplorare attività commerciali, monumenti, spiagge e servizi sulla mappa, con sconti basati sulla prossimità geografica.

---

## STATO ATTUALE: PRODUZIONE ONLINE

**Ultimo aggiornamento: 3 Giugno 2026**

L'applicazione è completamente funzionante online su dispositivi mobili e desktop.

---

## Infrastruttura di Produzione

### Server e Servizi

| Servizio | Piattaforma | URL |
|----------|-------------|-----|
| **Frontend** | Netlify | https://prolocoportale.netlify.app |
| **Backend API** | Railway | https://web-production-b3201.up.railway.app |
| **Database** | MongoDB Atlas | Cluster0 (vedi credenziali sotto) |
| **Traduzione** | LibreTranslate | https://libretranslate.com (API pubblica) |

### Credenziali Database MongoDB Atlas
```
mongodb+srv://giannibruzzese_db_user:v9zTcwPVwsE3SSb5@cluster0.w3gsrfr.mongodb.net/prolocoportale
```

### Repository GitHub
- **Frontend**: https://github.com/silvestrobruzzese-ui/prolocoportale-frontend

### Deploy Automatico
- **Netlify**: Deploy automatico ad ogni push su `main`
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

## Categorie Disponibili (15 totali)

| Categoria | Colore | Emoji |
|-----------|--------|-------|
| Restaurant | #E63946 (Rosso) | 🍽 |
| Pizzerie | #FF6B35 (Arancione) | 🍕 |
| Hotel | #FFD700 (Giallo oro) | 🏨 |
| B&B | #228B22 (Verde) | 🛏 |
| **Beni Culturali** | #7B68EE (Viola medio) | 🏛 |
| **Itinerari** | #2E8B57 (Verde mare) | 🥾 |
| Monumenti | #8B4513 (Marrone) | ⛪ |
| Musei | #9C27B0 (Viola) | 🏛 |
| Spiagge | #00CED1 (Turchese) | 🏖 |
| Archeologia | #FF8C00 (Arancione) | 🏺 |
| Discoteche | #E040FB (Fucsia) | 🎵 |
| Supermercati | #3498DB (Blu) | 🛒 |
| Shop | #2A9D8F (Verde acqua) | 🛍 |
| Pharmacy | #4CAF50 (Verde chiaro) | 💊 |
| Other | #6C757D (Grigio) | 📍 |

---

## Funzionalità Implementate

### Interfaccia Utente Mobile
- [x] **Schermata di benvenuto** con logo Pro Loco Soverato
- [x] **Mappa interattiva** con marker colorati per categoria
- [x] **Barra categorie orizzontale** scorrevole (sotto la ricerca)
- [x] **Pulsanti rotondi** con bordo colorato e icona emoji
- [x] **Dettaglio attività** in pannello laterale con pulsante "Chiudi" visibile
- [x] **Menu/ricerca nascosti** quando si apre il dettaglio attività
- [x] **Limite 100 marker** più vicini per performance
- [x] **Geolocalizzazione** funzionante su mobile
- [x] **Safe area iOS** - margine superiore per evitare sovrapposizione con barra browser

### Marker sulla Mappa
- [x] **Colore fisso per categoria** (non cambia in prossimità)
- [x] **Bordo pulsante** per indicare prossimità (animazione CSS)
- [x] **Emoji categoria** visibile nel marker

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

## Sessione 3 Giugno 2026 - Modifiche

### UI/UX Mobile
1. **Marker colori** - Rimosso cambio colore in prossimità, mantenuto colore categoria
2. **Indicatore prossimità** - Bordo pulsante animato invece di cambio colore
3. **Categorie** - Spostate da sidebar sinistra a barra orizzontale scorrevole
4. **Pulsanti categoria** - Rotondi con bordo colorato, sfondo bianco/colorato se attivo
5. **Dettaglio attività** - Rimossa immagine, aggiunto pulsante "Chiudi" prominente
6. **Safe area** - Aggiunto margine `mt-12` su mobile per iOS browser bar
7. **Nascondi menu** - Menu e categorie nascosti quando dettaglio aperto

### Performance
8. **Limite marker** - Solo 100 marker più vicini alla posizione utente
9. **API limit** - Parametro `limit` aggiunto all'endpoint `/businesses`

### Nuove Funzionalità
10. **Traduzione automatica** - LibreTranslate per contenuti business
11. **Nuove categorie** - Beni Culturali e Itinerari con import CSV
12. **Immagine benvenuto** - Sostituita con logo Pro Loco Soverato

---

## File Principali

### Frontend
| File | Descrizione |
|------|-------------|
| `src/pages/HomePage.jsx` | Mappa turista, welcome screen, logica principale |
| `src/components/MapView.jsx` | Mappa Leaflet con marker colorati |
| `src/components/CategoryFilters.jsx` | Barra categorie orizzontale (15 categorie) |
| `src/components/BusinessDetail.jsx` | Dettaglio attività con traduzione |
| `src/lib/translate.js` | Integrazione LibreTranslate |
| `src/lib/i18n.jsx` | Traduzioni UI (5 lingue) |
| `src/lib/api.js` | Configurazione API |
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

### URL Sviluppo Locale
- **Mappa Turista**: http://localhost:3000
- **Superadmin**: http://localhost:3000/admin/login
  - Email: `admin@prolocoportale.it`
  - Password: `admin123`
- **Pro Loco Soverato**: http://localhost:3000/proloco/login
  - PIN: `UW5W4CUD`

---

## Note Tecniche Importanti

1. **CORS**: Configurato per accettare richieste da Netlify
2. **Geolocalizzazione**: Richiede HTTPS (funziona su Netlify, non su localhost HTTP)
3. **LibreTranslate**: API pubblica gratuita, possibili rate limit
4. **iOS Safari**: Fullscreen API non supportata, suggerito "Aggiungi a Home"
5. **Marker limit**: 100 per performance mobile

---

## Struttura Ruoli

| Ruolo | Accesso | Funzionalità |
|-------|---------|--------------|
| **Superadmin** | `/admin` | Gestisce tutte le Pro Loco, crea PIN, importa dati |
| **Pro Loco** | `/proloco/login` | Gestisce attività del proprio territorio |
| **Turista** | `/` | Esplora mappa, cerca attività, usa filtri |

---

## Prossimi Passi Possibili

### Funzionalità
- [ ] Cluster marker per zoom bassi (performance con molti marker)
- [ ] Notifiche push prossimità
- [ ] Sistema preferiti persistente (richiede login utente)
- [ ] Navigazione turn-by-turn integrata

### Miglioramenti
- [ ] Self-hosted LibreTranslate (evitare rate limit)
- [ ] Immagini attività (storage cloud)
- [ ] PWA completa con offline support

---

*Ultimo aggiornamento: 3 Giugno 2026 - ore 01:30*
*Stato: PRODUZIONE ONLINE - Tutto funzionante*
