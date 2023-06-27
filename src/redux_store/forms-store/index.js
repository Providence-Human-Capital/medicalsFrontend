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
  },
});

export const formsActions = formsSlice.actions;

export default formsSlice;
