import React, { Fragment, useEffect, useState } from "react";
import AttendeeItem from "./AttendeeItem";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { attendeeActions } from "../../../redux_store/attendee-store";
import ReactPaginate from "react-paginate";

const AttendeeTable = () => {
  const [attendees, setAttendees] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const allAttendees = useSelector((state) => state.attendee.attendees) || [];

  const getAttendees = async () => {
    const attendeesResponse = await fetch(`${API}/attendee`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await attendeesResponse.json();
    setAttendees(responseData.data);
    const attendees = responseData.data;
    dispatch(
      attendeeActions.setAttendees({
        attendees: [...attendees],
      })
    );
  };

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allAttendees.slice(startIndex, endIndex);
  }

  useEffect(() => {
    getAttendees();
  }, []);

  return (
    <Fragment>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Swab Number</th>
            <th>Company Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Xray Status</th>
            <th>Check In Time</th>
            <th>Age</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allAttendees &&
            getCurrentPageData().map((attendee) => (
              <AttendeeItem key={attendee.id} attendee={attendee} />
            ))}
        </tbody>
      </table>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(allAttendees.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(allAttendees) => {
            setPageNumber(allAttendees.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </Fragment>
  );
};

export default AttendeeTable;
