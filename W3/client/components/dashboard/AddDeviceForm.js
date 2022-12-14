import formStyle from "../../styles/Form.module.css";
import { serverHost } from "../../commons/constants";
import { addDeviceAlertMessage } from "../../commons/constants";
import { AlertContext, alertType } from "../Alert";
import { useContext } from "react";

export default function AddDeviceForm(props) {
  const showAlert = useContext(AlertContext);

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
          showAlert(alertType.success, addDeviceAlertMessage.success);
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert(alertType.warning, addDeviceAlertMessage.empty);
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
