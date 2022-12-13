import alertStyle from "../styles/Alert.module.css";
import Image from "next/image";
import successImage from "../public/success.png";
import warningImage from "../public/warning.png";
import errorImage from "../public/error.png";

const alertType = {
  success: "success",
  warning: "warning",
  error: "error",
};

const alertClassKey = {
  success: "alertSuccess",
  warning: "alertWarning",
  error: "alertError"
};

const alertImage = {
  success: successImage,
  warning: warningImage,
  error: errorImage
};

export default function Alert(props) {
  const { type = alertType.success, message = "" } = props;

  return <div className={`${alertStyle.alert} ${alertStyle[alertClassKey[type]]}`}>
    <span className={alertStyle.alertMessage}>{message}</span>
    <Image className={alertStyle.alertIcon} alt="Alert Icon" aria-hidden="true" src={alertImage[type]} />
  </div >;
};

export {
  alertType
};
