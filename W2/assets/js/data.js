// Path
const indexPath = "./index.html";
const loginPath = "./login.html";
const dashboardPath = "./dashboard.html";

// Alert
const alertType = {
  success: "success",
  warning: "warning",
  error: "error"
};

const alertIcon = {
  success: "fa-check",
  warning: "fa-exclamation-triangle",
  error: "fa-exclamation-circle"
};

// User Data
const userData = {
  username: "john",
  password: "1234",
  key: "username"
};

// Login
const isLoginKey = "login now";
const loginAlert = {
  success: "Login success",
  wrong: "Username or password is wrong",
  empty: "Username or password is empty"
};

// Chart Color
const listColor = ["brown", "black", "blue", "green", "yellow", "orange", "red"];

// Table
const addDeviceAlert = {
  success: "Add device success",
  empty: "Device name or IP is empty",
};

let dashboardData = [
  {
    device: "TV",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 50
  },
  {
    device: "Reg",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 100
  },
  {
    device: "Laptop",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 75
  },
  {
    device: "TV",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 50
  },
  {
    device: "Reg",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 100
  },
  {
    device: "Laptop",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "127.0.0.2",
    createdDate: "2021-05-31",
    powerConsumption: 75
  }
];
const dashboardMetaData = {
  dataKey: "Dashboard Data",
  attributes: ["device", "macAddress", "ip", "createdDate", "powerConsumption"],
  columnNames: ["Devices", "MAC Address", "IP", "Created Date", "Power Consumption (Kw/H)"],
  itemPerPage: 5,
  pageKey: "Dashboard Page"
};

const action = {
  on: "Turn On",
  off: "Turn Off",
  sleep: "Sleep"
};

let logsData = [
  {
    deviceId: "1",
    name: "TV",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "2",
    name: "Reg",
    action: action.off,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "3",
    name: "Temp",
    action: action.sleep,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "4",
    name: "Hello",
    action: action.sleep,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "5",
    name: "TV",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "6",
    name: "Pink",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "7",
    name: "Help",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "8",
    name: "TV",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "6",
    name: "Pink",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "7",
    name: "Help",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "8",
    name: "TV",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "6",
    name: "Pink",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "7",
    name: "Help",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  },
  {
    deviceId: "8",
    name: "TV",
    action: action.on,
    date: "2022-12-04",
    powerConsumption: 100
  }
];
const logsMetaData = {
  dataKey: "Logs Data",
  attributes: ["deviceId", "name", "action", "date", "powerConsumption"],
  columnNames: ["Device ID", "Name", "Action", "Date", "Power Consumption (Kw/H)"],
  itemPerPage: 5,
  pageKey: "Logs Page"
};
