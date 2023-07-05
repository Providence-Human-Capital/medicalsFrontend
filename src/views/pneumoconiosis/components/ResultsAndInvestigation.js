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

const ResultsAndInvestigation = () => {
  const data = {
    chest_x_ray: true,
    x_ray_comments: "Tuberculosis detected",
    fev1: "134",
    fev1_fvc: "122",
    fvc: "133",
    conclusion: "Restrictive",
    other_medical_conditions: true,
    conditions_details: "Cool",
    tb_comment: null,
    referral: true,
    pneumoconiosis_id: 1,
    updated_at: "2023-06-29T13:06:10.000000Z",
    created_at: "2023-06-29T13:06:10.000000Z",
    id: 1,
  };

  const calculateFEV1FVCPercentage = (fev1, fvc) => {
    const fev1Int = parseInt(fev1);
    const fvcInt = parseInt(fvc);
    const fev1FvcPercentage = (fev1Int / fvcInt) * 100;
    return fev1FvcPercentage.toFixed(2);
  };
  return (
    <div className="container">
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
              <div class="media bg-white mb-20">
                <span class="avatar">
                  <FontAwesomeIcon icon={faXRay} className="mr-2" size="2x" />
                </span>
                <div class="media-body">
                  <h5 className="card-title">
                    Chest X-ray comment by medical officer
                  </h5>
                </div>
              </div>

              <p className="card-text">{data.x_ray_comments}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div class="media bg-white mb-20">
                <span class="avatar">
                  <FontAwesomeIcon icon={faLungs} className="mr-2" size="2x" />
                </span>
                <div class="media-body">
                  <h5 className="card-title">Pulmonary Function Tests</h5>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  FEV1: {data.fev1} <br />
                </div>
                <div className="col-md-4">FVC: {data.fvc}</div>
                <div className="col-md-4">
                  FEV1/FVC: {calculateFEV1FVCPercentage(data.fev1, data.fvc)} %{" "}
                  <br />
                </div>
              </div>
              <p className="card-text"></p>
              <p className="card-text">
                Conclusion: {"  "}
                <span className="badge badge-info">
                  <strong>{data.conclusion}</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faBedPulse} className="mr-2" size="2x" />
              <h5 className="card-title">Other Medical Conditions</h5>
              <p className="card-text">{data.conditions_details}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faTruckMedical}
                className="mr-2"
                size="2x"
              />
              <h5 className="card-title">Referral</h5>
              <p className="card-text">
                Referral Status: {data.referral ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsAndInvestigation;
