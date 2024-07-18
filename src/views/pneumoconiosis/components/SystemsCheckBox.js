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
  } = syscheck || {};
  return (
    <Fragment>
      {syscheck && (
        <div className="row">
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
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/lungs.svg"
                        src="/medicals/assets/images/lungs.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                      {/* lungs.svg */}
                    </div>
                    <div className="col-md-6">
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/anatomical-heart.svg"
                        src="/medicals/assets/images/anatomical-heart.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/appleavater.svg"
                        src="/medicals/assets/images/appleavater.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/neurology.svg"
                        src="/medicals/assets/images/neurology.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
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
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        // src="/assets/images/x-ray.svg"
                        src="/medicals/assets/images/x-ray.svg"
                        className="w-100 bg-primary-light rounded10 me-15"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">Musculoskeletal</h5>

                      <p className="card-text">
                        {musculoskeletal === true ? (
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
            </div>
          </div>
          <div className="row"></div>
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
      )}
    </Fragment>
  );
};

export default SystemsCheckBox;
