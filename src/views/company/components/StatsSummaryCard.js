import React, { useEffect, useState } from "react";
import { getGeneralCompanyStats } from "../../../services/api";

const StatsSummaryCard = ({ companyId }) => {
  const [generalStats, setgeneralStats] = useState({});

  const fetcGeneralStats = async () => {
    try {
      const generalStats = await getGeneralCompanyStats(companyId);
      setgeneralStats(generalStats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcGeneralStats();
  }, []);

  return (
    <>
      <div class="box">
        <div class="box-body">
          {generalStats && (
            <div class="row">
              <div class="col-xl-3 col-md-6 col-12">
                <div class="d-flex align-items-center mb-15 mb-lg-0">
                  <div class="me-15 bg-danger w-60 h-60 rounded-circle text-center l-h-70">
                    <i class="fs-24 fa fa-user"></i>
                  </div>
                  <div>
                    <p class="text-fade fs-16 mb-0">Yearly Attendance</p>
                    <h3 class="fw-500 my-0">{generalStats.totalPatients}</h3>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-12">
                <div class="d-flex align-items-center mb-15 mb-lg-0">
                  <div class="me-15 bg-warning w-60 h-60 rounded-circle text-center l-h-70">
                    <i class="fs-24 fa fa-user-md"></i>
                  </div>
                  <div>
                    <p class="text-fade fs-16 mb-0">(PASSED) Certificates</p>
                    <h3 class="fw-500 my-0">
                      {generalStats.releasedCertificates}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-12">
                <div class="d-flex align-items-center mb-15 mb-md-0">
                  <div class="me-15 bg-success w-60 h-60 rounded-circle text-center l-h-70">
                    <i class="fs-24 fa fa-hospital-o"></i>
                  </div>
                  <div>
                    <p class="text-fade fs-16 mb-0">(FAILED) Certificates</p>
                    <h3 class="fw-500 my-0">
                      {generalStats.failedCertificates}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-12">
                <div class="d-flex align-items-center mb-15 mb-md-0">
                  <div class="me-15 bg-info w-60 h-60 rounded-circle text-center l-h-70">
                    <i class="fs-24 fa fa-ambulance"></i>
                  </div>
                  <div>
                    <p class="text-fade fs-16 mb-0">Referral</p>
                    <h3 class="fw-500 my-0">{generalStats.referralPatients}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatsSummaryCard;
