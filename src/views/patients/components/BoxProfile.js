import React, { Fragment } from "react";

const BoxProfile = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-body box-profile">
          <div className="row">
            <div className="col-12">
              <div>
                <p>
                  Email :
                  <span className="text-gray ps-10">David@yahoo.com</span>
                </p>
                <p>
                  Phone :
                  <span className="text-gray ps-10">+11 123 456 7890</span>
                </p>
                <p>
                  Address :
                  <span className="text-gray ps-10">
                    123, Lorem Ipsum, Florida, USA
                  </span>
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="pb-15">
                <p className="mb-10">Social Profile</p>
                <div className="user-social-acount">
                  <button className="btn btn-circle btn-social-icon btn-facebook">
                    <i className="fa fa-facebook"></i>
                  </button>
                  <button className="btn btn-circle btn-social-icon btn-twitter">
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button className="btn btn-circle btn-social-icon btn-instagram">
                    <i className="fa fa-instagram"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /.box-body --> */}
      </div>
    </Fragment>
  );
};

export default BoxProfile;
