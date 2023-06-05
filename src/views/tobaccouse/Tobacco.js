import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import TobaccoTable from "./components/TobaccoTable";
import SmokingAnalysisCard from "../dashboard/components/SmokingAnalysisCard";

const Tobacco = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Tobacco Usage"} activeTab={"Tobacco Usage List"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div className="d-flex">
                <Link to={"/tobacco/add"} className="btn btn-success">
                  <i className="fa fa-check-circle-o"></i> Add Tobacco
                </Link>
              </div>
            </div>
            <div className="box">
              <div className="box-body">
                <div className="table-responsive rounded card-table container-height">
                  {/* <IllnessTable /> */}
                  <TobaccoTable />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <SmokingAnalysisCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Tobacco;
