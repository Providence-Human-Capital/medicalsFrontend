import React, { Fragment, useEffect, useState } from "react";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../redux_store/company-store";
import CompanyItem from "./CompanyItem";

const CompanyTable = () => {
  const dispatch = useDispatch();

  const allcompanies = useSelector((state) => state.company.companies) || [];

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
  return (
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
            allcompanies.map((company) => (
              <CompanyItem key={company.id} company={company} />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CompanyTable;
