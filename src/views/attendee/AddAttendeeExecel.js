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

const AddAttendeeExecel = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [count, setCount] = useState(0);
  const [company, setCompany] = useState("");
  const [examPurpose, setExamPurpose] = useState("");
  const [category, setCategory] = useState("");
  const companies = useSelector((state) => state.company.companies);
  const isLoading = useSelector((state) => state.ui.isLoading);

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
    const transformedData = data.map((row) => ({
      first_name: row["First Name"],
      last_name: row["Last Name"],
      national_id: row["National ID"],
      gender: row["Gender"],
      phone_number: row["Phone Number"].toString(),
      date_of_birth: new Date((row["Date of Birth"] - 25569) * 86400 * 1000)
        .toISOString()
        .slice(0, 10),
      exam_purpose: examPurpose,
      company_id: company,
      category: category,
      x_ray_status: "PENDING",
      country_code: "+263",
      last_x_ray: "N/A",
      employee_number: "",
    }));

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
          dispatch(
            uiActions.setLoadingSpinner({
              isLoading: false,
            })
          );
          savedEntries.push(entry);
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
        // toast.error("There was an error", error);
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
      }
    }

    setSavedData(savedEntries);
  };

  useEffect(() => {
    // dispatch(
    //   uiActions.setLoadingSpinner({
    //     isLoading: false,
    //   })
    // );
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-8 col-12">
          <div className="box">
            <div className="">
              <div className="box-body">
                <div className="container">
                  <h4 className="mb-4">
                    <strong>Add Client Through Excel</strong>
                  </h4>
                  <form>
                    <div className="form-group">
                      <div className="col-xl-6 col-12">
                        <div className="mb-3">
                          <label
                            htmlFor="fileInput"
                            className="form-label form-label"
                          >
                            Upload Excel File
                          </label>
                          <input
                            className="form-control my-upload"
                            type="file"
                            id="fileInput"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="companySelect" className="form-label">
                            Company
                          </label>
                          <select
                            className="form-control my-upload "
                            id="companySelect"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                              <option key={company.id} value={company.id}>
                                {company.company_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="examPurposeSelect"
                            className="form-label"
                          >
                            Exam Purpose
                          </label>
                          <select
                            className="form-control my-upload "
                            id="examPurposeSelect"
                            value={examPurpose}
                            onChange={(event) =>
                              setExamPurpose(event.target.value)
                            }
                          >
                            <option value="">Select Purpose of Exam</option>
                            <option value="1">Pre-Placement</option>
                            <option value="2">Periodical</option>
                            <option value="3">
                              Exit(Employment Termination)
                            </option>
                            <option value="4">
                              Post(Employment Employment Follow Up)
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="categorySelect"
                            className="form-label"
                          >
                            Category
                          </label>
                          <select
                            className="form-control my-upload"
                            id="categorySelect"
                            value={category}
                            onChange={(event) =>
                              setCategory(event.target.value)
                            }
                          >
                            <option value="">Select Category</option>
                            <option value="1">City Of Harare</option>
                            <option value="2">Pneumoconiosis</option>
                            <option value="3">Industry/Security</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                      // <button
                      //   type="button"
                      //   className="btn btn-success"
                      //   onClick={saveDataToDatabase}
                      // >
                      //   SAVE TO DATABASE
                      // </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separation-div"></div>
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
