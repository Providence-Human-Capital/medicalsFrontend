import React, { useEffect } from "react";
import Chart from "react-apexcharts";

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
  return (
    <>
      <div className="box">
        {data && (
          <>
            <div className="box-header no-border">
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
