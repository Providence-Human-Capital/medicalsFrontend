import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  redirect,
  useNavigate,
  useLocation,
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
import { useSelector } from "react-redux";
import AddCompany from "./views/company/AddCompany";
import EditCompany from "./views/company/EditCompany";
import Illnesses from "./views/illnessess/Illnesses";
import AddIllness from "./views/illnessess/AddIllnesses";
import EditIllness from "./views/illnessess/EditIllness";
import Tobacco from "./views/tobaccouse/Tobacco";
import AddTobacco from "./views/tobaccouse/AddTobacco";
import EditTobacco from "./views/tobaccouse/EditTobacco";
import Outreach from "./views/outreach/Outreach";
import AddOutreach from "./views/outreach/AddOutreach";
import EditOutreach from "./views/outreach/EditOutreach";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import IllnessesForm from "./views/patients/forms/IllnessesForm";
import TobaccoForm from "./views/patients/forms/TobaccoForm";
import XrayForm from "./views/patients/forms/XrayForm";
import { injectStyle } from "react-toastify/dist/inject-style";
import ExcelAddPage from "./views/attendee/ExcelAddPage";
import Pneumo from "./views/pneumoconiosis/Pneumo";
import CityOfHarare from "./views/city_of_harare/CityOfHarare";
import Industry from "./views/industry/Industry";
import SkinConditions from "./views/skinconditions/SkinConditions";
import Auscultates from "./views/auscultates/Auscultates";
import Diseases from "./views/diseases/Diseases";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const App = () => {
  return (
    <BrowserRouter>
      <WrapperComponent />
    </BrowserRouter>
  );
};

const WrapperComponent = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  // const location = useLocation()
  useEffect(() => {
    const body = document.body;
    if (isSidebarCollapsed) {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed",
        "sidebar-collapse"
      );
    } else {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed"
      );
    }
  }, [isSidebarCollapsed]);

  const location = useLocation();

  return (
    <Fragment>
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <AsideNav />
      <div className="content-wrapper">
        <div className="container-full">
          <Routes location={location}>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/attendees" exact element={<Attendees />} />
            <Route path="/attendees/add" exact element={<AddAttendee />} />
            <Route path="/attendees/add/excel" element={<ExcelAddPage />} />
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

            <Route
              path="/patients/:patientId/illnesses"
              element={<IllnessesForm />}
            />

            <Route
              path="/patients/:patientId/tobacco"
              element={<TobaccoForm />}
            />

            <Route
              path="/patients/:patientId/xray/add"
              element={<XrayForm />}
            />

            <Route path="/patients/edit" element={<EditPatient />} />

            <Route path="/companies" exact element={<Companies />} />
            <Route path="/companies/add" exact element={<AddCompany />} />
            <Route
              path="/companies/:companyId/edit"
              exact
              element={<EditCompany />}
            />

            <Route path="/illnesses" exact element={<Illnesses />} />
            <Route path="/illnesses/add" exact element={<AddIllness />} />
            <Route
              path="/illnesses/:illnessId/edit"
              exact
              element={<EditIllness />}
            />

            <Route path="/tobacco" exact element={<Tobacco />} />
            <Route path="/tobacco/add" exact element={<AddTobacco />} />
            <Route
              path="/tobacco/:tobaccoId/edit"
              exact
              element={<EditTobacco />}
            />

            <Route path="/skin/conditions" exact element={<SkinConditions />} />
            <Route path="/skin/conditions/add" exact element={<SkinConditions />} />
            
            <Route path="/auscultates" exact element={<Auscultates />} />
            <Route path="/auscultates/add" exact element={<Auscultates />} />
            <Route path="/diseases" exact element={<Diseases />} />
            <Route path="/diseases/add" exact element={<Diseases />} />

            <Route path="/outreach" exact element={<Outreach />} />
            <Route path="/outreach/add" exact element={<AddOutreach />} />
            <Route path="/outreach/:id/edit" exact element={<EditOutreach />} />

            <Route path="/pneumo" exact element={<Pneumo />} />
            <Route path="/foodhandlers" exact element={<CityOfHarare />} />
            <Route path="/industry" exact element={<Industry />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};
export default App;

export { WrapperComponent };
