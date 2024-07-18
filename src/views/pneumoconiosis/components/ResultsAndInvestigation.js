import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLungs,
  faFileMedicalAlt,
  faHeartbeat,
  faUserMinus,
  faHandHoldingHeart,
  faXRay,
  faBedPulse,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";

const ResultsAndInvestigation = ({ resultInvestigation }) => {
  const {
    chest_x_ray,
    x_ray_comments,
    fev1,
    fev1_fvc,
    fvc,
    conclusion,
    other_medical_conditions,
    conditions_details,
    tb_comment,
    referral,
    updated_at,
    created_at,
    pneumoconiosis_id,
    id,
  } = resultInvestigation || {};

  const calculateFEV1FVCPercentage = (fev1, fvc) => {
    const fev1Int = parseInt(fev1);
    const fvcInt = parseInt(fvc);
    const fev1FvcPercentage = (fev1Int / fvcInt) * 100;
    return fev1FvcPercentage.toFixed(2);
  };
  return (
    <>
      {resultInvestigation && (
        <div className="row">
          <h5
            className="mb-2"
            style={{
              textTransform: "uppercase",
              marginLeft: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>Results And Investigation</strong>
          </h5>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        // src="/assets/images/x-ray.svg"
                        src="/medicals/assets/images/x-ray.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <div class="media-body">
                        <h5 className="card-title">
                          Chest X-ray comment by medical officer
                        </h5>
                      </div>
                      <p className="card-text">{x_ray_comments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        // src="/assets/images/lungs.svg"
                        src="/medicals/assets/images/lungs.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <div class="media-body">
                        <h5 className="card-title">
                          <strong>Pulmonary Function Tests</strong>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="media bg-white mb-10"></div>

                  <div className="row">
                    <div className="col-md-4">
                      FEV1: {fev1} <br />
                    </div>
                    <div className="col-md-4">FVC: {fvc}</div>
                    <div className="col-md-4">
                      FEV1/FVC: {calculateFEV1FVCPercentage(fev1, fvc)} % <br />
                    </div>
                  </div>
                  <p className="card-text"></p>
                  <p className="card-text">
                    Conclusion: {"  "}
                    <span className="badge badge-info">
                      <strong>{conclusion}</strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                    <img
                        // src="/assets/images/hospital-medical.svg"
                        src="/medicals/assets/images/hospital-medical.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <h5 className="card-title">Other Medical Conditions</h5>
                      <p className="card-text">{conditions_details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                    <img
                        // src="/assets/images/healthcare-hospital.svg"
                        src="/medicals/assets/images/healthcare-hospital.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <h5 className="card-title">Referral</h5>
                      <p className="card-text">
                        Referral Status: {referral ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsAndInvestigation;
