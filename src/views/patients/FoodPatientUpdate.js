import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FStepNavigation from "./components/FStepNavigation";
import PhysicalExamForm from "./forms/PhysicalExamForm";
import IllnessesForm from "./forms/IllnessesForm";
import TobaccoForm from "./forms/TobaccoForm";
import XrayForm from "./forms/XrayForm";
import ObeservationForm from "./forms/ObservationForm";
import PatientSideView from "./components/PatientSideView";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Vitals from "./components/Vitals";
import DiseaseHistory from "./components/DiseaseHistory";

const FoodPatientUpdate = () => {
  const { patientId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);
  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses
  );

  const dispatch = useDispatch();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  let foodHandlerForm;
  switch (currentStep) {
    case 1:
      foodHandlerForm = (
        <PhysicalExamForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 2:
      foodHandlerForm = (
        <IllnessesForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 3:
      foodHandlerForm = (
        <TobaccoForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 4:
      foodHandlerForm = (
        <XrayForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    case 5:
      foodHandlerForm = (
        <ObeservationForm handlePrev={handlePrev} handleNext={handleNext} />
      );
      break;
    default:
      foodHandlerForm = null;
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
      <BreadCrumb activeTab={"FoodHandlers"} title={"Patient"} />
      <div className="row">
        <div className="col-xl-8 col-12">
          <FStepNavigation currentStep={currentStep} />
          {foodHandlerForm}
        </div>
        <div className="col-xl-4 col-12">
          <Vitals patient={singlePatient} />
          <PatientSideView />
          <div className="box">
            <div className="box-header no-border">
              <h4 className="box-title">Food Handler Patient Summary</h4>
            </div>
            <div className="box-body">
              <DiseaseHistory />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FoodPatientUpdate;
