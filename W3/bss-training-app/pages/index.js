import Head from 'next/head';
import Alert from "../commons/Alert";
import Link from "next/link";
import homeStyle from "../styles/Home.module.css";

export default function Home() {

  console.log(homeStyle);
  return (
    <div id="__next">
      <Head>
        <title>Home Page | Hau NT</title>
      </Head>
      <Alert />
      <div id={homeStyle.root}>
        <Link href="/login" className={homeStyle.loginButton}>Go To Login Page</Link>
      </div>
    </div>
  );
}
