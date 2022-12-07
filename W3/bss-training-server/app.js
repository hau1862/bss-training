const Koa = require("koa");
const router = require("koa-router");
const app = new Koa();
const _ = router();

app.use(function () {
  this.body = 'Hello world!';
});



app.listen(3000, function () {
  console.log('Server running on https://localhost:3000');
});
