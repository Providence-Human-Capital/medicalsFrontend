import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { API } from "../../../config";
const BpPlot = () => {
  const { patientId } = useParams();
  const [bpRecords, setBpRecords] = useState([]);
  const getPatientsBpHistory = async () => {
    try {
      const response = await fetch(`${API}/patient/${patientId}/bp`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setBpRecords(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPatientsBpHistory();
  }, [patientId]);
  const dates = bpRecords.map((record) => record.date);
  const systolicValues = bpRecords.map((record) => record.bp_sys);
  const diastolicValues = bpRecords.map((record) => record.bp_dia);
  const statusValues = bpRecords.map((record) => record.bp_status);
  // Chart configuration
  const chartOptions = {
    chart: {
      id: "blood-pressure-chart",
      type: "line",
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      title: {
        text: "Blood Pressure",
      },
    },
  };
  const series = [
    {
      name: "Systolic Bp Reading",
      data: systolicValues,
    },
    {
      name: "Diastolic Bp Reading",
      data: diastolicValues,
    },
  ];
  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            <strong>Blood Pressure History</strong>
          </h4>
        </div>
        <div className="box-body pt-0">
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height={400}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default BpPlot;
