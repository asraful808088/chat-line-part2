import React, { PureComponent } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import style from "./style.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChart2 extends PureComponent {
  state = {
    circleSize: {
      out: 80,
    },
    data: [
      { name: "admin", value: 400 },
      { name: "staff", value: 300 },
      { name: "user", value: 900 },
    ],
  };
  componentDidMount = () => {
    window.addEventListener("resize", () => this.resizeWindow());
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", () => this.resizeWindow());
  };
  resizeWindow() {
    if (window.innerWidth < 600) {
      this.setCircleValue(50);
    } else {
      this.setCircleValue(80);
    }
  }
  setCircleValue(outerRadius) {
    const allaData = { ...this.state };
    allaData["circleSize"] = {
      out: outerRadius,
    };
    this.setState(allaData);
  }
  render() {
    return (
      <div className={style.root}>
        <h1>percentage of active users</h1>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={"100%"} height={"100%"}>
            <Pie
              data={this.state.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={this.state.circleSize.out}
              fill="#8884d8"
              dataKey="value"
            >
              {this.state.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <TargetItem color={"#00ffaa"}  name="staff" />
        <TargetItem color={"#0000ff"}  name="admin" />
        <TargetItem color={"#ffa500"}  name="users"/>
      </div>
    );
  }
}
function TargetItem({ name, color }) {
  return (
    <div className={style.target}>
      <div
        className={style.color}
        style={{
          backgroundColor: color,
        }}
      ></div>
      <div className={style.name}>{name}</div>
    </div>
  );
}
