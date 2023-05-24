import React, { Fragment } from "react";

const DetailsBox = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-body text-end min-h-150"></div>
        <div className="box-body wed-up position-relative">
          <div className="d-md-flex align-items-center">
            <div className="me-20 text-center text-md-start">
              <img
                src="/assets/images/avatar/2.jpg"
                className="bg-success-light rounded10"
                alt=""
              />
              <div className="text-center my-10">
                <p className="mb-0">Disease</p>
                <h4>Cold & Flu</h4>
              </div>
            </div>
            <div className="mt-40">
              <h4 className="fw-600 mb-5">Mical Doe</h4>
              <h5 className="fw-500 mb-5">#p- 12458796</h5>
              <p>
                <i className="fa fa-clock-o"></i> Admin on 15 May 2021, 10:00 AM
              </p>
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          <h4>Story About Disease</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailsBox;
