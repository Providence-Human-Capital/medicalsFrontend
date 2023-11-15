import React, { useEffect } from "react";
import HmPatientItem from "./hmspatient_item";

const HmsPatientsTable = ({}) => {
  return (
    <>
      <table
        id="patient-table"
        class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline collapsed"
        style={{
          width: "100%",
        }}
        role="grid"
        aria-describedby="patient-table_info"
      >
        <thead>
          <tr role="row">
            <th
              class="sorting_asc"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "59.2px",
              }}
              aria-sort="ascending"
              aria-label="Id: activate to sort column descending"
            >
              Id
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "130.2px",
              }}
              aria-label="Patients: activate to sort column ascending"
            >
              Patients
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "44.2px",
              }}
              aria-label="Age: activate to sort column ascending"
            >
              Age
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "333.2px",
              }}
              aria-label="Adress: activate to sort column ascending"
            >
              Adress
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "102.2px",
              }}
              aria-label="Admited: activate to sort column ascending"
            >
              Admited
            </th>
            <th
              class="dt-body-right sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "102.2px",
              }}
              aria-label="Discharge: activate to sort column ascending"
            >
              Discharge
            </th>
            <th
              class="sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "0px",
              }}
              aria-label="Progress: activate to sort column ascending"
            >
              Progress
            </th>
            <th
              class="dt-body-right sorting"
              tabindex="0"
              aria-controls="patient-table"
              rowspan="1"
              colspan="1"
              style={{
                width: "0%",
                display: "none",
              }}
              aria-label="Status: activate to sort column ascending"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <HmPatientItem />
        </tbody>
      </table>
    </>
  );
};

export default HmsPatientsTable;
