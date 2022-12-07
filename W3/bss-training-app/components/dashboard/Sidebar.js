import Image from "next/image";
import sidebarStyle from "../../styles/dashboard/Sidebar.module.css";
import logo from "../../public/logo.png";
import dashboard from "../../public/dashboard.png";
import logs from "../../public/logs.png";
import settings from "../../public/settings.png";
import Link from "next/link";

export default function Sidebar(props) {
  return <div className={`${sidebarStyle.sidebar} ${props.className}`}>
    <Link href="#" className={sidebarStyle.systemLogo}>
      <Image src={logo} alt="logo" className={sidebarStyle.systemLogoImage} />
      <span className={sidebarStyle.systemName}>Device Manager</span>
    </Link>
    <ul className={sidebarStyle.tabList} >
      <li className={sidebarStyle.tabItem}>
        <Image src={dashboard} alt="dashboard" className={sidebarStyle.tabItemIcon} />
        <span className={sidebarStyle.tabItemName}>Dashboard</span>
      </li>
      <li className={sidebarStyle.tabItem}>
        <Image src={logs} alt="logs" className={sidebarStyle.tabItemIcon} />
        <span className={sidebarStyle.tabItemName}>Logs</span>
      </li>
      <li className={sidebarStyle.tabItem}>
        <Image src={settings} alt="settings" className={sidebarStyle.tabItemIcon} />
        <span className={sidebarStyle.tabItemName}>Settings</span>
      </li>
    </ul>
  </div >;
}
