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
      <section class="content">
        <div class="row">
          <div class="col-xl-8 col-12">
            <div class="row">
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
            </div>

            <div class="row">
              <div class="col-xl-6 col-12">
                <CertificateAnalysisCard />
              </div>
              <div class="col-xl-6 col-12">
                <PatientStatisticsCard />
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 col-12">
                <BmiAnalysis />
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-12">
            <IllnessAnalysisCard />
            <SmokingAnalysisCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
