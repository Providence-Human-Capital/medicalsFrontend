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
import PatientSideView from "../patients/components/PatientSideView";
import { useSelector } from "react-redux";
import HomeAddress from "./components/HomeAddress";
import MedicalHistoryBox from "./components/MedicalHistoryBox";
import InjuryBox from "./components/InjuryBox";

const IndustryPatientUpdate = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
      if (homeAddressesRecord) {
        handleNext();
      } else {
        industryFormComponent = (
          <HomeAddressForm handlePrev={handlePrev} handleNext={handleNext} />
        );
      }

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
          <PatientSideView />
          <HomeAddress homeAddress={homeAddressesRecord} />
          <MedicalHistoryBox mHistory={otherMedicalHistoryRecord} />
          <InjuryBox injuries={otherIllnessInjuriesRecord} />
          {/* <MedicalHistoryBox mHistory={otherMedicalHistoryRecord} />
                  <OtherPhysicalExamination
                    physical={otherPhysicalExaminationRecord}
                    vitals={otherCardioVascularCheckRecord}
                  />
                  <InjuryBox injuries={otherIllnessInjuriesRecord} />
                  <CardioBox data={otherCardioVascularCheckRecord} />
                  <RespiratoryBox data={otherRespiratoryCheckRecord} />
                  <IComments data={otherCommentsAndRemarksRecord} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default IndustryPatientUpdate;
