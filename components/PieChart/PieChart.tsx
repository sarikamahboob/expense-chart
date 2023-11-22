import React from "react";
import styles from "./PieChart.module.css";

const PieChart = ({ data }: any) => {
  const legendData = [
    {
      text: "Personal",
      color: "#4C49ED",
    },
    {
      text: "Shopping",
      color: "#9D9BF4",
    },
    {
      text: "Phone",
      color: "#4FD18B",
    },
    {
      text: "Other",
      color: "#141197",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.legendContainer}>
        {legendData?.map((item: any, index: number) => (
          <div className={styles.legend} key={index}>
            <div
              className={styles.badge}
              style={{ backgroundColor: item?.color }}
            ></div>
            <p>{item?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
