const indexPath = "./index.html";
const loginPath = "./login.html";
const dashboardPath = "./dashboard.html";

const userData = {
  username: "john",
  password: "1234",
  key: "username"
};

const dashboardData = {
  defaultData: [
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
  ],
  key: "Dashboard Data"
};

const dashboardTableFormat = {
  device: "Devices",
  macAddress: "MAC Address",
  ip: "IP",
  createdDate: "Created Date",
  powerConsumption: "Power Consumption (Kw/H)"
};

const action = {
  on: "Turn On",
  off: "Turn Off",
  sleep: "Sleep"
}

const logsData = {
  defaultData: [
    {
      deviceId: "1",
      name: "TV",
      action: action.on,
      date: "2022-12-04",
      powerConsumption: 100
    },
    {
      deviceId: "2",
      name: "TV",
      action: action.on,
      date: "2022-12-04",
      powerConsumption: 100
    },
    {
      deviceId: "3",
      name: "TV",
      action: action.on,
      date: "2022-12-04",
      powerConsumption: 100
    },
    {
      deviceId: "4",
      name: "TV",
      action: action.on,
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
      name: "TV",
      action: action.on,
      date: "2022-12-04",
      powerConsumption: 100
    },
    {
      deviceId: "7",
      name: "TV",
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
  ],
  key: "Logs Data"
};

const logsTableFormat = {
  deviceId: "Devices ID #",
  name: "Name",
  action: "Action",
  date: "Date",
  powerConsumption: "Power Consumption Kw/H"
};

let itemPerPage = 5;
