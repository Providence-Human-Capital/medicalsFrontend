import React, { Fragment } from "react";
import { formatDate, options } from "../../../utils/dateConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVialVirus,
  faPrescriptionBottle,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";

const InjuryBox = ({ injuries }) => {
  return (
    <Fragment>
      {injuries && (
        <div class="col-12">
          <div class="media bg-white mb-20">
            <span class="avatar">
              <FontAwesomeIcon
                height="2rem"
                icon={faVialVirus}
                className="mr-2"
                size="2x"
              />{" "}
            </span>
            <div class="media-body">
              <p>
                <strong>Patients Treated for these Illnesses & Injuries</strong>
              </p>
              <div
                className=""
                style={{
                  marginTop: "1rem",
                }}
              ></div>
            </div>
          </div>

          <div className="row">
            {injuries.map((injury, index) => (
              <div className="col-md-6">
                <div
                  className="card"
                  style={{
                    minHeight: "150px",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          src="/assets/images/patient2.svg"
                          className="w-100 bg-primary-light rounded10 me-15"
                          alt=""
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{injury.name}</h5>
                        <p className="card-text">
                          Year of Treatment{" "}
                          <span className="badge badge-info">
                            {injury.date}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default InjuryBox;
