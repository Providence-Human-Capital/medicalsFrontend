import React, { Fragment, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import StepForm from "../../components/StepForm";
import IStepNavigation from "./components/IStepNavigation";
import MedicalHistoryForm from "./forms/MedicalHistoryForm";
import HomeAddressForm from "../patients/forms/HomeAddressForm";
import IllnessInjuryForm from "./forms/IllnessInjuryForm";
import IPhysicalTestForm from "./forms/IPhysicalTestForm";
import CardioVascularForm from "./forms/CardioVascularForm";
import RespiratoryForm from "./forms/RespiratoryForm";
import ICommentsRemarksForm from "./forms/ICommentsRemarksForm";

const IndustryPatientUpdate = () => {
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

  let industryFormComponent;

  switch (currentStep) {
    case 1:
      industryFormComponent = (
        <HomeAddressForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 2:
      industryFormComponent = (
        <IllnessInjuryForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 3:
      industryFormComponent = (
        <MedicalHistoryForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 4:
      industryFormComponent = (
        <IPhysicalTestForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 5:
      industryFormComponent = (
        <CardioVascularForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 6:
      industryFormComponent = (
        <RespiratoryForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 7:
      industryFormComponent = (
        <ICommentsRemarksForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    default:
      industryFormComponent = null;
  }

  return (
    <Fragment>
      <BreadCrumb activeTab={"Industry"} title={"Patient"} />
      <div className="row">
        <div className="col-xl-8 col-12">
          <IStepNavigation currentStep={currentStep} />
          {industryFormComponent}
        </div>
        <div className="col-xl-4 col-12">
          <div className="box">
            <div className="box-header no-border">
              <h4 className="box-title">Patient Summary</h4>
            </div>
            <div className="box-body"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IndustryPatientUpdate;
