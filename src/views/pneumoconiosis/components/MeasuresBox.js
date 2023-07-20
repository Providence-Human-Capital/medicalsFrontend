import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const MeasuresBox = ({ measures }) => {
  return (
    <Fragment>
      {measures && (
        <div className="col-12">
          <div className="media bg-white mb-20">
            <span className="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faUserNurse}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div className="media-body">
              <p>
                <strong>Control Measures Being Implemented</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <h4>
                      Wet Method {"  "}
                      <span className="badge badge-secondary">
                        {measures.wet_method ? (
                          <strong>Yes</strong>
                        ) : (
                          <strong>No</strong>
                        )}
                      </span>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <h4>
                      Containment and Ventilation {"  "}
                      <span className="badge badge-secondary">
                        {measures.contain_and_vent ? (
                          <strong>Yes</strong>
                        ) : (
                          <strong>No</strong>
                        )}
                      </span>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <h4>
                      Monitoring {"  "}
                      <span className="badge badge-secondary">
                        {measures.monitoring ? (
                          <strong>Yes</strong>
                        ) : (
                          <strong>No</strong>
                        )}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="row">
                  {measures.ppe && (
                    <div className="col-md-12">
                      <h4>
                        <strong>Personal Protective Equipment</strong>
                      </h4>
                      <p>{measures.ppe_details}</p>
                    </div>
                  )}

                  {measures.other && (
                    <div className="col-md-12">
                      <h4>
                        <strong>Other Control Measures Implemented</strong>
                      </h4>
                      <p>{measures.other_details}</p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="list-inline mt-10">
                <li className="pull-right">
                  <button
                    type="button"
                    className="btn btn-box-tool btn-sm btn-rounded"
                    data-bs-toggle="tooltip"
                    title=""
                    data-bs-original-title="Edit"
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-box-tool btn-sm btn-rounded"
                    data-bs-toggle="tooltip"
                    title=""
                    data-bs-original-title="Delete"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              </ul>

              <p>
                <FontAwesomeIcon icon={faStopwatch} className="mr-2" />{" "}
                {formatDate(measures.updated_at, options)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MeasuresBox;
