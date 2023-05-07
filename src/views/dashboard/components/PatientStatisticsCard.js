import React, { Fragment, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { PatientsData } from "../DummyData";

const PatientStatisticsCard = () => {
  const [patientsData, setPatientsData] = useState({
    labels: PatientsData.map((data) => data.month),
    datasets: [
      {
        label: "Patients Released",
        data: PatientsData.map((data) => data.released),
      },
    ],
  });
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Patient Statistics</h4>
        </div>
        <div className="box-body">
          <Line data={patientsData} />
        </div>
      </div>
    </Fragment>
  );
};

export default PatientStatisticsCard;
