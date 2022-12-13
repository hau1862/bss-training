const Koa = require('koa');
const router = require("./router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const Server = new Koa();
const port = 8000;

Server.use(cors())
  .use(bodyParser())
  .use(router.routes())
  .listen(port, function () {
    console.log("Server running on http://localhost:" + port);
  });
