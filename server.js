const http = require("http");
const routerHandler = require("./routes/router");
const server = http.createServer(routerHandler);

server.listen(3000, "127.0.0.1", () => {
  console.log("listening localhost:3000");
});