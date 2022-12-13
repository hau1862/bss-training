import indexStyle from "../../styles/dashboard/Index.module.css";
import { AlertProvider } from "../../components/Alert";
import Head from "next/head";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Dashboard from "../../components/dashboard/Dashboard";
import Logs from "../../components/dashboard/Logs";
import Settings from "../../components/dashboard/Settings";
import { useRouter } from "next/router";
import { getItem, removeItem } from "../../commons/library";
import { userKey, loginPath, serverHost } from "../../commons/constants";
import { useState, useEffect } from "react";

export default function DashboardIndex() {
  const router = useRouter();
  const [content, setContent] = useState("dashboard");

  useEffect(() => {
    const { username, token } = getItem(userKey);
    if (username && token) {
      const apiSource = `${serverHost}/user?username=${username}&token=${token}`;

      fetch(apiSource)
        .then(response => response.json())
        .catch((error) => {
          router.push(loginPath);
        });
    } else {
      removeItem(userKey);
      router.push(loginPath);
    }
  });

  return <AlertProvider>
    <Head>
      <title>Dashboard</title>
    </Head>
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
  </AlertProvider>;
}
