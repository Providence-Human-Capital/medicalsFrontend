import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../../redux_store/patients-store";
import { API } from "../../../config";

const IllnessAnalysisCard = () => {
  const illnessStats = useSelector((state) => state.patient.patientsPerIllness) || [];
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

  const dispatch = useDispatch();

  const getPatientsIllnessStatistics = async (year) => {
    try {
      const response = await fetch(`${API}/patient-counts/illness/${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("......", data);
      dispatch(
        patientActions.setIllnessStatistics({ patientsPerIllness: [...data] })
      );
      console.log("illnessStats", illnessStats);
      return data;
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
  }, []);

  useEffect(() => {
    setIllnessesData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories: illnessStats.map((data) => data.illness),
        },
      },
      series: [
        {
          ...prevData.series[0],
          data: illnessStats.map((data) => data.patient_count),
        },
      ],
    }));
  }, [illnessStats]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    getPatientsIllnessStatistics(year);
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
          {/* Dropdown for selecting year */}

          {/* Title */}
        </div>
        <div
          className="box-body"
          style={{
            height: "fit-content",
          }}
        >
          {/* Chart component */}
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
