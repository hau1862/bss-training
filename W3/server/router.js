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

router.get("/dashboard", function (context, next) {
  const data = JSON.parse(fs.readFileSync(dataSource, fileOptions));
  context.response.body = { data: data.dashboardData, metadata: data.dashboardMetaData };
  context.response.status = 200;
});

router.get("/logs", function (context, next) {
  const data = JSON.parse(fs.readFileSync(dataSource, fileOptions));
  context.response.body = { data: data.logsData, metadata: data.logsMetaData };
  context.response.status = 200;
});

router.post("/add-device", function (context, next) {
  const deviceInfo = context.request.body;
  const newDevice = {
    device: "TV",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 50,
    ...deviceInfo
  };

  const data = JSON.parse(fs.readFileSync(dataSource, fileOptions));
  data.dashboardData.push(newDevice);
  fs.writeFileSync(dataSource, JSON.stringify(data), fileOptions);

  context.response.status = 200;
  context.response.body = "Add Device Success";
});

router.post("/login", function (context, next, ...args) {

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
      context.response.body = { username, token: users[index].token, message: "Login success" };
    } else {
      context.response.body = { message: "Wrong username or password" };
    }
  } else {
    context.response.body = { message: "Username or password is empty" };
  }
});

router.get("/user", function (content, next) {
  const { token } = content.request.query;
  const { users } = JSON.parse(fs.readFileSync(dataSource, fileOptions));
  let length = users.length, i;
  for (i = 0; i < length; i++) {
    if (users[i].username + users[i].token === token) {
      break;
    }
  }
  if (i >= length) {
    context.response.status = 400;
  } else {
    content.response.body = { message: "Hello" };
  }
});

module.exports = router;
