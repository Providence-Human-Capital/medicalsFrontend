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

const PneumoPatientUpdate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [nextPhaseCurrent, setNextPhaseCurrent] = useState(1);

  const nextPneumoPhase = useSelector((state) => state.forms.pneumoNextPhase);

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
        <IndustryClassificationForm
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      );
      break;
    case 2:
      formComponent = (
        <MineralDustExposureForm
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      );
      break;
    case 3:
      formComponent = (
        <ControlMeasuresForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 4:
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
      nextPhaseFormComponent = (
        <SymptomsTestForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 2:
      nextPhaseFormComponent = (
        <MedicalConditionsTestForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 3:
      nextPhaseFormComponent = (
        <SmokingHistoryForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 4:
      nextPhaseFormComponent = (
        <PhysicalTestForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 5:
      nextPhaseFormComponent = (
        <SystemsCheckForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 6:
      nextPhaseFormComponent = (
        <ResultsAndInvestigationsForm
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
      break;
    case 7:
      nextPhaseFormComponent = (
        <AdditionalTests
          handleNext={handle2PhaseNext}
          handlePrev={handle2PhasePrev}
        />
      );
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
          <div className="col-xl-7 col-12">
            {nextPneumoPhase ? (
              <Fragment>
                <NextPhaseStep nextPhaseCurrent={nextPhaseCurrent} />
                {nextPhaseFormComponent}
              </Fragment>
            ) : (
              <Fragment>
                <StepForm currentStep={currentStep} />
                {formComponent}
              </Fragment>
            )}
          </div>
          <div
            className="col-xl-5 col-12"
            style={{
              overflowY: "scroll",
              height: "80vh",
            }}
          >
            <PatientSideView />
            <div className="box">
              <div className="box-header no-border">
                <h4 className="box-title">Pneumoconiosis Patient Summary</h4>
              </div>
              <div className="box-body">
                <h1>{nextPneumoPhase}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PneumoPatientUpdate;
