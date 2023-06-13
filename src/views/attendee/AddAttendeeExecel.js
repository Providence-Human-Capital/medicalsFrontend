import React, { Fragment, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const AddAttendeeExecel = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(0);
  const [company, setCompany] = useState("");
  const [examPurpose, setExamPurpose] = useState("");
  const companies = useSelector((state) => state.company.companies);
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
    const transformedData = filteredData.map((row) => ({
      first_name: row["First Name"],
      last_name: row["Last Name"],
      national_id: row["National ID"],
      gender: row["Gender"],
      phone_number: row["Phone Number"],
      date_of_birth: row["Date of Birth"],
      exam_purpose: examPurpose,
      company_id: company,
    }));

    for (const entry of transformedData) {
      try {
        const response = await axios.post("YOUR_API_ENDPOINT", entry);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h3 className="text-center mb-4">
                    Excel Uploader and Search{" "}
                  </h3>
                  <form>
                    <div className="form-group">
                      <div className="col-xl-6 col-12">
                        <div class="mb-3">
                          <label htmlFor="fileInput" class="form-label">
                            Upload Excel File
                          </label>
                          <input
                            class="form-control"
                            type="file"
                            id="fileInput"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="companySelect">Company</label>
                          <select
                            className="form-control"
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="examPurposeSelect">
                            Exam Purpose
                          </label>
                          <select
                            className="form-control"
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
                    </div>

                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={saveDataToDatabase}
                    >
                      Save To Database
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separation-div"></div>
    </Fragment>
  );
};
export default AddAttendeeExecel;
