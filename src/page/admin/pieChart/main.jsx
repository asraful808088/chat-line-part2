import React from "react";
import PieChart1 from "./doubleChart/chart1/chart1";
import PieChart2 from "./doubleChart/chart2/chart2";
import style from "./style.module.css";
export default function MainDoubleChart() {
  return (
    <div className={style.root}>
      <PieChart1 />
      <PieChart2 />
    </div>
  );
}
