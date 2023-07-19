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
import {
  calculateDaysLeftForCertificateValidity,
  foodHandlerPatientDetail,
  getCurrentPatientRemarks,
  getFoodHandlerPatientDetails,
  getLatestPatientXray,
  getPatient,
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
// import { getPatientPhysicalExamResults } from "../../services/api";
import { PHYSICAL_EXAM } from "../../utils/global";
import BpPlot from "./components/BpPlot";
import BmiPlot from "./components/BmiPlot";
import DaysLeftBox from "./components/DaysLeftBox";
import Swal from "sweetalert2";
import { uiActions } from "../../redux_store/ui-store";
import Loading from "../../components/loader/Loading";

const PatientDetails = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dayLeftData, setDayLeftData] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [certifcateId, setCertifcateId] = useState(null);
  const isLoading = useSelector((state) => state.ui.isLoading);

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

    getFoodHandlerPatientDetails(patientId).then((data) => {
      dispatch(formsActions.setCertificateState(data.certificate));
      dispatch(formsActions.setPatientsIllness(data.illnesses));
      dispatch(formsActions.setPatientsXray(data.xrays));
      dispatch(formsActions.setPatientsTobaccos(data.tobaccoUses));
      dispatch(formsActions.setPhysicalExamination(data.physical_exam));
      const remarksObjects = Object.assign({}, ...data.fremarks);
      dispatch(formsActions.setFoodHandlerRemarks(remarksObjects));
    });

    calculateDaysLeftForCertificateValidity(patientId).then((data) => {
      // console.log("Number of days: " + data);
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

  const isAvailable = useSelector(
    (state) => state.patient.physicalExamAvailable
  );
  const patientXray = useSelector((state) => state.forms.patientsXray) || {};

  const patientUpdated = useSelector((state) => state.patient.patientUpdated);
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
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
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
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );

        console.log(responseData);

        Swal.fire("Success!", "Adding to Batch successfully.", "success");
      } else {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
        throw new Error(`${responseData.message}`);
      }
    } catch (error) {
      Swal.fire("Something went wrong!", error.message, "error");
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
    }
  };

  const handleCancel = () => {
    Swal.close();
  };

  const handleAddToBatchClick = () => {
    const company = filterCompany(singlePatient.attendee.company.company_name);
    console.log("On click", company.certificate_batches);

    if (company) {
      Swal.fire({
        title: "Select Certificate Batch",
        html: `
        <select id="status-select" class="form-select"> 
        <option value="">Select Batch</option> 
        ${company.certificate_batches
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

 

  return (
    <Fragment>
      <BreadCrumb
        title={"Patient Details"}
        activeTab={singlePatient.category}
      />

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
                  {isLoading ? (
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

                  <PButtons routeId={patientId} patient={singlePatient} />
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
                  }}
                >
                  <div>
                    <IndustryClassificationBox
                      classification={industryClassification}
                    />
                    <MineralDustExBox exposure={pMineralDExposureRecord} />
                    <DustyOccupation dusty_occ={pOccupationDetailsRecord} />
                    <SymptomsBox symptoms={pSymptomsExaminationRecord} />
                    {/* <MeasuresBox measures={pMeasuresRecord} /> */}
                    <ConditionsTestBox
                      conditions={pneumoConditionsTestRecord}
                    />
                    <SmokingHistoryBox smoking={smokingHistoryRecord} />
                    <PhysicalBox
                      patient={singlePatient}
                      physical={pneumoPhysicalTestsRecord}
                    />
                    <SystemsCheckBox syscheck={pneumoSystemsCheckRecord} />
                    <ResultsAndInvestigation
                      resultInvestigation={pneumoResultsRemarksRecord}
                    />
                    <AdditionalTestsBox />

                    {/* <p>{JSON.stringify(pneumoResultsRemarksRecord)}</p>
                    
                    <p>{JSON.stringify(pneumoAdditionalTestRecord)}</p> */}
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
                  <Vitals patient={singlePatient} vitals={vitals} />
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
                  <HomeAddress homeAddress={homeAddressesRecord} />
                  <MedicalHistoryBox mHistory={otherMedicalHistoryRecord} />
                  <OtherPhysicalExamination
                    physical={otherPhysicalExaminationRecord}
                    vitals={otherCardioVascularCheckRecord}
                  />
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
