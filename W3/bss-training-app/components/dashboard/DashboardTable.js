import tableStyle from "../../styles/Table.module.css";
import { useState } from "react";

export default function DashboardTable(props) {
  const [page, setPage] = useState(1);
  const { attributes, itemPerPage } = props.metadata;
  const begin = Math.max(itemPerPage * (page - 1), 0);
  const end = Math.min(itemPerPage * page, props.data.length);
  const pageNumber = Math.ceil(props.data.length / itemPerPage);
  const paginationIndex = [];
  for (let i = 1; i <= pageNumber; i++) {
    paginationIndex.push(<a href="#" key={i} className={i === page ? "active" : ""} onClick={(event) => {
      setPage(i);
    }}>{i}</a>);
  }

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
      {
        props.data.slice(begin, end).map((device, index) => {
          return <tr key={index}>
            {attributes.map((key, index) => {
              return <td key={key + index}>{device[key]}</td>;
            })}
          </tr>;
        })
      }
      <tr>
        <td colSpan="4">Total</td>
        <td>
          {
            props.data.slice(begin, end).reduce((accumulate, device) => {
              return accumulate + device.powerConsumption;
            }, 0)
          }
        </td>
      </tr>
      <tr>
        <td colSpan="5" className="pagination">
          <a href="#" onClick={(event) => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}>&laquo;</a>
          {paginationIndex}
          <a href="#" onClick={(event) => {
            if (page < pageNumber) {
              setPage(page + 1);
            }
          }}>&raquo;</a>
        </td>
      </tr>
    </tbody>
  </table>;
}
