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

const AdditionalTestsBox = ({ additionalTests }) => {
  const {
    sputum,
    ecg,
    echo,
    chest_scan,
    other,
    other_details,
    updated_at,
    created_at,
  } = additionalTests || {};

  return (
    <>
      {additionalTests && (
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
                  <FontAwesomeIcon
                    icon={faMicroscope}
                    className="mr-2"
                    size="2x"
                  />
                  <h5 className="card-title">Sputum</h5>
                  <p className="card-text">
                    Status:{" "}
                    {sputum ? (
                      <span className="badge badge-warning">Requested</span>
                    ) : (
                      <span className="badge badge-secondary">
                        Not Requested
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <FontAwesomeIcon
                    icon={faHeartbeat}
                    className="mr-2"
                    size="2x"
                  />
                  <h5 className="card-title">ECG</h5>
                  <p className="card-text">
                    Status:{" "}
                    {ecg ? (
                      <span className="badge badge-warning">Requested</span>
                    ) : (
                      <span className="badge badge-secondary">
                        Not Requested
                      </span>
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
                    icon={faEarListen}
                    className="mr-2"
                    size="2x"
                  />
                  <h5 className="card-title">Echo</h5>
                  <p className="card-text">
                    Status:{" "}
                    {echo ? (
                      <span className="badge badge-warning">Requested</span>
                    ) : (
                      <span className="badge badge-secondary">
                        Not Requested
                      </span>
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
                    {chest_scan ? (
                      <span className="badge badge-warning">Requested</span>
                    ) : (
                      <span className="badge badge-secondary">
                        Not Requested
                      </span>
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
                    Specify: {other ? other_details : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalTestsBox;