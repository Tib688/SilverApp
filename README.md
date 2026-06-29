## Changelog v2.3.1 - 29/06/2026

### ⬆️ Mise a jour in-app
- Telechargement + installation directement dans l'app
- Barre de progression avec pourcentage + taille MB
- Lancement auto du setup + fermeture de l'app
- Detection auto des nouvelles versions via GitHub Releases
- Badge violet quand update disponible
- Check auto au lancement + toutes les 30 min
- Comparaison semver numerique (plus de faux positif)

### 🪞 Chrome polish
- Page login en Liquid Chrome
- Splash screen au lancement (logo + barre animee)
- Inputs, boutons, selects, tables en chrome
- Skeleton loading chrome
- Recherche Ctrl+K redesignee (recents, toutes pages)
- Horloge stylisee avec separateurs pulsants
- Breadcrumbs discrets

### 🔧 Fixes
- Chat/DM/TestLab testeur repares
- Avatars Discord dans les messages + badge Owner
- Array.isArray guards sur toutes les requetes
- CAST receiver_id pour BigInt DM matching
- Changelog testeur ajoute
- Lien invitation testeur pointe vers releases/latest

---

## Changelog v2.3 - 29/06/2026

### 🪞 Liquid Chrome Design
- Nouveau theme visuel noir profond + argent metallique
- Textes en degrade chrome sur titres, chiffres et noms
- Lignes lumineuses sur les stat cards
- Bordures .5px, coins arrondis 16-18px
- Login, inputs, boutons, selects, tables tout chrome
- Pills Serveurs/Testeurs/Bugs en chrome unifie
- Sidebar metallique, splash screen au lancement
### 📊 Analytics & Heatmap
- 5 graphiques Chart.js (activite, bugs, XP, testeurs, croissance)
- Heatmap d'activite style GitHub sur 90 jours
- Doughnut chart des top testeurs
### 🎨 Embed Builder
- Editeur visuel d'embeds Discord avec preview live
- @mention autocomplete dans la description
- Drag & drop / coller images + URL video YouTube
- Templates sauvegardables
### 🤖 Bot Profil
- Changer nom et avatar du bot depuis l'app
- Editeur de statuts rotatifs avec preview live
### 🖥️ Console
- Terminal integre avec logs du bot en direct
- Filtres par niveau + recherche + auto-refresh
### 🔔 Notifications Desktop
- Alertes natives Windows/macOS (bugs, messages, suggestions)
### 💾 Backup & Restore
- Export/import complet en JSON
### ⚡ UI & Experience
- Mode compact, Quick Actions (FAB), raccourcis clavier
- Profil membre en modal, export CSV
- Page Serveurs avec liens d'invitation permanents
- Recherche Ctrl+K avec recents
- Comptage exact des messages par channel (API search)
- Serveurs quittes masques des stats (donnees conservees)
### 🔧 Technique
- Build script automatise (node build.js)
- Dossier App/ organise (latest, versions)
- NSIS auto-kill app avant installation
- Fix BigInt guild_id, source unique user_xp

---

## Changelog v2.2 — 28/06/2026

### 📊 Analytics & Heatmap
- **Graphiques Chart.js** — activite testeurs, bugs/taches, XP gagne, croissance
- **Top Testeurs** — doughnut chart des contributeurs les plus actifs
- **Heatmap d'activite** style GitHub sur 90 jours (serie, jours actifs, moyenne)
- **Donnees sur 30 jours** avec courbes, barres et cumuls

### 🎨 Embed Builder
- **Editeur visuel** d'embeds Discord avec preview live
- **Champs dynamiques** — couleur, auteur, footer, images, thumbnail
- **Templates sauvegardables** — creer et reutiliser des modeles
- **Envoi direct** dans n'importe quel channel

### 🤖 Bot Profil
- **Changer nom et avatar** du bot directement depuis l'app
- **Editeur de statuts rotatifs** — texte, type (streaming/playing/watching), intervalle
- **Preview live** du statut en temps reel dans l'app
- **Variables dynamiques** ({servers}, {version}) dans les messages de statut

