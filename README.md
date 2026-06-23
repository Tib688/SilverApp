# Silver App v2.1

> Dashboard Electron pour Silver Bot — par Tib

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
Telecharger `Silver.App.Setup.2.1.0.exe` depuis [Releases](https://github.com/Tib688/SilverApp/releases), lancer l'installeur.

### macOS
Telecharger `Silver.App-2.1.0-mac.zip` depuis [Releases](https://github.com/Tib688/SilverApp/releases), extraire, puis :
1. Clic droit sur **Silver App.app** → **Ouvrir** → **Ouvrir**
2. Si "app endommagee" : `xattr -cr Silver\ App.app` dans le Terminal
