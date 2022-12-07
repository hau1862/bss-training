import Head from "next/head";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Alert from "../../components/Alert";
import Dashboard from "../../components/dashboard/Dashboard";
import Logs from "../../components/dashboard/Logs";
import Settings from "../../components/dashboard/Settings";
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
        <Logs className={indexStyle.content} />
        {/* <Settings className={ indexStyle.content } /> */}
      </div>
    </div>
  </div>;
}
