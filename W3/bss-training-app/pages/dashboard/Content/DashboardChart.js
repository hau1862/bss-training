import chartStyle from "../../../styles/Chart.module.css";

export default function DashboardChart(props) {
  return <div className={`${chartStyle.chartContainer} ${props.className}`}>
    <div className={chartStyle.pieChart}></div>
    <div className={chartStyle.chartExplain}>
      <div className={chartStyle.entry}>
        <div id={chartStyle.colorBrown} className={chartStyle.entryColor}></div>
        <div className={chartStyle.entryText}>Antarctica</div>
      </div>
      <div className={chartStyle.entry}>
        <div id={chartStyle.colorBlack} className={chartStyle.entryColor}></div>
        <div className={chartStyle.entryText}>Australia</div>
      </div>
    </div>
  </div>;
}
