#!/bin/bash

# Simple deployment script for Paystack Webhook Service

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Paystack Webhook Service Deployment Script${NC}"
echo -e "-------------------------------------"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git is not installed. Please install git first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Build the project
echo -e "\n${YELLOW}Building the project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Check if PAYSTACK_SECRET_KEY environment variable is set
if [ -z "$PAYSTACK_SECRET_KEY" ]; then
    echo -e "${YELLOW}Warning: PAYSTACK_SECRET_KEY environment variable is not set.${NC}"
    echo -e "You will need to set this in your deployment environment."
fi

# Ask for deployment target
echo -e "\n${YELLOW}Where would you like to deploy?${NC}"
echo "1. Heroku"
echo "2. Vercel"
echo "3. Netlify"
echo "4. GitHub Pages (static frontend only)"
echo "5. Custom server (via SSH)"
echo "6. Exit"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        # Heroku deployment
        if ! command -v heroku &> /dev/null; then
            echo -e "${RED}Error: Heroku CLI is not installed. Please install it first.${NC}"
            echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        read -p "Enter your Heroku app name: " app_name
        
        echo -e "\n${YELLOW}Deploying to Heroku...${NC}"
        git add .
        git commit -m "Prepare for Heroku deployment"
        
        # Check if app exists, create if not
        if ! heroku apps:info --app $app_name &> /dev/null; then
            echo "Creating new Heroku app: $app_name"
            heroku create $app_name
        fi
        
        # Set environment variables
        echo "Setting environment variables..."
        heroku config:set NODE_ENV=production --app $app_name
        
        if [ ! -z "$PAYSTACK_SECRET_KEY" ]; then
            heroku config:set PAYSTACK_SECRET_KEY=$PAYSTACK_SECRET_KEY --app $app_name
        else
            echo -e "${YELLOW}Remember to set PAYSTACK_SECRET_KEY in Heroku dashboard${NC}"
        fi
        
        # Deploy
        git push heroku main
        
        echo -e "${GREEN}Deployed to Heroku successfully!${NC}"
        echo "Your app is available at: https://$app_name.herokuapp.com"
        ;;
        
    2)
        # Vercel deployment
        if ! command -v vercel &> /dev/null; then
            echo -e "${RED}Error: Vercel CLI is not installed. Please install it first.${NC}"
            echo "Run: npm install -g vercel"
            exit 1
        fi
        
        echo -e "\n${YELLOW}Deploying to Vercel...${NC}"
        vercel
        
        echo -e "${GREEN}Deployment to Vercel initiated!${NC}"
        echo "Follow the instructions in the Vercel CLI to complete deployment."
        ;;
        
    3)
        # Netlify deployment
        if ! command -v netlify &> /dev/null; then
            echo -e "${RED}Error: Netlify CLI is not installed. Please install it first.${NC}"
            echo "Run: npm install -g netlify-cli"
            exit 1
        fi
        
        echo -e "\n${YELLOW}Deploying to Netlify...${NC}"
        netlify deploy
        
        echo -e "${GREEN}Deployment to Netlify initiated!${NC}"
        echo "Follow the instructions in the Netlify CLI to complete deployment."
        ;;
        
    4)
        # GitHub Pages deployment (frontend only)
        echo -e "\n${YELLOW}Deploying static frontend to GitHub Pages...${NC}"
        echo -e "${RED}Note: This will only deploy the frontend. The backend API will not work.${NC}"
        
        # Create gh-pages branch
        git checkout -b gh-pages
        
        # Build for GitHub Pages
        npm run build
        
        # Push to GitHub Pages
        git add dist -f
        git commit -m "Deploy to GitHub Pages"
        git push origin gh-pages -f
        
        echo -e "${GREEN}Static frontend deployed to GitHub Pages!${NC}"
        echo "Your frontend will be available at: https://yourusername.github.io/your-repo-name"
        
        # Return to original branch
        git checkout -
        ;;
        
    5)
        # Custom server deployment via SSH
        read -p "Enter server address (user@host): " server
        read -p "Enter destination directory: " dest_dir
        
        echo -e "\n${YELLOW}Deploying to custom server via SSH...${NC}"
        
        # Create a tarball of the build
        npm run build
        tar -czf build.tar.gz dist package.json package-lock.json Procfile
        
        # Copy to server
        scp build.tar.gz $server:~
        
        # SSH into server and deploy
        ssh $server << EOF
            mkdir -p $dest_dir
            tar -xzf build.tar.gz -C $dest_dir
            cd $dest_dir
            npm ci --production
            # If you're using PM2
            command -v pm2 &> /dev/null && pm2 restart $dest_dir/dist/index.js || echo "PM2 not found, please start the service manually"
            rm ~/build.tar.gz
EOF
        
        # Clean up local tarball
        rm build.tar.gz
        
        echo -e "${GREEN}Deployed to custom server successfully!${NC}"
        ;;
        
    6)
        echo -e "${YELLOW}Exiting deployment script.${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}Remember to set up your environment variables in your deployment platform.${NC}"