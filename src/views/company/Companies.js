import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import CompanyTable from "./components/CompanyTable";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");
  XLSX.writeFile(workbook, "companies.xlsx");
}

const Companies = () => {
  const companies = useSelector((state) => state.company.companies);

  const handleExportClick = () => {
    exportToExcel(companies);
  };
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "hidden",
    },
  };
  return (
    <Fragment>
        <BreadCrumb title={"Companies"} activeTab={"Companies"} />

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="d-md-flex align-items-center justify-content-between mb-20">
                <div className="d-flex">
                  <Link to={"/companies/add"} className="btn btn-success">
                    <i className="fa fa-check-circle-o"></i> Add Company
                  </Link>
                </div>
                <button className="btn btn-success" onClick={handleExportClick}>
                  Export to Excel
                </button>
              </div>
              <div className="box">
                <div className="box-body">
                  <div
                    className="table-responsive rounded card-table"
                    style={styles.containerStyles}
                  >
                    <CompanyTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
  );
};

export default Companies;
