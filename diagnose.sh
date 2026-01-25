#!/bin/bash

# Event Hub - Troubleshooting & Diagnostics Script
# Helps identify common setup issues

echo "🔍 Event Hub Authentication - Diagnostics"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Node.js version
echo "1. Checking Node.js version..."
NODE_VERSION=$(node -v 2>&1)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
    if [[ $NODE_VERSION == v1[89]* ]] || [[ $NODE_VERSION == v2* ]]; then
        echo -e "${GREEN}✓${NC} Node.js version is compatible (18+)"
    else
        echo -e "${YELLOW}⚠${NC}  Node.js version may be outdated. Recommended: 18+"
    fi
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
fi
echo ""

# Check 2: Package installation
echo "2. Checking package installation..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
    
    # Check for critical packages
    if [ -d "node_modules/next-auth" ]; then
        echo -e "${GREEN}✓${NC} next-auth installed"
    else
        echo -e "${RED}✗${NC} next-auth not found. Run: npm install"
    fi
    
    if [ -d "node_modules/@prisma/client" ]; then
        echo -e "${GREEN}✓${NC} @prisma/client installed"
    else
        echo -e "${RED}✗${NC} @prisma/client not found. Run: npm install"
    fi
else
    echo -e "${RED}✗${NC} node_modules not found. Run: npm install"
fi
echo ""

# Check 3: Environment variables
echo "3. Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check for required variables
    if grep -q "NEXTAUTH_SECRET=" .env; then
        SECRET=$(grep "NEXTAUTH_SECRET=" .env | cut -d '=' -f2)
        if [ -z "$SECRET" ] || [ "$SECRET" == "your-nextauth-secret-here" ]; then
            echo -e "${RED}✗${NC} NEXTAUTH_SECRET not set or using default"
        else
            echo -e "${GREEN}✓${NC} NEXTAUTH_SECRET is configured"
        fi
    else
        echo -e "${RED}✗${NC} NEXTAUTH_SECRET not found in .env"
    fi
    
    if grep -q "GOOGLE_CLIENT_ID=" .env; then
        CLIENT_ID=$(grep "GOOGLE_CLIENT_ID=" .env | cut -d '=' -f2)
        if [ -z "$CLIENT_ID" ] || [ "$CLIENT_ID" == "your-google-client-id-here" ]; then
            echo -e "${RED}✗${NC} GOOGLE_CLIENT_ID not set or using default"
        else
            echo -e "${GREEN}✓${NC} GOOGLE_CLIENT_ID is configured"
        fi
    else
        echo -e "${RED}✗${NC} GOOGLE_CLIENT_ID not found in .env"
    fi
    
    if grep -q "GOOGLE_CLIENT_SECRET=" .env; then
        CLIENT_SECRET=$(grep "GOOGLE_CLIENT_SECRET=" .env | cut -d '=' -f2)
        if [ -z "$CLIENT_SECRET" ] || [ "$CLIENT_SECRET" == "your-google-client-secret-here" ]; then
            echo -e "${RED}✗${NC} GOOGLE_CLIENT_SECRET not set or using default"
        else
            echo -e "${GREEN}✓${NC} GOOGLE_CLIENT_SECRET is configured"
        fi
    else
        echo -e "${RED}✗${NC} GOOGLE_CLIENT_SECRET not found in .env"
    fi
    
    if grep -q "DATABASE_URL=" .env; then
        DB_URL=$(grep "DATABASE_URL=" .env | cut -d '=' -f2)
        if [ -z "$DB_URL" ] || [ "$DB_URL" == "your-database-url-here" ]; then
            echo -e "${RED}✗${NC} DATABASE_URL not set or using default"
        else
            echo -e "${GREEN}✓${NC} DATABASE_URL is configured"
        fi
    else
        echo -e "${RED}✗${NC} DATABASE_URL not found in .env"
    fi
else
    echo -e "${RED}✗${NC} .env file not found. Copy from .env.example"
fi
echo ""

# Check 4: Prisma setup
echo "4. Checking Prisma configuration..."
if [ -f "prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓${NC} Prisma schema exists"
    
    # Check if Prisma client is generated
    if [ -d "node_modules/.prisma" ]; then
        echo -e "${GREEN}✓${NC} Prisma client generated"
    else
        echo -e "${YELLOW}⚠${NC}  Prisma client not generated. Run: npx prisma generate"
    fi
    
    # Check for migrations
    if [ -d "prisma/migrations" ]; then
        MIGRATION_COUNT=$(find prisma/migrations -type d -mindepth 1 | wc -l)
        echo -e "${GREEN}✓${NC} Migrations directory exists ($MIGRATION_COUNT migrations)"
    else
        echo -e "${YELLOW}⚠${NC}  No migrations found. Run: npx prisma migrate dev"
    fi
else
    echo -e "${RED}✗${NC} Prisma schema not found"
fi
echo ""

# Check 5: Critical files
echo "5. Checking critical authentication files..."
FILES=(
    "middleware.ts"
    "app/api/auth/[...nextauth]/route.ts"
    "app/signup/page.tsx"
    "app/api/profile/complete/route.ts"
    "components/authprovider.tsx"
    "types/next-auth.d.ts"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done
echo ""

# Check 6: PostgreSQL connection (if database URL is set)
echo "6. Checking database connection..."
if [ -f ".env" ]; then
    DB_URL=$(grep "DATABASE_URL=" .env | cut -d '=' -f2)
    if [ ! -z "$DB_URL" ] && [ "$DB_URL" != "your-database-url-here" ]; then
        echo "Testing database connection..."
        npx prisma db execute --stdin <<< "SELECT 1;" &>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓${NC} Database connection successful"
        else
            echo -e "${RED}✗${NC} Database connection failed"
            echo "  Check your DATABASE_URL and ensure PostgreSQL is running"
        fi
    else
        echo -e "${YELLOW}⚠${NC}  DATABASE_URL not configured, skipping connection test"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Cannot test connection without .env file"
fi
echo ""

# Summary
echo "=========================================="
echo "📋 Diagnostics Summary"
echo "=========================================="
echo ""
echo "Common next steps:"
echo ""
echo "If you see missing packages:"
echo "  → npm install"
echo ""
echo "If .env is not configured:"
echo "  → cp .env.example .env"
echo "  → Edit .env and add your credentials"
echo ""
echo "If Prisma client not generated:"
echo "  → npx prisma generate"
echo ""
echo "If migrations not run:"
echo "  → npx prisma migrate dev"
echo ""
echo "If database connection fails:"
echo "  → Ensure PostgreSQL is running"
echo "  → Check DATABASE_URL format"
echo ""
echo "Once everything is set up:"
echo "  → npm run dev"
echo "  → Visit http://localhost:3000"
echo ""
echo "For detailed help, see:"
echo "  → AUTHENTICATION_GUIDE.md"
echo "  → QUICK_REFERENCE.md"
echo ""
