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
import {
  getCurrentPatientRemarks,
  getLatestPatientXray,
  getPatient,
} from "../../services/api";
import { formsActions } from "../../redux_store/forms-store";
import PatientSkeleton from "../../components/skeletons/PatientSkeleton";
// import { getPatientPhysicalExamResults } from "../../services/api";

const PatientDetails = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //Pneumo  Records from state
  const industryClassification = useSelector(
    (state) => state.forms.pIndustryClassification
  );
  const pMineralDExposureRecord = useSelector(
    (state) => state.forms.pMineralDExposure
  );
  const pMeasuresRecord = useSelector((state) => state.forms.pMeasures);
  const pOccupationDetailsRecord = useSelector(
    (state) => state.forms.pOccupationDetails
  );
  const pSymptomsExaminationRecord = useSelector(
    (state) => state.forms.pSymptomsExamination
  );

  const smokingHistoryRecord = useSelector(
    (state) => state.forms.smokingHistory
  );

  const pneumoPhysicalTestsRecord = useSelector(
    (state) => state.forms.pneumoPhysicalTests
  );

  const pneumoSystemsCheckRecord = useSelector(
    (state) => state.forms.pneumoSystemsCheck
  );

  const pneumoResultsRemarksRecord = useSelector(
    (state) => state.forms.pneumoResultsRemarks
  );

  const pneumoAdditionalTestRecord = useSelector(
    (state) => state.forms.pneumoAdditionalTest
  );

  //Industry and Other
  const homeAddressesRecord = useSelector((state) => state.forms.homeAddresses);
  const otherIllnessInjuriesRecord = useSelector((state) => state.forms.otherIllnessInjuries);
  const otherMedicalHistoryRecord = useSelector((state) => state.forms.otherMedicalHistory);
  const otherPhysicalExaminationRecord = useSelector((state) => state.forms.otherPhysicalExamination);
  const otherCardioVascularCheckRecord = useSelector((state) => state.forms.otherCardioVascularCheck);
  const otherRespiratoryCheckRecord = useSelector((state) => state.forms.otherRespiratoryCheck);
  const otherCommentsAndRemarksRecord = useSelector((state) => state.forms.otherCommentsAndRemarks);


  useEffect(() => {
    getCurrentPatientRemarks(patientId).then((remarks) => {
      dispatch(formsActions.setFoodHandlerRemarks(remarks));
    });

    getLatestPatientXray(patientId).then((xray) => {
      dispatch(formsActions.setPatientsXray(xray));
    });

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
  const patientXray = useSelector((state) => state.forms.patientsXray) || {};

  const patientUpdated = useSelector((state) => state.patient.patientUpdated);
  const { vitals } = singlePatient;
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
                <div className="col-xl-6 col-12">
                  <BoxProfile patient={singlePatient} />
                </div>
                <div className="col-xl-6 col-12"></div>
              </div>
            </div>

            {singlePatient.category === "Pneumoconiosis" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                    height: "80vh",
                  }}
                >
                  <div>
                    <h1>Side Summary for Pneumoconiosis</h1>
                    <p>{JSON.stringify(industryClassification)}</p>
                    <p>{JSON.stringify(pMineralDExposureRecord)}</p>
                    <p>{JSON.stringify(pMeasuresRecord)}</p>
                    <p>{JSON.stringify(pOccupationDetailsRecord)}</p>
                    <p>{JSON.stringify(pSymptomsExaminationRecord)}</p>
                    <p>{JSON.stringify(smokingHistoryRecord)}</p>
                    <p>{JSON.stringify(pneumoPhysicalTestsRecord)}</p>
                    <p>{JSON.stringify(pneumoSystemsCheckRecord)}</p>
                    <p>{JSON.stringify(pneumoResultsRemarksRecord)}</p>
                    <p>{JSON.stringify(pneumoAdditionalTestRecord)}</p>
                  </div>
                </div>
              </Fragment>
            )}

            {singlePatient.category === "City Of Harare" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                    height: "80vh",
                  }}
                >
                  {vitals.length === 0 ? (
                    <div className="box">
                      <div className="box-header border-0 pb-0">
                        <h4 className="box-title">Physical Examination</h4>
                      </div>
                      <div className="box-body">
                        <h5 className="fw-500">
                          Patient's Physical Examination:{" "}
                          <span className="fw-200 badge badge-danger">
                            PENDING
                          </span>
                        </h5>
                      </div>
                    </div>
                  ) : (
                    <Vitals patient={singlePatient} />
                  )}
                  <DiseaseHistory patientId={patientId} />
                  <TobaccoBox patientId={patientId} />
                  <XRayBox patientId={patientId} />
                </div>
              </Fragment>
            )}

            {singlePatient.category === "Industry" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                  
                    height: "80vh",
                  }}
                >
                  <div className="box">
                    <div className="box-header border-0 pb-0">
                      <h4 className="box-title transform-header">
                        Patients Details
                      </h4>
                    </div>
                    <div className="box-body">
                      <p>{JSON.stringify(homeAddressesRecord)}</p>
                      <p>{JSON.stringify(otherIllnessInjuriesRecord)}</p>
                      <p>{JSON.stringify(otherMedicalHistoryRecord)}</p>
                      <p>{JSON.stringify(otherPhysicalExaminationRecord)}</p>
                      <p>{JSON.stringify(otherCardioVascularCheckRecord)}</p>
                      <p>{JSON.stringify(otherRespiratoryCheckRecord)}</p>
                      <p>{JSON.stringify(otherCommentsAndRemarksRecord)}</p>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default PatientDetails;
