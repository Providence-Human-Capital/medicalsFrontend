import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faLungs, faHeart, faXRay  } from "@fortawesome/free-solid-svg-icons";
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
            <div className="" style={{
                marginTop: "1rem"
            }}>
               
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon icon={faLungs} className="mr-2" 
                      size="2x"
                      />{" "}
                      <strong>Lungs:</strong> {lungs}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faXRay} className="mr-2" /> {" "}
                      <strong>X-Ray Comment:</strong> {x_ray_comment}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faHeart} className="mr-2" />{" "}
                      <strong>Spirometry Comment:</strong> {spirometry_comment}
                    </p>
                    <p>
                      <strong>FEV:</strong> {fev}
                    </p>
                    <p>
                      <strong>FVC:</strong> {fvc}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Sears:</strong> {sears}
                    </p>
                    <p>
                      <strong>Tenderness:</strong> {tenderness}
                    </p>
                    <p>
                      <strong>Hernia:</strong> {hernia}
                    </p>
                    <p>
                      <strong>Organomegaly:</strong> {organomegaly}
                    </p>
                    <p>
                      <strong>Kidney Enlargement:</strong> {kidney_enlargement}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon icon={faLungs} className="mr-2" size="2x" />{" "}
                      <strong>Urine Appearance:</strong> {urine_appear}
                    </p>
                    <p>
                      <strong>SG:</strong> {sg}
                    </p>
                    <p>
                      <strong>Albumin:</strong> {albumin}
                    </p>
                    <p>
                      <strong>Sugar:</strong> {sugar}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Deposit:</strong> {deposit}
                    </p>
                    <p>
                      <strong>Evidence of Disease:</strong>{" "}
                      {evidence_of_disease}
                    </p>
                    <p>
                      <strong>Evidence of Any Disease:</strong>{" "}
                      {evidence_of_any_disease}
                    </p>
                    <p>
                      <strong>LMP:</strong> {lmp}
                    </p>
                    <p>
                      <strong>Parity:</strong> {parity}
                    </p>
                    <p>
                      <strong>Last Updated:</strong> {updated_at}
                    </p>
                  </div>
                </div>
              </div>

            <ul class="list-inline mt-10">
              <li class="pull-right">
                <button
                  type="button"
                  class="btn btn-box-tool btn-sm btn-rounded"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Edit"
                >
                  <i class="fa fa-pencil"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-box-tool btn-sm btn-rounded"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Delete"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RespiratoryBox;
