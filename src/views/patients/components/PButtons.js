import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const PButtons = () => {
  return (
    <Fragment>
      <div class="d-md-flex align-items-center justify-content-between mb-20">
        <Link to={"/patients/edit"} class="btn btn-primary me-5 mb-md-0 mb-5">
          <i class="fa fa-edit"></i> Edit Profile
        </Link>
        <div class="d-flex">
          {/* <Link to={"/"} class="btn btn-success">
            <i class="fa fa-check-circle-o"></i> Accept Patient
          </Link> */}
        </div>
      </div>
    </Fragment>
  );
};

export default PButtons;
