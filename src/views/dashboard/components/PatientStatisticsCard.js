import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { patientActions } from "../../../redux_store/patients-store";
import { getPatientStatistics } from "../../../services/api";
import Loading from "../../../components/loader/Loading";

const PatientStatisticsCard = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  const {
    data: patientStatistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["patientStatistics", selectedYear],
    queryFn: () => getPatientStatistics(selectedYear),
    enabled: !!selectedYear,
  });

  const patientsData = {
    options: {
      chart: {
        id: "patients-chart",
      },
      xaxis: {
        categories: patientStatistics?.map((data) => data.month) || [],
      },
    },
    series: [
      {
        name: "Patients",
        data: patientStatistics?.map((data) => data.patient_count) || [],
      },
      {
        name: "Referrals",
        data: patientStatistics?.map((data) => data.referral_count) || [],
      },
      {
        name: "Radiology",
        data: patientStatistics?.map((data) => data.radiology_count) || [],
      },
    ],
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2019; year <= currentYear; year++) {
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
