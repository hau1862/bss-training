import Head from "next/head";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Alert from "../../components/Alert";
import Dashboard from "../../components/dashboard/Dashboard";
import Logs from "../../components/dashboard/Logs";
import Settings from "../../components/dashboard/Settings";
import indexStyle from "../../styles/dashboard/Index.module.css";
import library from "../../commons/library";
import { userKey, loginPath, serverHost } from "../../commons/constants";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function DashboardIndex() {
  const router = useRouter();
  const [content, setContent] = useState("dashboard");

  useEffect(() => {
    const userToken = library.getItem(userKey);
    if (userToken) {
      fetch(serverHost + "/user?token=" + userToken)
        .then(response => response.json())
        .catch((error) => {
          router.push(loginPath);
        });
    } else {
      library.removeItem(userKey);
      router.push(loginPath);
    }
  }, []);


  return <div id="__next">
    <Head>
      <title>Dashboard</title>
    </Head>
    <Alert />
    <div id={indexStyle.root}>
      <div className={indexStyle.layout}></div>
      <Sidebar className={indexStyle.sidebar} content={content} changeContent={(content) => {
        setContent(content);
      }} />
      <div className={indexStyle.main}>
        <Header className={indexStyle.header} />
        {
          ((content) => {
            switch (content) {
              case "logs": {
                return <Logs className={indexStyle.content} />;
              }
              case "settings": {
                return <Settings className={indexStyle.content} />;
              }
              default: {
                return <Dashboard className={indexStyle.content} />;
              }
            }
          })(content)
        }
      </div>
    </div>
  </div>;
}
