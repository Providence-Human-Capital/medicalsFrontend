import React, {
  forwardRef,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { getPneumoPatientDetails } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { formsActions } from "../../../redux_store/forms-store";
import Vitals from "../components/Vitals";
import IndustryClassificationBox from "../../pneumoconiosis/components/IndustryClassificationBox";
import MineralDustExBox from "../../pneumoconiosis/components/MineralDustExBox";
import DustyOccupation from "../../pneumoconiosis/components/DustyOccupation";
import SymptomsBox from "../../pneumoconiosis/components/SymptomsBox";
import MeasuresBox from "../../pneumoconiosis/components/MeasuresBox";
import ConditionsTestBox from "../../pneumoconiosis/components/ConditionsTestBox";
import SmokingHistoryBox from "../../pneumoconiosis/components/SmokingHistoryBox";
import SystemsCheckBox from "../../pneumoconiosis/components/SystemsCheckBox";
import ResultsAndInvestigation from "../../pneumoconiosis/components/ResultsAndInvestigation";
import AdditionalTestsBox from "../../pneumoconiosis/components/AdditionalTestsBox";

const PneumoDetail = ({ singlePatient, patientId, vitals }) => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    getPneumoPatientDetails(patientId).then((data) => {
      console.log("All Dataa", data);
      dispatch(
        formsActions.setIndustryClassification(data.industryClassification)
      );
      dispatch(formsActions.setControlMeasures(data.controlMeasures));
      dispatch(formsActions.setMineralDustExposure(data.mineralDustExposure));
      dispatch(formsActions.setControlMeasures(data.controlMeasures));
      dispatch(formsActions.setPneumoResultsRemarks(data.resultsInvestigation));
      if (data.healthyQuestionnaire === null) {
        dispatch(formsActions.setSymptomsExamination(null));
        dispatch(formsActions.setPneumoConditionsTest(null));
        dispatch(formsActions.setPneumoPhysicalTests(null));
        dispatch(formsActions.setPneumoSystemsCheck(null));
        dispatch(formsActions.setSmokingHistory(null));
        dispatch(formsActions.setOccupationDetails(null));
        dispatch(formsActions.setPneumoAdditionalTest(null));
      } else {
        dispatch(
          formsActions.setSymptomsExamination(
            data.healthyQuestionnaire.symptomsTest
          )
        );
        dispatch(
          formsActions.setPneumoConditionsTest(
            data.healthyQuestionnaire.conditionsTest
          )
        );
        dispatch(
          formsActions.setPneumoPhysicalTests(
            data.healthyQuestionnaire.physicalTest
          )
        );
        dispatch(
          formsActions.setPneumoSystemsCheck(
            data.healthyQuestionnaire.systemsCheck
          )
        );
        dispatch(
          formsActions.setSmokingHistory(
            data.healthyQuestionnaire.smokingHistory
          )
        );
      }
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
        <div>
          <Vitals patient={singlePatient} vitals={vitals} />
          <IndustryClassificationBox classification={industryClassification} />
          <MineralDustExBox exposure={pMineralDExposureRecord} />
          <DustyOccupation dusty_occ={pOccupationDetailsRecord} />
          <SymptomsBox symptoms={pSymptomsExaminationRecord} />
          <MeasuresBox measures={pMeasuresRecord} />
          <ConditionsTestBox conditions={pneumoConditionsTestRecord} />
          <SmokingHistoryBox smoking={smokingHistoryRecord} />

          <SystemsCheckBox syscheck={pneumoSystemsCheckRecord} />
          <ResultsAndInvestigation
            resultInvestigation={pneumoResultsRemarksRecord}
          />
          <AdditionalTestsBox additionalTests={pneumoAdditionalTestRecord} />
        </div>
      </div>
    </>
  );
};

export default PneumoDetail;
