import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";

const IllnessAnalysisCard = () => {
  const dispatch = useDispatch();
  const illnessStats =
    useSelector((state) => state.patient.patientsPerIllness) || [];
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [illnessesData, setIllnessesData] = useState({
    options: {
      chart: {
        id: "illness-analysis-chart",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Been Treated",
        data: [],
        colors: ["#58AD46", "#ecf0f1", "#50AF85", "#f3ba2f", "#2a71d0"],
      },
    ],
  });

  const {
    data: patientsIllnessStatistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["patientsIllnessStatistics", selectedYear],
    queryFn: async () => {
      const response = await fetch(
        `${API}/patient-counts/illness/${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch illness statistics");
      }

      const data = await response.json();
      dispatch(
        patientActions.setIllnessStatistics({ patientsPerIllness: data })
      );
      return data;
    },
    enabled: !!selectedYear,
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    if (patientsIllnessStatistics) {
      setIllnessesData((prevData) => ({
        ...prevData,
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: patientsIllnessStatistics.map((data) => data.illness),
          },
        },
        series: [
          {
            ...prevData.series[0],
            data: patientsIllnessStatistics.map((data) => data.patient_count),
          },
        ],
      }));
    }
  }, [patientsIllnessStatistics]);

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
                Overall Health Analysis
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
        <div
          className="box-body"
          style={{
            height: "fit-content",
          }}
        >
          <Chart
            options={illnessesData.options}
            series={illnessesData.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default IllnessAnalysisCard;
