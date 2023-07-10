import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
  faUserNurse,
  faJoint,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const SmokingHistoryBox = ({ smoking }) => {
  const {
    updated_at,
    do_smoke,
    past_smoker,
    how_many_per_day,
    how_long,
    for_how_long,
  } = smoking || {};
  return (
    <Fragment>
      { smoking &&  <div class="col-12">
        <div class="media bg-white mb-20">
          <span class="avatar">
            <FontAwesomeIcon
              height="2rem"
              icon={faJoint}
              className="mr-2"
              size="2x"
            />{" "}
          </span>
          <div class="media-body">
            <p>
              <strong>Patient's Smoking History</strong>
            </p>
            <div
              className=""
              style={{
                marginTop: "1rem",
              }}
            ></div>
            <div className="table-responsive">
              <h5
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Current Smoker</strong>{" "}
                <span className="badge badge-info">
                  <strong>Yes</strong>
                </span>
              </h5>
              <table className="table no-border">
                <thead>
                  <tr className="text-uppercase bg-lightest">
                    <th>
                      <span className="text-dark"># Per Day</span>
                    </th>
                    <th>
                      <span className="text-dark">How Long (Years)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {how_many_per_day}
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {how_long}
                    </span>
                  </td>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <h5
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Past Smoker</strong>{" "}
                <span className="badge badge-info">
                  <strong>No</strong>
                </span>
              </h5>
              {past_smoker && (
                <table className="table no-border">
                  <thead>
                    <tr className="text-uppercase bg-lightest">
                      <th>
                        <span className="text-dark">How Long (Years)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      <span class="text-fade fw-600 d-block fs-16">
                        {for_how_long}
                      </span>
                    </td>
                  </tbody>
                </table>
              )}
            </div>

            <ul class="list-inline mt-10">
              <li class="pull-right">
                <button
                  type="button"
                  class="btn btn-box-tool btn-sm btn-rounded"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-box-tool btn-sm btn-rounded"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Delete"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </li>
            </ul>

            <p>
              <FontAwesomeIcon icon={faStopwatch} className="mr-2" />{" "}
              {formatDate(updated_at, options)}
            </p>
          </div>
        </div>
      </div> }
     
    </Fragment>
  );
};

export default SmokingHistoryBox;
