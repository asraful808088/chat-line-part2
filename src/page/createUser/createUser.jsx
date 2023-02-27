import React, { useContext, useState } from "react";
import Button from "../../components/button/button";
import FileUpload from "../../components/fileUpload/file";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import { ToastContext } from "../../context/toast/toast";
import { createUser } from "../../operation/usercreate/create";
import style from "./style.module.css";
export default function CreateUser({ onClick }) {
  const getContext = useContext(ToastContext);
  const [error, setError] = useState({});
  const [user, setUser] = useState({});
  function sendReq(e) {
    const obj = { ...user };
    obj[e.target.id] = e.target.value;
    setUser(obj);
  }
  return (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Signup</div>
      <div className={style.items}>
        <TextInput
          value={user.email ?? ""}
          id={"email"}
          placeholder={"email"}
          iconType="email"
          type={"email"}
          error={error.email ?? ""}
          onChange={sendReq}
        />
      </div>
      <div className={style.items}>
        <TextInput
          value={user.username ?? ""}
          id={"username"}
          placeholder={"username"}
          iconType="username"
          type={"text"}
          error={error.username ?? ""}
          onChange={sendReq}
        />
      </div>
      <div className={style.items}>
        <TextInput
          value={user.password ?? ""}
          id={"password"}
          placeholder={"password"}
          iconType="password"
          type="password"
          error={error.password ?? ""}
          onChange={sendReq}
        />
      </div>
      <div className={style.items}>
        <TextInput
          value={user.co_password ?? ""}
          id={"co_password"}
          placeholder={"co-password"}
          iconType="password"
          type="password"
          error={error.co_password ?? ""}
          onChange={sendReq}
        />
      </div>
      <div className={style.items}>
        <FileUpload
          error={error.file ?? ""}
          onchange={(file) => {
            setUser({ ...user, file: file });
          }}
        />
      </div>
      <div className={style.items}>
        <Button
          name="Register"
          onClick={async () => {
            getContext.setDisplay(true)
            const result = await createUser({
              username: user.username,
              email: user.email,
              password: user.password,
              co_password: user.co_password,
              file: user.file,
            });
            getContext.setDisplay(false)
            if (result.status === 200) {
              setError({});
              onClick("login");
            } else {
              const error = {};
              for (let index = 0; index < result.data.errors.length; index++) {
                error[result.data.errors[index].param] =
                  result.data.errors[index].msg;
              }
              setError(error);
            }
          }}
        />
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
