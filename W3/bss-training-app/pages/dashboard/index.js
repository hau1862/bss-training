import Head from "next/head";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Alert from "../../components/Alert";
import Dashboard from "../../components/dashboard/Dashboard";
import Logs from "../../components/dashboard/Logs";
import Settings from "../../components/dashboard/Settings";
import indexStyle from "../../styles/dashboard/Index.module.css";
import library from "../../commons/library";
import constants from "../../commons/constants";
import { useRouter } from "next/router";

export default function DashboardIndex() {
  const username = library.getItem(constants.userKey);
  const router = useRouter();

  if (!username) {
    library.removeItem(constants.userKey);
    router.push(constants.loginPath);
  }

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
