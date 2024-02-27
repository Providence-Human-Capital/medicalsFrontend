import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/BreadCrumb";
import { API } from "../../config";
import axios from "axios";
import Loading from "../../components/loader/Loading";
import * as XLSX from "xlsx";

const Swab = () => {
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [swabPeople, setSwabPeople] = useState([]);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    company: "",
    status: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true); // Assuming setIsLoading is a state update function

    // Assuming filters is defined and contains necessary data
    axios
      .post(`${API}/swab/list/generate`, filters)
      .then((response) => {
        // Handle successful response
        console.log(response.data); // Log the response data or perform other actions
        setSwabPeople(response.data.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        // This block will execute regardless of success or failure
        setIsLoading(false); // Reset isLoading state
      });
  };

  const flattenedSwabList = (swabPeople) => {
    return swabPeople.map((item) => {
      const flattItem = {
        "SWAB NUMBER": "",
        "FIRST NAME": item.attendee.first_name,
        SURNAME: item.attendee.last_name,
      };

      return flattItem;
    });
  };
  const swabData = flattenedSwabList(swabPeople);
  const convertJsonToExcel = (flatData) => {
    const ws = XLSX.utils.json_to_sheet(flatData);
    const columnWidths = [];
    Object.keys(flatData[0]).forEach((key) => {
      columnWidths.push({ wch: 20 }); // You can adjust the width as needed
    });
    ws["!cols"] = columnWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "Report.xlsx";
    saveAs(blob, fileName);
  };

  const saveAs = (blob, fileName) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleDownloadExcel = () => {
    convertJsonToExcel(swabData);
  };

  return (
    <>
      <BreadCrumb
        title={"SWAB MANAGEMENT"}
        activeTab={"GENERATING SWAB LIST"}
      />
      <div className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="box p-3  py-4">
              <h4
                style={{
                  fontWeight: "bold",
                }}
              >
                GENERATE A SWAB REGISTER
              </h4>
              <div className="row">
                {/* Filter form here */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                          name="start_date"
                          value={filters.start_date}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="start_date">Start Date:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                          name="end_date"
                          value={filters.end_date}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="end_date">End Date:</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="company"
                          name="company"
                          value={filters.company}
                          onChange={handleInputChange}
                        >
                          <option value="">SELECT A COMPANY</option>
                          {/* Populate options with company data */}
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.company_name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="company">Company:</label>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="status"
                          name="status"
                          value={filters.status}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Status</option>
                          <option value="PENDING">PENDING</option>
                          <option value="DONE">DONE</option>
                        </select>
                        <label htmlFor="status">SWAB STATUS:</label>
                      </div>
                    </div> */}
                  </div>
                  <div className="separation-div"></div>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Apply Filters
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* {JSON.stringify(swabPeople)} */}

        <div className="col-md-8">
          <div className="box">
            <div className="row">
              <div className="col-md-9">
                <div className="box-header no-border">
                  <h4 className="box-title">
                    GENERATED RESULTS: - {"  "}
                    <span className="badge badge-pill badge-warning">
                      {swabPeople.length}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    margin: "2rem",
                  }}
                >
                  <button
                    className="cssbuttons-io-button"
                    style={{
                      width: "fit-content",
                      borderRadius: "10px",
                    }}
                    onClick={handleDownloadExcel}
                  >
                    DOWNLOAD CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="box-body pt-0">
              <div className="row mt-25">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">Swab Number</th>
                        <th className="bb-2">First Name</th>
                        <th className="bb-2">Last Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {swabPeople &&
                        swabPeople.map((client, index) => (
                          <tr key={client.id}>
                            <td></td>
                            <td>{client.attendee.first_name}</td>
                            <td>{client.attendee.last_name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swab;
