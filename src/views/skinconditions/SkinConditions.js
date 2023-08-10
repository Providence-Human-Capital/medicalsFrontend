import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import SkinConditionTable from "./components.js/SkinConditionTable";
import CreateButton from "../../components/buttons/CreateButton";

const SkinConditions = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Skin Conditions"} activeTab={"Skin Conditions"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <CreateButton
                      text={" Add New Skin Condition"}
                      to={"/skin/conditions/add"}
                    />
                  </div>
                </div>
                <div className="table-responsive rounded card-table container-height">
                  <SkinConditionTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SkinConditions;
