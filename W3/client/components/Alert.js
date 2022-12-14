import alertStyle from "../styles/Alert.module.css";
import Image from "next/image";
import successImage from "../public/success.png";
import warningImage from "../public/warning.png";
import errorImage from "../public/error.png";
import { createContext, useState, useRef } from "react";
const AlertContext = createContext();

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

function AlertProvider(props) {
  const [state, setState] = useState({
    type: alertType.success,
    message: "Hello World"
  });
  const alertContainerRef = useRef();

  return <AlertContext.Provider value={(type = state.type, message = state.message) => {
    setState({ ...state, type, message });

    alertContainerRef.current.style.visibility = "visible";
    setTimeout(() => {
      alertContainerRef.current.style.visibility = "hidden";
    }, 2000);
  }}>
    <div className={`${alertStyle.alert} ${alertStyle[alertClassKey[state.type]]}`} ref={alertContainerRef}>
      <span className={alertStyle.alertMessage}>{state.message}</span>
      <Image className={alertStyle.alertIcon} alt="Alert Icon" aria-hidden="true" src={alertImage[state.type]} />
    </div >
    {props.children}
  </AlertContext.Provider>;
};

export {
  alertType, AlertContext, AlertProvider
};
