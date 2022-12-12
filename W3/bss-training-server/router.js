const Router = require("koa-router");
const router = Router();
const fs = require("fs");
const appHost = "http://localhost:3000";
const dataSource = "./data.json";
const fileOptions = {
  encoding: "utf-8"
};

function randomToken() {
  return Math.floor(Math.random() * 100) + 1;
}

function validateString(string = "") {
  return string.length > 0 && !string.includes(" ");
}

router.post("/login", function (context, next, ...args) {
  context.body = "Router Test";
  const data = JSON.parse(fs.readFileSync(dataSource, fileOptions));
  const users = data.users;
  const { username, password } = context.request.body;

  if (users && users.length > 0 && validateString(username) && validateString(password)) {
    let length = users.length, index;

    for (index = 0; index < length; index++) {
      if (users[index].username === username && users[index].password === password) {
        break;
      }
    }

    if (index < length) {
      users[index].token = randomToken();
      fs.writeFileSync(dataSource, JSON.stringify(data), fileOptions);
      context.redirect(appHost + "/dashboard");
    } else {
      context.redirect(appHost + "/");
    }
  } else {
    context.redirect(appHost + "/");
  }
});

module.exports = router;
