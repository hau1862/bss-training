import tableStyle from "../../styles/Table.module.css";

export default function DashboardTable(props) {
  return <table>
    <thead>
      <tr>
        <th>Devices</th>
        <th>MAC Address</th>
        <th>IP</th>
        <th>Created Date</th>
        <th>Power Consumption (Kw/H)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TV</td>
        <td>00:1B:44:11:3A:B7</td>
        <td>127.0.0.2</td>
        <td>2021-05-31</td>
        <td>50</td>
      </tr>
      <tr>
        <td colSpan="4">Total</td>
        <td>100</td>
      </tr>
      <tr>
        <td colSpan="5" className="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a href="#" className="active">2</a>
          <a href="#">3</a>
          <a href="#">&raquo;</a>
        </td>
      </tr>
    </tbody>
  </table>;
}
