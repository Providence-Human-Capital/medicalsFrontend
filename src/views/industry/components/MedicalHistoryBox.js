import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faTruckMedical,
  faHeadSideMask,
  faLaptopMedical,
  faBedPulse,
  faHospitalUser,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/dateConverter";
import { options } from "../../../utils/dateConverter";

const MedicalHistoryBox = ({ mHistory }) => {
  return (
    <Fragment>
      <div class="col-xl-12">
        <a href="#" class="box bg-info bg-hover-info">
          <div class="box-body">
            <span class="text-white icon-Layout-arrange fs-40">
              <span class="path1"></span>
              <span class="path2"></span>
            </span>
            <div class="text-white fw-600 fs-18 mb-2 mt-5">
              Patient's Medical History{" "}
              <FontAwesomeIcon icon={faHospitalUser} />
            </div>
            <div class="text-white fs-16">
              <h5>
                <FontAwesomeIcon icon={faBedPulse} /> {"  "}
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Serious Injuries ?:
                </strong>{" "}
                <span className="badge badge-info">
                  {mHistory.serious_injury === true ? "YES" : "NO"}
                </span>
              </h5>
              <div className="media bg-white mb-20 rounded">
                <p className="medical-text">{mHistory.injury_details}</p>
              </div>
              <h5>
                <FontAwesomeIcon icon={faHospital} /> {"  "}
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Ever been Admitted ?:
                </strong>{" "}
                <span className="badge badge-info">
                  {mHistory.admitted === true ? "ADMITTED" : "NO"}
                </span>
              </h5>
              <div className="media bg-white mb-20 rounded">
                <p className="medical-text">{mHistory.admission_details}</p>
              </div>
              <h5>
                <FontAwesomeIcon icon={faHeadSideMask} /> {"  "}
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Have Allergies ?:
                </strong>{" "}
                <span className="badge badge-info">
                  {mHistory.allergies ? "YES" : "NO"}
                </span>
              </h5>
              <div className="media bg-white mb-20 rounded">
                <p className="medical-text">{mHistory.allergies_details}</p>
              </div>
              <h5>
                <FontAwesomeIcon icon={faLaptopMedical} /> {"  "}
                <strong
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Health State
                </strong>{" "}
              </h5>
              <div className="media bg-white mb-20 rounded">
                <span className="badge badge-warning">
                  {mHistory.health_state}
                </span>
              </div>
            </div>
          </div>
          {/* <span className="fw-500">
            {" "}
            <i className="fa fa-clock-o"></i>{" "}
            {formatDate(mHistory.created_at, options)}
          </span> */}
        </a>
        {/* <div class="media bg-white mb-20">
          <div className="row pt-5">
            <div className="col-12">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                Alcohol Consumption
              </h4>
              <div className="row">
                <div className="col-md-6">
                  <FontAwesomeIcon size="6rem" icon={faWineBottle} />
                  <p>{mHistory.alcohol_per_day}</p>
                </div>
                <div className="col-md-6">
                  <FontAwesomeIcon icon={faWineBottle} />
                  <p>{ mHistory.alcohol_per_week}</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};

export default MedicalHistoryBox;
