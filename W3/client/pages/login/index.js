import Head from "next/head";
import indexStyle from "../../styles/login/Index.module.css";
import LoginForm from "../../components/login/LoginForm";
import { AlertProvider } from "../../components/Alert";
import { useEffect } from "react";
import { getItem, removeItem } from "../../commons/library";
import { userKey, dashboardPath, serverHost } from "../../commons/constants";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const { username, token } = getItem(userKey);

    if (username && token) {
      const apiSource = `${serverHost}/user?username=${username}&token=${token}`;

      fetch(apiSource)
        .then(response => response.json())
        .then((data) => {
          router.push(dashboardPath);
        })
        .catch((error) => {
        });
    } else {
      removeItem(userKey);
    }
  });
  return <AlertProvider>
    <Head>
      <title>Login | Hau NT</title>
    </Head>
    <div id={indexStyle.root}>
      <div className={indexStyle.loginFormContainer}>
        <span className={indexStyle.loginFormHeading}>Soiot System</span>
        <LoginForm />
      </div>;
    </div>
  </AlertProvider>;
}
