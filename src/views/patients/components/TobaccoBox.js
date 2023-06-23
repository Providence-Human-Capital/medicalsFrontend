import React, { Fragment, useEffect, useState } from "react";
import TobaccoUseItem from "./TobaccoUseItem";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "../../../redux_store/forms-store";

const TobaccoBox = ({ patientId }) => {
  const dispatch = useDispatch();

  const getTobaccoHistory = async () => {
    try {
      const tobaccoHistoryResponse = await fetch(
        `${API}/patients/${patientId}/tobaccos`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await tobaccoHistoryResponse.json();
      console.log("Tobaccos", responseData);
      if (tobaccoHistoryResponse.ok) {
        dispatch(formsActions.setPatientsTobaccos(responseData));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getTobaccoHistory();
  }, [patientId]);
  const patientTobaccos =
    useSelector((state) => state.forms.patientsTobaccos) || [];

  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">
            <strong>Tobacco Use Analysis</strong>
          </h4>
        </div>
        <div className="box-body">
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">How Many Per Day</th>
              </tr>
            </thead>
            <tbody>
              {patientTobaccos.map((tobacco, index) => (
                <tr key={index}>
                  <td>{tobacco.name}</td>
                  <td>{tobacco.how_many}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TobaccoBox;
