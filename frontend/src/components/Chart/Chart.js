import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
const Chart = ({ productHistory }) => {
  const dates = productHistory.map(({ date }) => {
    date = new Date(date);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  });
  const prices = productHistory.map(({ price }) => price);
  return (
    <div>
      <Line
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value) {
                  return `$${value} USD`;
                },
              },
            },
          },
        }}
        data={{
          labels: dates,
          datasets: [
            {
              label: "Price over time",
              data: prices,
              borderColor: "#084de0",
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
