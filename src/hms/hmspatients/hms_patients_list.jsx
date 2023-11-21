import React, { useEffect } from "react";
import HmsPatientsTable from "./components/hmspatients_table";
import BreadCrumb from "../../components/BreadCrumb";

const HmsPatientsList = () => {
  return (
    <>
      <BreadCrumb title={"Patients"} activeTab={"Patients"} />
      <section className="content">
        <div className="">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Patient List</h3>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="card">
              <div className="card-body">
                <div
                  id="patient-table_wrapper"
                  className="dataTables_wrapper dt-bootstrap5 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div
                        className="dataTables_length"
                        id="patient-table_length"
                      >
                        <label>
                          Show{" "}
                          <select
                            name="patient-table_length"
                            aria-controls="patient-table"
                            className="form-select form-select-sm"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div
                        id="patient-table_filter"
                        className="dataTables_filter"
                      >
                        <label>
                          Search:
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder=""
                            aria-controls="patient-table"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <HmsPatientsTable />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div className="dataTables_info" id="patient-table_info">
                        Showing 1 to 10 of 10 entries
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="patient-table_paginate"
                      >
                        <ul className="pagination">
                          <li
                            className="paginate_button page-item previous disabled"
                            id="patient-table_previous"
                          >
                            <a className="page-link">Previous</a>
                          </li>
                          <li className="paginate_button page-item active">
                            <a className="page-link">1</a>
                          </li>
                          <li
                            className="paginate_button page-item next disabled"
                            id="patient-table_next"
                          >
                            <a className="page-link">Next</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HmsPatientsList;
