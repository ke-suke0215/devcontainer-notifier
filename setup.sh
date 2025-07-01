#!/bin/bash

# Dev Container Notification Server Setup Script
# This script automates terminal-notifier installation and server startup

set -e  # Stop on error

echo "🚀 Starting Dev Container Notification Server setup..."

# Check and install terminal-notifier
if ! command -v terminal-notifier &> /dev/null; then
    echo "📥 Installing terminal-notifier..."
    brew install terminal-notifier
else
    echo "✅ terminal-notifier is already installed"
fi

# Notification permission guidance
echo "⚠️  Important: macOS notification permission may be required on first run\n"

# Send test notification
echo "📨 Sending test notification..."
# terminal-notifier -message "Setup completed!" -title "Dev Container Notifier Test" -sound default
terminal-notifier -message "Successfully setup!" -title "Dev Container Notifier Test" -sound default

echo ""

# Display usage instructions
echo "📋 Usage after server startup:"
echo "curl -s -X POST http://localhost:37842/notify \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"title\": \"Task Complete\", \"message\": \"Build completed successfully\"}'"
echo ""

# Start server
node server.js