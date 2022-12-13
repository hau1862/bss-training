import Head from 'next/head';
import { AlertProvider } from "../components/Alert";
import Link from "next/link";
import indexStyle from "../styles/Index.module.css";

export default function Home() {

  return (
    <AlertProvider>
      <Head>
        <title>Home Page | Hau NT</title>
      </Head>
      <div id={indexStyle.root}>
        <Link href="/login" className={indexStyle.loginButton}>Go To Login Page</Link>
      </div>
    </AlertProvider>
  );
}
