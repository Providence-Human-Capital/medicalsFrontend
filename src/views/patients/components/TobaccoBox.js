import React, { Fragment, useEffect, useState } from "react";
import TobaccoUseItem from "./TobaccoUseItem";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "../../../redux_store/forms-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrutch, faJoint } from "@fortawesome/free-solid-svg-icons";

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
      {patientTobaccos.length !== 0 && (
        <div className="box">
          <div className="box-header border-0">
            <h4 className="box-title">
              <strong>Tobacco Use Analysis</strong>
            </h4>
          </div>
        </div>
      )}

      <div className="row">
        {patientTobaccos.length === 0 ? (
          <div className="col-md-12">
            <div className="box">
              <div className="box-header border-0 pb-0">
                <h4 className="box-title"></h4>
                <strong>Patient's Smoking History</strong>
              </div>
              <div className="box-body">
                <h5 className="fw-500">
                  <span className="fw-200 badge badge-info">
                    NO AVAILABLE RECORD
                  </span>
                </h5>
              </div>
            </div>
          </div>
        ) : (
          <>
            {patientTobaccos.map((tobacco, index) => (
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FontAwesomeIcon icon={faJoint} className="mr-2" />{" "}
                      {tobacco.name}
                    </h5>
                    <p className="card-text">
                      How Many Per Day{" "}
                      <span className="badge badge-danger">
                        <strong>{tobacco.how_many}</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default TobaccoBox;
