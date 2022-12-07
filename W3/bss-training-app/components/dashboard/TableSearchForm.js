import formStyle from "../../styles/Form.module.css";

export default function TableSearchForm(props) {
  return <form action="#" method="get" id="table-search-form" className={`${formStyle.form} ${props.className}`}>
    <select name="action" id="" className={formStyle.formSelect} defaultValue="" form="table-search-form">
      <option value="">All</option>
      <option value="Turn On">Turn On</option>
      <option value="Turn Off">Turn Off</option>
      <option value="Sleep">Sleep</option>
    </select>
    <input type="text" name="content" id="" className={formStyle.formInput} />
    <input type="submit" value="Search" className={formStyle.formSubmit} />
  </form>;
};
