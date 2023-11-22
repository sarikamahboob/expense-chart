import React, { useState } from "react";
import PieChart from "../PieChart/PieChart";
import styles from "./ExpenseChart.module.css";

const ExpenseChart = () => {
  // Expense Data
  const data = [
    {
      period: "1M",
      personal: 150,
      shopping: 90,
      phone: 60,
      other: 80,
    },
    {
      period: "6M",
      personal: 320,
      shopping: 240,
      phone: 255,
      other: 298,
    },
    {
      period: "1Y",
      personal: 950,
      shopping: 930,
      phone: 738,
      other: 490,
    },
    {
      period: "ALL TIME",
      personal: 1800,
      shopping: 1420,
      phone: 1265,
      other: 1000,
    },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState(data[0]);
  return (
    <div className={styles.container}>
      <h1 className={styles.headerTitle}>Expense Chart</h1>
      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <div>
            <h2 className={styles.chartTitle}>Expenses</h2>
            <div className={styles.buttonContainer}>
              <div className={styles.periods}>
                {data?.map((item) => (
                  <button
                    style={{
                      background:
                        selectedPeriod?.period === item?.period
                          ? "#ffffff"
                          : "transparent",
                      color:
                        selectedPeriod?.period === item?.period
                          ? "#003EFF"
                          : "#373b47",
                    }}
                    className={styles.monthButtonStyle}
                    key={item?.period}
                    onClick={() => setSelectedPeriod(item)}
                  >
                    {item?.period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <PieChart data={selectedPeriod} />
        </div>
      </div>
    </div>
  );
};

// JSX Styles
const containerStyles = {
  width: "100%",
  backgroundColor: "#430099",
  padding: "87px 50px",
  height: "100vh",
};

const headerTitle = {
  color: "#FFF",
  textAlign: "center" as "center",
  fontSize: "42px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: "31px",
};

const chartStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const chartContainerStyles = {
  borderRadius: "40px",
  background: "#FFF",
  padding: " 32px 27px",
  width: "561px",
};

const chartTitleStyle = {
  textAlign: "center" as "center",
  color: "#1F1F23",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  marginBottom: "42px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
};

const monthStyles = {
  borderRadius: "30px",
  background: "#F5F6FA",
  padding: "12px 32px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  width: "295px",
};

export default ExpenseChart;
