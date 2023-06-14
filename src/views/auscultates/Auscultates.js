import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import AustTable from "./components/AustTable";
import { Link } from "react-router-dom";
import CreateButton from "../../components/buttons/CreateButton";

const Auscultates = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Auscultates"} activeTab={"Auscultates List"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <CreateButton
                      text={"Add New Skin  Auscultate"}
                      to={"/skin/conditions/add"}
                    />
                  </div>
                </div>
                <div className="table-responsive rounded card-table container-height">
                  <AustTable />
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

export default Auscultates;
