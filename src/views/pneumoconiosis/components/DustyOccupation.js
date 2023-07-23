import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faHeadSideMask,
} from "@fortawesome/free-solid-svg-icons";

const DustyOccupation = ({ dusty_occ }) => {
  const {
    updated_at,
    dusty_occupation,
    occupation_details,
    years_worked,
    exposure,
  } = dusty_occ || {};
  return (
    <Fragment>
      {dusty_occ && (
        <div className="col-12">
          <div className="media bg-white mb-20">
            <span className="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faHeadSideMask}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div className="media-body">
              <p>
                <strong>Dusty Occupation</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>

              <div className="table-responsive">
                <table className="table no-border">
                  <thead>
                    <tr className="text-uppercase bg-lightest">
                      <th>
                        <span className="text-dark">Occupation</span>
                      </th>
                      <th>
                        <span className="text-dark">Years Worked</span>
                      </th>
                      <th>
                        <span className="text-dark">Exposure</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      <span className="text-fade fw-600 d-block fs-16">
                        {occupation_details}
                      </span>
                    </td>
                    <td>
                      <span className="text-fade fw-600 d-block fs-16">
                        {years_worked}
                      </span>
                    </td>
                    <td>
                      <span className="text-fade fw-600 d-block fs-16">
                        {exposure}
                      </span>
                    </td>
                  </tbody>
                </table>
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
                {formatDate(updated_at, options)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DustyOccupation;
