import React, { Fragment, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { IllnessData } from "../DummyData";

const IllnessAnalysisCard = () => {
  const [illnessesData, setIllnessesData] = useState({
    labels: IllnessData.map((data) => data.disease),
    datasets: [
      {
        label: "Diagonized with Disease",
        data: IllnessData.map((data) => data.patientsNumber),
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
          <Doughnut data={illnessesData} />
        </div>
      </div>
    </Fragment>
  );
};

export default IllnessAnalysisCard;
