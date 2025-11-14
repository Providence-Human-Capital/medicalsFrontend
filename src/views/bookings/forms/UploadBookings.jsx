import React, { useCallback, useMemo, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import * as XLSX from "xlsx";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";

const categories = [
  { value: "Food Handler (COH)", label: "Food Handler" },
  { value: "Pneumoconiosis", label: "Pneumoconiosis" },
  { value: "Pre-Employement", label: "Pre-Employment" },
  { value: "Exit-Pneumoconiosis", label: "Exit (Pneumoconiosis)" },
  { value: "Exit-Employement", label: "Exit-Employement" },
];

// --- API helper (companies) ---
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
  return Array.isArray(json) ? json : json?.data ?? [];
};

const UploadBookings = () => {
  const [data, setData] = useState([]); // full, actual parsed rows
  const [company, setCompany] = useState("");
  const [examPurpose, setExamPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [patientsAdded, setPatientsAdded] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  // --- Companies via react-query ---
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

  // --- Dropzone + XLSX parsing ---
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = new Uint8Array(e.target.result);
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse as rows, first row as headers
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const [headers, ...rest] = rows;

        // Map rows into objects using original headers
        const formatted = (rest || [])
          .filter((r) => Array.isArray(r) && r.length > 0) // drop empty rows
          .map((row) =>
            headers.reduce((obj, header, idx) => {
              obj[header] = row[idx];
              return obj;
            }, {})
          );

        setData(formatted);
        toast.success(`Loaded ${formatted.length} row(s) from ${file.name}`);
      } catch (err) {
        console.error(err);
        toast.error("Could not parse the file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  // Full-width dashed styling for the dropzone
  const dropzoneStyle = useMemo(
    () => ({
      width: "100%",
      border: "2px dashed #6c757d",
      borderRadius: 12,
      padding: 24,
      textAlign: "center",
      cursor: "pointer",
      transition: "background 120ms ease, border-color 120ms ease, color 120ms ease",
      background: isDragActive ? "rgba(13, 110, 253, 0.05)" : "transparent",
      borderColor: isDragReject ? "#dc3545" : isDragAccept ? "#198754" : "#6c757d",
      color: isDragReject ? "#dc3545" : isDragAccept ? "#198754" : "inherit",
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  // --- Preview headers: union of keys to show everything we actually loaded
  const previewHeaders = useMemo(() => {
    if (!data.length) return [];
    const set = new Set();
    data.forEach((row) => Object.keys(row || {}).forEach((k) => set.add(k)));
    return Array.from(set);
  }, [data]);

  const clearLoadedData = () => {
    setData([]);
    setSavedData([]);
    setPatientsAdded(0);
  };

  // --- Save loop (unchanged) ---
  const saveDataToDatabase = async (e) => {
    e.preventDefault();

    if (!company) return toast.error("Please select a company first.");
    if (!category) return toast.error("Please select a category.");
    if (!examPurpose) return toast.error("Please select an exam purpose.");
    if (!bookingDate) return toast.error("Please select a booking date.");
    if (!data.length) return toast.error("No rows loaded. Please upload a CSV/XLSX first.");

    const transformedData = data.map((row) => {
      // Convert Excel serial date to yyyy-mm-dd if present (we read the actual value from file)
      const dobSerial = row["Date of Birth"];
      let dateOfBirth = null;
      if (dobSerial !== undefined && dobSerial !== null && dobSerial !== "") {
        const num = Number(dobSerial);
        if (!Number.isNaN(num)) {
          const ts = (num - 25569) * 86400 * 1000;
          if (!Number.isNaN(ts)) {
            dateOfBirth = new Date(ts).toISOString().slice(0, 10);
          }
        } else if (typeof dobSerial === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dobSerial)) {
          // If the Excel had an ISO-like string already
          dateOfBirth = dobSerial;
        }
      }

      return {
        first_name: row["First Name"],
        last_name: row["Last Name"],
        national_id: row["National ID"],
        gender:
          row["Gender"] !== undefined && row["Gender"] !== null
            ? String(row["Gender"]).toUpperCase()
            : "",
        phone_number:
          row["Phone Number"] !== undefined && row["Phone Number"] !== null
            ? String(row["Phone Number"])
            : "",
        date_of_birth: dateOfBirth,
        exam_purpose: examPurpose,
        company_id: company === "" ? null : Number(company),
        category: category,
        x_ray_status: "PENDING",
        country_code: "+263",
        last_x_ray: "N/A",
        employee_number: "",
        booking_date: bookingDate,
      };
    });

    const savedEntries = [];
    dispatch(uiActions.setLoadingSpinner({ isLoading: true }));

    for (const entry of transformedData) {
      try {
        const response = await fetch(`${API}/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        const payload = await response.json();

        if (response.status === 200 || response.status === 201) {
          setPatientsAdded((prev) => prev + 1);
          savedEntries.push(entry);
          setSavedData([...savedEntries]);
        } else if (response.status === 400) {
          toast.error(payload?.error || "Failed to save a record.");
        } else {
          toast.error(payload?.message || "Unexpected error while saving.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Record might exist in the system / Duplicate National ID.");
      }
      // throttle
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    if (savedEntries.length) {
      toast.success(`Saved ${savedEntries.length} record(s).`);
    }
  };

  return (
    <>
      <BreadCrumb activeTab={"UPLOAD BOOKING"} title={"BOOKINGS"} />

      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="box-header no-border">
                <h3 className="box-title" style={{ textTransform: "uppercase" }}>
                  Upload Bookings
                </h3>
              </div>

              <div className="box-body">
                <form onSubmit={saveDataToDatabase}>
                  {/* Full-width dashed Dropzone */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div {...getRootProps({ style: dropzoneStyle })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the file here…</p>
                        ) : (
                          <p>
                            Drag &amp; drop a <strong>.csv</strong>, <strong>.xlsx</strong>, or{" "}
                            <strong>.xls</strong> here, or click to select.
                          </p>
                        )}
                      </div>
                      {acceptedFiles?.[0] && (
                        <div className="small mt-2">
                          Selected: <strong>{acceptedFiles[0].name}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview: show ALL actually loaded rows */}
                  {data.length > 0 && (
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="m-0">
                                Preview (showing all {data.length} row{data.length !== 1 ? "s" : ""})
                              </h5>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={clearLoadedData}
                              >
                                Clear
                              </button>
                            </div>

                            <div className="table-responsive" style={{ maxHeight: 520, overflow: "auto" }}>
                              <table className="table table-sm table-striped">
                                <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                                  <tr>
                                    {previewHeaders.map((h) => (
                                      <th key={h}>{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((row, idx) => (
                                    <tr key={idx}>
                                      {previewHeaders.map((h) => (
                                        <td key={h}>{row?.[h] ?? ""}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <p className="text-muted mb-0">
                              You are viewing the data **exactly as loaded** from the file.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="separation-div"></div>

                  {/* Meta selections */}
                  <div className="row">
                    {/* Company */}
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="companySelect"
                          value={company}
                          onChange={(e) =>
                            setCompany(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          disabled={companiesLoading}
                        >
                          {companiesLoading && (
                            <option value="">Loading companies…</option>
                          )}
                          {companiesError && (
                            <option value="">
                              {companiesErrorObj?.message || "Failed to load companies"}
                            </option>
                          )}
                          {!companiesLoading && !companiesError && (
                            <>
                              <option value=""></option>
                              {companies.map((co) => (
                                <option key={co.id} value={co.id}>
                                  {(co.company_name || co.name || "")
                                    .toString()
                                    .toUpperCase()}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                        <label htmlFor="companySelect" className="form-label">
                          COMPANY
                        </label>
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

                    {/* Exam Purpose */}
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="examPurposeSelect"
                          value={examPurpose}
                          onChange={(e) => setExamPurpose(e.target.value)}
                        >
                          <option value=""></option>
                          <option value="2" style={{ textTransform: "uppercase" }}>
                            Periodical
                          </option>
                        </select>
                        <label htmlFor="examPurposeSelect" className="form-label">
                          EXAM PURPOSE
                        </label>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="categorySelect"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value=""></option>
                          {categories.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              style={{ textTransform: "uppercase" }}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="categorySelect" className="form-label">
                          CATEGORY
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="separation-div"></div>

                  {/* Booking Date */}
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="bookingDate"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                        />
                        <label htmlFor="bookingDate" className="form-label">
                          BOOKING DATE
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="separation-div" style={{ marginBottom: "40px" }} />

                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button className="btn btn-primary" type="submit">
                      UPLOAD BOOKINGS
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="separation-div"></div>

      {/* Results */}
      <section className="content">
        <div className="box">
          <div className="box-body">
            <h4>
              NUMBER OF PATIENTS ADDED {"  "}
              {patientsAdded}
            </h4>

            <div className="row">
              <div className="col-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>National ID</th>
                      <th>Gender</th>
                      <th>Phone Number</th>
                      <th>Date of Birth</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedData.map((entry, idx) => (
                      <tr
                        key={`${entry.national_id || "NID"}-${entry.first_name || "FN"}-${
                          entry.last_name || "LN"
                        }-${idx}`}
                      >
                        <td>{entry.first_name}</td>
                        <td>{entry.last_name}</td>
                        <td>{entry.national_id}</td>
                        <td>{entry.gender}</td>
                        <td>{entry.phone_number}</td>
                        <td>{entry.date_of_birth}</td>
                        <td>
                          <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} />
                        </td>
                      </tr>
                    ))}
                    {!savedData.length && (
                      <tr>
                        <td colSpan={7} className="text-center text-muted">
                          No saved rows yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Toast container */}
      <ToastContainer position="top-right" />
    </>
  );
};

export default UploadBookings;
