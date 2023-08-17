import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../config";
import Loading from "./loader/Loading";
import { patientActions } from "../redux_store/patients-store";
const AdvancedSearchBox = () => {
  const companies = useSelector((state) => state.company.companies);
  const [searchLoading, setSearchLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [purpose, setPurpose] = useState("");

  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleSearchResults = async () => {
    const searchData = {
      status,
      searchText,
      category,
      company,
      purpose,
    };

    console.log(searchData);

    try {
      setSearchLoading(true);
      const response = await axios.get(`${API}/advanced/search`, {
        params: searchData,
      });

      console.log(response.data);
      if (response.status === 200) {
        dispatch(
          patientActions.setSearchResult({
            searchResults: response.data,
          })
        );
        setSearchLoading(false);
      }
    } catch (error) {
      console.error(error);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    setSearchLoading(false);
  }, []);

  return (
    <div className="mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="box p-3  py-4">
            <h4
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              An Easier way to find a Client
            </h4>
            <div className="row g-3 mt-2">
              <div className="col-md-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="">ANY STATUS</option>
                    <option value="PENDING">PENDING</option>
                    <option value="READY">READY</option>
                    <option value="MONITORING">MONITORING</option>
                    <option value="FAILED">FAILED</option>
                    <option value="RELEASED">RELEASED</option>
                  </select>
                  <label>SELECT STATUS</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name or Last Name or National ID"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                  <label>Enter First Name or Last Name or National ID</label>
                </div>
              </div>
              <div className="col-md-3">
                {searchLoading ? (
                  <Loading />
                ) : (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleSearchResults}
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: "20px",
                    }}
                  >
                    Search Results
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
                Advance Search With Filters <i className="fa fa-angle-down"></i>
              </a>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          <option value="">Select Category</option>
                          <option value="City Of Harare">City Of Harare</option>
                          <option value="Local">Local</option>
                          <option value="Pneumoconiosis">Pneumoconiosis</option>
                          <option value="Industry">Industry</option>
                        </select>
                        <label>SELECT CATEGORY</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          value={company}
                          onChange={handleCompanyChange}
                        >
                          <option value="">Select Company</option>
                          {companies.map((company) => (
                            <option
                              key={company.id}
                              value={company.company_name}
                            >
                              {company.company_name}
                            </option>
                          ))}
                        </select>
                        <label>SELECT COMPANY</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          value={purpose}
                          onChange={handlePurposeChange}
                        >
                          <option value="">Select Purpose of Exam</option>
                          <option value="Pre-Placement">Pre-Placement</option>
                          <option value="Periodical">Periodical</option>
                          <option value="Exit(Employment Termination)">
                            Exit(Employment Termination)
                          </option>
                          <option value="Post(Employment Employment Follow Up)">
                            Post(Employment Employment Follow Up)
                          </option>
                        </select>
                        <label>SELECT EXAM PURPOSE</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdvancedSearchBox;
