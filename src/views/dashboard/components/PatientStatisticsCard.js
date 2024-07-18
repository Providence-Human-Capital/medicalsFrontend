import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../../redux_store/patients-store";
import { getPatientStatistics } from "../../../services/api";

const PatientStatisticsCard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const dispatch = useDispatch();

  const patientStatistics =
    useSelector((state) => state.patient.patientStatistics) || [];
  const [patientsData, setPatientsData] = useState({
    options: {
      chart: {
        id: "patients-chart",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Patients",
        data: [],
      },
      {
        name: "Referrals",
        data: [],
      },
      {
        name: "Radiology",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2019; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    setPatientsData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories: patientStatistics.map((data) => data.month),
        },
      },
      series: [
        {
          ...prevData.series[0],
          data: patientStatistics.map((data) => data.patient_count),
        },
        {
          ...prevData.series[1],
          data: patientStatistics.map((data) => data.referral_count),
        },
        {
          ...prevData.series[2],
          data: patientStatistics.map((data) => data.radiology_count),
        },
      ],
    }));
  }, [patientStatistics]);

  const handleYearChange = async (year) => {
    setSelectedYear(year);
    console.log("Selected year:", year); // Log selected year
    const patientsData = await getPatientStatistics(year);
    console.log("Resp", patientsData); // Log fetched data
    dispatch(
      patientActions.setStatistics({
        patientStatistics: patientsData,
      })
    );
    console.log("Updated patientStatistics:", patientsData); // Log updated patientStatistics
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
                Patient Statistics
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
        <div className="box-body">
          <Chart
            options={patientsData.options}
            series={patientsData.series}
            type="line"
            height={400}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default PatientStatisticsCard;
