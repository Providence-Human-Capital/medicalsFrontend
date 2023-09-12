import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authSlice from "./auth-store";
import companySlice from "./company-store";
import illnessSlice from "./illness-store";
import tobaccoSlice from "./tobacco-store";
import patientSlice from "./patients-store";
import attendeeSlice from "./attendee-store";
import outReachSlice from "./outreach-store";
import uiSlice from "./ui-store";
import formsSlice from "./forms-store";
import certificateSlice from "./certificates-store";
import centralSlice from "./central-store";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  company: companySlice.reducer,
  illness: illnessSlice.reducer,
  tobacco: tobaccoSlice.reducer,
  patient: patientSlice.reducer,
  attendee: attendeeSlice.reducer,
  outreach: outReachSlice.reducer,
  ui: uiSlice.reducer,
  forms: formsSlice.reducer,
  certificate: certificateSlice.reducer,
  central: centralSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
