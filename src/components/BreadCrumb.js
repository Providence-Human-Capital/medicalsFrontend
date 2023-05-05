import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title, activeTab }) => {
  return (
    <Fragment>
      <div className="content-header">
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <h4 className="page-title">{ title }</h4>
            <div className="d-inline-block align-items-center">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>
                      <i className="mdi mdi-home-outline"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    { activeTab }
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BreadCrumb;
