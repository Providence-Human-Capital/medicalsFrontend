import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { certificateActions } from "../../../redux_store/certificates-store";
import Loading from "../../../components/loader/Loading";

const DnoteAdvanceSearch = () => {
  const companies = useSelector((state) => state.company.companies);
  const [isSearching, setIsSearching] = useState(false);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    // Send the search parameters to the backend
    // You can use an AJAX request or your preferred method

    // Example using fetch API
    const requestData = {
      company,
      name,
      type,
      startDate,
      endDate,
    };

    console.log("Response: " + JSON.stringify(requestData));
    setIsSearching(true);
    fetch(`${API}/dnotes/advanced/search`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the search results
        console.log("Search results", data);
        dispatch(certificateActions.setAllDnotes([...data.dnotes]));
        setIsSearching(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    setIsSearching(false)
  }, [])

  return (
    <>
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
                D NOTE SEARCH BOX
              </h4>
              <div className="row g-3 mt-2">
                <div className="col-md-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      value={company}
                      onChange={handleCompanyChange}
                    >
                      <option value="">ANY COMPANY</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                    <label>SELECT COMPANY FOR D NOTE</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name or Last Name or National ID"
                      value={name}
                      onChange={handleNameChange}
                    />
                    <label>SEARCH BY NAME</label>
                  </div>
                </div>
                <div className="col-md-3">
                  {!isSearching ? (
                    <button
                      className="btn btn-primary-light me-4"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        borderRadius: "10px",
                      }}
                      onClick={handleSearch}
                    >
                      Search Results
                    </button>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <a
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseExample"
                  className="advanced"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Advance Search With Filters{" "}
                  <i className="fa fa-angle-down"></i>
                </a>
                <div className="collapse" id="collapseExample">
                  <div className="card card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            value={type}
                            onChange={handleTypeChange}
                          >
                            <option value="">SELECT TYPE</option>
                            <option value="City Of Harare">
                              City Of Harare
                            </option>
                            <option value="Simbisa">Simbisa Brands</option>
                            <option value="Texas">Texas</option>
                          </select>
                          <label>SELECT TYPE</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="date"
                                className="form-control"
                                id="start_date"
                                value={startDate}
                                onChange={handleStartDateChange}
                              />
                              <label htmlFor="start_date">STARTING DATE</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="date"
                                className="form-control"
                                id="end_date"
                                value={endDate}
                                onChange={handleEndDateChange}
                              />
                              <label htmlFor="end_date">STARTING DATE</label>
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
        </div>
      </div>
    </>
  );
};

export default DnoteAdvanceSearch;
