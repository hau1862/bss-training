import formStyle from "../../styles/Form.module.css";
import Link from "next/link";

export default function LoginForm(props) {
  return <form action="#" method="post" className={ formStyle.form }>
    <input type="text" name="username" className={ formStyle.formInput } />
    <br />
    <input type="password" name="password" className={ formStyle.formInput } />
    <br />
    <input type="submit" value="Log In" className={ formStyle.formSubmit } />
    <Link href="#" className={ formStyle.signUp }>or create new account</Link>
  </form>;
}
