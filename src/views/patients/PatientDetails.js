import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import PButtons from "./components/PButtons";
import BoxProfile from "./components/BoxProfile";
import DiseaseHistory from "./components/DiseaseHistory";
import Vitals from "./components/Vitals";
import { useParams } from "react-router-dom";
import { API } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../redux_store/patients-store";
import InfoBox from "./components/InfoBox";
import TobaccoBox from "./components/TobaccoBox";
import XRayBox from "./components/XRayBox";
// import { getPatientPhysicalExamResults } from "../../services/api";

const PatientDetails = () => {
  const { patientId } = useParams();

  const dispatch = useDispatch();
  const getPatient = async () => {
    try {
      const responseData = await fetch(
        `${API}/patient/illnesses/${patientId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const response = await responseData.json();
      console.log("Get Patient", response.data);

      if (responseData.ok) {
        dispatch(
          patientActions.setSinglePatient({
            singlePatient: { ...response.data },
          })
        );
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  };

  const getPatientPhysicalExamResults = async () => {
    try {
      const physicalExamRecordsResponse = await fetch(
        `${API}/physical/latest/${patientId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const results = await physicalExamRecordsResponse.json();
      console.log("Latest Physical Exam", results.data);
      if (physicalExamRecordsResponse.ok) {
        dispatch(
          patientActions.setLatestPhysicalExam({
            latestPhysicalExam: { ...results.data },
          })
        );
      } else {
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  };

  const singlePatient = useSelector((state) => state.patient.singlePatient);

  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  const isAvailable = useSelector(
    (state) => state.patient.physicalExamAvailable
  );

  useEffect(() => {
    getPatient();
    getPatientPhysicalExamResults();
    console.log("Use Effect from Detail");
  }, []);

  return (
    <Fragment>
      <BreadCrumb title={"Patient Details"} activeTab={"Patient Details"} />
      {singlePatient && (
        <section className="content">
          <div className="row">
            <div className="col-xl-8 col-12">
              <PButtons routeId={patientId} />
              <div className="col-xl-12 col-12">
                <InfoBox patient={singlePatient} />
              </div>
              <div className="row">
                <div className="col-xl-4 col-12">
                  <BoxProfile patient={singlePatient} />
                </div>
                <div className="col-xl-4 col-12">
                  {singlePatient.tobacco_use.length !== 0 && (
                    <TobaccoBox tobacco={singlePatient.tobacco_use} />
                  )}
                </div>

                <div className="col-xl-4 col-12">
                  {singlePatient.xray.length !== 0 && (
                    <XRayBox x_ray={singlePatient.xray} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-12">
              {singlePatient.vitals.length === 0 ? (
                <div className="box">
                  <div className="box-header border-0 pb-0">
                    <h4 className="box-title">Physical Examination</h4>
                  </div>
                  <div className="box-body">
                    <h5 className="fw-500">
                      Patient's Physical Examination:{" "}
                      <span className="fw-200 badge badge-danger">PENDING</span>
                    </h5>
                  </div>
                </div>
              ) : (
                <Vitals
                  patient={singlePatient}
                  vitals={patientPhysicalExamRecord}
                />
              )}

              {singlePatient.illnesses.length !== 0 && (
                <DiseaseHistory
                  illnesses={singlePatient.illnesses}
                  health_issue={singlePatient.previous_health_issues}
                  year_of_diagnosis={singlePatient.year_of_diagnosis}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default PatientDetails;
