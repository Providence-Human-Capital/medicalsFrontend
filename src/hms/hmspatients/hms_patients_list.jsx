import React, { useEffect } from "react";
import HmsPatientsTable from "./components/hmspatients_table";

const HmsPatientsList = () => {
  return (
    <>
      <div class="">
        <div class="row align-items-center">
          <div class="border-0 mb-4">
            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
              <h3 class="fw-bold mb-0">Patient List</h3>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="card">
            <div class="card-body">
              <div
                id="patient-table_wrapper"
                class="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="dataTables_length" id="patient-table_length">
                      <label>
                        Show{" "}
                        <select
                          name="patient-table_length"
                          aria-controls="patient-table"
                          class="form-select form-select-sm"
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
                  <div class="col-sm-12 col-md-6">
                    <div id="patient-table_filter" class="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          class="form-control form-control-sm"
                          placeholder=""
                          aria-controls="patient-table"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <HmsPatientsTable />
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-5">
                    <div
                      class="dataTables_info"
                      id="patient-table_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 10 entries
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-7">
                    <div
                      class="dataTables_paginate paging_simple_numbers"
                      id="patient-table_paginate"
                    >
                      <ul class="pagination">
                        <li
                          class="paginate_button page-item previous disabled"
                          id="patient-table_previous"
                        >
                          <a
                            href="#"
                            aria-controls="patient-table"
                            data-dt-idx="0"
                            tabindex="0"
                            class="page-link"
                          >
                            Previous
                          </a>
                        </li>
                        <li class="paginate_button page-item active">
                          <a
                            href="#"
                            aria-controls="patient-table"
                            data-dt-idx="1"
                            tabindex="0"
                            class="page-link"
                          >
                            1
                          </a>
                        </li>
                        <li
                          class="paginate_button page-item next disabled"
                          id="patient-table_next"
                        >
                          <a
                            href="#"
                            aria-controls="patient-table"
                            data-dt-idx="2"
                            tabindex="0"
                            class="page-link"
                          >
                            Next
                          </a>
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
    </>
  );
};

export default HmsPatientsList;
