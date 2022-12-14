import formStyle from "../../styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { setItem } from "../../commons/library";
import { serverHost, userKey, dashboardPath, loginAlertMessage } from "../../commons/constants";
import { AlertContext, alertType } from "../Alert";
import { useContext } from "react";

export default function LoginForm(props) {
  const router = useRouter();
  const showAlert = useContext(AlertContext);

  return <form action="#" method="post" className={formStyle.form} onSubmit={(event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;

    if (username && !username.includes(" ") && password && !password.includes(" ")) {
      fetch(serverHost + "/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ username, password })
      })
        .then((response) => response.json())
        .then((data) => {
          const { username, token } = data;
          if (username && token) {
            setItem(userKey, { username, token });
            router.push(dashboardPath);
          } else {
            showAlert(alertType.error, loginAlertMessage.wrong);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showAlert(alertType.warning, loginAlertMessage.empty);
    }
  }}>
    <input type="text" name="username" className={formStyle.formInput} />
    <br />
    <input type="password" name="password" className={formStyle.formInput} />
    <br />
    <input type="submit" value="Log In" className={formStyle.formSubmit} />
    <Link href="#" className={formStyle.signUp}>or create new account</Link>
  </form>;
}
