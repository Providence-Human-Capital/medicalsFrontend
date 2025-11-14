import React, { Fragment, useCallback, useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { API } from "../../config";
import { toast } from "react-toastify";
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
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [patientsAdded, setPatientsAdded] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [count, setCount] = useState(0);
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

  // --- Dropzone + XLSX parsing (replaces <input type="file">) ---
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
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
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

  const handleSearch = () => {
    const filtered = data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const saveDataToDatabase = async () => {
    if (!company) {
      toast.error("Please select a company first.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (!examPurpose) {
      toast.error("Please select an exam purpose.");
      return;
    }
    if (!data.length) {
      toast.error("No rows loaded. Please upload a CSV/XLSX first.");
      return;
    }

    const transformedData = data.map((row) => {
      const dobRaw = row["Date of Birth"];
      let dateOfBirth = null;

      if (dobRaw !== undefined && dobRaw !== null && dobRaw !== "") {
        const num = Number(dobRaw);
        if (!Number.isNaN(num)) {
          const ts = (num - 25569) * 86400 * 1000;
          if (!Number.isNaN(ts)) {
            dateOfBirth = new Date(ts).toISOString().slice(0, 10);
          }
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
        date_of_birth: dateOfBirth,
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
        toast.error("Record might exist in the system / Duplicate National ID");
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

                  {/* Full-width dashed Dropzone */}
                  <div className="row mb-3">
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

                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="separation-div"></div>
                    <div className="row">
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
                      <SaveButton onClick={saveDataToDatabase} text={"Save To Database"} />
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
