import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import IllnessTable from "./components/IllnessTable";
import IllnessAnalysisCard from "../dashboard/components/IllnessAnalysisCard";

const Illnesses = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Illnesses"} activeTab={"Illnesses List"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div className="d-flex">
                <Link to={"/illnesses/add"} className="btn btn-success">
                  <i className="fa fa-check-circle-o"></i> Add Illness
                </Link>
              </div>
            </div>
            <div className="box">
              <div className="box-body">
                <div className="table-responsive rounded card-table container-height">
                  <IllnessTable />
                 
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-12">
            <IllnessAnalysisCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Illnesses;
