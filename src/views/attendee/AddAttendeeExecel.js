import React, { Fragment, useCallback, useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { API } from "../../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { uiActions } from "../../redux_store/ui-store";
import Loading from "../../components/loader/Loading";
import "./component-css/CustomCss.css";
import SaveButton from "../../components/buttons/SaveButton";
import { attendeeActions } from "../../redux_store/attendee-store";
import { useDropzone } from "react-dropzone";

// --- helper to fetch companies (no Redux slice) ---
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

const AddAttendeeExecel = () => {
  const [data, setData] = useState([]);           // parsed rows
  const [patientsAdded, setPatientsAdded] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [company, setCompany] = useState("");
  const [examPurpose, setExamPurpose] = useState("");
  const [category, setCategory] = useState("");

  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  // --- Companies via react-query (replaces Redux companies) ---
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

  // CSV-only helper (guard for odd MIME detection)
  const isCsvFile = (file) => {
    const nameOk = /\.csv$/i.test(file.name || "");
    const typeOk = file.type === "text/csv" || file.type === "application/vnd.ms-excel";
    return nameOk || typeOk;
  };

  const showCsvOnlySwal = () => {
    Swal.fire({
      icon: "info",
      title: "CSV files only",
      html: `
        <div style="text-align:left">
          <p>Please upload a <b>.csv</b> file.</p>
          <p><b>Excel (Windows):</b></p>
          <ol>
            <li>File → Save As</li>
            <li>Choose a location</li>
            <li><b>Save as type:</b> CSV (Comma delimited) (*.csv)</li>
            <li>Save</li>
          </ol>
          <p><b>Excel (Mac):</b></p>
          <ol>
            <li>File → Save As</li>
            <li><b>File Format:</b> CSV UTF-8 (Comma-delimited) (.csv)</li>
            <li>Save</li>
          </ol>
          <p><b>Google Sheets:</b></p>
          <ol>
            <li>File → Download</li>
            <li><b>Comma-separated values (.csv)</b></li>
          </ol>
        </div>
      `,
      confirmButtonText: "Got it",
    });
  };

  // --- Dropzone + CSV parsing (CSV ONLY) ---
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    // Extra guard in case accept filter is bypassed
    if (!isCsvFile(file)) {
      showCsvOnlySwal();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result; // CSV as text
        const workbook = XLSX.read(csvText, { type: "string" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const [headers, ...rest] = rows;

        const formattedData = (rest || [])
          .filter((r) => Array.isArray(r) && r.length > 0)
          .map((row) =>
            headers.reduce(
              (obj, header, index) => ({ ...obj, [header]: row[index] }),
              {}
            )
          );

        setData(formattedData);
        toast.success(`Loaded ${formattedData.length} row(s) from ${file.name}`);
      } catch (err) {
        console.error(err);
        toast.error("Could not parse the CSV. Please check the file.");
      }
    };
    reader.readAsText(file); // IMPORTANT for CSV
  }, []);

  const onDropRejected = useCallback(() => {
    showCsvOnlySwal();
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
    onDropRejected,
    maxFiles: 1,
    // CSV only
    accept: { "text/csv": [".csv"] },
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

  // Preview headers (union of keys)
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

  const saveDataToDatabase = async () => {
    if (!company) return toast.error("Please select a company first.");
    if (!category) return toast.error("Please select a category.");
    if (!examPurpose) return toast.error("Please select an exam purpose.");
    if (!data.length) return toast.error("No rows loaded. Please upload a CSV first.");

    const transformedData = data.map((row) => {
      const dobRaw = row["Date of Birth"];
      let dateOfBirth = null;

      if (dobRaw !== undefined && dobRaw !== null && dobRaw !== "") {
        const num = Number(dobRaw);
        if (!Number.isNaN(num)) {
          const ts = (num - 25569) * 86400 * 1000; // Excel serial guard (in case)
          if (!Number.isNaN(ts)) dateOfBirth = new Date(ts).toISOString().slice(0, 10);
        } else if (typeof dobRaw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dobRaw)) {
          dateOfBirth = dobRaw;
        }
      }

      return {
        first_name: row["First Name"],
        last_name: row["Last Name"],
        national_id: row["National ID"],
        gender: row["Gender"] !== undefined ? String(row["Gender"]).toUpperCase() : "",
        phone_number:
          row["Phone Number"] !== undefined && row["Phone Number"] !== null
            ? String(row["Phone Number"])
            : "",
        date_of_birth: dateOfBirth || '1999-04-19',
        exam_purpose: examPurpose,
        company_id: company === "" ? null : Number(company),
        category: category,
        x_ray_status: "PENDING",
        country_code: "+263",
        last_x_ray: "N/A",
        employee_number: "",
      };
    });

    const savedEntries = [];

    for (const entry of transformedData) {
      try {
        dispatch(uiActions.setLoadingSpinner({ isLoading: true }));

        const response = await fetch(`${API}/attendee`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        const respData = await response.json();

        if (response.status === 200 || response.status === 201) {
          setPatientsAdded((prevCount) => prevCount + 1);

          // refresh attendees list
          const attendeesResponse = await fetch(`${API}/attendee`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const responseData = await attendeesResponse.json();
          const attendees = responseData.data;
          dispatch(attendeeActions.setAttendees({ attendees: [...attendees] }));

          savedEntries.push(entry);
          setSavedData([...savedEntries]);
          dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
        } else if (response.status === 400) {
          toast.error(respData?.error || "Failed to save record.");
          dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
        } else {
          toast.error(respData?.message || "Unexpected error while saving.");
          dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
        }
      } catch (error) {
        console.error(error);
        console.log('This is the upload error', error)
        toast.error(error);
        dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      }

      // small delay to avoid hammering the API
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  };

  useEffect(() => {
    setPatientsAdded(0);
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="card">
            <div className="">
              <div className="box-body">
                <div className="">
                  <h4 className="mb-4">
                    <strong>Add Client Through Excel</strong>
                  </h4>

                  {/* Full-width dashed Dropzone (CSV-only) */}
                  <div className="row mb-3">
                    <div className="col-12">
                      <div {...getRootProps({ style: dropzoneStyle })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the CSV file here…</p>
                        ) : (
                          <p>
                            Drag &amp; drop a <strong>.csv</strong> file here, or click to select.
                          </p>
                        )}
                        <div className="small mt-2 text-muted">Only <b>.csv</b> is accepted.</div>
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
                              You are viewing the data <b>exactly as loaded</b> from the CSV.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="separation-div"></div>
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
                            {companiesLoading && <option value="">Loading companies…</option>}
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
                            onChange={(event) => setExamPurpose(event.target.value)}
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
                            onChange={(event) => setCategory(event.target.value)}
                          >
                            <option value=""></option>
                            <option value="Food Handler (COH)" style={{ textTransform: "uppercase" }}>
                              Food Handler
                            </option>
                            <option value="Pneumoconiosis" style={{ textTransform: "uppercase" }}>
                              Pneumoconiosis
                            </option>
                            <option value="Pre-Employement" style={{ textTransform: "uppercase" }}>
                              Pre-Employment
                            </option>
                            <option value="Exit-Pneumoconiosis" style={{ textTransform: "uppercase" }}>
                              Exit (Pneumoconiosis)
                            </option>
                            <option value="Exit-Employement" style={{ textTransform: "uppercase" }}>
                              Exit-Employement
                            </option>
                          </select>
                          <label htmlFor="categorySelect" className="form-label">
                            CATEGORY
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="separation-div"></div>

                    {isLoading ? (
                      <Loading />
                    ) : (
                      // <SaveButton onClick={saveDataToDatabase} text={"Save To Database"} />
                      <button className="btn btn-primary" onClick={saveDataToDatabase} style={{
                        fontFamily: 'Poppins'
                      }}>
                          UPLOAD TO DATABASE
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <div className="separation-div"></div>

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
                  key={`${entry.national_id || "nid"}-${entry.first_name || "fn"}-${
                    entry.last_name || "ln"
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
    </Fragment>
  );
};

export default AddAttendeeExecel;
