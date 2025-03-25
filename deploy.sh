#!/bin/bash

# Build the project
npm run build:prod

# Add all changes
git add .

# Commit changes
git commit -m "Deploy: $(date)"

# Push to GitHub
git push origin main

# SSH into Hostinger and pull changes
ssh your-username@your-domain.com "cd public_html && git pull origin main" 