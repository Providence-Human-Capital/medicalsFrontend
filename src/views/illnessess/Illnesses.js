import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import IllnessTable from "./components/IllnessTable";
import IllnessAnalysisCard from "../dashboard/components/IllnessAnalysisCard";
import CreateButton from "../../components/buttons/CreateButton";

const Illnesses = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Illnesses"} activeTab={"Illnesses List"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <CreateButton text={"Add Illness"} to={"/illnesses/add"} />
                  </div>
                </div>
                <div className="table-responsive rounded card-table container-height">
                  <IllnessTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Illnesses;
