import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getClientsCountByExamType } from "../../../services/api";

const StatsByExamPurpose = ({ companyId }) => {
  const [statsData, setStatsData] = useState({});
  const year = 2023;
  const fetchingStats = async () => {
    try {
      const stats = await getClientsCountByExamType(companyId, year);
      setStatsData(stats);
      console.log("Stats: " + JSON.stringify(stats));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchingStats();
  }, []);

  const series = Object.keys(statsData[Object.keys(statsData)[0]] || {}).map(
    (purpose) => ({
      name: purpose,
      data: Object.keys(statsData || null).map(
        (month) => statsData[month][purpose] || null
      ),
    })
  );

  const options = {
    xaxis: {
      categories: Object.keys(statsData || null),
    },
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
            Exam Purpose
          </h4>
        </div>
        <div class="box-body">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    </>
  );
};

export default StatsByExamPurpose;
