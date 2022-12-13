import Image from "next/image";
import headerStyle from "../../styles/dashboard/Header.module.css";
import hamburger from "../../public/hamburger.png";
import user from "../../public/user.png";
import { userKey, loginPath } from "../../commons/constants";
import library from "../../commons/library";
import { useRouter } from "next/router";

export default function Header(props) {
  const router = useRouter();
  return <div className={`${headerStyle.header} ${props.className}`}>
    <Image src={hamburger} alt="" className={headerStyle.hamburger} />
    <div className={headerStyle.userInfo}>
      <Image src={user} alt="user image" className={headerStyle.userImage} />
      <div className={headerStyle.userGreet}>Welcome John</div>
      <button type="button" className={headerStyle.logoutButton} onClick={(event) => {
        library.removeItem(userKey);
        router.push(loginPath);
      }}>Logout</button>
    </div>
  </div>;
};
