console.log("Server.js is starting");

("use strict");

const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
});
