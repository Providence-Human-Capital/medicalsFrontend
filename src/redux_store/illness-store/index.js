import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  illnesses: [],
  isLoading: false,
  error: "",
  diseases: [],
  skin_conditions: [],
  auscultates: [],
};

const illnessSlice = createSlice({
  name: "illness",
  initialState,
  reducers: {
    clearIllnessesOnLogout: () => initialState,
    setIllnesses: (state, action) => {
      state.illnesses = action.payload.illnesses;
      state.isLoading = false;
      state.error = "";
    },
    setDiseases: (state, action) => {
      state.diseases = action.payload.diseases;
      state.isLoading = false;
      state.error = "";
    },
    setSkinConditions: (state, action) => {
      state.skin_conditions = action.payload.skin_conditions;
      state.isLoading = false;
      state.error = "";
    },

    setAuscultates: (state, action) => {
      state.auscultates = action.payload.auscultates;
      state.isLoading = false;
      state.error = "";
    },

    deleteIllness: (state, action) => {
      const index = state.illnesses.findIndex(
        (illness) => illness.id === action.payload.id
      );
      if (index !== -1) {
        state.illnesses.splice(index, 1);
      }
    },

    deleteDiseases: (state, action) => {
      const index = state.diseases.findIndex(
        (disease) => disease.id === action.payload.id
      );
      if (index !== -1) {
        state.diseases.splice(index, 1);
      }
    },

    deleteSkinConditions: (state, action) => {
      const index = state.skin_conditions.findIndex(
        (skin_condition) => skin_condition.id === action.payload.id
      );
      if (index !== -1) {
        state.skin_conditions.splice(index, 1);
      }
    },

    deleteAuscultates: (state, action) => {
      const index = state.auscultates.findIndex(
        (auscultate) => auscultate.id === action.payload.id
      );
      if (index !== -1) {
        state.auscultates.splice(index, 1);
      }
    },
  },
});

export const illnessActions = illnessSlice.actions;

export default illnessSlice;
