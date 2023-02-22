import React from "react";
import Button from "../../components/button/button";
import FileUpload from "../../components/fileUpload/file";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import style from "./style.module.css";
export default function CreateUser({ onClick }) {
  return (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Signup</div>
      <div className={style.items}>
        <TextInput placeholder={"email"} iconType="email" type={"email"} />
      </div>
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
        <TextInput
          placeholder={"co-password"}
          iconType="password"
          type="password"
        />
      </div>
      <div className={style.items}>
        <FileUpload />
      </div>
      <div className={style.items}>
        <Button name="Register" />
      </div>
      <div className={`${style.items} ${style.link}`}>
        <Link
          name={"i have an account"}
          onClick={() => {
            if (onClick) {
              onClick("login");
            }
          }}
        />
      </div>
    </div>
  );
}
