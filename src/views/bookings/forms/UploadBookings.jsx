import React, { Fragment, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import * as XLSX from "xlsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import { uiActions } from "../../../redux_store/ui-store";
import SaveButton from "../../../components/buttons/SaveButton";
import Loading from "../../../components/loader/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { value: "Food Handler (COH)", label: "Food Handler" },
  { value: "Pneumoconiosis", label: "Pneumoconiosis" },
  { value: "Pre-Employement", label: "Pre-Employment" },
  { value: "Exit-Pneumoconiosis", label: "Exit (Pneumoconiosis)" },
  { value: "Exit-Employement", label: "Exit-Employement" },
];

const UploadBookings = () => {
  const [data, setData] = useState([]);
  const companies = useSelector((state) => state.company.companies);
  const [company, setCompany] = useState("");
  const [examPurpose, setExamPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [patientsAdded, setPatientsAdded] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [bookingDate, setBookingDate] = useState("");

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
  const saveDataToDatabase = async () => {
    console.log("Data", data);
    const transformedData = data.map((row) => {
      const dateOfBirthTimestamp =
        row["Date of Birth"] !== undefined
          ? (row["Date of Birth"] - 25569) * 86400 * 1000
          : null;

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
        x_ray_status: "PENDING", // default in the DB
        country_code: "+263", // default in the DB
        last_x_ray: "N/A", // default in the DB
        employee_number: "",
        booking_date: bookingDate, // Make sure this value is set in your state
      };
    });

    const savedEntries = [];

    for (const entry of transformedData) {
      console.log("Entry", entry);
      try {
        dispatch(uiActions.setLoadingSpinner({ isLoading: true }));

        const response = await fetch(`${API}/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entry),
        });
        const data = await response.json();
        console.log("New entry", data);

        if (response.status === 200 || response.status === 201) {
          setPatientsAdded((prevCount) => prevCount + 1);
          savedEntries.push(entry);
          setSavedData(savedEntries);
          dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
        } else if (response.status === 400) {
          toast.error(data.error);
          dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Record might exist in the system / Duplicate National ID",
          error
        );
        dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
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
                <h3
                  className="box-title"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Upload Bookings
                </h3>
              </div>
              <div className="box-body">
                <form>
                  <div className="form-floating">
                    <div className="col-xl-4 col-12">
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
                          <option
                            value="2"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            Periodical
                          </option>
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
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <option value=""></option>
                          {categories.map((categoryOption) => (
                            <option
                              key={categoryOption.value}
                              value={categoryOption.value}
                              style={{ textTransform: "uppercase" }}
                            >
                              {categoryOption.label}
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
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="bookingDate"
                          value={bookingDate}
                          onChange={(event) =>
                            setBookingDate(event.target.value)
                          }
                        />
                        <label htmlFor="bookingDate" className="form-label">
                          BOOKING DATE
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="separation-div"
                    style={{
                      marginBottom: "40px",
                    }}
                  ></div>

                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={saveDataToDatabase}
                    >
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
      <section className="content">
        <div className="card ">
          <div className="card-body">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadBookings;
