# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Node.js HTTP server that provides desktop notification functionality for development environments. The server accepts POST requests and uses macOS's `terminal-notifier` to display system notifications.

## Architecture

- **Single-file application**: `server.js` contains the entire HTTP server implementation
- **HTTP API**: Single POST endpoint `/notify` that accepts JSON payloads with `title` and `message` fields
- **System integration**: Uses `terminal-notifier` command-line tool for macOS notifications
- **CORS enabled**: Configured to accept requests from any origin

## Running the Server

```bash
node server.js
```

The server runs on port 37842 and logs startup confirmation and notification events to the console.

## API Usage

Send POST requests to `http://localhost:37842/notify` with JSON body:
```json
{
  "title": "Your Title",
  "message": "Your Message"
}
```

## Dependencies

- Requires `terminal-notifier` to be installed on macOS for notifications to work
- Uses only Node.js built-in modules (`http`, `child_process`)

## Development Notes

- No package.json or external dependencies
- No build process required
- Server handles CORS preflight requests
- Error handling for JSON parsing and notification command execution