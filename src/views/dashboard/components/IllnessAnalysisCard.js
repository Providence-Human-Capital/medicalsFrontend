import React, { Fragment, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { IllnessData } from "../DummyData";
import { useSelector } from "react-redux";

const IllnessAnalysisCard = () => {
  const illnessStats = useSelector((state) => state.patient.patientsPerIllness);
  const [illnessesData, setIllnessesData] = useState({
    labels: illnessStats.map((data) => data.illness),
    datasets: [
      {
        label: "Been Treated",
        data: illnessStats.map((data) => data.patient_count),
        backgroundColor: [
          "#58AD46",
          "#ecf0f1",
          "#50AF85",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Illness Analysis</h4>
        </div>
        <div className="box-body">
          <Bar data={illnessesData} />
        </div>
      </div>
    </Fragment>
  );
};

export default IllnessAnalysisCard;
