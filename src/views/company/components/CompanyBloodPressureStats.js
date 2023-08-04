import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { companyBloodPressureStats } from "../../../services/api";

const CompanyBloodPressureStats = ({ companyId }) => {
  const [bpstats, setBpstats] = useState([]);

  const year = 2023

  const fetchBloodPressureStats = async () => {
    try {
      const stats = await companyBloodPressureStats(companyId, year);
      setBpstats(Object.values(stats));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBloodPressureStats();
  }, []);

  const chartOptions = {
    labels: [
      "Low Blood Pressure",
      "Normal Blood Pressure",
      "Pre Hypertension",
      "Stage 1 Hypertension",
      "Stage 2 Hypertension",
      "Hypertensive Crisis",
    ],
    colors: ["#FF4560", "#008FFB", "#FEB019", "#775DD0", "#00E396", "#F86624"],
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
            Blood Pressure Analysis
          </h4>
        </div>
        <div class="box-body">
          <Chart
            options={chartOptions}
            series={bpstats}
            type="donut"
            width="100%"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyBloodPressureStats;
