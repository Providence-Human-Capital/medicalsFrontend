import React, {
  forwardRef,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndustryPatientDetails } from "../../../services/api";
import { formsActions } from "../../../redux_store/forms-store";
import HomeAddress from "../../industry/components/HomeAddress";
import MedicalHistoryBox from "../../industry/components/MedicalHistoryBox";
import Vitals from "../components/Vitals";
import InjuryBox from "../../industry/components/InjuryBox";
import CardioBox from "../../industry/components/CardioBox";
import RespiratoryBox from "../../industry/components/RespiratoryBox";
import IComments from "../../industry/components/IComments";
const PreEmployementDetail = ({ singlePatient, patientId, vitals }) => {
  const dispatch = useDispatch();
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
      dispatch(formsActions.setOtherCardioVascularCheck(data.cardio_vascular));
      dispatch(formsActions.setOtherRespiratoryCheck(data.respiratory));

      dispatch(formsActions.setOtherCommentsAndRemarks(data.icomments_remarks));
    });
  }, []);
  return (
    <>
      <div
        className="col-xl-4 col-12"
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "130vh",
        }}
      >
        <HomeAddress homeAddress={homeAddressesRecord} />
        <MedicalHistoryBox mHistory={otherMedicalHistoryRecord} />
        <Vitals patient={singlePatient} vitals={vitals} />
        <InjuryBox injuries={otherIllnessInjuriesRecord} />
        <CardioBox data={otherCardioVascularCheckRecord} />
        <RespiratoryBox data={otherRespiratoryCheckRecord} />
        <IComments data={otherCommentsAndRemarksRecord} />
      </div>
    </>
  );
};

export default PreEmployementDetail;
