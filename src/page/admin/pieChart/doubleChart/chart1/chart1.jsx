import React, { PureComponent } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import style from "./style.module.css";

const data = [
  { name: "Group A", value: 10 },
  { name: "Group B", value: 50 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChart1 extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  state = {
    activeIndex: 0,
    circleSize: {
      in: 60,
      out: 80,
    },
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  componentDidMount = () => {
    window.addEventListener("resize", () => this.resizeWindow());
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", () => this.resizeWindow());
  };
  resizeWindow() {
    if (window.innerWidth < 600) {
      this.setCircleValue(40, 50);
    } else {
      this.setCircleValue(60, 80);
    }
  }
  setCircleValue(innerRadius, outerRadius) {
    const allaData = { ...this.state };
    allaData["circleSize"] = {
      in: innerRadius,
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
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={this.state.circleSize.in}
              outerRadius={this.state.circleSize.out}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
