import React, { Fragment, useState } from "react";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { companyActions } from "../../../redux_store/company-store";
import CompanyItem from "./CompanyItem";
import ReactPaginate from "react-paginate";
import EmptyTable from "../../../components/EmptyTable";

const CompanyTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await fetch(`${API}/company`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      return responseData.data;
    },
    onSuccess: (data) => {
      dispatch(companyActions.setCompanies({ companies: data }));
    },
  });

  const allcompanies = data || [];

  const getCurrentPageData = () => {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allcompanies.slice(startIndex, endIndex);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {allcompanies.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className="bb-2">ID</th>
                  <th className="bb-2">Company Name</th>
                  <th className="bb-2">Address</th>
                  <th className="bb-2">Site Telephone</th>
                  <th className="bb-2">Company Email</th>
                  <th className="bb-2">Contact Person</th>
                  <th className="bb-2">Province</th>
                  <th className="bb-2">Designation</th>
                  <th className="bb-2">Contact Number</th>
                  <th className="bb-2"></th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((company, index) => (
                  <CompanyItem
                    key={company.id}
                    company={company}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

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
              onPageChange={(data) => {
                setPageNumber(data.selected);
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