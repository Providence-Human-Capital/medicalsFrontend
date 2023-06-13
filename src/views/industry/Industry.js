import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import IndustryTable from "./components/IndustryTable";

const Industry = () => {
    const styles = {
        containerStyles: {
          minHeight: "60vh",
          overflow: "hidden",
          minWidth: "100%",
        },
      };
  return (
    <Fragment>
      <BreadCrumb title={"Industry Patients"} activeTab={"Industry Patients"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20"></div>
            <div className="box">
              <div className="box-body">
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <IndustryTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Industry;
