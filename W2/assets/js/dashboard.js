let dashboardTable = $(".dashboard .table-container .device-table");
let logsTable = $(".logs .table-container .device-table");
let addDeviceForm = $(".dashboard .add-device-form-container .add-device-form");
let logoutButton = $(".header .user-info .logout-btn");
let searchForm = $(".logs .table-search .table-search-form");
let userGreet = $(".user-info .user-info-greet");
let contentItems = $$(".content");
let tabItems = $$(".tab-item");
let chartContainer = $(".dashboard .chart-container");
let sidebarMobileIcon = $(".sidebar-mobile-icon");
let sidebar = $(".sidebar");
let layout = $(".layout");
let searchAction = $(".table-header .table-search .table-search-action");
let currentIndex = 0;
localStorage.setItem(pageKey, 1);

// Common
if (!CheckAllElementReady(dashboardTable, logsTable, addDeviceForm, logoutButton, searchForm, ...contentItems, ...tabItems, chartContainer)) {
  window.location.replace(indexPath);
}

if (localStorage.getItem(userData.key) !== userData.username) {
  localStorage.removeItem(userData.key);
  window.location.replace(loginPath);
}

userGreet.innerHTML = "Welcome " + userData.username.toCapitalize();

logoutButton.onclick = function (event) {
  localStorage.removeItem(userData.key);
  window.location.replace(loginPath);
};

tabItems[currentIndex].classList.add("active");
contentItems[currentIndex].classList.add("active");

tabItems.forEach(function (tabItem, index) {
  tabItem.onclick = function (event) {
    contentItems[currentIndex].classList.remove("active");
    tabItems[currentIndex].classList.remove("active");
    contentItems[index].classList.add("active");
    this.classList.add("active");
    currentIndex = index;

    if (this.classList.contains("dashboard")) {
      RenderTable(dashboardTable, dashboardData.tableFormat, currentDashboardData, itemPerPage);
    } else if (this.classList.contains("logs")) {
      RenderTable(logsTable, logsData.tableFormat, currentLogsData, itemPerPage);
    }

    if (layout.style.display == "block") {
      sidebar.style.display = "none";
      sidebarMobileIcon.style.display = "block";
      layout.style.display = "none";
    }
  };
});

// Dashboard
let currentDashboardData = localStorage.getItem(dashboardData.key);

if (!currentDashboardData || !Array.isArray(currentDashboardData)) {
  currentDashboardData = dashboardData.defaultData;
}

RenderTable(dashboardTable, dashboardData.tableFormat, currentDashboardData, itemPerPage);
RenderPieChart(chartContainer, currentDashboardData);

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

    currentDashboardData.push(newDevice);
    localStorage.setItem(dashboardData.key, currentDashboardData);
    RenderTable(dashboardTable, dashboardData.tableFormat, currentDashboardData, itemPerPage);
    RenderPieChart(chartContainer, currentDashboardData);
  } else {
    alert("Name or ip address is empty");
  }

  ResetForm(this);
};

// Logs
let currentLogsData = localStorage.getItem(logsData.key);

if (!currentLogsData || !Array.isArray(currentLogsData)) {
  currentLogsData = logsData.defaultData;
}

RenderTable(logsTable, logsData.tableFormat, currentLogsData, itemPerPage);

searchForm.onsubmit = function (event) {
  event.preventDefault();

  let content = this.content.value.toLowerCase();

  if (content) {
    let keys = Object.keys(logsData.tableFormat);
    let resultSearch = currentLogsData.filter(function (item) {
      return keys.some(function (key) {
        console.log(item, key, item[key]);
        return item[key].toString().toLowerCase().includes(content);
      });
    });

    RenderTable(logsTable, logsData.tableFormat, resultSearch, itemPerPage);
  }

  ResetForm(this);
};

// Sidebar
sidebarMobileIcon.onclick = function (event) {
  sidebar.style.display = "block";
  this.style.display = "none";
  layout.style.display = "block";
}

layout.onclick = function (event) {
  sidebar.style.display = "none";
  sidebarMobileIcon.style.display = "block";
  this.style.display = "none";
}

// Search Logs
searchAction.onchange = function (event) {
  let value = this.value;
  let searchResult = []

  if (value === "All") {
    searchResult = currentLogsData;
  } else {
    searchResult = currentLogsData.filter(function (item) {
      return item.action === value;
    })
  }

  RenderTable(logsTable, logsData.tableFormat, searchResult, itemPerPage);
}


