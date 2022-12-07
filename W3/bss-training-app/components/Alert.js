import alertStyle from "../styles/Alert.module.css";

export default function Alert() {
  return <div className={alertStyle.alert}>
    <span className={alertStyle.alertMessage}>Hello</span>
    <i className={alertStyle.alertIcon} aria-hidden="true"></i>
  </div>;
}
