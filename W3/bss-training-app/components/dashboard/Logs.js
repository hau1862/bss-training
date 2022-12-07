import contentStyle from "../../styles/dashboard/Content.module.css";
import LogsTable from "./LogsTable";
import Head from "next/head";
import TableSearchForm from "./TableSearchForm";

export default function Logs(props) {
  return <div className={`${props.className} ${contentStyle.content}`}>
    <Head>
      <title>Logs | Hau NT</title>
    </Head>

    <div className={contentStyle.tableContainer}>
      <div className={contentStyle.tableHeader}>
        <h3 className={contentStyle.tableHeading}>Action Logs</h3>
        <button type="button" className={contentStyle.refreshButton}>Refresh</button>
        <TableSearchForm className={contentStyle.tableSearchForm} />
      </div>
      <LogsTable />
    </div>
  </div>;
}
