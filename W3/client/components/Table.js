import tableStyle from "../styles/Table.module.css";
import { useState } from "react";
const itemPerPage = 5;

export default function Table(props) {
  const [page, setPage] = useState(1);
  const { data, attributes, columns } = props;
  const begin = Math.max(itemPerPage * (page - 1), 0);
  const end = Math.min(itemPerPage * page, data.length);
  const pageNumber = Math.ceil(data.length / itemPerPage);

  const paginationIndex = [];
  for (let i = 1; i <= pageNumber; i++) {
    paginationIndex.push(<a key={i} href="#" className={`${tableStyle.paginationItem} ${i === page ? tableStyle.paginationActiveItem : ""}`} onClick={(event) => {
      setPage(i);
    }}>{i}</a>);
  }

  return <table className={tableStyle.table}>
    <thead>
      <tr>
        {
          attributes.map((key, index) => {
            return <th className={tableStyle.th} key={key + index}>{columns[key]}</th>;
          })
        }
      </tr>
    </thead>
    <tbody>
      {
        data.slice(begin, end).map((device, index) => {
          return <tr key={index}>
            {attributes.map((key, index) => {
              return <td className={tableStyle.td} key={key + index}>{device[key]}</td>;
            })}
          </tr>;
        })
      }
      <tr>
        <td className={tableStyle.td} colSpan="4">Total</td>
        <td className={tableStyle.td}>
          {
            data.slice(begin, end).reduce((accumulate, device) => {
              return accumulate + device.powerConsumption;
            }, 0)
          }
        </td>
      </tr>
      <tr>
        <td colSpan="5" className={tableStyle.pagination}>
          <a href="#" className={tableStyle.paginationItem} onClick={(event) => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}>&laquo;</a>
          {paginationIndex}
          <a href="#" className={tableStyle.paginationItem} onClick={(event) => {
            if (page < pageNumber) {
              setPage(page + 1);
            }
          }}>&raquo;</a>
        </td>
      </tr>
    </tbody>
  </table>;
}
