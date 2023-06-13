import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import DiseaseTable from "./components/DiseaseTable";

const Diseases = () => {
  return (
    <Fragment>
      <BreadCrumb activeTab={"Diseases"} title={"Diseases"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div className="d-flex">
                <Link to={"/diseases/add"} className="btn btn-success">
                  <i className="fa fa-check-circle-o"></i> Add New Disease
                </Link>
              </div>
            </div>
            <div className="box">
              <div className="box-body">
                <div className="table-responsive rounded card-table container-height">
                  <DiseaseTable />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-12">{/* <IllnessAnalysisCard /> */}</div>
        </div>
      </section>
    </Fragment>
  );
};

export default Diseases;
