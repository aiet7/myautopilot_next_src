const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
require("dotenv").config({ path: ".env" });

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
console.log("Server launched!")

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
