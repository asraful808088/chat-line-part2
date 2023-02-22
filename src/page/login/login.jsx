import React from "react";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import style from "./style.module.css";
export default function Login({ onClick }) {
  return (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Signin</div>
      <div className={style.items}>
        <TextInput placeholder={"username"} iconType="username" type={"text"} />
      </div>
      <div className={style.items}>
        <TextInput
          placeholder={"password"}
          iconType="password"
          type="password"
        />
      </div>
      <div className={style.items}>
        <Button name="Login" />
      </div>
      <div className={`${style.items} ${style.link}`}>
        <Link
          name={"create user ?"}
          onClick={() => {
            if (onClick) {
              onClick("create");
            }
          }}
        />
        <Link
          name={"forgot password?"}
          onClick={() => {
            if (onClick) {
              onClick("forgot");
            }
          }}
        />
      </div>
    </div>
  );
}
