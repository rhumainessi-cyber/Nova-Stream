
#!/bin/bash

# NovaStream Startup Script
echo "⚡ Starting NovaStream Platform..."

# Check for environment variables
if [ ! -f .env ]; then
    echo "⚠️ Warning: .env file not found. Creating a default one..."
    echo "DB_PASSWORD=$(openssl rand -base64 12)" > .env
    echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
    echo "ENCRYPTION_KEY=$(openssl rand -hex 16)" >> .env
fi

# Bring up containers
docker-compose up -d

echo "✅ System is starting!"
echo "📍 Frontend: http://localhost"
echo "📍 API: http://localhost:3000"
echo "🛠️ Database: Running on port 5432"
