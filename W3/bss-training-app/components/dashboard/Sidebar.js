import Image from "next/image";
import sidebarStyle from "../../styles/dashboard/Sidebar.module.css";
import logo from "../../public/logo.png";
import dashboard from "../../public/dashboard.png";
import logs from "../../public/logs.png";
import settings from "../../public/settings.png";
import Link from "next/link";

export default function Sidebar(props) {
  const tabItems = {
    dashboard, logs, settings
  };

  function showTabItems(tabItems) {
    let result = [];
    for (const key in tabItems) {
      result.push(<li className={`${sidebarStyle.tabItem} ${props.content === key ? sidebarStyle.tabItemActive : ""}`} key={key} onClick={(event) => {
        props.changeContent(key);
      }}>
        <Image src={tabItems[key]} alt={key} className={sidebarStyle.tabItemIcon} />
        <span className={sidebarStyle.tabItemName}>{key.slice(0, 1).toUpperCase() + key.slice(1)}</span>
      </li>);
    }
    return result;
  }

  return <div className={`${sidebarStyle.sidebar} ${props.className}`}>
    <Link href="#" className={sidebarStyle.systemLogo}>
      <Image src={logo} alt="logo" className={sidebarStyle.systemLogoImage} />
      <span className={sidebarStyle.systemName}>Device Manager</span>
    </Link>
    <ul className={sidebarStyle.tabList} >
      {
        showTabItems(tabItems)
      }
    </ul>
  </div >;
}
