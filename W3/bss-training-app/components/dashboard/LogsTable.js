import tableStyle from "../../styles/Table.module.css";

export default function LogsTable() {
  return <table>
    <thead>
      <tr>
        <th>Device ID</th>
        <th>Name</th>
        <th>Action</th>
        <th>Date</th>
        <th>Power Consumption (Kw/H)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>8</td>
        <td>TV</td>
        <td>Turn On</td>
        <td>2022-12-01</td>
        <td>100</td>
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
