import React, { Fragment, useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import SmallCard from "../components/cards/SmallCard";
import CertificateAnalysisCard from "../views/dashboard/components/CertificateAnalysisCard";
import PatientStatisticsCard from "../views/dashboard/components/PatientStatisticsCard";
import IllnessAnalysisCard from "../views/dashboard/components/IllnessAnalysisCard";
import SmokingAnalysisCard from "../views/dashboard/components/SmokingAnalysisCard";
import BmiAnalysis from "../views/dashboard/components/BmiAnalysis";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  companiesWithCertificateBatches,
  getAllAttendees,
  getAllPatients,
  getAllTobaccos,
  getAuscultates,
  getCityOfHarareDnoteNoneDispatched,
  getSimbisaNonDispatchedDnote,
  getCofHPatients,
  getCompanies,
  getDiseases,
  getIllnesses,
  getIndustryPatients,
  getPneumoPatients,
  getSkinConditions,
  getTexasDnoteNonDispatched,
} from "../services/api";
import { attendeeActions } from "../redux_store/attendee-store";
import { patientActions } from "../redux_store/patients-store";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";
import { companyActions } from "../redux_store/company-store";
import { illnessActions } from "../redux_store/illness-store";
import { uiActions } from "../redux_store/ui-store";
import Loading from "../components/loader/Loading";
import { tobaccoActions } from "../redux_store/tobacco-store";
import { Link } from "react-router-dom";
import LatestClientsBox from "../views/dashboard/components/LatestClientsBox";
import DueMedicalsBox from "../views/dashboard/components/DueMedicalsBox";
import AdvancedSearchBox from "../components/AdvancedSearchBox";
import SearchedClientsBox from "../views/dashboard/components/SearchedClientsBox";
import { API } from "../config";
import NotificationModal from "../components/modal/NotificationModal";
import { certificateActions } from "../redux_store/certificates-store";
import { centralActions } from "../redux_store/central-store";
import LoginInfoCard from "../components/LoginInfoCard";

