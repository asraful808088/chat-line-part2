import React from "react";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import style from "./style.module.css";
export default function Forgot({ onClick }) {
  return (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Recovery</div>
      <div className={style.items}>
        <TextInput placeholder={"username"} iconType="username" type={"text"} />
      </div>
      <div className={style.items}>
        <TextInput placeholder={"OTP"} iconType="otp" type="text" />
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
          placeholder={"password"}
          iconType="password"
          type="password"
        />
      </div>
      <div className={style.items}>
        <Button name="submit" />
      </div>
      <div className={`${style.items} ${style.link}`}>
        <Link
          name={"login ?"}
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
