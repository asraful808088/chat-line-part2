import React, { useEffect, useState } from "react";
import Logo from "../../../loading/loading";
import LineChartFrame from "../chart/lineChart";
import MainDoubleChart from "../pieChart/main";
import style from "./style.module.css";
export default function Admin() {
  const [nav, setNav] = useState(false);
  const [isMobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 800) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    });
  });
  return (
    <div className={style.root}>
      <div
        className={`${style.items} ${style.logo}`}
        style={{
          transform: !isMobileSize
            ? "translateX(0)"
            : nav
            ? "translateX(0)"
            : "translateX(-100%)",
        }}
      >
        <div
          className={style.navClose}
          onClick={() => {
            setNav(false);
          }}
        >
          <img
            src={require("../../../assets/icon/close-bold-svgrepo-com.png")}
            alt=""
            height={"100%"}
            width="100%"
          />
        </div>
        <Logo size={150} />
      </div>
      <div className={`${style.items} ${style.cardBox}`}>
        {/* com */}
        <div
          className={style.navOpen}
          onClick={() => {
            setNav(true);
          }}
        >
          <img
            src={require("../../../assets/icon/XMLID_228_.png")}
            alt=""
            height={"80%"}
            width="100%"
          />
        </div>
        <Card
          image={require("../../../assets/icon/admin/noun-user-5544561.png")}
          name="Total Users"
          count={12}
        />
        <Card
          image={require("../../../assets/icon/admin/noun-user-active-1743565.png")}
          name="Active Users"
          count={6}
        />
        <Card
          image={require("../../../assets/icon/admin/Group 103.png")}
          name="Total Group"
          count={4}
          height="50%"
        />
        {/* end */}
      </div>
      <div
        className={`${style.items} ${style.menu}`}
        style={{
          transform: !isMobileSize
            ? "translateX(0)"
            : nav
            ? "translateX(0)"
            : "translateX(-100%)",
        }}
      >
        <div className={style.header}>Menu</div>
        <div className={style.items}>
          <Item
            name={"Over-View"}
            icon={require("../../../assets/icon/admin/data-scientist-icon.png")}
          />
          <Item
            name="Database"
            icon={require("../../../assets/icon/admin/data-update-icon.png")}
          />
          <Item
            name="Pc-Config"
            icon={require("../../../assets/icon/admin/Group 4.png")}
            height="60%"
          />
          <Item
            icon={require("../../../assets/icon/admin/Group 45.png")}
            name="Announce"
          />
          <Item
            name="Home"
            icon={require("../../../assets/icon/admin/noun-home-2061782.png")}
          />
          <Item
            name="Logout"
            icon={require("../../../assets/icon/admin/noun-logout-1402517.png")}
          />
        </div>
      </div>
      <div className={`${style.items} ${style.details}`}>
        <div className={style.header}>Details</div>
        <div className={style.DeItems}>
          <LineChartFrame />
          <MainDoubleChart />
        </div>
      </div>
    </div>
  );
}

function Item({ name, icon, onclick, id, height, width }) {
  return (
    <div
      className={style.item}
      onClick={() => {
        if (onclick) {
          onclick(id);
        }
      }}
    >
      <div className={style.icon}>
        <img
          src={icon}
          alt=""
          height={height ?? "100%"}
          width={width ?? "100%"}
        />
      </div>
      <div className={style.name}>{name}</div>
    </div>
  );
}

function Card({ name, count, image, height }) {
  return (
    <div className={style.card}>
      <div className={style.cardItems}>
        <img src={image} alt="" height={height ?? "70%"} width="80%" />
      </div>
      <div className={style.cardItems}>
        <div className={style.count}>{count}</div>
        <div className={style.name}>{name}</div>
      </div>
    </div>
  );
}
