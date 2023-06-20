import React, { Fragment, useState } from "react";
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

const PneumoPatientUpdate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  let formComponent;
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
  return (
    <Fragment>
      <BreadCrumb activeTab={"Pneumoconiosis"} title={"Patient"} />
      <div className="row">
        <div className="col-xl-7 col-12">
          <StepForm currentStep={currentStep} />
          {formComponent}
        </div>
        <div className="col-xl-5 col-12">
          <div className="box">
            <div className="box-header no-border">
              <h4 className="box-title">Pneumoconiosis Patient Summary</h4>
            </div>
            <div className="box-body"></div>
           
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PneumoPatientUpdate;
