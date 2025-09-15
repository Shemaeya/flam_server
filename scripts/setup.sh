#!/bin/bash

echo "🚀 Setting up Flam Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Check if database is accessible
echo "🔍 Checking database connection..."
if npm run prisma:push 2>/dev/null; then
    echo "✅ Database connection successful"
    
    # Run seeds
    echo "🌱 Seeding database..."
    npm run prisma:seed
    
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📚 Next steps:"
    echo "1. Update .env with your database credentials"
    echo "2. Run 'npm run start:dev' to start the development server"
    echo "3. Visit http://localhost:3000/api/docs for API documentation"
    echo ""
    echo "🔑 Test credentials:"
    echo "- admin@flam.ci / password123"
    echo "- john@example.com / password123"
    echo "- jane@example.com / password123"
else
    echo "❌ Database connection failed. Please check your database configuration in .env"
    echo "💡 Make sure MySQL is running and accessible"
fi
