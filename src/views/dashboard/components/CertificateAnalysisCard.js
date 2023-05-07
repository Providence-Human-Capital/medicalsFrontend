import React, { Fragment, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CertificatesData } from "../DummyData";

const CertificateAnalysisCard = () => {
  const [certificatesData, setCertificatesData] = useState({
    labels: CertificatesData.map((data) => data.year),
    datasets: [
      {
        label: "Certicates Approved",
        data: CertificatesData.map((data) => data.certificatesApproved),
        backgroundColor: [
          "#58AD46",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ]
      },
    ],
  });

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Certificate Analysis</h4>
        </div>
        <div className="box-body pt-0">
          <div>
            <Bar data={certificatesData} />
          </div>
          <div className="row mt-25"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default CertificateAnalysisCard;
