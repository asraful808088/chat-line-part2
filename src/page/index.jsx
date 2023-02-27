import React, { useState } from "react";
import Loading from "../loading/loading";
import Toast from "../toast/toast";
import { ToastContext } from "./../context/toast/toast";
import CreateUser from "./createUser/createUser";
import Forgot from "./forgot/forgot";
import Login from "./login/login";
import style from "./style.module.css";

export default function Index() {
  const [activeCom, setactiveCom] = useState("login");
  const [display, setDisplay] = useState(false);
  const statusChanger = (type) => {
    if (type === "login") {
      setactiveCom("login");
    } else if (type === "create") {
      setactiveCom("create");
    } else {
      setactiveCom("forgot");
    }
  };
  return (
    <ToastContext.Provider value={{ setDisplay }}>
      <div className={style.root}>
        <Toast display={display} />
        <div className={style.items}>
          <Loading size={400} />
        </div>
        <div className={style.items}>
          <div className={style.card}>
            {activeCom === "login" ? (
              <Login onClick={statusChanger} />
            ) : activeCom === "create" ? (
              <CreateUser onClick={statusChanger} />
            ) : (
              <Forgot onClick={statusChanger} />
            )}
          </div>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
