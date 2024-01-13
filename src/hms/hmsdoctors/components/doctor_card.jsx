import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({}) => {
  return (
    <>
      <div class="col-12 col-lg-4">
        <div class="box ribbon-box">
          <div class="ribbon-two ribbon-two-primary">
            <span>Full Time</span>
          </div>
          <div class="box-header no-border p-0">
            <Link to={"/hms/doctors/dashboard"}>
              <img
                class="img-fluid"
                src="/assets/images/avatar/375x200/1.jpg"
                alt=""
              />
            </Link>
          </div>
          <div class="box-body">
            <div class="user-contact list-inline text-center">
              <a href="#" class="btn btn-circle mb-5 btn-facebook">
                <i class="fa fa-facebook"></i>
              </a>
              <a href="#" class="btn btn-circle mb-5 btn-instagram">
                <i class="fa fa-instagram"></i>
              </a>
              <a href="#" class="btn btn-circle mb-5 btn-twitter">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#" class="btn btn-circle mb-5 btn-warning">
                <i class="fa fa-envelope"></i>
              </a>
            </div>
            <div class="text-center">
              <h3 class="my-10">
                <Link to={"/hms/doctors/dashboard"}>Dr. Tristan</Link>
              </h3>
              <h6 class="user-info mt-0 mb-10 text-fade">Gynecologist</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
