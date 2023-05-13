import React, { Fragment, useState } from "react";
import Layout from "./Layout";
import SmallCard from "../components/cards/SmallCard";
import CertificateAnalysisCard from "../views/dashboard/components/CertificateAnalysisCard";
import PatientStatisticsCard from "../views/dashboard/components/PatientStatisticsCard";
import IllnessAnalysisCard from "../views/dashboard/components/IllnessAnalysisCard";
import SmokingAnalysisCard from "../views/dashboard/components/SmokingAnalysisCard";
import BmiAnalysis from "../views/dashboard/components/BmiAnalysis";

const Home = ({}) => {
  return (
    <Fragment>
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
              <SmallCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-2.svg"
                }
                Label={"Total Patients"}
                Number={767}
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

            <div className="row">
              <div className="col-xl-6 col-12">
                <CertificateAnalysisCard />
              </div>
              <div className="col-xl-6 col-12">
                <PatientStatisticsCard />
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6 col-12">
                <BmiAnalysis />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <IllnessAnalysisCard />
            <SmokingAnalysisCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
