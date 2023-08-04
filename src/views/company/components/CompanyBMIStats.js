import React, { useEffect, useState } from "react";
import { companyBMIStats } from "../../../services/api";
import Chart from "react-apexcharts";

const CompanyBMIStats = ({ companyId }) => {
  const [bmiStats, setBmiStats] = useState([]);
  const year = 2023;

  const fetchBMIStats = async () => {
    try {
      const stats = await companyBMIStats(companyId, year);
      setBmiStats(Object.values(stats));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBMIStats();
  }, []);

  const chartOptions = {
    labels: ["UNDERWEIGHT", "NORMAL", "OVERWEIGHT", "OBESE"],
    colors: ["#FF4560", "#008FFB", "#FEB019", "#775DD0"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <div class="box">
        <div class="box-header">
          <h4
            class="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Body Mass Index Analysis
          </h4>
        </div>
        <div class="box-body">
          <Chart
            options={chartOptions}
            series={bmiStats}
            type="pie"
            width="100%"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyBMIStats;
