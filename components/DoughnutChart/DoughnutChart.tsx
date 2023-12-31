import React, { useEffect, useRef, useState } from "react";
import styles from "./DoughnutChart.module.css";

// Interfaces
interface ExpenseData {
  period: string;
  personal: number;
  shopping: number;
  phone: number;
  other: number;
}

interface LegendItem {
  text: string;
  color: string;
}

interface DoughnutChartProps {
  data: ExpenseData;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  // Legend Data
  const legendData: LegendItem[] = [
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;

    if (!canvas) {
      return; // Make sure canvas is defined
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return; // Make sure context is defined
    }

    const colors = ["red", "#4C49ED", "#9D9BF4", "#4FD18B", "#141197"];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Function to calculate the total expense
    const getTotalExpense = () => {
      if (data) {
        return data.personal + data.shopping + data.phone + data.other;
      }
      return 0; // If data is empty, return 0
    };

    // Function to draw the doughnut chart on the canvas
    const drawDoughnutChart = () => {
      const total = data ? getTotalExpense() : 0;

      if (data) {
        let startAngle = 1.5 * Math.PI;

        // Draw each slice of the doughnut chart
        Object.keys(data).forEach((key, index) => {
          if (key !== "period") {
            //@ts-ignore
            const value = data[key];
            const sliceAngle = (value / total) * (2 * Math.PI);

            // Set the fill style and draw the slice
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(
              centerX,
              centerY,
              radius,
              startAngle,
              startAngle - sliceAngle,
              true
            );
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            startAngle -= sliceAngle;
          }
        });

        // Draw the central circle with the total value
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.8, 0, 2 * Math.PI);
        ctx.fill();

        // Text style for total value
        ctx.fillStyle = "#111";
        ctx.font = "500 40px Helvetica Neue";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Split total into integer and decimal parts
        const [integerPart, decimalPart] = total.toString().split(".");

        // Draw integer part in white color
        ctx.fillText(`$ ${integerPart}`, centerX, centerY);

        // Draw decimal part in a different color
        ctx.fillStyle = "#AFADFE";
        ctx.font = "500 19px Helvetica Neue";
        if (total >= 1000) {
          ctx.fillText(`.${decimalPart || "00"}`, centerX + 75, centerY + 5);
        } else {
          ctx.fillText(`.${decimalPart || "00"}`, centerX + 65, centerY + 5);
        }
      }
    };

    // Call the function to draw the doughnut chart
    drawDoughnutChart();
  }, [data]);

  return (
    <div className={styles.container}>
      {/* Canvas element */}
      <div className={styles.chartCanvas}>
        <canvas ref={canvasRef} width={264} height={264} />
      </div>
      {/* Legend items */}
      <div className={styles.legendContainer}>
        {legendData?.map((item: any, index: number) => (
          <div className={styles.legend} key={index}>
            {/* Coloring badge */}
            <div
              className={styles.badge}
              style={{ backgroundColor: item?.color }}
            ></div>
            {/* Text label */}
            <p>{item?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
