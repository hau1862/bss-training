import formStyle from "../../styles/Form.module.css";

export default function TableSearchForm(props) {
  return <form action="" method="get" id="table-search-form" className={`${formStyle.form} ${props.className}`} onSubmit={(event) => {
    event.preventDefault();
    const action = event.target.action.value;
    const content = event.target.content.value.trim();
    props.changeFilter(action, content);
    event.target.content.value = "";
  }}>
    <select name="action" id="" className={formStyle.formSelect} defaultValue="" form="table-search-form" onChange={(event) => {
      const action = event.target.value;
      event.target.parentElement.content.value = "";
      props.changeFilter(action);
    }}>
      <option value="All">All</option>
      <option value="On">Turn On</option>
      <option value="Off">Turn Off</option>
      <option value="Sleep">Sleep</option>
    </select>
    <input type="text" name="content" id="" className={formStyle.formInput} />
    <input type="submit" value="Search" className={formStyle.formSubmit} />
  </form>;
};
