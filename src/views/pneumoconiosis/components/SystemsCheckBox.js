import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLungs,
  faHeart,
  faXRay,
  faBrain,
  faEllipsis,
  faHandDots,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";

const SystemsCheckBox = ({ syscheck }) => {
  const {
    respiratory,
    cvs,
    musculoskeletal,
    cns,
    skin,
    systems_summary,
    updated_at,
  } = syscheck;
  return (
    <Fragment>
      <div className="container">
        <h5
          className="mb-2"
          style={{
            textTransform: "uppercase",
            marginLeft: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>Systems Check</strong>
        </h5>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <FontAwesomeIcon icon={faLungs} className="mr-2" size="2x" />
                <h5 className="card-title">Respiratory</h5>
                <p className="card-text">
                  {respiratory === true ? (
                    <span className="badge badge-danger">
                      <strong>Abnormal</strong>
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      <strong>Normal</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <FontAwesomeIcon icon={faHeart} className="mr-2" size="2x" />
                <h5 className="card-title">Circulatory</h5>
                <p className="card-text">
                  {cvs === true ? (
                    <span className="badge badge-danger">
                      <strong>Abnormal</strong>
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      <strong>Normal</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <FontAwesomeIcon icon={faHandDots} className="mr-2" size="2x" />
                <h5 className="card-title">Skin</h5>
                <p className="card-text">
                  {skin === true ? (
                    <span className="badge badge-danger">
                      <strong>Abnormal</strong>
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      <strong>Normal</strong>
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
                <FontAwesomeIcon icon={faBrain} className="mr-2" size="2x" />
                <h5 className="card-title">Nervous System</h5>
                <p className="card-text">
                  {cns === true ? (
                    <span className="badge badge-danger">
                      <strong>Abnormal</strong>
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      <strong>Normal</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <FontAwesomeIcon icon={faXRay} className="mr-2" size="2x" />
                <h5 className="card-title">Musculoskeletal</h5>

                <p className="card-text">
                  <span className="badge badge-danger">
                    <strong>
                      {musculoskeletal === true ? (
                        <span className="badge badge-danger">
                          <strong>Abnormal</strong>
                        </span>
                      ) : (
                        <span className="badge badge-info">
                          <strong>Normal</strong>
                        </span>
                      )}
                    </strong>
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
                <h5 className="card-title">
                  <strong>
                    Summary of Abrnomal findings or disabilities if any:
                  </strong>
                </h5>
                <p className="card-text">
                  <FontAwesomeIcon icon={faDotCircle} className="mr-2" />{" "}
                  {systems_summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SystemsCheckBox;
