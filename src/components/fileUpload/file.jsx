import React, { useState } from "react";
import style from "./style.module.css";
export default function FileUpload({ onchange, error }) {
  const [fileName, setFileName] = useState("select-photo");
  const [crossActive, setCrossActive] = useState(false);
  return (
    <div className={style.root}>
      <div className={style.file}>
        <div
          className={style.cross}
          style={{
            display: crossActive ? "flex" : "none",
          }}
          onClick={() => {
            setFileName("select-photo");
            setCrossActive(false);
            if (onchange) {
              onchange(null);
            }
          }}
        >
          <img
            src={require("../icon/cross-icon.png")}
            alt=""
            height={"100%"}
            width={"100%"}
          />
        </div>
        <label htmlFor="file" className={style.label}>
          <div className={style.name}>{fileName}</div>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setCrossActive(true);
                setFileName(e.target.files[0].name);
              }
              if (onchange) {
                onchange(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
      <div className={style.error}>{error}</div>
    </div>
  );
}
