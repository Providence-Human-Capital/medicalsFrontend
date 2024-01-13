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
  HashRouter,
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
import { useDispatch, useSelector } from "react-redux";
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
import { patientActions } from "./redux_store/patients-store";
import { API } from "./config";
import {
  getPatientsAuscultateStatistics,
  getPatientsDiseasesStatistics,
  getPatientsIllnessStatistics,
  getPatientsTobaccouseStatistics,
  getPatientStatistics,
  getAllAttendees,
  getCompanies,
  getAllTobaccos,
  getAllPatients,
  getPneumoPatients,
  getCofHPatients,
  getSkinConditions,
  getDiseases,
  getAuscultates,
  getIllnesses,
  companiesWithCertificateBatches,
} from "./services/api";
import Reports from "./views/reports/Reports";
import Appointments from "./views/appointments/Appointments";
import CertificatesPage from "./views/certificates/CertificatesPage";
import SingleReportPage from "./views/reports/SingleReportPage";
import MedicalHistoryForm from "./views/industry/forms/MedicalHistoryForm";
import IndustryPatientUpdate from "./views/industry/IndustryPatientUpdate";
import PneumoPatientUpdate from "./views/pneumoconiosis/PneumoPatientUpdate";
import FoodPatientUpdate from "./views/patients/FoodPatientUpdate";
import CreateBatchFormPage from "./views/certificates/components/CreateBatchFormPage";
import BatchListPage from "./views/certificates/BatchListPage";
import PrintCertificatesPage from "./views/certificates/PrintCertificatesPage";
import { uiActions } from "./redux_store/ui-store";
import CompanyDetails from "./views/company/CompanyDetails";
import Unauthorized from "./views/error/Unauthorized";
import CsvPrintPage from "./views/certificates/CsvPrintPage";
import { attendeeActions } from "./redux_store/attendee-store";
import { companyActions } from "./redux_store/company-store";
import { tobaccoActions } from "./redux_store/tobacco-store";
import { illnessActions } from "./redux_store/illness-store";
import DnotesPage from "./views/d_notes/DnotesPage";
import DnoteEditPage from "./views/d_notes/DnoteEditPage";
import Dashboard from "./core/Home";
import HomeInit from "./HomeInit";
import HospitalManagementDashboard from "./hms/hms_dashboard";
import HmsPatientsList from "./hms/hmspatients/hms_patients_list";
import StockManagement from "./hms/stock_management/stock_management";
import DoctorsList from "./hms/hmsdoctors/doctors_list";
import AddDoctor from "./hms/hmsdoctors/add_doctor";
import AddHmsPatient from "./hms/hmspatients/add_hms_patient";
import UserAssignment from "./hms/views/admin/admin_user_assignmet";
import ClinicPatientDetailsPage from "./hms/hmspatients/hms_patient_detail";
import ConsultationPage from "./hms/hmspatients/consultation_page";
import PatientsAttendance from "./hms/patients_attendance";
import ForwardPatientPage from "./hms/hmspatients/forward_patient";
import PrescriptionForm from "./hms/hmsdoctors/forms/add_prescription_form";
import EditPatientHms from "./hms/hmspatients/edit_patient";
import DoctorsWaitingList from "./hms/hmsdoctors/doctors_waiting_list_page";
import BookAppointment from "./hms/views/appointments/book_appointment";
import DoctorsDashboard from "./hms/hmsdoctors/doctors_dash";
import GeneratedReports from "./views/reports/GeneratedReports";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const App = () => {
  return (
    <HashRouter>
      <WrapperComponent />
    </HashRouter>
  );
};

