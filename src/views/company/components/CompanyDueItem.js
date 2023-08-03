import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { formatDate, options } from "../../../utils/dateConverter";

const CompanyDueItem = ({ dueClient }) => {
  const releasedAt = dueClient.certificates[0].released_at;
  const validity = dueClient.certificates[0].validity;
  const expirationDate = moment(releasedAt)
    .add(validity, "years")
    .format("YYYY-MM-DD");
  return (
    <>
      <div class="inner-user-div4">
        <div>
          <div class="d-flex align-items-center mb-10">
            <div class="me-15">
              <img
                src="/assets/images/avatar/avatar-1.png"
                class="avatar avatar-lg rounded10 bg-primary-light"
                alt=""
              />
            </div>
            <div class="d-flex flex-column flex-grow-1 fw-500">
              <p class="hover-primary tBext-fade mb-1 fs-14">
                {dueClient.first_name} {dueClient.last_name}
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end mb-15 py-10 bb-dashed border-bottom">
            <div>
              <p class="mb-0 text-muted">
                <i class="fa fa-clock-o me-5"></i>
                <span
                  className="badge badge-pill badge-danger"
                  style={{
                    width: "fit-content",
                  }}
                >
                  Due On: {formatDate(expirationDate, options)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDueItem;
