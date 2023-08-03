import React, { Fragment, useEffect, useState } from "react";
import StepForm from "../../components/StepForm";
import BreadCrumb from "../../components/BreadCrumb";
import IndustryClassificationForm from "./forms/IndustryClassificationForm";
import MineralDustExposureForm from "./forms/MineralDustExposureForm";
import ControlMeasuresForm from "./forms/ControlMeasuresForm";
import HealthyQuestionnaireForm from "./forms/HealthyQuestionnaireForm";
import SymptomsTestForm from "./forms/SymptomsTestForm";
import MedicalConditionsTestForm from "./forms/MedicalConditionsTestForm";
import PhysicalTestForm from "./forms/PhysicalTestForm";
import SystemsCheckForm from "./forms/SystemsCheckForm";
import ResultsAndInvestigationsForm from "./forms/ResultsAndInvestigationsForm";
import AdditionalTests from "./forms/AdditionalTests";
import HomeAddressForm from "../patients/forms/HomeAddressForm";
import MedicalHistoryForm from "../industry/forms/MedicalHistoryForm";
import PatientSideView from "../patients/components/PatientSideView";
import { useSelector } from "react-redux";
import NextPhaseStep from "../../components/NextPhaseStep";
import SmokingHistoryForm from "./forms/SmokingHistoryForm";
import IndustryClassificationBox from "./components/IndustryClassificationBox";
import MineralDustExBox from "./components/MineralDustExBox";
import DustyOccupation from "./components/DustyOccupation";
import SymptomsBox from "./components/SymptomsBox";
import ConditionsTestBox from "./components/ConditionsTestBox";
import SmokingHistoryBox from "./components/SmokingHistoryBox";
import PhysicalBox from "./components/PhysicalBox";
import SystemsCheckBox from "./components/SystemsCheckBox";
import ResultsAndInvestigation from "./components/ResultsAndInvestigation";
import AdditionalTestsBox from "./components/AdditionalTestsBox";
import MeasuresBox from "./components/MeasuresBox";
import { useNavigate, useParams } from "react-router-dom";
import PhysicalExamForm from "../patients/forms/PhysicalExamForm";
import Vitals from "../patients/components/Vitals";

const PneumoPatientUpdate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nextPhaseCurrent, setNextPhaseCurrent] = useState(1);
  const navigate = useNavigate();
  const { patientId } = useParams();

  const nextPneumoPhase = useSelector((state) => state.forms.pneumoNextPhase);
  const industryClassification = useSelector(
    (state) => state.forms.pIndustryClassification
  );
  const pMineralDExposureRecord = useSelector(
    (state) => state.forms.pMineralDExposure
  );
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
  const pMeasuresRecord = useSelector((state) => state.forms.pMeasures);
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);

  const handleNext = (data) => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const handle2PhaseNext = () => {
    setNextPhaseCurrent(nextPhaseCurrent + 1);
  };
  const handle2PhasePrev = () => {
    setNextPhaseCurrent(nextPhaseCurrent - 1);
  };

  let formComponent;
  let nextPhaseFormComponent;
  switch (currentStep) {
    case 1:
      formComponent = (
        <PhysicalExamForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 2:
      // if (industryClassification) {
      //   handleNext();
      // } else {
      //   formComponent = (
      //     <IndustryClassificationForm
      //       handlePrev={handlePrev}
      //       handleNext={handleNext}
      //     />
      //   );
      // }
      formComponent = (
        <IndustryClassificationForm
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      );

      break;
    case 3:
      // if (pMineralDExposureRecord) {
      //   handleNext();
      // } else {
      //   formComponent = (
      //     <MineralDustExposureForm
      //       handlePrev={handlePrev}
      //       handleNext={handleNext}
      //     />
      //   );
      // }
      formComponent = (
        <MineralDustExposureForm
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      );

      break;
    case 4:
      // if (pMeasuresRecord) {
      //   handleNext();
      // } else {
      //   formComponent = (
      //     <ControlMeasuresForm
      //       handlePrev={handlePrev}
      //       handleNext={handleNext}
      //     />
      //   );
      // }
      formComponent = (
        <ControlMeasuresForm handlePrev={handlePrev} handleNext={handleNext} />
      );

      break;
    case 5:
      formComponent = (
        <HealthyQuestionnaireForm
          handlePrev={handlePrev}
          handleSubmit={handleSubmit}
        />
      );
      break;
    default:
      formComponent = null;
  }

  switch (nextPhaseCurrent) {
    case 1:
      if (pSymptomsExaminationRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <SymptomsTestForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }

      break;
    case 2:
      if (pneumoConditionsTestRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <MedicalConditionsTestForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }

      break;
    case 3:
      if (smokingHistoryRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <SmokingHistoryForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }
      break;
    case 4:
      if (pneumoPhysicalTestsRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <PhysicalTestForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }

      break;
    case 5:
      if (pneumoSystemsCheckRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <SystemsCheckForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }

      break;
    case 6:
      if (pneumoResultsRemarksRecord) {
        handle2PhaseNext();
      } else {
        nextPhaseFormComponent = (
          <ResultsAndInvestigationsForm
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }

      break;
    case 7:
      if (pneumoAdditionalTestRecord) {
        navigate(`/patients/${patientId}`);
      } else {
        nextPhaseFormComponent = (
          <AdditionalTests
            handleNext={handle2PhaseNext}
            handlePrev={handle2PhasePrev}
          />
        );
      }
      break;
    default:
      nextPhaseFormComponent = null;
  }

  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrentStep(parseInt(storedStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  return (
    <Fragment>
      <BreadCrumb activeTab={"Pneumoconiosis"} title={"Patient"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            {nextPneumoPhase ? (
              <Fragment>
                <NextPhaseStep nextPhaseCurrent={nextPhaseCurrent} />
                {nextPhaseFormComponent}
              </Fragment>
            ) : (
              <Fragment>
                <StepForm
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
                {formComponent}
              </Fragment>
            )}
          </div>
          <div
            className="col-xl-4 col-12"
            style={{
              overflowY: "scroll",
              height: "80vh",
              overflowX: "hidden",
            }}
          >
            <PatientSideView />
            {/* <PhysicalBox
              patient={singlePatient}
              physical={pneumoPhysicalTestsRecord}
            /> */}
            <Vitals patient={singlePatient} vitals={vitals} />
            <IndustryClassificationBox
              classification={industryClassification}
            />
            <MineralDustExBox exposure={pMineralDExposureRecord} />
            <MeasuresBox measures={pMeasuresRecord} />
            <ConditionsTestBox conditions={pneumoConditionsTestRecord} />
            <DustyOccupation dusty_occ={pOccupationDetailsRecord} />
            <SymptomsBox symptoms={pSymptomsExaminationRecord} />

            <SmokingHistoryBox smoking={smokingHistoryRecord} />

            <SystemsCheckBox syscheck={pneumoSystemsCheckRecord} />
            <ResultsAndInvestigation
              resultInvestigation={pneumoResultsRemarksRecord}
            />
            <AdditionalTestsBox additionalTests={pneumoAdditionalTestRecord} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PneumoPatientUpdate;
