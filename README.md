# Personal Hub

Welkom bij de Personal Hub applicatie. Dit is een complete persoonlijke hub die ontworpen is om je dagelijkse leven te organiseren. De applicatie is geoptimaliseerd voor gebruik op telefoons en iPads en heeft een moderne, professionele uitstraling.

## Functies

De applicatie bevat de volgende kernfunctionaliteiten:

- **Notities**: Maak en beheer je persoonlijke notities.
- **Kalender**: Houd je afspraken en belangrijke data bij.
- **Bestanden/Foto's**: Upload en beheer je bestanden en foto's.
- **Takenlijst (To-Do)**: Beheer je taken en vink ze af als ze voltooid zijn.
- **Authenticatie**: Veilig inloggen en registreren met wachtwoordversleuteling en sessiebeheer.

## Tech Stack

Deze applicatie is gebouwd als een monorepo met een gescheiden frontend en backend.

**Frontend (Client):**
- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling framework
- React Router DOM - Routing

**Backend (Server):**
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [SQLite](https://www.sqlite.org/) - Database
- JSON Web Tokens (JWT) - Authenticatie
- Bcrypt - Wachtwoord beveiliging

## Installatie

Volg onderstaande stappen om het project lokaal op te zetten.

### Benodigdheden
- [Node.js](https://nodejs.org/) (v18 of hoger aanbevolen)
- NPM (wordt meestal meegeleverd met Node.js)

### 1. Repository Clonen
Clone de repository naar je lokale machine:
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup
Ga naar de server map en installeer de dependencies:
```bash
cd server
npm install
```

Maak een `.env` bestand aan in de `server` map met de volgende inhoud (pas het geheim aan):
```
JWT_SECRET=jouw_super_geheime_sleutel
PORT=3000
```

Initialiseer de database:
```bash
node init-db.js
```

### 3. Frontend Setup
Ga naar de client map en installeer de dependencies:
```bash
cd ../client
npm install
```

## De Applicatie Starten

Je moet zowel de backend als de frontend servers tegelijkertijd laten draaien.

### Backend Starten
Open een terminal en run vanuit de `server` map:
```bash
node server.js
```
De server draait standaard op poort 3000 (of wat je in .env hebt ingesteld).

### Frontend Starten
Open een nieuwe terminal en run vanuit de `client` map:
```bash
npm run dev
```
De frontend is nu bereikbaar, meestal via `http://localhost:5173`.

## Structuur

```
.
├── client/      # Frontend React applicatie
├── server/      # Backend Node.js/Express applicatie
├── .gitignore   # Git ignore regels
└── README.md    # Project documentatie
```

## Licentie
[MIT](LICENSE)
