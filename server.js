// ~/notify_server.js
const http = require("http");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/notify") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const title = data.title || "Dev Container";
        const message = data.message || "Notification";

        // Send notification using terminal-notifier
        exec(
          `terminal-notifier -message "${message}" -title "${title}" -sound default`,
          (error) => {
            if (error) {
              console.error("Notification error:", error);
            } else {
              console.log(`Notification sent: [${title}] ${message}`);
            }
          }
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ status: "success", message: "Notification sent" })
        );
      } catch (e) {
        console.error("JSON parse error:", e);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "error", message: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = 37842;
server.listen(PORT, () => {
  console.log(`Notification server started: http://localhost:${PORT}`);
});
