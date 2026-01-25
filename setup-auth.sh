#!/bin/bash

# Event Hub - Authentication Setup Script
# This script helps you set up the authentication system quickly

echo "🎓 Event Hub Authentication Setup"
echo "=================================="
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the eventhub directory"
    exit 1
fi

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 2: Check for .env file
if [ ! -f ".env" ]; then
    echo "⚙️  Step 2: Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and fill in the following:"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo "   - DATABASE_URL"
    echo ""
    read -p "Press Enter when you've updated .env file..."
else
    echo "✅ .env file already exists"
fi
echo ""

# Step 3: Generate Prisma Client
echo "🗄️  Step 3: Setting up database..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Step 4: Run migrations
echo "📊 Step 4: Running database migrations..."
read -p "Do you want to run database migrations? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma migrate dev --name add_auth_fields
    echo "✅ Migrations completed"
else
    echo "⏭️  Skipped migrations"
fi
echo ""

# Step 5: Configuration reminder
echo "🔧 Step 5: Configuration checklist"
echo "Please ensure you've configured:"
echo "   1. Google OAuth credentials in Google Cloud Console"
echo "   2. Authorized redirect URIs:"
echo "      - http://localhost:3000/api/auth/callback/google"
echo "   3. Allowed email domains in app/api/auth/[...nextauth]/route.ts"
echo "   4. Database connection (PostgreSQL)"
echo ""

# Step 6: Ready to start
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "📚 For detailed setup instructions, see AUTHENTICATION_GUIDE.md"
