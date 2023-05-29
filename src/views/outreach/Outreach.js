import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import OutReachTable from "./components/OutreachTable";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Outreach");
  XLSX.writeFile(workbook, "Outreach.xlsx");
}

const Outreach = () => {
  const outreach = useSelector((state) => state.outreach.outreachPatients);

  const handleExportClick = () => {
    exportToExcel(outreach);
  };

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
              <button className="btn btn-success" onClick={handleExportClick}>
                
              <i class="fa-light fa-file-spreadsheet"></i>
                Export to Excel
              </button>
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
