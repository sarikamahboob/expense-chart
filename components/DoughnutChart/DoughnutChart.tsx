import React, { useEffect, useRef, useState } from "react";
import styles from "./DoughnutChart.module.css";

const DoughnutChart = ({ data }: any) => {
  // Legend Data
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
  const canvasRef = useRef(null);
  const [totalExpense, setTotalExpense] = useState(0);

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
    const radius = Math.min(centerX, centerY) - 10; // Adjust 10 as needed

    const getTotalExpense = () => {
      if (data) {
        return data.personal + data.shopping + data.phone + data.other;
      }
      return 0; // If data is empty, return 0
    };

    const drawDoughnutChart = () => {
      const total = data ? getTotalExpense() : 0;
      setTotalExpense(total);

      if (data) {
        let startAngle = 1.5 * Math.PI;

        Object.keys(data).forEach((key, index) => {
          if (key !== "period") {
            const value = data[key];
            const sliceAngle = (value / total) * (2 * Math.PI);

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

        // Text style
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

    drawDoughnutChart();
  }, [data]);

  console.log(totalExpense);

  return (
    <div className={styles.container}>
      <div className={styles.chartCanvas}>
        <canvas ref={canvasRef} width={264} height={264} />
      </div>
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

export default DoughnutChart;
