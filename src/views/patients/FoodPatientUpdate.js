import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import FStepNavigation from "./components/FStepNavigation";
import PhysicalExamForm from "./forms/PhysicalExamForm";
import IllnessesForm from "./forms/IllnessesForm";
import TobaccoForm from "./forms/TobaccoForm";
import XrayForm from "./forms/XrayForm";
import ObeservationForm from "./forms/ObservationForm";
import PatientSideView from "./components/PatientSideView";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Vitals from "./components/Vitals";
import DiseaseHistory from "./components/DiseaseHistory";
import TobaccoBox from "./components/TobaccoBox";
import XRayBox from "./components/XRayBox";
import MedicalStaffMiddleware from "../../middlewares/MedicalStaffMiddleware";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const FoodPatientUpdate = () => {
  const { patientId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);
  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses
  );

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const fPhysicalExamination = useSelector(
    (state) => state.forms.fPhysicalExamination
  );
  const patientXray = useSelector((state) => state.forms.patientsXray) || null;
  const patientsRemarks = useSelector((state) => state.forms.fPatientRemarks);

  let foodHandlerForm;
  switch (currentStep) {
    case 1:
      // if (fPhysicalExamination.length !== 0) {
      //   handleNext();
      // } else {
      //   foodHandlerForm = (
      //     <PhysicalExamForm handlePrev={handlePrev} handleNext={handleNext} />
      //   );
      // }

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
      // if (user.role !== "medical_staff" || 'admin') {
      //   navigate("/unauthorized");
      // }

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
      <div className="d-flex align-items-center">
        <Link to={`/patients/${patientId}`} style={{
          marginLeft: "40px",
        }}>
          <FontAwesomeIcon icon={faHome} />{" "}
          <span style={{
            fontWeight: "bold",
          }}>
            {singlePatient && singlePatient.attendee.first_name}{" "}
            {singlePatient && singlePatient.attendee.last_name}
          </span>
        </Link>
        <BreadCrumb activeTab={"Pneumoconiosis"} title={"Patient"} />
      </div>
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <FStepNavigation
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {foodHandlerForm}
          </div>
          <div
            className="col-xl-4 col-12"
            style={{
              overflowY: "scroll",
              height: "80vh",
              overflowX: "hidden",
            }}
          >
            <Vitals patient={singlePatient} vitals={vitals} />
            <PatientSideView />
            <DiseaseHistory />
            <TobaccoBox />
            <XRayBox patientId={patientId} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default FoodPatientUpdate;
