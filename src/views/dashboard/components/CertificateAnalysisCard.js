import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
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

  datasets: [
    {
      label: "Nssa Certificates",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 19)",
      tension: 0.1,
    },
  ],
};

const CertificateAnalysisCard = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">Certificate Analysis</h4>
        </div>
        <div className="box-body pt-0">
          <div >
            {/* <Line data={data} /> */}
          </div>
          <div className="row mt-25"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default CertificateAnalysisCard;
