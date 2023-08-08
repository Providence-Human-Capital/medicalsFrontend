import React, { Fragment, useState } from "react";
import Chart from "react-apexcharts";
import { IllnessData } from "../DummyData";
import { useSelector } from "react-redux";
const IllnessAnalysisCard = () => {
  const illnessStats = useSelector((state) => state.patient.patientsPerIllness) || [];
  const [illnessesData, setIllnessesData] = useState({
    options: {
      chart: {
        id: "illness-analysis-chart",
      },
      xaxis: {
        categories: illnessStats.map((data) => data.illness),
      },
    },
    series: [
      {
        name: "Been Treated",
        data: illnessStats.map((data) => data.patient_count),
        colors: ["#58AD46", "#ecf0f1", "#50AF85", "#f3ba2f", "#2a71d0"],
      },
    ],
  });
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4
            className="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Overall Health Analysis
          </h4>
        </div>
        <div
          className="box-body"
          style={{
            height: "fit-content",
          }}
        >
          <Chart
            options={illnessesData.options}
            series={illnessesData.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default IllnessAnalysisCard;
