import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { formatDate, options } from "../../../utils/dateConverter";
// import { formatDate } from "../../../helpers/helpers";
const DueClient = ({ dueClient }) => {
  const releasedAt = dueClient.certificates[0].released_at;
  const validity = dueClient.certificates[0].validity;
  const expirationDate = moment(releasedAt)
    .add(validity, "years")
    .format("YYYY-MM-DD");

  const handleEmailClick = () => {
    const email = dueClient.company_email
    const subject = "RE: CLIENTS DUE FOR MEDICALS";
    const body = `Please Note that ${dueClient.first_name} ${dueClient.last_name} is due for medicals` ;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`;
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;

    window.open(gmailUrl || outlookUrl);
  };
  return (
    <>
      <div className="inner-user-div4">
        <div>
          <div className="d-flex align-items-center mb-10">
            <div className="me-15">
              <img
                src="/assets/images/avatar/avatar-1.png"
                className="avatar avatar-lg rounded10 bg-primary-light"
                alt=""
              />
            </div>
            <div className="d-flex flex-column flex-grow-1 fw-500">
              <p className="hover-primary tBext-fade mb-1 fs-14">
                {dueClient.first_name} {dueClient.last_name}
              </p>
              <span
                className="badge badge-pill badge-warning"
                style={{
                  width: "fit-content",
                }}
              >
                {dueClient.company}
              </span>
            </div>
            <div>
              <a
                className="waves-effect waves-circle btn btn-circle btn-primary-light btn-sm"
                onClick={handleEmailClick}
              >
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end mb-15 py-10 bb-dashed border-bottom">
            <div>
              <p className="mb-0 text-muted">
                <i className="fa fa-clock-o me-5"></i>
                <span
                  className="badge badge-pill badge-danger"
                  style={{
                    width: "fit-content",
                  }}
                >
                  Due On: {formatDate(expirationDate, options)}
                </span>
              </p>
              <p className="mb-0 text-muted">
                <i className="fa fa-phone me-5"></i> HR PHONE NUMBER:{" "}
                <strong>
                  {dueClient.company_phone} / {dueClient.company_phone2}{" "}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DueClient;
