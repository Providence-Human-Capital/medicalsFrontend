import React, { Fragment, useEffect } from "react";
import { API, IMAGE_URL } from "../../../config";
import { formatDate, options } from "../../../utils/dateConverter";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "../../../redux_store/forms-store";
import { getLatestPatientXray } from "../../../services/api";

const XRayBox = ({ patientId }) => {
  const dispatch = useDispatch();
  // http://localhost:8000/api/patients/6/latest-xray
  const patientXray = useSelector((state) => state.forms.patientsXray) || null;

  useEffect(() => {
    getLatestPatientXray(patientId).then((xray) => {
      dispatch(formsActions.setPatientsXray(xray));
    });
  }, [patientId]);
  return (
    <Fragment>
      {patientXray === null ? (
        <div className="col-md-12">
          <div className="box">
            <div className="box-header border-0 pb-0">
              <h4 className="box-title"></h4>
              <strong>Upload of Patient's XRay</strong>
            </div>
            <div className="box-body">
              <h5 className="fw-500">
                <span className="fw-200 badge badge-info">
                  NO AVAILABLE RECORD
                </span>
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="box">
            <div className="box-header border-0 pb-0">
              <h4 className="box-title fw-500">Patient's XRay</h4>
              <div className="box-body box-profile">
                <div className="row">
                  <div className="col-12 mb-3">
                    {patientXray.status === "POSITIVE" ? (
                      <p className="fw-500 mb-0">
                        XRay Status:{" "}
                        <span className="badge badge-danger">
                          {patientXray.status}
                        </span>
                      </p>
                    ) : (
                      <p className="fw-500 mb-0">
                        XRay Status:{" "}
                        <span className="badge badge-success">
                          {patientXray.status}
                        </span>
                      </p>
                    )}
                    <p className="fw-500">
                      {" "}
                      <i className="fa fa-clock-o"></i>{" "}
                      {formatDate(patientXray.created_at, options)}
                    </p>
                  </div>
                  {patientXray.result && (
                    <div className="col-12">
                      <p>
                        {" "}
                        <strong>Comment:</strong> {patientXray.result}
                      </p>
                    </div>
                  )}

                  <div className="col-12">
                    <img
                      src={`${IMAGE_URL}/${patientXray.image}`}
                      className="img-fluid"
                      alt="Patient's XRay"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default XRayBox;
