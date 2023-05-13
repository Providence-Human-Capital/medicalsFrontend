import "./App.css";
import React, { useEffect, useState } from "react";
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
import Companies from "./views/company/Companies";
import Header from "./components/Header";
import AsideNav from "./components/AsideNav";
import ObeservationForm from "./views/patients/forms/ObservationForm";
import PhysicalExamForm from "./views/patients/forms/PhysicalExamForm";

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <body
        className={`${
          isSidebarCollapsed
            ? "light-skin sidebar-mini theme-success fixed sidebar-collapse"
            : "light-skin sidebar-mini theme-success fixed "
        }`}
      >
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <AsideNav />
        <div className="content-wrapper">
          <div className="container-full">
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

              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/add" element={<AddPatient />} />
              <Route path="/patients/:patientId" element={<PatientDetails />} />
              <Route
                path="/patients/:patientId/observation"
                element={<ObeservationForm />}
              />
              <Route
                path="/patients/:patientId/physical"
                element={<PhysicalExamForm />}
              />
              <Route path="/patients/edit" element={<EditPatient />} />

              <Route path="/companies" exact element={<Companies />} />
            </Routes>
          </div>
        </div>
      </body>
    </BrowserRouter>
  );
};
export default App;
