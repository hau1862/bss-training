import contentStyle from "../../styles/dashboard/Content.module.css";
import Head from "next/head";

export default function Settings(props) {
  return <div className={`${props.className} ${contentStyle.content}`}>
    <Head>
      <title>Settings | Hau NT</title>
    </Head>

  </div>;
}
