import Head from "next/head";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";
import AddDeviceForm from "./AddDeviceForm";
import contentStyle from "../../../styles/dashboard/Content.module.css";

export default function Dashboard(props) {
  return <div className={`${props.className} ${contentStyle.content}`}>
    <Head>
      <title>Dashboard | Hau NT</title>
    </Head>
    <div className={contentStyle.tableContainer}>
      <DashboardTable />
    </div>

    <div className={contentStyle.container}>
      <DashboardChart className={contentStyle.dashboardChartContainer} />
      <AddDeviceForm className={contentStyle.addDeviceFormContainer} />
    </div>
  </div>;
}
