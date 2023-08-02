import React, { Fragment, useEffect, useState } from "react";
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
  getCofHPatients,
  getCompanies,
  getDiseases,
  getIllnesses,
  getIndustryPatients,
  getPneumoPatients,
  getSkinConditions,
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

const Home = ({}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
      try {
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

        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        ); // Set loading state to false when all data is fetched
      } catch (error) {
        console.error(error);
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: true,
          })
        );
      }
    };

    fetchData();
  }, []);

  const totalPatients = useSelector((state) => state.patient.patients.length);

  return (
    <Fragment>
      <section className="content">
        {/* <DashboardSkeleton /> */}
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-2.svg"
                }
                Label={"Total Patients"}
                Number={totalPatients}
              />
              <SmallCard
                Label={"To 81 Baines"}
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-1.svg"
                }
                Number={78}
              />
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-4.svg"
                }
                Label={"Certificates Passed"}
                Number={342}
              />
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"Certificates Failed"}
                Number={200}
              />
            </div>

            <div className="row mb-4">
              <div className="d-flex">
                <Link to={"/attendees/add"}>
                  <button
                    className="btn btn-success"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <strong>Add New Client</strong>
                  </button>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6 col-12">
                <CertificateAnalysisCard />
              </div>
              <div className="col-xl-6 col-12">
                <PatientStatisticsCard />
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
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
