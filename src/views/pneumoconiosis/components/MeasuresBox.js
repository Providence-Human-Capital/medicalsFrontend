import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
  faUserNurse
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const MeasuresBox = ({ measures }) => {
  const { updated_at } = measures;
  return (
    <Fragment>
      <div class="col-12">
        <div class="media bg-white mb-20">
          <span class="avatar">
            <FontAwesomeIcon
              height="2rem"
              icon={faUserNurse}
              className="mr-2"
              size="2x"
            />{" "}
          </span>
          <div class="media-body">
            <p>
              <strong>Control Measures Being Implemented</strong>
            </p>
            <div
              className=""
              style={{
                marginTop: "1rem",
              }}
            ></div>

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
      </div>
    </Fragment>
  );
};

export default MeasuresBox;