### 🖥️ Console
- **Terminal integre** avec logs du bot en direct
- **Filtres** par niveau (Error, Warning, Info)
- **Recherche** dans les logs + auto-refresh 3s
- **Coloration syntaxique** par niveau de log

### 🔔 Notifications Desktop
- **Notifications natives** Windows/macOS
- **Alertes temps reel** — bugs, messages testeurs, suggestions
- **Toggle ON/OFF** dans les parametres

### 💾 Backup & Restore
- **Export complet en JSON** (config, preferences, donnees)
- **Import et restauration** en un clic
- **Transfert facile** entre machines (Windows ↔ Mac)

### ⚡ UI & Experience
- **Mode compact** — tableaux et cartes condenses, toggle dans parametres
- **Bouton Quick Actions** flottant (FAB) — acces rapide aux pages cles
- **Raccourcis clavier** complets (Shift+? pour la liste)
- **Profil membre** detaille en modal (clic sur un membre)
- **Export CSV** sur tous les tableaux de donnees
- **Page Serveurs** — tous les serveurs avec liens d'invitation permanents

---

## Changelog v2.1 — 23/06/2026

### 🎨 Interface
- **Page Home** avec branding Silver Bot + lien Discord officiel
- **Sidebar retractable** (mode icones uniquement)
- **Transitions de page** animees (fade in/out)
- **Skeleton loading** (placeholders animes)
- **Compteurs animes** avec easing cubique
- **Hover parallax 3D** sur les stat cards
- **Status rings** animes (online/offline/idle)
- **Fil d'ariane** (breadcrumbs) dynamique
- **Confetti** sur actions reussies
- **Tableaux triables** (clic sur en-tetes)
- **Bordures gradient** animees

### 🚀 Fonctionnalites
- **Multi-langue FR/EN** (switch instantane sans rechargement)
- **Statistiques par channel** Discord
- **@mention autocomplete** dans Controle Bot
- **Messages texte** (plus d'embed force)
- **Bouton deconnexion** Owner + Testeur
- **Nombre de membres reel** via Discord API

### 👥 Dashboard Testeur
- **Page Home testeur** avec branding complet
- **Page Overview testeur** (stats + annonces recentes)
- **Chat et DM repares** (affichage + envoi)
- **Test Lab** avec gestion d'erreurs

### 🖥️ Technique
- **Support macOS** (build via GitHub Actions)
- **Installeur NSIS Windows** (anti-virus friendly)
- **Correction precision BigInt** (IDs Discord)
- **Backend auto-detection** local/distant (Nowheberg)
- **Lien Discord** ouvre navigateur/app natif

---

## Changelog v2.0 — 21/06/2026

### ⚡ Core
- Migration complete vers **Electron**
- Backend **FastAPI** heberge sur Nowheberg
- Dashboard **Owner + Testeur**
- Ping API en temps reel

### 📋 Modules
- Chat testeurs avec upload fichiers
- Test Lab simulateur de commandes
- Bugs Reports + Taches + Annonces
- Leaderboard (membres + serveurs)
- Suggestions testeurs
- Bot Info live depuis Discord API
- Controle Bot (embeds, slowmode, purge)
- Comparateur de membres
- Statistiques avancees

### 🎨 Design
- Themes couleur personnalisables
- Mode maintenance
- Liquid Glass (mode Apple)
- Recherche globale (Ctrl+K)
- Session tracker + Historique connexions

---

## Installation

### Windows
Telecharger `Silver.App.Setup.2.2.0.exe` depuis [Releases](https://github.com/Tib688/SilverApp/releases), lancer l'installeur.

### macOS
Telecharger le .zip macOS depuis [Releases](https://github.com/Tib688/SilverApp/releases), extraire, puis :
1. Clic droit sur **Silver App.app** → **Ouvrir** → **Ouvrir**
2. Si "app endommagee" : `xattr -cr Silver\ App.app` dans le Terminal
