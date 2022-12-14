import contentStyle from "../../styles/dashboard/Content.module.css";
import Head from "next/head";
import TableSearchForm from "./TableSearchForm";
import { useState, useEffect, useRef } from "react";
import { serverHost } from "../../commons/constants";
import Table from "../Table";

export default function Logs(props) {
  const [state, setState] = useState({
    data: [],
    attributes: [],
    columns: {},
    action: "All",
    content: ""
  });

  useEffect(() => {
    fetch(serverHost + "/logs")
      .then((response) => response.json())
      .then((data) => {
        setState({ ...state, ...data });
      });
  }, []);

  return <div className={`${props.className} ${contentStyle.content}`}>
    <Head>
      <title>Logs | Hau NT</title>
    </Head>

    <div className={contentStyle.tableContainer}>
      <div className={contentStyle.tableHeader}>
        <h3 className={contentStyle.tableHeading}>Action Logs</h3>
        <button type="button" className={contentStyle.refreshButton} onClick={(event) => {
          setState({
            ...state,
            content: "",
            action: "All"
          });
          event.target.nextSibling.reset();
        }}>Refresh</button>
        <TableSearchForm className={contentStyle.tableSearchForm}
          changeFilter={(action, content = state.content) => {
            setState({ ...state, action: action, content: content.trim().toLowerCase() });
          }} />
      </div>
      <Table data={state.data.filter((device) => {
        return (device.action === state.action || state.action === "All") && device.name.toLowerCase().includes(state.content);
      })} attributes={state.attributes} columns={state.columns} />
    </div>
  </div>;
}
