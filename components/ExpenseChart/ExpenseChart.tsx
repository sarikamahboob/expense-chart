import React, { useState } from "react";
import styles from "./ExpenseChart.module.css";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

// Interfaces
interface ExpenseItem {
  period: string;
  personal: number;
  shopping: number;
  phone: number;
  other: number;
}

const ExpenseChart = () => {
  // Expense Data
  const data: ExpenseItem[] = [
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

  // State to manage the selected period
  const [selectedPeriod, setSelectedPeriod] = useState<ExpenseItem>(data[0]);
  return (
    <div className={styles.container}>
      <h1 className={styles.headerTitle}>Expense Chart</h1>
      {/* Chart Section */}
      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          {/* Chart Title and Period Buttons */}
          <div>
            <h2 className={styles.chartTitle}>Expenses</h2>
            <div className={styles.buttonContainer}>
              <div className={styles.periods}>
                {data?.map((item) => (
                  // Button for each period
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
          {/* Doughnut Chart Component */}
          <DoughnutChart data={selectedPeriod} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
