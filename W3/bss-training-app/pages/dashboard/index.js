import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Alert from "../../commons/Alert";
import Dashboard from "./Content/Dashboard";
import Logs from "./Content/Logs";
import Settings from "./Content/Settings";
import indexStyle from "../../styles/dashboard/Index.module.css";

export default function DashboardIndex() {
  return <div id="__next">
    <Head>
      <title>Dashboard</title>
    </Head>
    <Alert />
    <div id={indexStyle.root}>
      <div className={indexStyle.layout}></div>
      <Sidebar className={indexStyle.sidebar} />
      <div className={indexStyle.main}>
        <Header className={indexStyle.header} />
        {/* <Dashboard className={indexStyle.content} /> */}
        {/* <Logs className={indexStyle.content} /> */}
        <Settings className={indexStyle.content} />
      </div>
    </div>
  </div>;
}
