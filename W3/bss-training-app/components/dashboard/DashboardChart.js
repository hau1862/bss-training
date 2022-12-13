import chartStyle from "../../styles/Chart.module.css";
import { listColor } from "../../commons/constants";

export default function DashboardChart(props) {
  const data = props.data;
  let listDevice = data.map((item) => (item.device));
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

  return <div className={`${chartStyle.chartContainer} ${props.className}`} >
    <div className={chartStyle.pieChart} style={{ background: `conic-gradient(${backgroundColor})` }}></div>
    <div className={chartStyle.chartExplain}>
      {
        listDevice.map((item, index) => {
          let color = "color" + listColor[index].slice(0, 1).toUpperCase() + listColor[index].slice(1);
          return <div className={chartStyle.entry} key={index}>
            <div id={chartStyle[color]} className={chartStyle.entryColor}></div>
            <div className={chartStyle.entryText}>{item} ({data[index].powerConsumption})</div>
          </div>;
        })
      }
    </div>
  </div >;
}
