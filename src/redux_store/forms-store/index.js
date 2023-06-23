import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

  patientsIllnesses: null,
  patientsTobaccos: null,
  patientsXray: null,
  fPatientRemarks: null,
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

    setPatientsXray: (state, action) => ({
      ...state,
      patientsXray: action.payload,
    }),

    setFoodHandlerRemarks: (state, action) => ({
      ...state,
      fPatientRemarks: action.payload,
    }),
  },
});

export const formsActions = formsSlice.actions;

export default formsSlice;
