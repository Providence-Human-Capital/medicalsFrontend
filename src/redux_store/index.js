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
  attendee: attendeeSlice.reducer
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
