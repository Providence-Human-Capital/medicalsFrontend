import React, { Fragment, useEffect, useState } from "react";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../redux_store/company-store";
import CompanyItem from "./CompanyItem";
import ReactPaginate from "react-paginate";
import EmptyTable from "../../../components/EmptyTable";

const CompanyTable = () => {
  const dispatch = useDispatch();
  const allcompanies = useSelector((state) => state.company.companies) || [];

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const getCompanies = async () => {
    const companiesResponse = await fetch(`${API}/company`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await companiesResponse.json();

    const companies = responseData.data;

    dispatch(
      companyActions.setCompanies({
        companies: [...companies],
      })
    );
  };

  useEffect(() => {
    getCompanies();
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allcompanies.slice(startIndex, endIndex);
  }

  return (
    <>
      {allcompanies.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Site Telephone</th>
                <th>Company Email</th>
                <th>Contact Person</th>
                <th>Province</th>
                <th>Designation</th>
                <th>Contact Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allcompanies &&
                getCurrentPageData().map((company, index) => (
                  <CompanyItem
                    key={company.id}
                    company={company}
                    index={index}
                  />
                ))}
            </tbody>
          </table>
          <div className="table-spacing"></div>
          <div className="paginate-position">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(allcompanies.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(allcompanies) => {
                setPageNumber(allcompanies.selected);
              }}
              containerClassName={"pagination"}
              activeClassName={"active-paginate"}
            />
          </div>
        </Fragment>
      )}
    </>
  );
};

export default CompanyTable;
