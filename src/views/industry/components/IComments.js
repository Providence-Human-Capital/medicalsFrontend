import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const IComments = ({ data }) => {
  const { updated_at, doctors_comments } = data;
  return (
    <Fragment>
      <div class="col-12">
        <div class="media bg-white mb-20">
          <span class="avatar status-success">
            <FontAwesomeIcon
              height="2rem"
              icon={faUserDoctor}
              className="mr-2"
              size="2x"
            />{" "}
          </span>
          <div class="media-body">
            <p>
              <strong>Doctor's Comments and Remarks</strong>
              <time class="float-end">{formatDate(updated_at)}</time>
            </p>
            <p 
            style={{
                marginTop: "2rem"
            }}
            >{doctors_comments}</p>

            <ul class="list-inline mt-10">
              <li>
                <a href="#" class="link-black text-sm"></a>
              </li>
              <li>
                <a href="#" class="link-black text-sm">
                  {" "}
                </a>
              </li>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IComments;
