import React, { Fragment, useEffect, useState } from "react";
import AttendeeItem from "./AttendeeItem";
import { API } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { attendeeActions } from "../../../redux_store/attendee-store";
import ReactPaginate from "react-paginate";
import EmptyTable from "../../../components/EmptyTable";
import SearchBox from "../../../components/SearchBox";

const AttendeeTable = () => {
  const [attendees, setAttendees] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [isSortAscending, setIsSortAscending] = useState(true);

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

  const sortAttendees = (column) => {
    if (sortColumn === column) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortColumn(column);
      setIsSortAscending(true);
    }
  };

  const sortedAttendees =
    allAttendees &&
    [...allAttendees].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (isSortAscending) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const filteredAttendees = sortedAttendees.filter((attendee) => {
    const regex = new RegExp(searchTerm, "gi");
    return (
      (attendee.swab_number && attendee.swab_number.toString().match(regex)) ||
      attendee.first_name.match(regex) ||
      attendee.last_name.match(regex) ||
      attendee.x_ray_status.match(regex) ||
      attendee.company.company_name.match(regex) ||
      (attendee.age && attendee.age.toString().match(regex))
    );
  });

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAttendees.slice(startIndex, endIndex);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(0);
  };

  useEffect(() => {
    getAttendees();
  }, []);

  return (
    <>
      {allAttendees.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <SearchBox
            placeholderText={"Search by swab number, first name, or last name"}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th
                  onClick={() => sortAttendees("id")}
                  className="pointer-style"
                >
                  ID
                </th>
                <th
                  onClick={() => sortAttendees("swab_number")}
                  className="pointer-style"
                >
                  Swab Number
                </th>
                <th
                  onClick={() => sortAttendees("company.company_name")}
                  className="pointer-style"
                >
                  Company Name
                </th>
                <th
                  onClick={() => sortAttendees("first_name")}
                  className="pointer-style"
                >
                  First Name
                </th>
                <th
                  onClick={() => sortAttendees("last_name")}
                  className="pointer-style"
                >
                  Last Name
                </th>
                <th
                  onClick={() => sortAttendees("x_ray_status")}
                  className="pointer-style"
                >
                  Xray Status
                </th>
                <th>Check In Time</th>
                <th
                  onClick={() => sortAttendees("age")}
                  className="pointer-style"
                >
                  Age
                </th>
                <th>Gender</th>
                <th>National ID</th>
                <th>Location</th>
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
          <div className="table-spacing"></div>
          <div className="paginate-position">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(sortedAttendees.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(sortedAttendees) => {
                setPageNumber(sortedAttendees.selected);
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

export default AttendeeTable;
