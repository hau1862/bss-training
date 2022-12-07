import Head from "next/head";
import indexStyle from "../../styles/login/Index.module.css";
import LoginForm from "../../components/login/LoginForm";
import Alert from "../../components/Alert";

export default function Login() {
  return <div id="__next">
    <Head>
      <title>Login | Hau NT</title>
    </Head>
    <Alert />
    <div id={ indexStyle.root }>
      <div className={ indexStyle.loginFormContainer }>
        <span className={ indexStyle.loginFormHeading }>Soiot System</span>
        <LoginForm />
      </div>;
    </div>
  </div>;
}
