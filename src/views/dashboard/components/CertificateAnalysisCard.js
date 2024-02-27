import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { API } from "../../../config";

const CertificateAnalysisCard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [certificatesStats, setCerificateStats] = useState([]);
  const [years, setYears] = useState([]);
  const [certificatesData, setCertificatesData] = useState({
    options: {
      chart: {
        id: "certificate-analysis-chart",
        stacked: false,
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
    series: [],
  });

  const getCertificateStatistics = async (year) => {
    try {
      const response = await fetch(`${API}/certificate-counts/${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("......", data);
      setCerificateStats(data);

      // Update the chart's data
      const updatedSeries = [
        {
          name: "Pending Certificates",
          data: data.map((entry) => entry.pendingCertificates),
          colors: ["#58AD46"], // color for pending certificates
        },
        {
          name: "Released Certificates",
          data: data.map((entry) => entry.releasedCertificates),
          colors: ["#2a71d0"], // color for released certificates
        },
        {
          name: "Failed Certificates",
          data: data.map((entry) => entry.failedCertificates),
          colors: ["#FF0000"], // color for failed certificates
        },
      ];

      setCertificatesData((prevData) => ({
        ...prevData,
        series: updatedSeries,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);

    getCertificateStatistics(currentYear);
  }, []);

  const handleYearChange = async (year) => {
    setSelectedYear(year);
    try {
      await getCertificateStatistics(year);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <div className="row">
            <div className="col-md-8">
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
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => handleYearChange(e.target.value)}
                value={selectedYear}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          <div>
            <Chart
              options={certificatesData.options}
              series={certificatesData.series}
              type="bar"
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
