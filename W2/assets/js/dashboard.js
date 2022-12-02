let dashboardTable = $(".dashboard .table-container table");
let logsTable = $(".logs .table-container table");
let addDeviceForm = $(".add-device-form-container form");
let logoutButton = $(".header .user-info .logout-button");
let searchForm = $(".logs .table-search form");
let userGreet = $(".user-info .user-greet");
let tabs = $$(".tab-item");
let contents = $$(".content");
let chartContainer = $(".dashboard .chart-container");
let sidebarMobileIcon = $(".header .sidebar-mobile-icon");
let sidebar = $(".sidebar");
let layout = $(".layout");
let searchAction = $(".table-header .table-search .select-action");
let refreshButton = $(".table-header .refresh-button");
let currentTabIndex = 0;
let searchResult = [];
let searchResultKey = "Search Result";
SetItem(dashboardMetaData.pageKey, 1);
SetItem(logsMetaData.pageKey, 1);

// Check Login
if (GetItem(userData.key) !== userData.username) {
  localStorage.removeItem(userData.key);
  window.location.replace(loginPath);
} else if (GetItem(isLoginKey)) {
  ShowAlert(alertType.success, loginAlert.success);
  SetItem(isLoginKey, false);
}

// Common
if (!CheckElements(dashboardTable, logsTable, addDeviceForm, logoutButton, searchForm, contents, tabs, chartContainer, sidebarMobileIcon, sidebar, layout, searchAction, refreshButton)) {
  window.location.replace(indexPath);
}

userGreet.innerHTML = "Welcome " + userData.username.toCapitalize();

logoutButton.onclick = function (event) {
  localStorage.removeItem(userData.key);
  window.location.replace(loginPath);
};

tabs[currentTabIndex].classList.add("active");
contents[currentTabIndex].classList.add("active");

tabs.forEach(function (tabItem, index) {
  tabItem.onclick = function (event) {
    contents[currentTabIndex].classList.remove("active");
    tabs[currentTabIndex].classList.remove("active");

    contents[index].classList.add("active");
    this.classList.add("active");
    currentTabIndex = index;

    if (this.classList.contains("dashboard")) {
      SetItem(dashboardMetaData.pageKey, 1);
      RenderTable(dashboardTable, dashboardData, dashboardMetaData);
    } else if (this.classList.contains("logs")) {
      SetItem(logsMetaData.pageKey, 1);
      RenderTable(logsTable, logsData, logsMetaData);
    }

    if (layout.style.display == "block") {
      sidebar.style.display = "none";
      sidebarMobileIcon.style.display = "block";
      layout.style.display = "none";
    }
  };
});

// Dashboard
let currentDashboardData = GetItem(dashboardMetaData.dataKey);

if (currentDashboardData && Array.isArray(currentDashboardData)) {
  dashboardData = currentDashboardData;
}

RenderTable(dashboardTable, dashboardData, dashboardMetaData);
RenderPieChart(chartContainer, dashboardData);

addDeviceForm.onsubmit = function (event) {
  event.preventDefault();
  let name = this.name.value;
  let ip = this.ip.value;

  if (name && ip) {
    let newDevice = {
      device: name,
      macAddress: "00:1B:44:11:3A:00",
      ip,
      createdDate: "2021-05-31",
      powerConsumption: 50
    };

    dashboardData.push(newDevice);
    SetItem(dashboardMetaData.dataKey, dashboardData);
    SetItem(dashboardMetaData.pageKey, 1);

    ShowAlert(alertType.success, addDeviceAlert.success);

    RenderTable(dashboardTable, dashboardData, dashboardMetaData);
    RenderPieChart(chartContainer, dashboardData);
  } else {
    ShowAlert(alertType.warning, addDeviceAlert.empty);
  }

  ResetForm(this);
};

// Logs
let currentLogsData = GetItem(logsMetaData.dataKey);

if (currentLogsData && Array.isArray(currentLogsData)) {
  logsData = currentLogsData;
}

RenderTable(logsTable, logsData, logsMetaData);

searchForm.onsubmit = function (event) {
  event.preventDefault();
  let content = this.content.value.toLowerCase();
  let action = searchAction.value;

  searchResult = logsData;

  searchResult = searchResult.filter((item) => {
    return item.name.toLowerCase().includes(content);
  });

  if (action) {
    searchResult = searchResult.filter((item) => {
      return item.action === action;
    });
  }

  SetItem(logsMetaData.pageKey, 1);
  RenderTable(logsTable, searchResult, logsMetaData);
  ResetForm(this);
};

searchAction.onchange = function (event) {
  let action = this.value;
  let content = searchForm.content.value.toLowerCase();
  searchResult = logsData;

  if (action) {
    searchResult = searchResult.filter((item) => {
      return item.action === action && item.name.toLowerCase().includes(content);
    });
  }

  SetItem(logsMetaData.pageKey, 1);
  RenderTable(logsTable, searchResult, logsMetaData);
};

refreshButton.onclick = function (event) {
  localStorage.removeItem(searchResultKey);
  SetItem(logsMetaData.pageKey, 1);
  RenderTable(logsTable, logsData, logsMetaData);
};

// Sidebar
sidebarMobileIcon.onclick = function (event) {
  sidebar.style.display = "block";
  this.style.display = "none";
  layout.style.display = "block";
};

layout.onclick = function (event) {
  sidebar.style.display = "none";
  sidebarMobileIcon.style.display = "block";
  this.style.display = "none";
};
