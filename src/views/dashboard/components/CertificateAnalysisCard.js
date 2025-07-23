import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";

const CertificateAnalysisCard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  const {
    data: certificatesStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["certificateStatistics", selectedYear],
    queryFn: async () => {
      const response = await fetch(
        `${API}/certificate-counts/${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch certificate statistics");
      }

      return response.json();
    },
    enabled: !!selectedYear,
  });

  const certificatesData = {
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
    series: [
      {
        name: "Pending Certificates",
        data:
          certificatesStats?.map((entry) => entry.pendingCertificates) || [],
        colors: ["#58AD46"], // color for pending certificates
      },
      {
        name: "Released Certificates",
        data:
          certificatesStats?.map((entry) => entry.releasedCertificates) || [],
        colors: ["#2a71d0"], // color for released certificates
      },
      {
        name: "Failed Certificates",
        data: certificatesStats?.map((entry) => entry.failedCertificates) || [],
        colors: ["#FF0000"], // color for failed certificates
      },
    ],
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  if (isLoading) {
    return (
      <div className="box">
        <div
          className="flex items-center justify-center h-64"
          style={{
            margin: "20px",
          }}
        >
          <div className="text-lg font-medium text-gray-600 animate-pulse">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

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
