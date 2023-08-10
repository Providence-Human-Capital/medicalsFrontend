import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import BatchBox from "./components/BatchBox";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { companiesWithCertificateBatches } from "../../services/api";
import { companyActions } from "../../redux_store/company-store";
import ReactPaginate from "react-paginate";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const CertificatesPage = () => {
  const companies = useSelector((state) => state.company.companiesWithBatches);
  const [companiesWBatches, setCompaniesWBatches] = useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  // Function to handle sort by change
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  // Function to handle sort order change
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Function to search and sort companies
  const searchAndSortCompanies = () => {
    // Filter companies based on search query
    const filteredCompanies = companies.filter((company) =>
      company.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort companies based on sort by and sort order
    const sortedCompanies = filteredCompanies.sort((a, b) => {
      if (sortBy === "created_at") {
        if (sortOrder === "asc") {
          return new Date(a.created_at) - new Date(b.created_at);
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      } else if (sortBy === "company_name") {
        if (sortOrder === "asc") {
          return a.company_name.localeCompare(b.company_name);
        } else {
          return b.company_name.localeCompare(a.company_name);
        }
      } else if (sortBy === "certificate_batches") {
        if (sortOrder === "asc") {
          return a.certificate_batches.length - b.certificate_batches.length;
        } else {
          return b.certificate_batches.length - a.certificate_batches.length;
        }
      }
    });

    return sortedCompanies;
  };

  const sortedAndFilteredCompanies = searchAndSortCompanies();
  const pageCount = Math.ceil(sortedAndFilteredCompanies.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentItems = sortedAndFilteredCompanies.slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    companiesWithCertificateBatches()
      .then((data) => {
        if (data && data.companies) {
          setCompaniesWBatches(data.companies);
          console.log(data.companies);
          dispatch(companyActions.setCompaniesWithBatches(data.companies));
        } else {
          // Handle the case where data is undefined or does not have the companies property
          console.error("Invalid data received:", data);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error fetching companies with batches:", error);
      });
    searchAndSortCompanies();
  }, [searchQuery, sortBy, sortOrder, sortedAndFilteredCompanies]);

  return (
    <>
      <BreadCrumb title={"Certificates"} activeTab={"Certificates"} />
      <section className="content">
        <div className="row">
          <div className="col-12 col-md-6">
            <div class="box">
              <div class="box-body p-0">
                <div class="flexbox align-items-center p-15">
                  <div class="flexbox align-items-center">
                    <div class="custom-control custom-checkbox">
                      <button
                        type="button"
                        class="btn btn-primary btn-round checkbox-toggle"
                      >
                        <FontAwesomeIcon icon={faSort} />
                      </button>
                    </div>

                    <span class="divider-line mx-1"></span>

                    <div class="dropdown d-none d-sm-block">
                      <button
                        class="btn btn-primary  btn-round dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sort by
                      </button>
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => setSortBy("created_at")}
                        >
                          Date Of Creation
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => setSortBy("company_name")}
                        >
                          Company Name
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => setSortBy("certificate_batches")}
                        >
                          Certificate Batches
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="lookup lookup-circle lookup-right">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{
                          height: "40px",
                          width: "300px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {currentItems.map((company, index) => (
            <BatchBox company={company} key={index} />
          ))}
        </div>
        <div
          className="box"
          style={{
            width: "fit-content",
          }}
        >
          <div className="box-body p-0">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CertificatesPage;
