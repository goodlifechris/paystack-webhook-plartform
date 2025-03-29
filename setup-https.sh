#!/bin/bash

# Setup HTTPS for local development with self-signed certificates
# This script helps set up a local HTTPS development environment

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up HTTPS for local development${NC}"
echo -e "-------------------------------------"

# Check if OpenSSL is installed
if ! command -v openssl &> /dev/null; then
    echo -e "${RED}Error: OpenSSL is not installed. Please install it first.${NC}"
    exit 1
fi

# Create certs directory if it doesn't exist
mkdir -p certs

# Generate self-signed certificate
echo -e "\n${YELLOW}Generating self-signed certificate...${NC}"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -subj "/CN=localhost"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to generate certificates.${NC}"
    exit 1
fi

echo -e "${GREEN}Certificates generated successfully!${NC}"
echo -e "Private key: certs/key.pem"
echo -e "Certificate: certs/cert.pem"

# Create HTTPS server configuration
echo -e "\n${YELLOW}Creating HTTPS server configuration...${NC}"

cat > server/https.ts << EOF
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Certificate paths
const certPath = path.join(__dirname, '..', 'certs', 'cert.pem');
const keyPath = path.join(__dirname, '..', 'certs', 'key.pem');

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

export function createHttpsServer(requestListener) {
  return https.createServer(httpsOptions, requestListener);
}
EOF

echo -e "${GREEN}HTTPS configuration created successfully!${NC}"

# Update the main server file to use HTTPS
echo -e "\n${YELLOW}Updating server to use HTTPS...${NC}"

# Create a backup of the original server file
cp server/index.ts server/index.ts.bak

# Check if the server file contains createServer
if grep -q "createServer" server/index.ts; then
    # Replace the http server with https
    sed -i 's/import { createServer } from "http";/import { createHttpsServer } from ".\/https.js";/' server/index.ts
    sed -i 's/const httpServer = createServer(app);/const httpServer = createHttpsServer(app);/' server/index.ts
    
    echo -e "${GREEN}Server updated to use HTTPS!${NC}"
else
    echo -e "${YELLOW}Could not automatically update server file.${NC}"
    echo -e "Please manually update server/index.ts to use the createHttpsServer from './https.js'"
    echo -e "Example: const httpServer = createHttpsServer(app);"
fi

echo -e "\n${GREEN}HTTPS setup complete!${NC}"
echo -e "${YELLOW}Notes:${NC}"
echo -e "1. The certificates are self-signed, so your browser will show a security warning."
echo -e "2. You can access your server at: https://localhost:5000"
echo -e "3. For testing with mobile devices or external tools like Paystack,"
echo -e "   consider using a service like ngrok: ngrok http https://localhost:5000"
echo -e "\nTo start the server:"
echo -e "  npm run dev"
echo -e "\nTo restore the original server configuration:"
echo -e "  cp server/index.ts.bak server/index.ts"