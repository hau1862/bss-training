const Koa = require('koa');
const Parser = require("koa-bodyparser");
const Cors = require("@koa/cors");
const router = require("./router");
const App = new Koa();
const port = 8000;


App.use(Parser())
  .use(Cors())
  .use(router.routes())
  .listen(port, function () {
    console.log("Server running on http://localhost:" + port);
  });
