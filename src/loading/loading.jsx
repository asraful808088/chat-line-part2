import React from "react";
import logo1 from "./../assets/icon/logo1.png";
import logo2 from "./../assets/icon/logo2.png";
import style from "./style.module.css";
export default function Loading({ size = 200 }) {
  return (
    <div
      className={style.root}
      style={{
        height: size,
        width: size,
      }}
    >
      <div className={style.item}>
        <div className={style.image}>
          <img src={logo2} alt="" height={"100%"} width="100%" />
        </div>
        <div className={style.shadow}></div>
      </div>
      <div className={style.item}>
        <div className={style.image}>
          <img src={logo1} alt="" height={"100%"} width="100%" />
        </div>
        <div className={style.shadow}></div>
      </div>
    </div>
  );
}
