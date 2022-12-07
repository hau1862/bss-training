import Head from 'next/head';
import Alert from "../components/Alert";
import { alertType } from '../components/Alert';
import Link from "next/link";
import indexStyle from "../styles/Index.module.css";

export default function Home() {

  console.log(indexStyle);
  return (
    <div id="__next">
      <Head>
        <title>Home Page | Hau NT</title>
      </Head>
      <Alert type={alertType.success} message={"Thanh cong"} />
      <div id={indexStyle.root}>
        <Link href="/login" className={indexStyle.loginButton}>Go To Login Page</Link>
      </div>
    </div>
  );
}
