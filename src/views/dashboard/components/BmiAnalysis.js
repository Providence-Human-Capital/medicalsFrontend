import React, { Fragment, useState } from "react";
import { BMIData } from "../DummyData";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BmiAnalysis = () => {
  const [bmiData, setBmiData] = useState({
    labels: BMIData.map((data) => data.label),
    datasets: [
      {
        label: "Body Max Index Analysis",
        data: BMIData.map((data) => data.record),
      },
    ],
  });
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Body Mass Index Analysis</h4>
        </div>
        <div className="box-body pt-0">
          <Pie data={bmiData} />
        </div>
      </div>
    </Fragment>
  );
};

export default BmiAnalysis;
