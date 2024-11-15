import React, { Fragment, useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import SmallCard from "../components/cards/SmallCard";
import CertificateAnalysisCard from "../views/dashboard/components/CertificateAnalysisCard";
import PatientStatisticsCard from "../views/dashboard/components/PatientStatisticsCard";
import IllnessAnalysisCard from "../views/dashboard/components/IllnessAnalysisCard";
import SmokingAnalysisCard from "../views/dashboard/components/SmokingAnalysisCard";
import BmiAnalysis from "../views/dashboard/components/BmiAnalysis";
import { useDispatch, useSelector } from "react-redux";
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

const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [overallStats, setOverallStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isCreatingDnote, setIsCreatingDnote] = useState(false);

  const user = useSelector((state) => state.auth.user);


  const fetchData = useCallback(async () => {
    // Your async data fetching logic here
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
  }, [dispatch]);

  

  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );

      try {
        await fetchData();

        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: true,
          })
        );
      }
    };
    const fetchOverallStatsData = async () => {
      try {
        const response = await fetch(`${API}/patient/overall/stats`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        if (response.ok) {
          setOverallStats(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllExamPurposes = async () => {
      try {
        const response = await fetch(`${API}/exam/purpose/get`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        dispatch(
          centralActions.setExamPurposesWithServices({
            examPurposes: [...responseData],
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getCityOfHarareDnoteNoneDispatched().then((cityDnote) => {
      dispatch(certificateActions.setCityOfHarareDnotes([...cityDnote]));
    });

    getSimbisaNonDispatchedDnote().then((simbisaDnote) => {
      dispatch(certificateActions.setSimbisaDnote([...simbisaDnote]));
    });

    getTexasDnoteNonDispatched().then((texasDnotes) => {
      dispatch(certificateActions.setTexasDnotes([...texasDnotes]));
    });

    fetchDataAndSetLoading();
    fetchAllExamPurposes();
    fetchOverallStatsData();
  }, [fetchData, dispatch]);

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
        {/* <DashboardSkeleton /> */}

{/* {JSON.stringify(overallStats)} */}
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
             
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-2.svg"
                }
                Label={"Total Patients"}
                Number={overallStats.totalPatients || 0}
              />
              <SmallCard
                Label={"To 81 Baines"}
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-1.svg"
                }
                Number={overallStats.referralPatients || 0}
              />
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-4.svg"
                }
                Label={"Certificates Passed"}
                Number={overallStats.releasedCertificates || 0}
              />
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"Certificates Failed"}
                Number={overallStats.failedCertificates || 0}
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
              <div className="col-xl-6 col-12">
              </div>
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
