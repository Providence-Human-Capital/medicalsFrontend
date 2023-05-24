import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OutreachItem from "./OutreachItem";

const OutReachTable = () => {
  return (
    <Fragment>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Swab Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Age</th>
            <th>Gender</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {allcompanies &&
            getCurrentPageData().map((company) => (
              <CompanyItem key={company.id} company={company} />
            ))} */}
          <OutreachItem />
          <OutreachItem />
          <OutreachItem />
          <OutreachItem />
        </tbody>
      </table>
    </Fragment>
  );
};

export default OutReachTable;