const WrapperComponent = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const userType = useSelector((state) => state.auth.user?.type);

  const dispatch = useDispatch();

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

  useEffect(() => {
    //This piece of code is so so important in terms of the project outlook
    document.body.style.zoom = "0.67";
    //The above piece of code is so so important in terms of the project outlook

    const currentYear = new Date().getFullYear();
    getPatientStatistics(currentYear);

    const fetchStatsData = async () => {
      try {
        const patientsData = await getPatientStatistics(currentYear);
        dispatch(
          patientActions.setStatistics({
            patientStatistics: patientsData,
          })
        );

        const illnessData = await getPatientsIllnessStatistics(currentYear);
        dispatch(
          patientActions.setIllnessStatistics({
            patientsPerIllness: illnessData,
          })
        );

        const tobaccoData = await getPatientsTobaccouseStatistics(currentYear);
        dispatch(
          patientActions.setTobaccouseStatistics({
            patientsPerTobacco: tobaccoData,
          })
        );

        const auscultateData = await getPatientsAuscultateStatistics(
          currentYear
        );
        dispatch(
          patientActions.setAuscultateStatistics({
            patientsPerAuscultate: auscultateData,
          })
        );

        const diseaseData = await getPatientsDiseasesStatistics(currentYear);
        dispatch(
          patientActions.setDiseasesStatistics({
            patientsPerDisease: diseaseData,
          })
        );

        const attendees = await getAllAttendees();
        dispatch(attendeeActions.setAttendees({ attendees: [...attendees] }));

        const companies = await getCompanies();
        dispatch(
          companyActions.setCompanies({
            companies: [...companies],
          })
        );

        const tobaccos = await getAllTobaccos();
        dispatch(
          tobaccoActions.setTobaccos({
            tobaccos: [...tobaccos],
          })
        );

        const patients = await getAllPatients();
        dispatch(patientActions.setPatients({ patients: [...patients] }));

        const pneumoPatients = await getPneumoPatients();
        dispatch(patientActions.setPneumoPatients({ pneumoPatients }));

        const industryPatients = await getCofHPatients();
        dispatch(patientActions.setIndustryPatients({ industryPatients }));

        const skinConditions = await getSkinConditions();
        dispatch(
          illnessActions.setSkinConditions({ skin_conditions: skinConditions })
        );

        const diseases = await getDiseases();
        dispatch(illnessActions.setDiseases({ diseases }));

        const auscultates = await getAuscultates();
        dispatch(illnessActions.setAuscultates({ auscultates }));

        const illnesses = await getIllnesses();
        dispatch(illnessActions.setIllnesses({ illnesses: [...illnesses] }));

        const certificates = await companiesWithCertificateBatches();
        const data = certificates.companies;
        dispatch(companyActions.setCompaniesWithBatches(data));
      } catch (error) {
        console.log("There was an error while fetching stats ", error);
      }
    };

    fetchStatsData();

    dispatch(
      uiActions.setLoadingSpinner({
        isLoading: false,
      })
    );
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuthenticated ? (
              userType === "clinic" || userType === "admin" ? (
                <Navigate to="/dashboard/clinic" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route exact path="/" element={<HomeInit />}>
          <Route
            path="/dashboard/clinic"
            element={<HospitalManagementDashboard />}
          />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* HMS ROUTES */}

          <Route path="/hms/patients" element={<HmsPatientsList />} />
          <Route path="/hms/add/patient" element={<AddHmsPatient />} />
          <Route
            path="/hms/patient/:patientId"
            element={<ClinicPatientDetailsPage />}
          />
          <Route
            path="/hms/patient/:patientId/consultation"
            element={<ConsultationPage />}
          />
          <Route
            path="/hms/patient/edit/:patientId"
            element={<EditPatientHms />}
          />
          <Route path="/hms/patient/search" element={<PatientsAttendance />} />
          <Route path="/hms/stock" element={<StockManagement />} />
          <Route path="/hms/doctors" element={<DoctorsList />} />

          <Route path="/hms/add/doctor" element={<AddDoctor />} />
          <Route
            path="/hms/doctor/waiting/:doctorId"
            element={<DoctorsWaitingList />}
          />
          <Route path="/hms/doctors/dashboard" element={<DoctorsDashboard />} />

          <Route path="/hms/book/appointment" element={<BookAppointment />} />
          <Route path="/hms/user/assignment" element={<UserAssignment />} />
          <Route
            path="/hms/assign/consultant/:patientId"
            element={<ForwardPatientPage />}
          />
          <Route
            path="/hms/add/prescription/:patientId"
            element={<PrescriptionForm />}
          />

          {/* HMS ROUTES */}

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

          <Route path="/patients/:patientId/xray/add" element={<XrayForm />} />

          <Route path="/patients/edit" element={<EditPatient />} />

          <Route path="/companies" exact element={<Companies />} />
          <Route
            path="/company/:companyId/:companyName"
            exact
            element={<CompanyDetails />}
          />
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
          <Route
            path="/skin/conditions/add"
            exact
            element={<SkinConditions />}
          />

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

          <Route path="/reports" exact element={<Reports />} />
          <Route path="/reports/generate" exact element={<GeneratedReports />} />
          <Route
            path="/report/single/:day"
            exact
            element={<SingleReportPage />}
          />
          <Route path="/appointments" exact element={<Appointments />} />
          <Route path="/certificates" exact element={<CertificatesPage />} />

          <Route
            path="/patient/industry/:patientId"
            element={<IndustryPatientUpdate />}
          />
          <Route
            path="/patient/pneumo/:patientId"
            element={<PneumoPatientUpdate />}
          />

          <Route
            path="/patient/foodhandler/:patientId"
            element={<FoodPatientUpdate />}
          />

          <Route
            path="/batch/create/:companyId/:companyName"
            element={<CreateBatchFormPage />}
          />
          <Route
            path="/batch/list/:batchId/:batchName"
            element={<BatchListPage />}
          />

          <Route
            path="/certificates/print/page/"
            element={<PrintCertificatesPage />}
          />

          <Route path="/certificates/print/csv/" element={<CsvPrintPage />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/dnotes" element={<DnotesPage />} />
          <Route
            path="/dnote/certificate/update/:dnoteId/:dnoteName"
            element={<DnoteEditPage />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route
          path="/create_medicals_user_providence_human_capital"
          element={<Register />}
        />
      </Routes>
    </Fragment>
  );
};
export default App;

export { WrapperComponent };
