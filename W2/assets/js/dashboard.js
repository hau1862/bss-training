let dashboardTable = $(".dashboard .table-container .device-table");
let logsTable = $(".logs .table-container .device-table");
let addDeviceForm = $(".dashboard .add-device-form-container .add-device-form");
let logoutButton = $(".header .user-info .logout-btn");
let searchForm = $(".logs .table-search .table-search-form");
let greetUser = $(".user-info .user-info-greet");
let contentItems = $$(".content");
let tabItems = $$(".tab-item");
let chartContainer = $(".dashboard .chart-container");
let sidebarMobileIcon = $(".sidebar-mobile-icon");
let sidebar = $(".sidebar");
let layout = $(".layout");
let searchAction = $(".table-header .table-search .table-search-action");
let currentIndex = 0;
localStorage.setItem("Page", 1);
// Common
if (!CheckReady(dashboardTable, logsTable, addDeviceForm, logoutButton, searchForm, ...contentItems, ...tabItems, chartContainer)) {
  window.location.replace(indexPath);
}

if (localStorage.getItem(userData.key) !== userData.username) {
  localStorage.removeItem(userData.key);
  window.location.replace(loginPath);
}

greetUser.innerHTML = "Welcome " + userData.username.toCapitalize();

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
      RenderTable(dashboardTable, dashboardTableFormat, dashboardCurrentData);
    } else if (this.classList.contains("logs")) {
      RenderTable(logsTable, logsTableFormat, logsCurrentData);
    } else {

    }

    if (layout.style.display == "block") {
      sidebar.style.display = "none";
      sidebarMobileIcon.style.display = "block";
      layout.style.display = "none";
    }
  };
});

// Dashboard
let dashboardCurrentData = localStorage.getItem(dashboardData.key);

if (!dashboardCurrentData || !Array.isArray(dashboardCurrentData)) {
  dashboardCurrentData = dashboardData.defaultData;
}

RenderTable(dashboardTable, dashboardTableFormat, dashboardCurrentData);
RenderPieChart(chartContainer, dashboardCurrentData);

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

    dashboardCurrentData.push(newDevice);
    localStorage.setItem(dashboardData.key, dashboardCurrentData);
    RenderTable(dashboardTable, dashboardTableFormat, dashboardCurrentData);
    RenderPieChart(chartContainer, dashboardCurrentData);
  } else {
    alert("Name or ip address is empty");
  }

  ResetForm(this);
};

// Logs
let logsCurrentData = localStorage.getItem(logsData.key);

if (!logsCurrentData || !Array.isArray(logsCurrentData)) {
  logsCurrentData = logsData.defaultData;
}

RenderTable(logsTable, logsTableFormat, logsCurrentData);

searchForm.onsubmit = function (event) {
  event.preventDefault();

  let content = this.content.value.toLowerCase();

  if (content) {
    let keys = Object.keys(logsTableFormat);
    let resultSearch = logsCurrentData.filter(function (item) {
      return keys.some(function (key) {
        console.log(item, key, item[key]);
        return item[key].toString().toLowerCase().includes(content);
      });
    });

    RenderTable(logsTable, logsTableFormat, resultSearch);
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
  let action = this.value;

  let searchResult = logsCurrentData.filter(function (item) {
    return item.action === action;
  })

  RenderTable(logsTable, logsTableFormat, searchResult);
}


