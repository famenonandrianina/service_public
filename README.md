# Plateforme des Services Publics Locaux

Application MERN Stack moderne pour la facilitation de l'accès aux droits et aux services administratifs des citoyens.

## 🚀 Fonctionnalités

### Citoyens
- **Authentification sécurisée** (JWT)
- **Tableau de bord personnalisé** : Vue d'ensemble des démarches en cours
- **Dépôt de demandes** : Formulaire guidé avec upload de documents (Multer)
- **Suivi en temps réel** : Notifications de changement de statut
- **Réclamations** : Messagerie directe avec l'administration
- **Gestion du profil** : Mise à jour des informations et mot de passe

### Administration
- **Dashboard Statistique** : Visualisation de l'activité (Chart.js)
- **Instruction des dossiers** : Accepter, Refuser ou Clôturer les demandes
- **Gestion du Catalogue** : CRUD complet sur les services offerts
- **Gestion des Citoyens** : Activation/Désactivation des comptes
- **Communication** : Publication d'annonces et d'alertes locales

## 🛠️ Stack Technique

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Chart.js, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS, Multer
- **Architecture**: REST API, Middleware de sécurité (Helmet, Cors), Gestion d'erreurs centrale

## 📥 Installation

```bash
# 1. Cloner le projet ou naviguer dans le dossier
cd c:/teste

# 2. Configurer le Backend
cd backend
npm install
# Créez un fichier .env (déjà configuré par défaut)
# Lancez le seeding pour avoir les données de test
node seed.js

# 3. Lancer le Backend
npm run dev

# 4. Configurer et Lancer le Frontend (dans un autre terminal)
cd ../frontend
npm install
npm run dev
```

## 🔑 Comptes de Test

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| **Administrateur** | `admin@test.com` | `admin123` |
| **Citoyen** | `citoyen@test.com` | `citoyen123` |

---
*Réalisé pour faciliter la proximité entre l'administration et les citoyens.*
