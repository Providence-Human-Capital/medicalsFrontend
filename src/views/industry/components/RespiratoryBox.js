import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faLungs,
  faHeart,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, options } from "../../../utils/dateConverter";

const RespiratoryBox = ({ data }) => {
  const {
    lungs,
    x_ray_comment,
    spirometry_comment,
    fev,
    fvc,
    sears,
    tenderness,
    hernia,
    organomegaly,
    kidney_enlargement,
    urine_appear,
    sg,
    albumin,
    sugar,
    deposit,
    evidence_of_disease,
    evidence_of_any_disease,
    lmp,
    parity,
    updated_at,
  } = data;
  return (
    <Fragment>
      <div class="col-12">
        <div class="media bg-white mb-20">
          <span class="avatar status-success">
            <FontAwesomeIcon icon={faLungs} className="mr-2" size="2x" />{" "}
          </span>
          <div class="media-body">
            <p>
              <strong>Respiratory Check</strong>
              <time class="float-end">{formatDate(updated_at)}</time>
            </p>
            <div
              className=""
              style={{
                marginTop: "1rem",
              }}
            ></div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FontAwesomeIcon
                        icon={faLungs}
                        className="mr-2"
                        size="2x"
                      />{" "}
                      Lungs
                    </h5>
                    <p className="card-text">{lungs}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FontAwesomeIcon
                        icon={faLungs}
                        className="mr-2"
                        size="2x"
                      />{" "}
                      Urine Appearance
                    </h5>
                    <p className="card-text">{urine_appear}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FontAwesomeIcon
                        icon={faXRay}
                        className="mr-2"
                        size="1x"
                      />{" "}
                      X-ray on Comment
                    </h5>
                    <p className="card-text">{x_ray_comment}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="mr-2"
                        size="1x"
                      />{" "}
                      Spirometry Comment
                    </h5>
                    <p className="card-text">{spirometry_comment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="media-body">
          <div className="card">
            <div className="card-body">
              <table className="table no-border">
                <thead>
                  <tr className="text-uppercase bg-lightest">
                    <th>
                      <span className="text-dark">Respiratory Detail</span>
                    </th>
                    <th>
                      <span className="text-dark">Information</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>FEV: =</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{fev}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>FVC: =</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{fvc}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Sears:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{sears}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Tenderness:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {tenderness}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Hernia:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{hernia}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Organomegaly:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {organomegaly}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Kidney Enlargement:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {kidney_enlargement}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>SG:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{sg}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Albumin:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {albumin}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Sugar:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{sugar}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Deposit:</strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {deposit}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Evidence of Disease: </strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {evidence_of_disease}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Evidence of Any Disease: </strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      {evidence_of_any_disease}
                    </span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>LMP: </strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{lmp}</span>
                  </td>
                </tbody>
                <tbody>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">
                      <strong>Parity: </strong>
                    </span>
                  </td>
                  <td>
                    <span class="text-fade fw-600 d-block fs-16">{parity}</span>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RespiratoryBox;
