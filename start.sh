#!/bin/bash

# Script de démarrage rapide pour le serveur Flam
echo "🚀 Démarrage du serveur Flam..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si MySQL est installé
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si le fichier .env existe
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "⚠️  Veuillez configurer le fichier .env avec vos paramètres MySQL"
    echo "   DATABASE_URL=\"mysql://root:password@localhost:3306/flam_db\""
    echo "   JWT_SECRET=\"your-super-secret-jwt-key\""
    echo "   JWT_REFRESH_SECRET=\"your-super-secret-refresh-key\""
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npm run prisma:generate

# Appliquer les migrations
echo "🗄️  Application des migrations..."
npm run prisma:migrate

# Peupler la base avec des données de test
echo "🌱 Peuplement de la base de données..."
npm run prisma:seed

# Démarrer le serveur
echo "🚀 Démarrage du serveur..."
echo "📱 L'API sera accessible sur: http://localhost:3000"
echo "📚 Documentation Swagger: http://localhost:3000/api/docs"
echo "🔍 Health Check: http://localhost:3000/health"
echo ""
echo "🔑 Comptes de test:"
echo "   - admin@flam.ci / password123"
echo "   - john@example.com / password123"
echo "   - jane@example.com / password123"
echo ""

npm run start:dev



