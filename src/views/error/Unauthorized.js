import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container">
        <div
          className="row justify-content-center"
          style={{
            marginTop: "8rem",
          }}
        >
          <div className="col-md-6">
            <div className="card mt-5 text-center">
              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Unauthorized Access
                </h4>
                <p className="card-text">
                  You are not authorized to access this location.
                </p>
                <a onClick={handleGoBack} className="btn btn-primary">
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
