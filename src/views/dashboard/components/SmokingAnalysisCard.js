import React, { Fragment, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { TobaccoUseData } from "../DummyData";

const SmokingAnalysisCard = () => {
  const [tobaccoUseData, setTtobaccoUseData] = useState({
    labels: TobaccoUseData.map((data) => data.tobaccoType),
    datasets: [
      {
        label: "Smoking Health Analysis",
        data: TobaccoUseData.map((data) => data.do_smoke),
      },
      {
        label: "None Smokers",
        data: TobaccoUseData.map((data) => data.non_smokers)
      }
    ],
  });

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Tobacco Use Analysis</h4>
        </div>
        <div className="box-body">
          <Doughnut data={tobaccoUseData} />
        </div>
      </div>
    </Fragment>
  );
};

export default SmokingAnalysisCard;
