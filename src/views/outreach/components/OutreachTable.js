import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OutreachItem from "./OutreachItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { outReachActions } from "../../../redux_store/outreach-store";

const OutReachTable = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  const getAllOutreachPatients = async () => {
    const orResponse = await fetch(`${API}/outreach`, {
      method: "GET",
      headers: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });

    const responseData = await orResponse.json();

    dispatch(
      outReachActions.setOutReachPatients({
        outreachPatients: [...responseData.data],
      })
    );
  };

  useEffect(() => {
    getAllOutreachPatients();
  }, []);

  const orPatients = useSelector((state) => state.outreach.outreachPatients);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orPatients.slice(startIndex, endIndex);
  }

  return (
    <Fragment>
      <table className="table border-no table-spacing" id="example1">
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
          {orPatients &&
            getCurrentPageData().map((patient) => (
              <OutreachItem key={patient.id} patient={patient} />
            ))}
        </tbody>
      </table>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(orPatients.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(orPatients) => {
            setPageNumber(orPatients.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </Fragment>
  );
};

export default OutReachTable;
