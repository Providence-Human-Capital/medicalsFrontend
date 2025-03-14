import React, { Fragment, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import { uiActions } from "../../redux_store/ui-store";
import Loading from "../../components/loader/Loading";
import "./component-css/CustomCss.css";
import SaveButton from "../../components/buttons/SaveButton";
import { attendeeActions } from "../../redux_store/attendee-store";

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
  const companies = useSelector((state) => state.company.companies);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [loading, setLoading] = useState(false);

  const epurposes = useSelector((state) => state.central.examPurposes);

  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const [headers, ...rows] = excelData;
      const formattedData = rows.map((row) =>
        headers.reduce(
          (obj, header, index) => ({ ...obj, [header]: row[index] }),
          {}
        )
      );
      setData(formattedData);
    };
    reader.readAsBinaryString(file);
    
  };
  const handleSearch = () => {
    const filteredData = data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };

  const saveDataToDatabase = async () => {
    console.log("Data", data);
    const transformedData = data.map((row) => {
      // Check if "Date of Birth" property exists and is not undefined
      const dateOfBirthTimestamp =
        row["Date of Birth"] !== undefined
          ? (row["Date of Birth"] - 25569) * 86400 * 1000
          : null;

      // Check if the timestamp is valid
      const dateOfBirth =
        dateOfBirthTimestamp !== null && !isNaN(dateOfBirthTimestamp)
          ? new Date(dateOfBirthTimestamp).toISOString().slice(0, 10)
          : null;

      return {
        first_name: row["First Name"],
        last_name: row["Last Name"],
        national_id: row["National ID"],
        gender: row["Gender"] !== undefined ? row["Gender"].toUpperCase() : "",
        phone_number:
          row["Phone Number"] !== undefined
            ? row["Phone Number"].toString()
            : "",
        date_of_birth: dateOfBirth,
        exam_purpose: examPurpose,
        company_id: company,
        category: category,
        x_ray_status: "PENDING",
        country_code: "+263",
        last_x_ray: "N/A",
        employee_number: "",
      };
    });

    const savedEntries = [];

    for (const entry of transformedData) {
      console.log("Entry", entry);
      try {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: true,
          })
        );

        const response = await fetch(`${API}/attendee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entry),
        });
        const data = await response.json();
        console.log("New entry", data);

        if ((response.status === 200) | (response.status === 201)) {
          setPatientsAdded((prevCount) => prevCount + 1);
          dispatch(
            uiActions.setLoadingSpinner({
              isLoading: false,
            })
          );
          const getAttendees = async () => {
            const attendeesResponse = await fetch(`${API}/attendee`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            const responseData = await attendeesResponse.json();
            const attendees = responseData.data;
            dispatch(
              attendeeActions.setAttendees({
                attendees: [...attendees],
              })
            );
          };
          getAttendees();
          savedEntries.push(entry);

          setSavedData(savedEntries);
        }

        if (response.status === 400) {
          toast.error(data.error);
          dispatch(
            uiActions.setLoadingSpinner({
              isLoading: false,
            })
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Record might exist in the system / Duplicate National ID",
          error
        );
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    // dispatch(
    //   uiActions.setLoadingSpinner({
    //     isLoading: false,
    //   })
    // );
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
                  <form>
                    <div className="form-floating">
                      <div className="col-xl-6 col-12">
                        <label
                          htmlFor="fileInput"
                          className="form-label form-label"
                          style={{
                            textTransform: "uppercase",
                          }}
                        >
                          Upload Excel File
                        </label>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="file"
                            id="fileInput"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="separation-div"></div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="companySelect"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          >
                            <option value=""></option>
                            {companies.map((company) => (
                              <option key={company.id} value={company.id}>
                                {company.company_name.toUpperCase()}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="companySelect" className="form-label">
                            COMPANY
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="examPurposeSelect"
                            value={examPurpose}
                            onChange={(event) =>
                              setExamPurpose(event.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="2" style={{
                              textTransform: "uppercase",
                            }}>Periodical</option>
                          </select>
                          <label
                            htmlFor="examPurposeSelect"
                            className="form-label"
                          >
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
                            onChange={(event) =>
                              setCategory(event.target.value)
                            }
                          >
                            <option value=""></option>
                            <option
                              value="Food Handler (COH)"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Food Handler
                            </option>
                            <option
                              value="Pneumoconiosis"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Pneumoconiosis
                            </option>
                            <option
                              value="Pre-Employement"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Pre-Employment
                            </option>
                            <option
                              value="Exit-Pneumoconiosis"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Exit (Pneumoconiosis)
                            </option>
                            <option
                              value="Exit-Employement"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Exit-Employement
                            </option>
                          </select>
                          <label
                            htmlFor="categorySelect"
                            className="form-label"
                          >
                            CATEGORY
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="separation-div"></div>
                    <div className="separation-div"></div>
                    <div className="row">
                      <div className="col-md-6"></div>
                      <div className="col-md-6"></div>
                    </div>

                    {isLoading ? (
                      <Loading />
                    ) : (
                      <SaveButton
                        onClick={saveDataToDatabase}
                        text={"Save To Database"}
                      />
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
              {savedData.map((entry) => (
                <tr key={entry.national_id}>
                  <td>{entry.first_name}</td>
                  <td>{entry.last_name}</td>
                  <td>{entry.national_id}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.phone_number}</td>
                  <td>{entry.date_of_birth}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ color: "green" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default AddAttendeeExecel;
