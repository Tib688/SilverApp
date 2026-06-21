# Silver App V2

Application desktop pour gerer **Silver Bot** (bot Discord multifonction).

## Quoi de neuf en V2

### Migration complete
- **Ancien** : CustomTkinter (Python) — lent, laggy, interface limitee
- **Nouveau** : Electron (HTML/CSS/JS) + backend FastAPI — rapide, moderne, fluide

### Nouvelle interface
- Theme silver sombre avec animations (fadeIn, slideIn)
- Custom titlebar integree
- Sidebar avec navigation par sections
- Welcome banner avec stats en temps reel
- Status bar avec horloge

### Nouvelles pages
| Page | Description |
|------|-------------|
| Vue d'ensemble | 8 stat cards animees, liste des serveurs avec icones |
| Moderation | Table des warns avec avatars Discord |
| Tickets | Suivi des tickets support (ouverts/fermes) |
| Leaderboard | Classement XP avec avatars Discord, stats chat/voice/messages |
| Membres | Recherche par ID, profil detaille, systeme de favoris |
| Suggestions | Liste des suggestions avec statuts |
| Controle Bot | Envoyer des embeds, slowmode, purge, topic, nickname bot |
| Bot Info | Infos bot live, avatar, badges, liste serveurs detaillee |
| Chat Testeurs | Chat general + DMs prives, upload fichiers (images/videos), indicateur en ligne |
| Test Lab | Simulateur de commandes bot, embeds Discord-like, 50+ commandes, autocompletion |
| Bugs Reports | Signaler des bugs, 4 niveaux de severite, filtres, workflow open/fixed/closed |
| Taches | Creer et assigner des taches, priorites, stats de completion |
| Annonces | Publier des annonces pour les testeurs |
| Codes oublies | Gerer les demandes de recuperation, generer un nouveau code |
| Parametres | Token bot, infos MySQL, gestion testeurs, generation de codes d'invitation |
| Base de donnees | Stats MySQL en direct, barres de proportion par table |

### Dashboard Testeur
Interface separee pour les testeurs avec :
- Accueil personnalise (stats, annonces recentes, taches en cours)
- Chat general et DM avec l'owner
- Signalement de bugs
- Mise a jour du statut des taches
- Acces au Test Lab et Bot Info
- Indicateur de presence automatique

### Ameliorations techniques
- Backend FastAPI avec proxy MySQL et Discord API (GET/POST/PATCH/DELETE)
- Upload de fichiers avec stockage local
- Avatars Discord dans le leaderboard et la moderation (cache global)
- Session persistante via localStorage
- Auto-import du token depuis l'ancienne config
- Build portable `.exe` avec electron-builder

## Lancer en dev

```
cd backend && venv\Scripts\python server.py
cd .. && npx electron .
```

## Build

```
npm run build
```

Le `.exe` portable est genere dans `dist/`.

## Stack

- **Frontend** : HTML, CSS, JavaScript (vanilla)
- **Backend** : Python, FastAPI, PyMySQL
- **Desktop** : Electron
- **Database** : MySQL (distant)
- **API** : Discord API v10