const useOverallStats = () => {
  return useQuery({
    queryKey: ["overallStats"],
    queryFn: async () => {
      const response = await fetch(`${API}/patient/overall/stats`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch overall stats");
      }

      return response.json();
    },
  });
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [notifications, setNotifications] = useState([]);
  const [isCreatingDnote, setIsCreatingDnote] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const {
    data: attendees,
    isLoading: isAttendeesLoading,
    isError: isAttendeesError,
  } = useQuery({
    queryKey: ["attendees"],
    queryFn: getAllAttendees,
    onSuccess: (data) => {
      dispatch(attendeeActions.setAttendees({ attendees: data }));
    },
  });

  const {
    data: companies,
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    onSuccess: (data) => {
      dispatch(companyActions.setCompanies({ companies: data }));
    },
  });

  const {
    data: tobaccos,
    isLoading: isTobaccosLoading,
    isError: isTobaccosError,
  } = useQuery({
    queryKey: ["tobaccos"],
    queryFn: getAllTobaccos,
    onSuccess: (data) => {
      dispatch(tobaccoActions.setTobaccos({ tobaccos: data }));
    },
  });

  const {
    data: patients,
    isLoading: isPatientsLoading,
    isError: isPatientsError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    onSuccess: (data) => {
      dispatch(patientActions.setPatients({ patients: data }));
    },
  });

  const {
    data: pneumoPatients,
    isLoading: isPneumoPatientsLoading,
    isError: isPneumoPatientsError,
  } = useQuery({
    queryKey: ["pneumoPatients"],
    queryFn: getPneumoPatients,
    onSuccess: (data) => {
      dispatch(patientActions.setPneumoPatients({ pneumoPatients: data }));
    },
  });

  const {
    data: industryPatients,
    isLoading: isIndustryPatientsLoading,
    isError: isIndustryPatientsError,
  } = useQuery({
    queryKey: ["industryPatients"],
    queryFn: getCofHPatients,
    onSuccess: (data) => {
      dispatch(patientActions.setIndustryPatients({ industryPatients: data }));
    },
  });

  const {
    data: skinConditions,
    isLoading: isSkinConditionsLoading,
    isError: isSkinConditionsError,
  } = useQuery({
    queryKey: ["skinConditions"],
    queryFn: getSkinConditions,
    onSuccess: (data) => {
      dispatch(illnessActions.setSkinConditions({ skin_conditions: data }));
    },
  });

  const {
    data: diseases,
    isLoading: isDiseasesLoading,
    isError: isDiseasesError,
  } = useQuery({
    queryKey: ["diseases"],
    queryFn: getDiseases,
    onSuccess: (data) => {
      dispatch(illnessActions.setDiseases({ diseases: data }));
    },
  });

  const {
    data: auscultates,
    isLoading: isAuscultatesLoading,
    isError: isAuscultatesError,
  } = useQuery({
    queryKey: ["auscultates"],
    queryFn: getAuscultates,
    onSuccess: (data) => {
      dispatch(illnessActions.setAuscultates({ auscultates: data }));
    },
  });

  const {
    data: illnesses,
    isLoading: isIllnessesLoading,
    isError: isIllnessesError,
  } = useQuery({
    queryKey: ["illnesses"],
    queryFn: getIllnesses,
    onSuccess: (data) => {
      dispatch(illnessActions.setIllnesses({ illnesses: data }));
    },
  });

  const {
    data: companiesWithBatches,
    isLoading: isCompaniesWithBatchesLoading,
    isError: isCompaniesWithBatchesError,
  } = useQuery({
    queryKey: ["companiesWithBatches"],
    queryFn: companiesWithCertificateBatches,
    onSuccess: (data) => {
      dispatch(companyActions.setCompaniesWithBatches(data));
    },
  });

  const { data: overallStats, isLoading: isOverallStatsLoading } =
    useOverallStats();

  const totalPatients = useSelector((state) => state.patient.patients.length);

  const createDnote = async (type) => {
    const currentDate = new Date().toLocaleDateString().split("/").join("-");
    const dnotNameRequest = {
      name: `${type}-(${currentDate})`,
    };
    try {
      setIsCreatingDnote(true);
      const response = await fetch(`${API}/dnote/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dnotNameRequest),
      });
      if (response.ok) {
        setIsCreatingDnote(false);
      }
    } catch (error) {
      console.log(error);
      setIsCreatingDnote(false);
    }
  };

  return (
    <Fragment>
      <section className="content">
        {isLoading || isOverallStatsLoading ? (
          <div className="flex items-center justify-center h-24">
            <div className="text-blue-600 bg-blue-100 px-4 py-2 rounded-md shadow-sm text-sm font-medium">
              Fetching the overall stats...
            </div>
          </div>
        ) : null}
        <div className="row">
          <div className="col-xl-8 col-12">
            <LoginInfoCard
              userName={"" + user?.first_name + " " + user?.last_name}
              loginLocation={user?.location || "Unknown Location"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
              <SmallCard
                svgLink={
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIgMmgxMGMtMS4xIDAgLTIgMS4xYy0xLjEgMS4xLTIgMiAwIDIgMmgxMmMxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHptMTAgMGgxMmMxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHoiLz48L3N2Zz4="
                }
                Label={"Total Patients"}
                Number={overallStats?.totalPatients || 0}
              />
              <SmallCard
                Label={"To 81 Baines"}
                svgLink={
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIgMmgxMGMtMS4xIDAgLTIgMS4xYy0xLjEgMS4xLTIgMiAwIDIgMmgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHptMTAgMGgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHoiLz48L3N2Zz4="
                }
                Number={overallStats?.referralPatients || 0}
              />
              <SmallCard
                svgLink={
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIgMmgxMGMtMS4xIDAgLTIgMS4xYy0xLjEgMS4xLTIgMiAwIDIgMmgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHptMTAgMGgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHoiLz48L3N2Zz4="
                }
                Label={"Certificates Passed"}
                Number={overallStats?.releasedCertificates || 0}
              />
              <SmallCard
                svgLink={
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTIgMmgxMGMtMS4xIDAgLTIgMS4xYy0xLjEgMS4xLTIgMiAwIDIgMmgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHptMTAgMGgxM2MxLjEgMCAyLTEuMSAxLjEtMiAwLTIgbC0xMC0xMHoiLz48L3N2Zz4="
                }
                Label={"Certificates Failed"}
                Number={overallStats?.failedCertificates || 0}
              />
            </div>

            <div className="row mb-4">
              <div className="d-flex">
                <Link to={"/attendees/add"}>
                  <button
                    className="btn btn-success me-4 pp"
                    style={{
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <strong>ADD NEW PATIENT</strong>
                  </button>
                </Link>

                {!isCreatingDnote && (
                  <>
                    <a
                      className="btn btn-success-light me-4"
                      onClick={() => createDnote("City Of Harare")}
                    >
                      CREATE CITY OF HARARE D-NOTE
                    </a>

                    <a
                      className="btn btn-success-light me-4"
                      onClick={() => createDnote("Simbisa")}
                    >
                      CREATE SIMBISA DNOTE
                    </a>
                    <a
                      className="btn btn-success-light me-4"
                      onClick={() => createDnote("Texas")}
                    >
                      CREATE TEXAS DNOTE
                    </a>
                  </>
                )}

                {isCreatingDnote && (
                  <span>
                    <Loading />
                  </span>
                )}
              </div>
              <div
                style={{
                  marginTop: "3rem",
                }}
              >
                <AdvancedSearchBox />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-12">
                <SearchedClientsBox />
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-12">
                <CertificateAnalysisCard />
              </div>
              <div className="col-xl-6 col-12"></div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-12">
                <LatestClientsBox />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <DueMedicalsBox />
            <IllnessAnalysisCard />
            <PatientStatisticsCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
