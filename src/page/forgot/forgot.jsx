import React, { useContext, useState } from "react";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import TextInput from "../../components/TextInput/textInput";
import { ToastContext } from "../../context/toast/toast";
import forgetPassword from "../../operation/login/login";
import style from "./style.module.css";
export default function Forgot({ onClick }) {
  const getContext = useContext(ToastContext);
  const [stap, setStap] = useState("stap1");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const change = (e) => {
    const inputdata = { ...data };
    inputdata[e.target.id] = e.target.value;
    setData(inputdata);
  };
  return (
    <div className={style.root}>
      <div className={`${style.items} ${style.header}`}>Recovery</div>
      {stap === "stap1" ? (
        <div className={style.items}>
          <TextInput
            id={"email"}
            placeholder={"email"}
            iconType="email"
            type={"text"}
            error={error}
            value={data.email ?? ""}
            onChange={change}
          />
        </div>
      ) : stap === "stap2" ? (
        <div className={style.items}>
          <TextInput
            id={"code"}
            placeholder={"OTP"}
            iconType="otp"
            type="text"
            error={error}
            value={data.code ?? ""}
            onChange={change}
          />
        </div>
      ) : (
        <div>
          <div className={style.items}>
            <TextInput
              id={"password"}
              placeholder={"password"}
              iconType="password"
              type="password"
              value={data.password ?? ""}
              onChange={change}
            />
          </div>
          <div className={style.items}>
            <TextInput
              id={"co_password"}
              placeholder={"co_password"}
              iconType="password"
              type="password"
              error={error}
              value={data.co_password ?? ""}
              onChange={change}
            />
          </div>
        </div>
      )}
      <div className={style.items}>
        <Button
          name="submit"
          onClick={async () => {
            if (stap === "stap1") {
              const regen = data;
              regen["stap1"] = true;
              regen["type"] = "forgot";
              getContext.setDisplay(true);
              const result = await forgetPassword("put", "forgot", regen);
              getContext.setDisplay(false);
              if (result.status === 200) {
                setStap("stap2");
                setError("");
              } else {
                setError("users not found");
              }
            } else if (stap === "stap2") {
              const regen = data;
              delete regen["stap1"];
              regen["stap2"] = true;
              regen["type"] = "forgot";
              getContext.setDisplay(true);
              const result = await forgetPassword("put", "forgot", regen);
              getContext.setDisplay(false);
              if (result.status === 200) {
                setStap("stap3");
                setError("");
              } else {
                setError(result.data.error);
              }
            } else {
              const regen = data;
              delete regen["stap2"];
              regen["stap3"] = true;
              regen["type"] = "forgot";
              getContext.setDisplay(true);
              const result = await forgetPassword("put", "forgot", regen);
              getContext.setDisplay(false);
              if (result.status === 200) {
                setStap("stap1");
                setError("");
                setData({});
                onClick("login");
              } else {
                setError(result.data.error);
              }
            }
          }}
        />
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
