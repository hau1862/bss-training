// Path
const indexPath = "./index";
const loginPath = "./login";
const dashboardPath = "./dashboard";
const userKey = "userToken";
const serverHost = "http://localhost:8000";
// Alert
const alertType = {
  success: "success",
  warning: "warning",
  error: "error"
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

export {
  indexPath, loginPath, dashboardPath, serverHost, userKey, listColor
};
