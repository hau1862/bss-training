import Head from "next/head";
import indexStyle from "../../styles/LoginIndex.module.css";
import LoginForm from "./LoginForm";
import Alert from "../../commons/Alert";

export default function Login() {
  return <div id="__next">
    <Head>
      <title>Login | Hau NT</title>
    </Head>
    <Alert />
    <div id={indexStyle.root}>
      <LoginForm className={indexStyle.loginFormContainer} />
    </div>
  </div>;
}
