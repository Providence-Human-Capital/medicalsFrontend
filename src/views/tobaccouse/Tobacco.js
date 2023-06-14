import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import TobaccoTable from "./components/TobaccoTable";
import SmokingAnalysisCard from "../dashboard/components/SmokingAnalysisCard";
import CreateButton from "../../components/buttons/CreateButton";

const Tobacco = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Tobacco Usage"} activeTab={"Tobacco Usage List"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <CreateButton to={"/tobacco/add"} text={"Add Tobacco"} />
                  </div>
                </div>
                <div className="table-responsive rounded card-table container-height">
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
