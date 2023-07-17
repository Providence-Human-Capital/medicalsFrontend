import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { API } from "../../../config";

function BmiPlot() {
  const { patientId } = useParams();
  const [bmiRecords, setBmiRecords] = useState([]);
  
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
        setBmiRecords(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsBpHistory();
  }, [patientId]);

  const dates = bmiRecords.map((record) => record.date);
  const bmi = bmiRecords.map((record) => record.bmi);
  const weight = bmiRecords.map((record) => record.weight);
  const height = bmiRecords.map((record) => record.height);

  const chartOptions = {
    chart: {
      id: "bmi-chart",
      type: "line",
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      title: {
        text: "Body Mass Index",
      },
    },
  };
  const series = [
    {
      name: "Body Mass Index (BMI)",
      data: bmi,
    },
    
  ];

  return (
    <Fragment>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            <strong>BMI History</strong>
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
}

export default BmiPlot;
