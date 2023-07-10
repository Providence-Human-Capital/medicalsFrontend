import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faFileWaveform,
  faEarDeaf,
  faRunning,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const CardioBox = ({ data }) => {
  const {
    apex_beat_position,
    rate,
    rhythm,
    sound,
    murmurs,
    bp_sys,
    bp_dia,
    exercise_tolerance,
    updated_at,
  } = data || {};

  return (
    <Fragment>
      {data && (
        <div class="col-12">
          <div class="media bg-white mb-20">
            <span class="avatar status-success">
              <FontAwesomeIcon
                height="2rem"
                icon={faHeartbeat}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div class="media-body">
              <p>
                <strong>Cardio Vascular Check</strong>
                <time class="float-end">{formatDate(updated_at)}</time>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              >
                <div className="card-text">
                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <FontAwesomeIcon
                          icon={faHeartbeat}
                          className="mr-2"
                          size="2x"
                        />{" "}
                        <strong>Apex Beat Position:</strong>{" "}
                        {apex_beat_position}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FontAwesomeIcon
                          icon={faHeartbeat}
                          className="mr-2"
                          size="2x"
                        />{" "}
                        <strong>Rate:</strong> {rate}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FontAwesomeIcon
                          icon={faHeartbeat}
                          className="mr-2"
                          size="2x"
                        />{" "}
                        <strong>Rhythm:</strong> {rhythm}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <FontAwesomeIcon
                          icon={faFileWaveform}
                          className="mr-2"
                          size="2x"
                        />{" "}
                        <strong>Sound:</strong> {sound}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <FontAwesomeIcon
                          icon={faEarDeaf}
                          className="mr-2"
                          size="2x"
                        />{" "}
                        <strong>Murmurs:</strong> {murmurs}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRunning}
                      className="mr-2"
                      size="2x"
                    />{" "}
                    <strong>Exercise Tolerance:</strong> {exercise_tolerance}
                  </div>
                </div>
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

export default CardioBox;
