import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicroscope,
  faHeartbeat,
  faLungs,
  faFileMedical,
  faRadiationAlt,
  faViruses,
  faEarListen,
} from "@fortawesome/free-solid-svg-icons";

const AdditionalTestsBox = () => {
  const data = {
    sputum: true,
    ecg: false,
    echo: false,
    chest_scan: true,
    other: true,
    other_details: "Covid",
    results_investigation_id: 1,
    updated_at: "2023-06-30T11:33:12.000000Z",
    created_at: "2023-06-30T11:33:12.000000Z",
    id: 2,
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
        <strong>Additional Tests Requested</strong>
      </h5>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faMicroscope} className="mr-2" size="2x" />
              <h5 className="card-title">Sputum</h5>
              <p className="card-text">
                Status:{" "}
                {data.sputum ? (
                  <span className="badge badge-warning">Requested</span>
                ) : (
                  <span className="badge badge-secondary">Not Requested</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faHeartbeat} className="mr-2" size="2x" />
              <h5 className="card-title">ECG</h5>
              <p className="card-text">
                Status:{" "}
                {data.ecg ? (
                  <span className="badge badge-warning">Requested</span>
                ) : (
                  <span className="badge badge-secondary">Not Requested</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon icon={faEarListen} className="mr-2" size="2x" />
              <h5 className="card-title">Echo</h5>
              <p className="card-text">
                Status:{" "}
                {data.echo ? (
                  <span className="badge badge-warning">Requested</span>
                ) : (
                  <span className="badge badge-secondary">Not Requested</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faFileMedical}
                className="mr-2"
                size="2x"
              />
              <h5 className="card-title">Chest Scan</h5>
              <p className="card-text">
                Status:{" "}
                {data.chest_scan ? (
                  <span className="badge badge-warning">Requested</span>
                ) : (
                  <span className="badge badge-secondary">Not Requested</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <FontAwesomeIcon
                icon={faRadiationAlt}
                className="mr-2"
                size="2x"
              />
              <h5 className="card-title">Other</h5>
              <p className="card-text">
                Specify: {data.other ? data.other_details : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalTestsBox;
