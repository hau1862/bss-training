import formStyle from "../../styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import library from "../../commons/library";
import constants from "../../commons/constants";

export default function LoginForm(props) {
  const router = useRouter();

  const validateLoginData = function (username, password) {
    return username && password && !username.includes(" ") && !password.includes(" ");
  };

  const getUserData = function () {
    let result = {
      username: "john",
      password: "1234"
    };

    return result;
  };

  const handleSubmitLoginForm = function (event) {
    event.preventDefault();
    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    if (validateLoginData(username, password)) {
      const target = getUserData();

      if (username === target.username && password === target.password) {
        library.setItem(constants.userKey, username);
        router.push(constants.dashboardPath);
      }
    }

    event.target.reset();
  };

  return <form action="#" method="post" className={formStyle.form} onSubmit={handleSubmitLoginForm}>
    <input type="text" name="username" className={formStyle.formInput} />
    <br />
    <input type="password" name="password" className={formStyle.formInput} />
    <br />
    <input type="submit" value="Log In" className={formStyle.formSubmit} />
    <Link href="#" className={formStyle.signUp}>or create new account</Link>
  </form>;
}
