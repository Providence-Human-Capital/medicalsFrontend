import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import OutReachTable from "./components/OutreachTable";

const Outreach = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Outreach Data"} activeTab={"Outreach Data"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div className="d-flex">
                <Link to={"/outreach/add"} className="btn btn-success">
                  <i className="fa fa-check-circle-o"></i> Add Outreach Data
                </Link>
              </div>
            </div>
            <div className="box">
              <div className="box-body">
                <div className="table-responsive rounded card-table container-height">
                  {/* Table Here */}
                  <OutReachTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Outreach;
