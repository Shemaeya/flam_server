# Flam Server - Résumé du Projet

## 🎯 Objectif
Serveur API complet pour l'application Flam de livraison de gaz en Côte d'Ivoire, développé avec NestJS, Prisma et MySQL.

## ✅ Fonctionnalités Implémentées

### 🔐 Authentication Module
- Inscription/Connexion avec email/password
- JWT + Refresh tokens
- Sécurité avec bcrypt
- Gestion des erreurs centralisée

### 👤 Users Module
- CRUD utilisateur complet
- Gestion des profils
- Mise à jour des informations
- Gestion des tokens FCM pour notifications

### 🏠 Addresses Module
- CRUD adresses utilisateur
- Vérification des zones de service
- Gestion des adresses par défaut
- Géolocalisation intégrée

### 🛍️ Products Module
- Gestion des marques (Total, Oryx, Petroci, Shell)
- Catégories de gaz (B6, B12, B28, B50)
- Types de gaz (Butane, Propane, Mixte)
- Système de produits relationnel
- Recherche et filtres avancés

### 📦 Orders Module
- Création de commandes complètes
- Gestion des statuts (pending → delivered)
- Système d'achat/recharge
- Calcul automatique des totaux
- Gestion des annulations

### 🚚 Delivery Module
- Zones de livraison configurables
- Calcul de prix dynamique (zone + distance + heure)
- Règles de tarification flexibles
- Support livraison urgente
- Géolocalisation des zones

### 🔔 Notifications Module
- Notifications automatiques par statut
- Types : ORDER, PROMOTION, SYSTEM
- Gestion des notifications lues/non lues
- Support multilingue

### ⭐ Reviews Module
- Système d'avis 1-5 étoiles
- Commentaires optionnels
- Calcul automatique des moyennes
- Validation des commandes livrées

## 🏗️ Architecture Technique

### Stack Technologique
- **Backend**: NestJS 11.x + TypeScript
- **Base de données**: MySQL 8.0 + Prisma ORM
- **Authentification**: JWT + Passport
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Containerisation**: Docker + Docker Compose

### Structure Modulaire
```
src/
├── modules/           # 8 modules métier
├── common/           # Utilitaires partagés
├── prisma/           # Configuration base de données
└── main.ts           # Point d'entrée
```

### Base de Données
- **12 tables** principales avec relations
- **Indexes** optimisés pour les performances
- **Contraintes** de données strictes
- **Seeds** avec données de test complètes

## 🚀 Déploiement

### Développement
```bash
npm run setup          # Configuration automatique
npm run start:dev      # Serveur de développement
```

### Production
```bash
docker-compose up -d   # Déploiement Docker
```

### Documentation
- **Swagger UI**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health

## 📊 Données de Test

### Comptes Utilisateurs
- `admin@flam.ci` / `password123`
- `john@example.com` / `password123`
- `jane@example.com` / `password123`

### Données Pré-chargées
- **4 marques** de gaz (Total, Oryx, Petroci, Shell)
- **4 catégories** (B6, B12, B28, B50)
- **3 types** de gaz (Butane, Propane, Mixte)
- **36 produits** combinés
- **3 magasins** avec stocks
- **3 zones** de livraison (Cocody, Plateau, Yopougon)
- **Règles de tarification** dynamiques

## 🔒 Sécurité

- Authentification JWT robuste
- Validation stricte des données
- Protection CORS configurée
- Hachage sécurisé des mots de passe
- Gestion centralisée des erreurs

## 📈 Performance

- **Pagination** sur toutes les listes
- **Indexes** de base de données optimisés
- **Cache** Redis prêt (configuration)
- **Health checks** pour monitoring

## 🌍 Internationalisation

- Support **FR/EN** dans les messages API
- **Timezones** configurés pour Côte d'Ivoire
- **Devises** en FCFA

## 🎯 Conformité au Cahier des Charges

✅ **Tous les modules** demandés implémentés
✅ **Architecture** propre et modulaire
✅ **Documentation** Swagger complète
✅ **Docker** ready pour déploiement
✅ **Seeds** avec données fictives
✅ **Sécurité** et validation robustes
✅ **Code** clair, commenté et extensible

## 🚀 Prêt pour la Production

Le serveur est **entièrement fonctionnel** et prêt pour :
- Intégration avec l'app Flutter
- Déploiement en production
- Extension future (WebSocket, microservices)
- Monitoring et analytics

---

**Flam Team** - Livraison de gaz en Côte d'Ivoire 🇨🇮
