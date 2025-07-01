# Dev Container Notification Server

A simple HTTP server for sending desktop notifications from development containers (Dev Container) to the host macOS.

## 💡 Usage Overview

1. **Start this server on the host PC** (macOS)
2. **Send HTTP requests from Dev Container** (any environment)
3. **Desktop notifications appear on macOS**

You can receive completion notifications when running Claude Code or other development tools in parallel.

## 🎯 Use Cases

- **Notifications from development containers**: Send notifications from Docker containers to the host machine
- **Parallel development work**: Completion notifications for multiple Claude Code sessions or development tasks
- **Long-running process completion**: Desktop notifications for build or test execution completion

## 📋 Requirements

- **macOS** (uses terminal-notifier)
- **Node.js** (v12 or higher recommended)
- **terminal-notifier** (installed via Homebrew)

## 🚀 Setup

### Run Setup Script

```bash
./setup.sh
```

This script automatically performs the following:
- Install terminal-notifier (if not already installed)
- Start the notification server

### Manual Setup (Optional)

For manual setup, follow these steps:

1. **Install terminal-notifier**
   ```bash
   brew install terminal-notifier
   ```

2. **Configure macOS Notification Permissions**
   > **Note**: terminal-notifier may request notification permission on first run. If notifications don't appear, enable terminal-notifier notification permission in macOS System Settings.

3. **Start the Server**
   ```bash
   node server.js
   ```

When the server starts, you'll see this message:

```
通知サーバーを起動: http://localhost:37842
```

## 📡 Usage

### Basic Notification Sending

```bash
curl -s -X POST http://localhost:37842/notify \
  -H "Content-Type: application/json" \
  -d '{"title": "Task Complete", "message": "Build completed successfully"}'
```

### Usage from Container

```bash
# Send notification after build completion
npm run build && curl -s -X POST http://host.docker.internal:37842/notify \
  -H "Content-Type: application/json" \
  -d '{"title": "Build Complete", "message": "Project build completed successfully"}'
```

### JavaScript Usage Example

```javascript
async function sendNotification(title, message) {
  try {
    const response = await fetch("http://localhost:37842/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message }),
    });

    const result = await response.json();
    console.log("Notification sent:", result);
  } catch (error) {
    console.error("Notification error:", error);
  }
}

// Usage example
sendNotification("Test Complete", "All tests passed successfully");
```

## 🔧 API Specification

### Endpoint

- **URL**: `http://localhost:37842/notify`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Format

```json
{
  "title": "Notification title (optional)",
  "message": "Notification message (optional)"
}
```

### Response Format

**Success:**

```json
{
  "status": "success",
  "message": "Notification sent"
}
```

**Error:**

```json
{
  "status": "error",
  "message": "Invalid JSON"
}
```

## 🛠️ Customization

### Changing Port Number

Edit line 54 in `server.js`:

```javascript
const PORT = 37842; // Change to any port number
```

## 🔒 Security Notes

- This server is intended for development environments and is not recommended for production use
- If you want to restrict external access, check your firewall settings

## 📝 License

MIT License

## 🤝 Contributing

Please report bugs or feature requests via Issues. Pull requests are welcome.