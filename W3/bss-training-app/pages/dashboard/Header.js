import Image from "next/image";
import headerStyle from "../../styles/dashboard/Header.module.css";
import hamburger from "../../public/hamburger.png";
import user from "../../public/user.png";

export default function Header(props) {
  return <div className={`${headerStyle.header} ${props.className}`}>
    <Image src={hamburger} alt="" className={headerStyle.hamburger} />
    <div className={headerStyle.userInfo}>
      <Image src={user} alt="user image" className={headerStyle.userImage} />
      <div className={headerStyle.userGreet}>Welcome Hau</div>
      <button type="button" className={headerStyle.logoutButton}>Logout</button>
    </div>
  </div>;
};
