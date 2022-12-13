import Head from "next/head";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";
import AddDeviceForm from "./AddDeviceForm";
import contentStyle from "../../styles/dashboard/Content.module.css";
import { useState, useEffect } from "react";
import { serverHost } from "../../commons/constants";

export default function Dashboard(props) {
  const [state, setState] = useState({
    data: [],
    metadata: {}
  });

  useEffect(() => {
    fetch(serverHost + "/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setState({ ...state, ...data });
      });
  }, []);

  return <div className={`${props.className} ${contentStyle.content}`}>
    <Head>
      <title>Dashboard | Hau NT</title>
    </Head>
    <div className={contentStyle.tableContainer}>
      <DashboardTable data={state.data} metadata={state.metadata} />
    </div>

    <div className={contentStyle.container}>
      <DashboardChart data={state.data} className={contentStyle.dashboardChartContainer} />
      <div className={contentStyle.addDeviceFormContainer}>
        <AddDeviceForm addDevice={(device, ip) => {
          setState({
            ...state,
            data: state.data.concat({
              device: device,
              macAddress: "00:1B:44:11:3A:B7",
              ip: ip,
              createdDate: "2021-05-31",
              powerConsumption: 50
            })
          });
        }} />
      </div>
    </div>
  </div>;
}
