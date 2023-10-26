import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";
import PButtons from "./components/PButtons";
import BoxProfile from "./components/BoxProfile";
import DiseaseHistory from "./components/DiseaseHistory";
import Vitals from "./components/Vitals";
import { useParams } from "react-router-dom";
import { API } from "../../config";
import { batch, useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../redux_store/patients-store";
import InfoBox from "./components/InfoBox";
import TobaccoBox from "./components/TobaccoBox";
import XRayBox from "./components/XRayBox";
import { Helmet } from "react-helmet";
import {
  calculateDaysLeftForCertificateValidity,
  chechCertificatesStatusUpdate,
  createCertificateBatch,
  foodHandlerPatientDetail,
  getCurrentPatientRemarks,
  getFoodHandlerPatientDetails,
  getIndustryPatientDetails,
  getLatestPatientXray,
  getPatient,
  getPneumoPatientDetails,
  getPneumoPatients,
} from "../../services/api";
import { formsActions } from "../../redux_store/forms-store";
import PatientSkeleton from "../../components/skeletons/PatientSkeleton";
import HomeAddress from "../industry/components/HomeAddress";
import MedicalHistoryBox from "../industry/components/MedicalHistoryBox";
import OtherPhysicalExamination from "../industry/components/OtherPhysicalExamination";
import CardioBox from "../industry/components/CardioBox";
import RespiratoryBox from "../industry/components/RespiratoryBox";
import IComments from "../industry/components/IComments";
import IndustryClassificationBox from "../pneumoconiosis/components/IndustryClassificationBox";
import MineralDustExBox from "../pneumoconiosis/components/MineralDustExBox";
import DustyOccupation from "../pneumoconiosis/components/DustyOccupation";
import SymptomsBox from "../pneumoconiosis/components/SymptomsBox";
import MeasuresBox from "../pneumoconiosis/components/MeasuresBox";
import SmokingHistoryBox from "../pneumoconiosis/components/SmokingHistoryBox";
import PhysicalBox from "../pneumoconiosis/components/PhysicalBox";
import SystemsCheckBox from "../pneumoconiosis/components/SystemsCheckBox";
import ResultsAndInvestigation from "../pneumoconiosis/components/ResultsAndInvestigation";
import AdditionalTestsBox from "../pneumoconiosis/components/AdditionalTestsBox";
import ConditionsTestBox from "../pneumoconiosis/components/ConditionsTestBox";
import InjuryBox from "../industry/components/InjuryBox";
import { PHYSICAL_EXAM } from "../../utils/global";
import BpPlot from "./components/BpPlot";
import BmiPlot from "./components/BmiPlot";
import DaysLeftBox from "./components/DaysLeftBox";
import Swal from "sweetalert2";
import { uiActions } from "../../redux_store/ui-store";
import Loading from "../../components/loader/Loading";
import CategoryBox from "../../components/CategoryBox";

const PatientDetails = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dayLeftData, setDayLeftData] = useState(null);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [addingToBatch, setAddingToBatch] = useState(false);

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

  const pneumoConditionsTestRecord = useSelector(
    (state) => state.forms.pneumoConditionsTest
  );

  const pneumoResultsRemarksRecord = useSelector(
    (state) => state.forms.pneumoResultsRemarks
  );

  const pneumoAdditionalTestRecord = useSelector(
    (state) => state.forms.pneumoAdditionalTest
  );

  //Industry and Other
  const homeAddressesRecord = useSelector((state) => state.forms.homeAddresses);
  const otherIllnessInjuriesRecord = useSelector(
    (state) => state.forms.otherIllnessInjuries
  );
  const otherMedicalHistoryRecord = useSelector(
    (state) => state.forms.otherMedicalHistory
  );
  const otherPhysicalExaminationRecord = useSelector(
    (state) => state.forms.otherPhysicalExamination
  );
  const otherCardioVascularCheckRecord = useSelector(
    (state) => state.forms.otherCardioVascularCheck
  );
  const otherRespiratoryCheckRecord = useSelector(
    (state) => state.forms.otherRespiratoryCheck
  );
  const otherCommentsAndRemarksRecord = useSelector(
    (state) => state.forms.otherCommentsAndRemarks
  );

  const companiesWithBatches = useSelector(
    (state) => state.company.companiesWithBatches
  );

  useEffect(() => {
    getCurrentPatientRemarks(patientId).then((remarks) => {
      dispatch(formsActions.setFoodHandlerRemarks(remarks));
    });
    getLatestPatientXray(patientId).then((xray) => {
      dispatch(formsActions.setPatientsXray(xray));
    });
    getFoodHandlerPatientDetails(patientId)
      .then((data) => {
        dispatch(formsActions.setCertificateState(data.certificate));
        dispatch(formsActions.setPatientsIllness(data.illnesses));
        dispatch(formsActions.setPatientsXray(data.xrays));
        dispatch(formsActions.setPatientsTobaccos(data.tobaccoUses));
        dispatch(formsActions.setPhysicalExamination(data.physical_exam));
        if (typeof data.fremarks === "object" && data.fremarks !== null) {
          const remarksObjects = Object.assign({}, ...data.fremarks);
          dispatch(formsActions.setFoodHandlerRemarks(remarksObjects));
        } else {
          // Handle the case where data.fremarks is not iterable
          console.error("Invalid data received for fremarks:", data.fremarks);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error fetching food handler patient details:", error);
      });
    if (singlePatient && singlePatient.category === "Pneumoconiosis") {
      getPneumoPatientDetails(patientId).then((data) => {
        console.log("All Dataa", data);
        dispatch(
          formsActions.setIndustryClassification(data.industryClassification)
        );
        dispatch(formsActions.setControlMeasures(data.controlMeasures));
        dispatch(formsActions.setMineralDustExposure(data.mineralDustExposure));
        dispatch(formsActions.setControlMeasures(data.controlMeasures));
        dispatch(
          formsActions.setPneumoResultsRemarks(data.resultsInvestigation)
        );
        if (data.healthyQuestionnaire === null) {
          dispatch(formsActions.setSymptomsExamination(null));
          dispatch(formsActions.setPneumoConditionsTest(null));
          dispatch(formsActions.setPneumoPhysicalTests(null));
          dispatch(formsActions.setPneumoSystemsCheck(null));
          dispatch(formsActions.setSmokingHistory(null));
        } else {
          dispatch(
            formsActions.setSymptomsExamination(
              data.healthyQuestionnaire.symptomsTest
            )
          );
          dispatch(
            formsActions.setPneumoConditionsTest(
              data.healthyQuestionnaire.conditionsTest
            )
          );
          dispatch(
            formsActions.setPneumoPhysicalTests(
              data.healthyQuestionnaire.physicalTest
            )
          );
          dispatch(
            formsActions.setPneumoSystemsCheck(
              data.healthyQuestionnaire.systemsCheck
            )
          );
          dispatch(
            formsActions.setSmokingHistory(
              data.healthyQuestionnaire.smokingHistory
            )
          );
        }
      });
    }
    if (singlePatient && singlePatient.category === "Industry") {
      getIndustryPatientDetails(patientId).then((data) => {
        console.log("Industry Patient Data: " + JSON.stringify(data));

        dispatch(formsActions.setHomeAddress(data.home_address));
        dispatch(formsActions.setInjuriesAndIllnesses(data.diseases));
        dispatch(
          formsActions.setOtherPhysicalExamination(
            data.latest_other_physical_exam
          )
        );
        dispatch(formsActions.setMedicalHistory(data.medical_history));
        dispatch(
          formsActions.setOtherCardioVascularCheck(data.cardio_vascular)
        );
        dispatch(formsActions.setOtherRespiratoryCheck(data.respiratory));

        dispatch(
          formsActions.setOtherCommentsAndRemarks(data.icomments_remarks)
        );
      });
    }
    calculateDaysLeftForCertificateValidity(patientId).then((data) => {
      setDayLeftData(data);
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

        console.log("LatestPhysicalExamRecords", physicalExamRecords);
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
  }, [patientId]);

  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);
  if (loading) {
    return <PatientSkeleton />;
  }

  const filterCompany = (companyName) => {
    return companiesWithBatches.find(
      (company) => company.company_name === companyName
    );
  };

  // Adding Patient to Batch
  const handleAddToBatch = async (selectedValue, certificateId) => {
    console.log(selectedValue);
    try {
      setAddingToBatch(true);
      const response = await fetch(
        `${API}/certificate/batch/${selectedValue}/${certificateId}/add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (response.status === 200) {
        setAddingToBatch(false);
        console.log(responseData);
        Swal.fire("Success!", "Adding to Batch successfully.", "success");
      } else {
        setAddingToBatch(false);
        throw new Error(`${responseData.message}`);
      }
    } catch (error) {
      Swal.fire("Something went wrong!", error.message, "error");
      setAddingToBatch(false);
    }
  };

  const handleCancel = () => {
    Swal.close();
  };

  const handleAddToBatchClick = () => {
    const company = filterCompany(singlePatient.attendee.company.company_name);
    console.log("On click", company.certificate_batches);

    const valid_batches = company.certificate_batches.filter(
      (batch) => batch.invalidate !== 1
    );

    console.log("Valid batches", valid_batches);

    if (valid_batches.length === 0) {
      createCertificateBatch(company.id).then((data) => {
        console.log("Created certificate batch", data);
      });
    }

    if (company) {
      Swal.fire({
        title: "Select Certificate Batch",
        html: `
        <select id="status-select" class="form-select"> 
        <option value="">Select Batch</option> 
        ${valid_batches
          .map((batch) => `<option value="${batch.id}">${batch.name}</option>`)
          .join("")} 
        `,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: () => {
          const selectElement = document.getElementById("status-select");
          const selectedValue =
            selectElement.options[selectElement.selectedIndex].value;
          return selectedValue;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedValue = result.value;
          handleAddToBatch(selectedValue, singlePatient.certificate.id);
        } else {
          handleCancel();
        }
      });
    }
  };

  const category = singlePatient?.category ?? "Medical Patient";

  return (
    <Fragment>
      {category && (
        <BreadCrumb title={"Patient Details"} activeTab={category} />
      )}

      <Helmet>
        <title>
          Client : {singlePatient?.attendee?.first_name ?? "Unknown"}{" "}
          {singlePatient?.attendee?.last_name ?? "Unknown"}
        </title>
      </Helmet>

      {singlePatient && (
        <section className="content">
          <div className="row">
            <div className="col-xl-8 col-12">
              <div className="d-md-flex align-items-center justify-content-between mb-20">
                <div style={{}}>
                  <h4>
                    <strong>Certificate Status</strong>
                    {"   "}
                    {PHYSICAL_EXAM(singlePatient.certificate_status)}
                  </h4>
                </div>
                <div className="d-flex">
                  {addingToBatch ? (
                    <Loading />
                  ) : (
                    <div>
                      {singlePatient.certificate_status === "READY" ? (
                        <button
                          style={{
                            color: "#fff",
                            display: "block", // Show the button
                          }}
                          onClick={handleAddToBatchClick}
                        >
                          <strong>Add To Batch</strong>
                        </button>
                      ) : (
                        <button
                          style={{
                            display: "none", // Hide the button
                          }}
                        >
                          <strong>Add To Batch</strong>
                        </button>
                      )}
                    </div>
                  )}

                  {singlePatient.certificate_status !== "READY" && (
                    <PButtons routeId={patientId} patient={singlePatient} />
                  )}
                </div>
              </div>

              {singlePatient.certificate_status === "RELEASED" && (
                <div className="col-xl-12 col-12">
                  <DaysLeftBox daysLeftData={dayLeftData} />
                </div>
              )}

              <div className="col-xl-12 col-12">
                <InfoBox patient={singlePatient} />
              </div>
              <div className="row">
                <div className="col-xl-6 col-12">
                  <BpPlot />
                </div>
                <div className="col-xl-6 col-12">
                  <BmiPlot />
                </div>
              </div>
            </div>

            {singlePatient.category === "Pneumoconiosis" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                    height: "80vh",
                    overflowX: "hidden",
                  }}
                >
                  <div>
                    {/* <PhysicalBox
                      patient={singlePatient}
                      physical={pneumoPhysicalTestsRecord}
                    /> */}
                    <Vitals patient={singlePatient} vitals={vitals} />
                    <IndustryClassificationBox
                      classification={industryClassification}
                    />
                    <MineralDustExBox exposure={pMineralDExposureRecord} />
                    <DustyOccupation dusty_occ={pOccupationDetailsRecord} />
                    <SymptomsBox symptoms={pSymptomsExaminationRecord} />
                    <MeasuresBox measures={pMeasuresRecord} />
                    <ConditionsTestBox
                      conditions={pneumoConditionsTestRecord}
                    />
                    <SmokingHistoryBox smoking={smokingHistoryRecord} />

                    <SystemsCheckBox syscheck={pneumoSystemsCheckRecord} />
                    <ResultsAndInvestigation
                      resultInvestigation={pneumoResultsRemarksRecord}
                    />
                    <AdditionalTestsBox
                      additionalTests={pneumoAdditionalTestRecord}
                    />
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
                    overflowX: "hidden",
                  }}
                >
                  <Vitals patient={singlePatient} vitals={vitals} />
                  <DiseaseHistory patientId={patientId} />
                  <TobaccoBox patientId={patientId} />
                  <XRayBox patientId={patientId} />
                </div>
              </Fragment>
            )}

            {singlePatient.category === "In House" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                    height: "80vh",
                    overflowX: "hidden",
                  }}
                >
                  <Vitals patient={singlePatient} vitals={vitals} />
                  <DiseaseHistory patientId={patientId} />
                  <TobaccoBox patientId={patientId} />
                  <XRayBox patientId={patientId} />
                </div>
              </Fragment>
            )}

            {/* In House */}

            {singlePatient.category === "Industry" && (
              <Fragment>
                <div
                  className="col-xl-4 col-12"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "80vh",
                  }}
                >
                  <HomeAddress homeAddress={homeAddressesRecord} />
                  <MedicalHistoryBox mHistory={otherMedicalHistoryRecord} />
                  {/* <OtherPhysicalExamination
                    physical={otherPhysicalExaminationRecord}
                    vitals={otherCardioVascularCheckRecord}
                  /> */}
                  <Vitals patient={singlePatient} vitals={vitals} />
                  <InjuryBox injuries={otherIllnessInjuriesRecord} />
                  <CardioBox data={otherCardioVascularCheckRecord} />
                  <RespiratoryBox data={otherRespiratoryCheckRecord} />
                  <IComments data={otherCommentsAndRemarksRecord} />
                </div>
              </Fragment>
            )}
            <div className="col-xl-8 col-12">
              <BoxProfile patient={singlePatient} />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default PatientDetails;
