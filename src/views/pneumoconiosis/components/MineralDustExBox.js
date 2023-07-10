import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import PlaceHolderBox from "../../../components/PlaceHolderBox";

const MineralDustExBox = ({ exposure }) => {
  const { updated_at, mineral_dust_exposure, other_details } = exposure || {};
  return (
    <Fragment>
      {exposure && (
        <div class="col-12">
          <div class="media bg-white mb-20">
            <span class="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faSkull}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div class="media-body">
              <p>
                <strong>Mineral & Dust Exposure</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>

              <div>
                <h4>
                  Mineral Dust Causing Health Risk{""} <br />
                  <span className="badge badge-secondary">
                    <strong>{mineral_dust_exposure} </strong>
                  </span>
                </h4>
                {other_details && <p>{other_details}</p>}
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
        </div>
      )}
    </Fragment>
  );
};

export default MineralDustExBox;
