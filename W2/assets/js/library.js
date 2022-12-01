const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function GetItem(key) {
  let result = localStorage.getItem(key);

  return result ? JSON.parse(result) : false;
}

function SetItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function CheckElements(...elements) {
  return elements.every((element) => {
    if (Array.isArray(element)) {
      return element.length > 0;
    } else {
      return !!element;
    }
  });
}

function ResetInput(input) {
  let result = input.value;

  switch (input.type) {
    case "text": case "password": {
      result = "";
      break;
    }
    default: {

    }
  }

  input.value = result;
}

function ResetForm(form) {
  let inputs = form.getElementsByTagName("input");
  let length = inputs.length, i;

  for (i = 0; i < length; i++) {
    ResetInput(inputs[i]);
  }
}

function RenderTable(table, data, metaData) {
  let length = data.length, i;
  let tableHeader = "";
  let tableContent = "";
  let tableFooter = "";
  let pageNumber = 0;
  let powerTotal = 0;
  let currentPage = GetItem(metaData.pageKey) || 1;
  let listPage, nextPageButton, prevPageButton;
  let beginIndex = (currentPage - 1) * metaData.itemPerPage;
  let endIndex = Math.min((beginIndex + metaData.itemPerPage), length);

  if (length % metaData.itemPerPage == 0) {
    pageNumber = length / metaData.itemPerPage;
  } else {
    pageNumber = parseInt(length / metaData.itemPerPage) + 1;
  }

  tableHeader = "<tr>" + metaData.columnNames.map(function (columnName) {
    return "<th>" + columnName + "</th>";
  }).join("") + "</tr>";


  for (i = beginIndex; i < endIndex; i++) {
    tableContent += "<tr>" + metaData.attributes.map(function (key) {
      return "<td>" + data[i][key] + "</td>";
    }).join("") + "</tr>";

    powerTotal += data[i].powerConsumption;
  }

  for (i = 0; i < pageNumber; i++) {
    tableFooter += `<a href="#" class="page-item page-${i + 1}${i + 1 == currentPage ? " active" : ""}">${i + 1}</a>`;
  }

  tableFooter = `<tr>
                    <td colspan="4">Total</td>
                    <td>${powerTotal}</td>
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


  table.innerHTML = tableHeader + tableContent + tableFooter;

  prevPageButton = table.querySelector(".prev-page");
  nextPageButton = table.querySelector(".next-page");
  listPage = table.querySelectorAll(".page-item");

  listPage.forEach(function (item) {
    item.onclick = function (event) {
      let pageIndex = parseInt(this.innerHTML);
      SetItem(metaData.pageKey, pageIndex);
      RenderTable(table, data, metaData);
    };
  });

  prevPageButton.onclick = function (event) {
    let pageIndex = GetItem(metaData.pageKey);
    let newIndex = Math.max(pageIndex - 1, 1);
    listPage[newIndex - 1].click();
  };

  nextPageButton.onclick = function (event) {
    let pageIndex = GetItem(metaData.pageKey);
    let newIndex = Math.min(pageIndex + 1, pageNumber);
    listPage[newIndex - 1].click();
  };
}

function RenderPieChart(chartContainer, data) {
  let listDevice = data.map((item) => (item.device));
  let pieChart = chartContainer.querySelector(".pie-chart");
  let chartExplain = chartContainer.querySelector(".chart-explain");
  let backgroundColor = "";
  let powerTotal = data.reduce(function (accumulateValue, currentItem) {
    return accumulateValue + currentItem.powerConsumption;
  }, 0);

  let powerPercentage = data.reduce(function (accumulate, currentItem) {
    let prev = accumulate[accumulate.length - 1];
    return accumulate.concat(prev + currentItem.powerConsumption * 100 / powerTotal);
  }, [0]);

  backgroundColor = listDevice.map(function (item, index) {
    return `${listColor[index]} ${powerPercentage[index]}% ${powerPercentage[index + 1]}%`;
  }).join(", ");

  pieChart.style.setProperty("background", `conic-gradient(${backgroundColor})`);

  chartExplain.innerHTML = listDevice.map(function (item, index) {
    return `<div class="entry">
      <div id="color-${listColor[index]}" class="entry-color"></div>
      <div class="entry-text">${item} (${data[index].powerConsumption})</div>
    </div>`;
  }).join("");
}
