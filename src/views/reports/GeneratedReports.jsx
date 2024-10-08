import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ReportsListBox from "./components/ReportsListBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../config";
import { patientActions } from "../../redux_store/patients-store";
import Loading from "../../components/loader/Loading";
import { Helmet } from "react-helmet";

const GeneratedReports = ({}) => {
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    company: "",
    category: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 2018 },
      (_, index) => currentYear - index
    );

    return years.map((year) => (
      <>
        <option key={year} value={year}>
          {year}
        </option>
      </>
    ));
  };

  const handleGenerateReport = () => {
    // Call your Laravel backend API here with the filter values
    setIsLoading(true);
    axios
      .post(`${API}/advanced/report/generation`, {
        year: filters.year,
        month: filters.month,
        company: filters.company,
        category: filters.category,
      })
      .then((response) => {
        // Handle the response, update state, or perform any other actions
        console.log("This is the patient Response", response.data);
        dispatch(
          patientActions.setReportsFilteredResults({
            reportsFilteredResults: response.data.data,
          })
        );

        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error generating report:", error);
        setIsLoading(false);
      });
    console.log(filters);
  };

  return (
    <>
      <Helmet>
        <title>GENERATE REPORT</title>
      </Helmet>
      <BreadCrumb title={"Generate Reports"} activeTab={"Graphs & Exports"} />
      <div className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="box p-3  py-4">
              <h4
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Reports Generation
              </h4>
              <div className="row g-3 mt-2">
                <div className="col-md-2">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("year", e.target.value)
                      }
                    >
                      <option value="">Select Year</option>
                      {generateYearOptions()}
                    </select>
                    <label>SELECT YEAR</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("month", e.target.value)
                      }
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <label>SELECT MONTH</label>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("company", e.target.value)
                      }
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                    <label>SELECT COMPANY</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="Food Handler (COH)">Food Handler (COH)</option>
                      <option value="Pre-Employement">Pre-Employement</option>
                      <option value="Exit-Employement">Exit-Employement</option>
                      <option value="Pneumoconiosis">Pneumoconiosis</option>
                      <option value="Exit-Pneumoconiosis">Exit-Pneumoconiosis</option>
                    </select>
                    <label>SELECT CATEGORY</label>
                  </div>
                </div>
                <div className="col-md-2">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        borderRadius: "5px",
                      }}
                      onClick={handleGenerateReport}
                    >
                      GENERATE REPORT
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <a
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  className="advanced"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Advance Search With Filters{" "}
                  <i className="fa fa-angle-down"></i>
                </a>
                <div className="collapse" id="collapseExample">
                  <div className="card card-body"></div>
                </div>
              </div>
            </div>
            {/* List of Generated Results */}
            <ReportsListBox  />
          </div>

          <div className="col-xl-4 col-12"></div>
        </div>
      </div>
    </>
  );
};

export default GeneratedReports;
