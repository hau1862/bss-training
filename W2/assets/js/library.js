const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function CheckQueryElement(element) {
  return !!element;
}

function CheckQueryList(listElement = []) {
  return listElement.length > 0;
}

function CheckReady(...elements) {
  return elements.every(CheckQueryElement) && elements.length > 0;
}

function ResetInputElement(input) {
  let result = input.value;

  switch (input.type) {
    case "text": {
      result = "";
      break;
    }
    default: {

    }
  }

  input.value = result;
}

function ResetForm(formElement) {
  let inputs = formElement.getElementsByTagName("input");
  let length = inputs.length, i;

  for (i = 0; i < length; i++) {
    ResetInputElement(inputs[i]);
  }
}

function RenderTable(tableElement, tableFormat, data = []) {
  let keys = Object.keys(tableFormat);
  let values = Object.values(tableFormat);
  let length = data.length, i;
  let tableHeader = "";
  let tableContent = "";
  let tableFooter = "";
  let pageNumber = length % itemPerPage == 0 ? length / itemPerPage : parseInt(length / itemPerPage) + 1;
  let sumPower = 0;
  let currentPage = localStorage.getItem("Page") || 1;
  let listPage, nextPageButton, prevPageButton;

  tableHeader = "<tr>" + values.map(function (columnName) {
    return "<th>" + columnName + "</th>";
  }).join("") + "</tr>";

  let begin = (currentPage - 1) * itemPerPage;
  let end = Math.min((begin + itemPerPage), length);
  for (i = begin; i < end; i++) {
    tableContent += "<tr>" + keys.map(function (key) {
      return "<td>" + data[i][key] + "</td>";
    }).join("") + "</tr>";
    sumPower += Number(data[i].powerConsumption);
  }

  for (i = 0; i < pageNumber; i++) {
    tableFooter += `<a href="#" class="page-item page-${i + 1}${i + 1 == currentPage ? " active" : ""}">${i + 1}</a>`;
  }

  tableFooter = `<tr>
                    <td colspan="4">Total</td>
                    <td>${sumPower}</td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <div class="pagination">
                        <a href="#" class="prev-page">&laquo;</a>
                        ${tableFooter}
                        <a href="#" class="next-page">&raquo;</a>
                      </div>
                    </td>
                  </tr>`;


  tableElement.innerHTML = tableHeader + tableContent + tableFooter;

  prevPageButton = tableElement.querySelector(".prev-page");
  nextPageButton = tableElement.querySelector(".next-page");
  listPage = tableElement.querySelectorAll(".page-item");

  listPage.forEach(function (item) {
    item.onclick = function (event) {
      event.preventDefault();
      let pageIndex = parseInt(this.innerHTML);
      localStorage.setItem("Page", pageIndex);
      RenderTable(tableElement, tableFormat, data);
    }
  });

  prevPageButton.onclick = function (event) {
    let pageIndex = localStorage.getItem("Page");
    let newIndex = Math.max(pageIndex - 1, 1);
    listPage[newIndex - 1].click();
  }

  nextPageButton.onclick = function (event) {
    let pageIndex = localStorage.getItem("Page");
    let newIndex = Math.min(pageIndex + 1, pageNumber);
    listPage[newIndex - 1].click();
  }
}

String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function RenderPieChart(chartContainer, data = []) {
  let listColor = ["brown", "black", "blue", "green", "yellow", "orange", "red"];
  let listDevice = data.map((item) => (item.device));
  let pieChart = chartContainer.querySelector(".pie-chart");
  let legenda = chartContainer.querySelector(".legenda");
  let backgroundColor = "";
  let sumPower = data.reduce(function (accumulateValue, currentItem) {
    return accumulateValue + currentItem.powerConsumption;
  }, 0);

  let powerPercentage = data.reduce(function (accumulate, currentItem) {
    let prev = accumulate[accumulate.length - 1];
    return accumulate.concat(prev + currentItem.powerConsumption * 100 / sumPower);
  }, [0]);

  console.log(powerPercentage);

  backgroundColor = listDevice.map(function (item, index) {
    return `${listColor[index]} ${powerPercentage[index]}% ${powerPercentage[index + 1]}%`;
  }).join(", ");

  console.log(backgroundColor);

  pieChart.style.setProperty("background", `conic-gradient(${backgroundColor})`);

  legenda.innerHTML = listDevice.map(function (item, index) {
    return `<div class="entry">
      <div id="color-${listColor[index]}" class="entry-color"></div>
      <div class="entry-text">${item} (${data[index].powerConsumption})</div>
    </div>`;
  }).join("");
}
