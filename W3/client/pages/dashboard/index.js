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
  const [state, setState] = useState({
    content: "dashboard",
    hamburgerClicked: false
  });

  useEffect(() => {
    const { username, token } = getItem(userKey);
    if (username && token) {
      const apiSource = `${serverHost}/user?username=${username}&token=${token}`;

      fetch(apiSource)
        .then(response => response.json())
        .catch((error) => {
          setTimeout(() => {
            router.push(loginPath);
          }, 0);
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
      <div className={indexStyle.layout} style={state.hamburgerClicked ? { display: "block" } : {}} onClick={() => {
        setState({ ...state, hamburgerClicked: !state.hamburgerClicked });
      }}></div>
      <Sidebar className={indexStyle.sidebar} style={state.hamburgerClicked ? { display: "block" } : {}} content={state.content} changeContent={(content) => {
        setState({ ...state, content, hamburgerClicked: false });
      }} />
      <div className={indexStyle.main}>
        <Header className={indexStyle.header} clickHamburger={() => {
          setState({ ...state, hamburgerClicked: !state.hamburgerClicked });
        }} />
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
          })(state.content)
        }
      </div>
    </div>
  </AlertProvider>;
}
