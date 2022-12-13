import formStyle from "../../styles/Form.module.css";
import { serverHost } from "../../commons/constants";

export default function AddDeviceForm(props) {
  return <form action="#" method="post" className={formStyle.form} onSubmit={(event) => {
    event.preventDefault();
    let device = event.target.device.value.trim();
    let ip = event.target.ip.value.trim();

    if (device && ip) {
      props.addDevice(device, ip);
      fetch(serverHost + "/add-device", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ device, ip })
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {

        });
    } else {

    }
    event.target.reset();
  }}>
    <input type="text" name="device" className={formStyle.formInput} placeholder="Enter Device Name" />
    <br />
    <input type="text" name="ip" className={formStyle.formInput} placeholder="Enter Device IP" />
    <br />
    <input type="submit" value="Add Device" className={formStyle.formSubmit} />
  </form>;
};
