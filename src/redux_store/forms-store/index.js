import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //Food Handlers Form
  fPhysicalExamination: {
    id: "",
    bmi: "",
    bmi_status: "",
    bp_dia: "",
    bp_status: "",
    bp_sys: "",
    created_at: "",
    first_bp_time: "",
    height: "",
    left_vision: "",
    patient_id: "",
    right_vision: "",
    updated_at: "",
    weight: "",
  },

  //Food Handlers
  patientsIllnesses: null,
  patientsTobaccos: null,
  patientsXray: null,
  fPatientRemarks: null,

  //Pneumoconiosis
  pIndustryClassification: null,
  pMineralDExposure: null,
  pMeasures: null,
  pOccupationDetails: null,
  pneumoNextPhase: false,
  pSymptomsExamination: null,
  smokingHistory: null,
  pneumoPhysicalTests: null,
  pneumoXrayUpload: null,
  pneumoSystemsCheck: null,
  pneumoResultsRemarks: null,
  pneumoAdditionalTest: null,
  pneumoConditionsTest: null,

  //Undustry and Other
  homeAddresses: null,
  otherIllnessInjuries: null,
  otherMedicalHistory: null,
  otherPhysicalExamination: null,
  otherCardioVascularCheck: null,
  otherRespiratoryCheck: null,
  otherCommentsAndRemarks: null,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updatePhysicalExamination: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        fPhysicalExamination: {
          ...state.fPhysicalExamination,
          [name]: value,
        },
      };
    },

    resetPhysicalExamination: (state) => ({
      ...state,
      fPhysicalExamination: initialState.fPhysicalExamination,
    }),

    setPhysicalExamination: (state, action) => ({
      ...state,
      fPhysicalExamination: action.payload,
    }),

    setPatientsIllness: (state, action) => ({
      ...state,
      patientsIllnesses: action.payload,
    }),

    setPatientsTobaccos: (state, action) => ({
      ...state,
      patientsTobaccos: action.payload,
    }),

    resetPatientsTobaccos: (state) => ({
      ...state,
      patientsTobaccos: initialState.patientsTobaccos,
    }),

    setPatientsXray: (state, action) => ({
      ...state,
      patientsXray: action.payload,
    }),

    resetPatientsXray: (state) => ({
      ...state,
      patientsXray: initialState.patientsXray,
    }),

    setFoodHandlerRemarks: (state, action) => ({
      ...state,
      fPatientRemarks: action.payload,
    }),

    resetFoodHandlerRemarks: (state) => ({
      ...state,
      fPatientRemarks: initialState.fPatientRemarks,
    }),

    setIndustryClassification: (state, action) => ({
      ...state,
      pIndustryClassification: action.payload,
    }),

    resetIndustryClassification: (state) => ({
      ...state,
      pIndustryClassification: initialState.pIndustryClassification,
    }),

    setMineralDustExposure: (state, action) => ({
      ...state,
      pMineralDExposure: action.payload,
    }),

    resetMineralDustExposure: (state) => ({
      ...state,
      pMineralDExposure: initialState.pMineralDExposure,
    }),

    setControlMeasures: (state, action) => ({
      ...state,
      pMeasures: action.payload,
    }),

    resetControlMeasures: (state) => ({
      ...state,
      pMeasures: initialState.pMeasures,
    }),

    setOccupationDetails: (state, action) => ({
      ...state,
      pOccupationDetails: action.payload,
    }),

    reseOccupationDetails: (state) => ({
      ...state,
      pOccupationDetails: initialState.pOccupationDetails,
    }),

    setPneumoConditionsTest: (state, action) => ({
      ...state,
      pneumoConditionsTest: action.payload,
    }),

    resetPneumoConditionsTest: (state) => ({
      ...state,
      pneumoConditionsTest: initialState.pneumoConditionsTest,
    }),
    togglePneumoNextPhase: (state) => {
      state.pneumoNextPhase = !state.pneumoNextPhase;
    },

    setSymptomsExamination: (state, action) => ({
      ...state,
      pSymptomsExamination: action.payload,
    }),

    resetSymptomsExamination: (state) => ({
      ...state,
      pSymptomsExamination: initialState.pSymptomsExamination,
    }),

    setSmokingHistory: (state, action) => ({
      ...state,
      smokingHistory: action.payload,
    }),

    resetSmokingHistory: (state) => ({
      ...state,
      smokingHistory: initialState.smokingHistory,
    }),

    setPneumoPhysicalTests: (state, action) => ({
      ...state,
      pneumoPhysicalTests: action.payload,
    }),

    resetPneumoPhysicalTests: (state) => ({
      ...state,
      pneumoPhysicalTests: initialState.pneumoPhysicalTests,
    }),

    setPneumoSystemsCheck: (state, action) => ({
      ...state,
      pneumoSystemsCheck: action.payload,
    }),

    resetPneumoSystemsCheck: (state) => ({
      ...state,
      pneumoSystemsCheck: initialState.pneumoSystemsCheck,
    }),

    setPneumoResultsRemarks: (state, action) => ({
      ...state,
      pneumoResultsRemarks: action.payload,
    }),

    resetPneumoResultsRemarks: (state) => ({
      ...state,
      pneumoResultsRemarks: initialState.pneumoResultsRemarks,
    }),

    setPneumoAdditionalTest: (state, action) => ({
      ...state,
      pneumoAdditionalTest: action.payload,
    }),

    resetPneumoAdditionalTest: (state) => ({
      ...state,
      pneumoAdditionalTest: initialState.pneumoAdditionalTest,
    }),

    setPneumoXrayUpload: (state, action) => ({
      ...state,
      pneumoXrayUpload: action.payload,
    }),

    resetPneumoXrayUpload: (state) => ({
      ...state,
      pneumoXrayUpload: initialState.pneumoXrayUpload,
    }),

    //Industry and Other State Management
    setHomeAddress: (state, action) => ({
      ...state,
      homeAddresses: action.payload,
    }),

    resetHomeAddress: (state) => ({
      ...state,
      homeAddresses: initialState.homeAddresses,
    }),

    setInjuriesAndIllnesses: (state, action) => ({
      ...state,
      otherIllnessInjuries: action.payload,
    }),

    resetInjuriesAndIllnesses: (state) => ({
      ...state,
      otherIllnessInjuries: initialState.otherIllnessInjuries,
    }),

    setMedicalHistory: (state, action) => ({
      ...state,
      otherMedicalHistory: action.payload,
    }),

    resetMedicalHistory: (state) => ({
      ...state,
      otherMedicalHistory: initialState.otherMedicalHistory,
    }),

    setOtherPhysicalExamination: (state, action) => ({
      ...state,
      otherPhysicalExamination: action.payload,
    }),

    resetOtherPhysicalExamination: (state) => ({
      ...state,
      otherPhysicalExamination: initialState.otherPhysicalExamination,
    }),

    setOtherCardioVascularCheck: (state, action) => ({
      ...state,
      otherCardioVascularCheck: action.payload,
    }),

    resetOtherCardioVascularCheck: (state) => ({
      ...state,
      otherCardioVascularCheck: initialState.otherCardioVascularCheck,
    }),

    setOtherRespiratoryCheck: (state, action) => ({
      ...state,
      otherRespiratoryCheck: action.payload,
    }),

    resetOtherRespiratoryCheck: (state) => ({
      ...state,
      otherRespiratoryCheck: initialState.otherRespiratoryCheck,
    }),

    setOtherCommentsAndRemarks: (state, action) => ({
      ...state,
      otherCommentsAndRemarks: action.payload,
    }),

    resetOtherCommentsAndRemarks: (state) => ({
      ...state,
      otherCommentsAndRemarks: initialState.otherCommentsAndRemarks,
    }),
  },
});

export const formsActions = formsSlice.actions;

export default formsSlice;
