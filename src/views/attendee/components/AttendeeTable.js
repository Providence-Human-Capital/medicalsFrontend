import React, { Fragment, useEffect, useState } from "react";
import AttendeeItem from "./AttendeeItem";
import { API } from "../../../config";

const AttendeeTable = () => {
  const [attendees, setAttendees] = useState([]);

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
  };

  useEffect(() => {
    getAttendees();
  }, []);

  return (
    <Fragment>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th>Patient ID</th>
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
          {attendees &&
            attendees.map((attendee) => (
              <AttendeeItem key={attendee.id} attendee={attendee} />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default AttendeeTable;
