import React from "react";
import { convertToDateWord } from "../../../helpers/helpers";
import { Link } from "react-router-dom";

const ReportListItem = ({ report }) => {
  return (
    <tr>
      <td class="ps-0 py-8">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 me-20">
            <div class="bg-img h-50 w-50 my-bgg"></div>
          </div>

          <div>
            <a class="text-dark fw-600 hover-primary mb-1 fs-16">
              {convertToDateWord(report.day)}
            </a>
            <span class="text-fade d-block">
              Patients {report.patients_count}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span class="text-fade fw-600 d-block fs-16">Pneumoconiosis</span>
        <span class="text-dark fw-600 d-block fs-16">
          <span class="badge badge-primary-light badge-lg">
            Patients {report.Pneumoconiosis.length}
          </span>
        </span>
      </td>
      <td>
        <span class="text-fade fw-600 d-block fs-16">City Of Harare</span>
        <span class="text-dark fw-600 d-block fs-16">
          <span class="badge badge-primary-light badge-lg">
            Patients {report["City Of Harare"].length}
          </span>
        </span>
      </td>
      <td>
        <span class="text-fade fw-600 d-block fs-16">Industry & Other</span>
        <span class="text-dark fw-600 d-block fs-16">
          <span class="badge badge-primary-light badge-lg">
            Patients {report["Industry"].length}
          </span>
        </span>
      </td>
      {/* <td>
        <span class="badge badge-primary-light badge-lg">Approved</span>
      </td> */}
      <td class="text-end">
        <a
          href="#"
          class="waves-effect waves-light btn btn-primary btn-circle mx-5"
        >
          <span class="icon-Bookmark"></span>
        </a>
        <Link
          to={`/report/single/${report.day}`}
          class="waves-effect waves-light btn btn-primary btn-circle mx-5"
        >
          <span class="icon-Arrow-right">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default ReportListItem;
