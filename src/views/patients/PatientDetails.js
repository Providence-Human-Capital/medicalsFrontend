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
import { getPatient } from "../../services/api";
import { formsActions } from "../../redux_store/forms-store";
import PatientSkeleton from "../../components/skeletons/PatientSkeleton";
// import { getPatientPhysicalExamResults } from "../../services/api";

const PatientDetails = () => {
  const { patientId } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);

        const [patientData, physicalExamRecordsResponse] = await Promise.all([
          getPatient(patientId),
          fetch(`${API}/physical/latest/${patientId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }),
        ]);

        const physicalExamRecords = await physicalExamRecordsResponse.json();
        console.log("Latest Physical Exam", physicalExamRecords.data);

        if (physicalExamRecordsResponse.ok) {
          dispatch(
            formsActions.setPhysicalExamination(physicalExamRecords.data)
          );
        }

        dispatch(
          patientActions.setSinglePatient({ singlePatient: patientData })
        );
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [dispatch, patientId]);

  const singlePatient = useSelector((state) => state.patient.singlePatient);

  const patientPhysicalExamRecord = useSelector(
    (state) => state.patient.latestPhysicalExam
  );

  const isAvailable = useSelector(
    (state) => state.patient.physicalExamAvailable
  );

  const patientUpdated = useSelector((state) => state.patient.patientUpdated);

  if (loading) {
    return <PatientSkeleton />;
  }
  return (
    <Fragment>
      <BreadCrumb title={"Patient Details"} activeTab={"Patient Details"} />

      {singlePatient && (
        <section className="content">
          <div className="row">
            <div className="col-xl-8 col-12">
              <PButtons routeId={patientId} patient={singlePatient} />
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
                <Vitals patient={singlePatient} />
              )}
              <DiseaseHistory patientId={patientId} />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default PatientDetails;
