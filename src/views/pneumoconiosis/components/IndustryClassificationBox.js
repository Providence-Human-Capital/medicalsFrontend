import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStopwatch,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import PlaceHolderBox from "../../../components/PlaceHolderBox";
const IndustryClassificationBox = ({ classification }) => {
  const { updated_at, industry, mineral, other_details } = classification || {};
  return (
    <Fragment>
      {classification ? (
        <div className="col-12">
          <div className="media bg-white mb-20">
            <span className="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faIndustry}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div className="media-body">
              <p>
                <strong>Industry Classification</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>
              <div>
                <h4>
                  Industry{"-> "}
                  <span className="badge badge-secondary">
                    <strong>{industry} </strong>
                    Industries
                  </span>
                </h4>
                {other_details && (
                  <p>
                    {" "}
                    <strong>DETAILS {"->"}</strong> {other_details}
                  </p>
                )}
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
      ) : (
        <PlaceHolderBox
          title={"Industry Classification"}
          tag={"NO AVAILABLE RECORD"}
        />
      )}
    </Fragment>
  );
};

export default IndustryClassificationBox;
