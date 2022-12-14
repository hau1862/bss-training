const Router = require("koa-router");
const router = Router();
const appHost = "http://localhost:3000";
const dataPath = "./data.json";
const { readJSONFile, writeJSONFile, randomToken } = require("./library");

router.get("/dashboard", function (context, next) {
  const data = readJSONFile(dataPath);
  context.response.body = data.dashboard;
});

router.get("/logs", function (context, next) {
  const data = readJSONFile(dataPath);
  context.response.body = data.logs;
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

  const data = readJSONFile(dataPath);
  data.dashboard.data.push(newDevice);
  writeJSONFile(dataPath, data);
  context.response.body = { message: "Add device success" };
});

router.post("/login", function (context, next, ...args) {
  const data = readJSONFile(dataPath);
  const users = data.users;
  const loginData = context.request.body;
  let length = users.length, index;

  if (users && length > 0) {
    for (index = 0; index < length; index++) {
      if (users[index].username === loginData.username && users[index].password === loginData.password) {
        break;
      }
    }

    if (index < length) {
      users[index].token = randomToken();
      writeJSONFile(dataPath, data);
      context.response.body = { username: users[index].username, token: users[index].token, message: "Login success" };
    } else {
      context.response.body = { message: "Wrong username or password" };
    }
  } else {
    context.response.body = { message: "Username or password is empty" };
  }
});

router.get("/user", function (context, next) {
  const { username, token } = context.request.query;
  const { users } = readJSONFile(dataPath);
  let length = users.length, i;

  if (users && length > 0) {
    for (i = 0; i < length; i++) {
      if (users[i].username === username && users[i].token === parseInt(token)) {
        break;
      }
    }

    if (i >= length) {
      context.response.status = 400;
    } else {
      context.response.body = { message: "Hello" };
    }
  }
});

module.exports = router;
