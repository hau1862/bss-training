const indexPath = "/index";
const loginPath = "/login";
const dashboardPath = "/dashboard";
const userKey = "user";
const serverHost = "http://localhost:8000";
const listColor = ["brown", "black", "blue", "green", "yellow", "orange", "red", "violet", "gray"];
const loginAlertMessage = {
  success: "Login success",
  wrong: "Username or password is wrong",
  empty: "Username or password is empty"
};
const addDeviceAlertMessage = {
  success: "Add device success",
  empty: "Device name or IP is empty",
};

export {
  indexPath, loginPath, dashboardPath, serverHost, userKey, listColor, loginAlertMessage, addDeviceAlertMessage
};
