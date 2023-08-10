import React, { Fragment, useEffect } from "react";
import DiseaseItem from "./DiseaseItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { formsActions } from "../../../redux_store/forms-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrutch } from "@fortawesome/free-solid-svg-icons";
import PlaceHolderBox from "../../../components/PlaceHolderBox";

const DiseaseHistory = ({ patientId }) => {
  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses || []
  );

  const dispatch = useDispatch();

  const getDiseaseHistory = async () => {
    try {
      const illnessesHistoryRespose = await fetch(
        `${API}/patients/${patientId}/illnesses`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await illnessesHistoryRespose.json();
      console.log("Illnesss", responseData);

      if (illnessesHistoryRespose.ok) {
        dispatch(formsActions.setPatientsIllness(responseData));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getDiseaseHistory();
  }, [patientId]);

  return (
    <Fragment>
      {patientIllnesses.length !== 0 && (
        <div className="box">
          <div className="box-header no-border">
            <h4 className="box-title">
              <strong>
              <img
                  src="/assets/images/patient2.svg"
                  className="w-100 bg-primary-light rounded10 me-15"
                  alt=""
                  style={{
                    height: "40px",
                    width: "20px",
                  }}
                />{"  "}
                Patient's Disease History</strong>
            </h4>
          </div>
        </div>
      )}

      <div className="row">
        {patientIllnesses.length === 0 ? (
          <PlaceHolderBox
            title={"Patient's Disease History"}
            tag={"NO AVAILABLE RECORD"}
          />
        ) : (
          <Fragment>
            {patientIllnesses.map((illness, index) => (
              <div className="col-md-6"
              key={illness.id}
              >
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          src="/assets/images/patient2.svg"
                          className="w-100 bg-primary-light rounded10 me-15"
                          alt=""
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{illness.name}</h5>
                        <p className="card-text">
                          Treatment Year{" "}
                          <span className="badge badge-danger">
                            <strong>{illness.treatment_year}</strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default DiseaseHistory;
