import React, {
  forwardRef,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { getFoodHandlerPatientDetails } from "../../../services/api";
import { formsActions } from "../../../redux_store/forms-store";
import Vitals from "../components/Vitals";
import DiseaseHistory from "../components/DiseaseHistory";
import TobaccoBox from "../components/TobaccoBox";
import XRayBox from "../components/XRayBox";
import { useDispatch } from "react-redux";

const FoodHandlerDetail = ({ singlePatient, patientId, vitals }) => {
    const dispatch = useDispatch();
  useEffect(() => {
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
  }, []);
  return (
    <>
      <div
        className="col-xl-4 col-12"
        style={{
          overflowY: "scroll",
          height: "130vh",
          overflowX: "hidden",
        }}
      >
        <Vitals patient={singlePatient} vitals={vitals} />
        <DiseaseHistory patientId={patientId} />
        <TobaccoBox patientId={patientId} />
        <XRayBox patientId={patientId} />
      </div>
    </>
  );
};

export default FoodHandlerDetail;
