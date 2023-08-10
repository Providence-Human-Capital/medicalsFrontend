import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
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
                <h1 className="card-title">Unauthorized Access</h1>
                <p className="card-text">
                  You are not authorized to access this location.
                </p>
                <Link to="/" className="btn btn-primary">
                  Go Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
