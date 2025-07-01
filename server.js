// ~/notify_server.js
const http = require("http");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
  // CORS対応
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

        // terminal-notifierで通知送信
        exec(
          `terminal-notifier -message "${message}" -title "${title}" -sound default`,
          (error) => {
            if (error) {
              console.error("通知エラー:", error);
            } else {
              console.log(`通知送信: [${title}] ${message}`);
            }
          }
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ status: "success", message: "Notification sent" })
        );
      } catch (e) {
        console.error("JSONパースエラー:", e);
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
  console.log(`通知サーバーを起動: http://localhost:${PORT}`);
});
