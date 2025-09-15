# Flam Server - API Backend

API backend pour le service de livraison de gaz Flam en Côte d'Ivoire, développé avec NestJS, Prisma et MySQL.

## 🚀 Fonctionnalités

### Modules principaux
- **Authentication** - JWT avec refresh tokens
- **Users** - Gestion des profils utilisateurs
- **Addresses** - Gestion des adresses de livraison
- **Products** - Catalogue de produits (marques, catégories, types)
- **Orders** - Système de commandes complet
- **Delivery** - Zones de livraison et calculs de prix dynamiques
- **Notifications** - Système de notifications push
- **Reviews** - Avis et notes sur les produits

### Fonctionnalités avancées
- ✅ Calcul de prix de livraison dynamique (zone + distance + heure)
- ✅ Gestion multilingue (FR/EN)
- ✅ Système de stock par magasin
- ✅ Distinction achat/recharge de bouteilles
- ✅ Zones de livraison avec géolocalisation
- ✅ Notifications automatiques
- ✅ Système d'avis et notes
- ✅ Documentation API complète (Swagger)

## 🛠️ Technologies

- **Framework**: NestJS 11.x
- **Base de données**: MySQL 8.0
- **ORM**: Prisma 5.x
- **Authentification**: JWT + Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Containerisation**: Docker & Docker Compose

## 📋 Prérequis

- Node.js 18+ (recommandé 20+)
- MySQL 8.0+
- Docker & Docker Compose (optionnel)

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd flam_server
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos configurations :
```env
DATABASE_URL="mysql://root:password@localhost:3306/flam_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
```

### 4. Base de données
```bash
# Générer le client Prisma
npm run prisma:generate

# Appliquer les migrations
npm run prisma:migrate

# Peupler la base avec des données de test
npm run prisma:seed
```

### 5. Démarrer l'application
```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🐳 Docker

### Développement
```bash
# Démarrer MySQL et Redis
docker-compose -f docker-compose.dev.yml up -d

# Démarrer l'API en local
npm run start:dev
```

### Production
```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f api
```

## 📚 Documentation API

Une fois l'application démarrée, la documentation Swagger est disponible à :
- **URL**: http://localhost:3000/api/docs
- **Authentification**: Utilisez le token JWT dans l'interface Swagger

## 🔑 Comptes de test

Après avoir exécuté les seeds, vous pouvez utiliser ces comptes :

```
Email: admin@flam.ci
Password: password123

Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## 📊 Endpoints principaux

### Authentication
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/refresh` - Rafraîchir token
- `POST /auth/logout` - Déconnexion

### Products
- `GET /products` - Liste des produits
- `GET /products/brands` - Marques disponibles
- `GET /products/categories` - Catégories (B6, B12, B28, B50)
- `GET /products/types` - Types de gaz (Butane, Propane, Mixte)

### Orders
- `POST /orders` - Créer une commande
- `GET /orders` - Historique des commandes
- `GET /orders/:id` - Détail d'une commande
- `PATCH /orders/:id/cancel` - Annuler une commande

### Delivery
- `POST /delivery/calculate-price` - Calculer prix de livraison
- `GET /delivery/zones` - Zones de livraison disponibles

### Addresses
- `GET /addresses` - Adresses de l'utilisateur
- `POST /addresses` - Ajouter une adresse
- `PATCH /addresses/:id/set-default` - Définir par défaut

## 🏗️ Architecture

```
src/
├── modules/           # Modules métier
│   ├── auth/         # Authentification
│   ├── users/        # Gestion utilisateurs
│   ├── addresses/    # Adresses de livraison
│   ├── products/     # Catalogue produits
│   ├── orders/       # Commandes
│   ├── delivery/     # Livraison et zones
│   ├── notifications/# Notifications
│   └── reviews/      # Avis et notes
├── common/           # Utilitaires communs
│   ├── decorators/   # Décorateurs personnalisés
│   ├── filters/      # Filtres d'exception
│   ├── guards/       # Guards d'authentification
│   └── interceptors/ # Intercepteurs
└── prisma/           # Configuration Prisma
```

## 🔒 Sécurité

- Authentification JWT avec refresh tokens
- Validation stricte des données d'entrée
- Protection CORS configurée
- Hachage des mots de passe avec bcrypt
- Gestion centralisée des erreurs

## 🚀 Déploiement

### Variables d'environnement requises
```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Commandes de déploiement
```bash
# Build pour production
npm run build

# Démarrer en production
npm run start:prod

# Avec PM2
pm2 start dist/main.js --name flam-api
```

## 📈 Monitoring

- Health check endpoint : `GET /health`
- Logs structurés avec timestamps
- Métriques de performance disponibles

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email: support@flam.ci
- Documentation: http://localhost:3000/api/docs

---

**Flam Team** - Livraison de gaz en Côte d'Ivoire 🇨🇮
