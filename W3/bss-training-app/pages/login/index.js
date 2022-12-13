import Head from "next/head";
import indexStyle from "../../styles/login/Index.module.css";
import LoginForm from "../../components/login/LoginForm";
import Alert from "../../components/Alert";
import { useEffect } from "react";
import library from "../../commons/library";
import { userKey, dashboardPath, serverHost } from "../../commons/constants";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const userToken = library.getItem(userKey);
    if (userToken) {
      fetch(serverHost + "/user?token=" + userToken)
        .then(response => response.json())
        .then((data) => {
          router.push(dashboardPath);

        })
        .catch((error) => {
        });
    } else {
      library.removeItem(userKey);
    }
  }, []);
  return <div id="__next">
    <Head>
      <title>Login | Hau NT</title>
    </Head>
    <Alert />
    <div id={indexStyle.root}>
      <div className={indexStyle.loginFormContainer}>
        <span className={indexStyle.loginFormHeading}>Soiot System</span>
        <LoginForm />
      </div>;
    </div>
  </div>;
}
