import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  redirect,
} from "react-router-dom";
import ScrollToTop from "./hooks/ScrollToTop";
import Home from "./core/Home";
import Login from "./views/authentication/Login";
import Register from "./views/authentication/Register";
import Attendees from "./views/attendee/Attendees";
import AddAttendee from "./views/attendee/AddAttendee";
import EditAttendee from "./views/attendee/EditAttendee";
import AttendeeDetails from "./views/attendee/AttendeeDetails";

import Patients from "./views/patients/Patients";
import AddPatient from "./views/patients/AddPatient";
import EditPatient from "./views/patients/EditPatient";
import PatientDetails from "./views/patients/PatientDetails";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/attendees" exact element={<Attendees />} />
        <Route path="/attendees/add" exact element={<AddAttendee />} />
        <Route
          path="/attendees/:attendeeId"
          exact
          element={<PatientDetails />}
        />
        <Route path="/attendees/edit" exact element={<EditAttendee />} />

        <Route path="/patients" exact element={<Patients />} />
        <Route path="/patients/add" exact element={<AddPatient />} />
        <Route path="/patients/:patientId" exact element={<PatientDetails />} />
        <Route path="/patients/edit" exact element={<EditPatient />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
