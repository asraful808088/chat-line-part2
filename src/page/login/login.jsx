import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import { ToastContext } from "../../context/toast/toast";
import login from "../../operation/login/login";
import style from "./style.module.css";
export default function Login({ onClick }) {
  const getContext = useContext(ToastContext);
  const [authData, setAuth] = useState({});
  const [error, setError] = useState({});
  const [value, setCookie] = useCookies(["chat_line_login"]);
  const [display, setDisplay] = useState(false);
  function handleSetCookie(value) {
    setCookie("chat_line_login", value, { path: "/" });
  }
  function setInput(e) {
    const olddata = { ...authData };
    olddata[e.target.id] = e.target.value;
    setAuth(olddata);
  }
  useEffect(() => {
    if (value["chat_line_login"] != null) {
      login("post", "signin", null, value["chat_line_login"])
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setDisplay(true);
        });
    } else {
      setDisplay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={style.root}
      style={{
        display: display ? "flex" : "none",
      }}
    >
      <div className={`${style.items} ${style.header}`}>Signin</div>
      <div className={style.items}>
        <TextInput
          placeholder={"email"}
          iconType="email"
          type={"text"}
          id={"email"}
          onChange={setInput}
          value={authData.email ?? ""}
          error={error.email ?? ""}
        />
      </div>
      <div className={style.items}>
        <TextInput
          error={error.password ?? ""}
          id={"password"}
          placeholder={"password"}
          iconType="password"
          type="password"
          onChange={setInput}
          value={authData.password ?? ""}
        />
      </div>
      <div className={style.items}>
        <Button
          name="Login"
          onClick={async () => {
            getContext.setDisplay(true);
            const error = {};
            if (authData.email && authData.password) {
              const result = await login("post", "signin", authData);
              getContext.setDisplay(false);
              if (result.status === 200) {
                setError({});
                handleSetCookie(result.data.token);
              } else {
                setError({ password: "authentication failed" });
              }
            } else {
              error["email"] = "email required";
              error["password"] = "password required";
              setError(error);
            }
          }}
        />
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
