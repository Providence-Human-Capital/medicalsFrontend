import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ReportsListBox from "./components/ReportsListBox";
import { useDispatch } from "react-redux";
import { patientActions } from "../../redux_store/patients-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { API } from "../../config";

// --- Fetch companies locally (no Redux slice) ---
const fetchCompanies = async () => {
  const res = await fetch(`${API}/company`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    let msg = "Failed to load companies";
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }
  const json = await res.json();
  // supports either { data: [...] } or a bare array
  return Array.isArray(json) ? json : json?.data ?? [];
};

const GeneratedReports = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    year: "",
    month: "",
    company: "",
    category: "",
  });

  // Companies via react-query
  const {
    data: companies = [],
    isLoading: companiesLoading,
    isError: companiesError,
    error: companiesErrorObj,
    refetch: refetchCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 10 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2018;
    const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    );
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const { mutateAsync: generateReport, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post(
        `${API}/advanced/report/generation`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(
        patientActions.setReportsFilteredResults({
          reportsFilteredResults: data.data,
        })
      );
    },
    onError: (error) => {
      console.error("Error generating report:", error);
    },
  });

  const handleGenerateReport = async () => {
    try {
      // Coerce company to number if present
      const payload = {
        ...filters,
        company:
          filters.company === "" || filters.company === null
            ? ""
            : Number(filters.company),
      };
      await generateReport(payload);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>GENERATE REPORT</title>
      </Helmet>

      <BreadCrumb title={"Generate Reports"} activeTab={"Graphs & Exports"} />

      <div className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box p-3 py-4">
              <h4
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Reports Generation
              </h4>

              <div className="row g-3 mt-2">
                {/* Year */}
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

                {/* Month */}
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

                {/* Company (fetched in-component) */}
                <div className="col-md-2">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange(
                          "company",
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      disabled={companiesLoading}
                    >
                      {companiesLoading && (
                        <option value="">Loading companies…</option>
                      )}
                      {companiesError && (
                        <option value="">
                          {companiesErrorObj?.message ||
                            "Failed to load companies"}
                        </option>
                      )}
                      {!companiesLoading && !companiesError && (
                        <>
                          <option value="">Select Company</option>
                          {companies.map((c) => (
                            <option key={c.id} value={c.id}>
                              {(c.company_name || c.name || "").toString()}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <label>SELECT COMPANY</label>

                    {companiesError && (
                      <div className="mt-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => refetchCompanies()}
                        >
                          Retry loading companies
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="col-md-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="Food Handler (COH)">
                        Food Handler (COH)
                      </option>
                      <option value="Pre-Employement">Pre-Employement</option>
                      <option value="Exit-Employement">Exit-Employement</option>
                      <option value="Pneumoconiosis">Pneumoconiosis</option>
                      <option value="Exit-Pneumoconiosis">
                        Exit-Pneumoconiosis
                      </option>
                    </select>
                    <label>SELECT CATEGORY</label>
                  </div>
                </div>

                {/* Button */}
                <div className="col-md-2">
                  <button
                    className="btn btn-primary btn-block d-flex align-items-center justify-content-center gap-2"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      minHeight: "40px",
                      fontFamily: "Poppins",
                    }}
                    onClick={handleGenerateReport}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Generating...
                      </>
                    ) : (
                      "Generate Report"
                    )}
                  </button>
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
                  style={{ fontWeight: "bold" }}
                >
                  Advance Search With Filters <i className="fa fa-angle-down"></i>
                </a>
                <div className="collapse" id="collapseExample">
                  <div className="card card-body"></div>
                </div>
              </div>
            </div>

            {/* List of Generated Results */}
            <ReportsListBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneratedReports;
