import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";

const CompanyAttendanceStats = ({ data }) => {
  useEffect(() => {}, []);
  const series = Object.keys(data).map((month) => ({
    name: month,
    data: Object.values(data[month]),
  }));

  const options = {
    xaxis: {
      categories: Object.keys(data[Object.keys(data)[0]] || {}),
    },
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="box">
        {data && (
          <>
            <div className="box-header no-border">
              <div className="row">
                <div className="col-md-10">
                  <h4
                    className="box-title"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Patient Statistics
                  </h4>
                </div>
              </div>
            </div>
            <div className="box-body">
              <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyAttendanceStats;
