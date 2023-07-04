import React, { Fragment } from "react";
import { formatDate } from "../../../utils/dateConverter";

const HomeAddress = ({ homeAddress }) => {
  return (
    <Fragment>
      <div class="col-12">
        <div class="media bg-white mb-20">
          <span class="avatar status-success">
            <img class="avatar" src="/assets/images/avatar2.png" alt="..." />
          </span>
          <div class="media-body">
            <p>
              <strong>Home Address</strong>
              <time class="float-end">
                {formatDate(homeAddress.created_at)}
              </time>
            </p>
            <p>
              {homeAddress.street}, {homeAddress.address}
            </p>

            <ul class="list-inline mt-10">
              <li>
                <a href="#" class="link-black text-sm">
                  {homeAddress.city}{" "}
                </a>
              </li>
              <li>
                <a href="#" class="link-black text-sm">
                  {" "}
                  {homeAddress.province}
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

export default HomeAddress;
