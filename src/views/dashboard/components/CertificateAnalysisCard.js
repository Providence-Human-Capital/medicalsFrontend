import React, { Fragment, useState } from "react";
import Chart from "react-apexcharts";
import { CertificatesData } from "../DummyData";

const CertificateAnalysisCard = () => {
  const [certificatesData, setCertificatesData] = useState({
    options: {
      chart: {
        id: "certificate-analysis-chart",
        stacked: false, // Set stacked to false for multiple columns
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
    },
    series: [
      {
        name: "Certificates Dispatched",
        data: CertificatesData.map((data) => data.certificatesApproved) || [],
        colors: [
          "#58AD46",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#ff6384", // Additional color
          "#ffd700", // Additional color
          // Add more colors if needed
        ],
      },
      {
        name: "Certificates Failed", // New series for Certificates Failed
        data: CertificatesData.map((data) => data.certificatesFailed) || [], // Dummy data for Certificates Failed
        colors: [
          "#FF0000", // Red color for Certificates Failed
        ],
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
            Certificate Statistics
          </h4>
        </div>
        <div className="box-body pt-0">
          <div>
            <Chart
              options={certificatesData.options}
              series={certificatesData.series}
              type="bar" // Set type to "bar" for multiple columns
              height={400}
            />
          </div>
          <div className="row mt-25"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default CertificateAnalysisCard;
