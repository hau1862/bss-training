import formStyle from "../../styles/Form.module.css";

export default function AddDeviceForm(props) {
  return <form action="#" method="post" className={formStyle.form}>
    <input type="text" name="name" className={formStyle.formInput} placeholder="Enter Device Name" />
    <br />
    <input type="text" name="ip" className={formStyle.formInput} placeholder="Enter Device IP" />
    <br />
    <input type="submit" value="Add Device" className={formStyle.formSubmit} />
  </form>;
};
