import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import OutreachItem from "./OutreachItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { outReachActions } from "../../../redux_store/outreach-store";
import EmptyTable from "../../../components/EmptyTable";

const OutReachTable = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("swab_number");
  const [isSortAscending, setIsSortAscending] = useState(true);

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

  const sortPatients = (column) => {
    if (sortColumn === column) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortColumn(column);
      setIsSortAscending(true);
    }
  };

  const sortedPatients =
    orPatients &&
    [...orPatients].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (isSortAscending) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const filteredPatients = sortedPatients.filter((patient) => {
    const regex = new RegExp(searchTerm, "gi");
    return (
      patient.swab_number.toString().match(regex) ||
      patient.first_name.match(regex) ||
      patient.last_name.match(regex)
    );
  });

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPatients.slice(startIndex, endIndex);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(0);
  };

  return (
    <>
      {orPatients.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <form className="form-inline custom-size">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="search-input"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by swab number, first name, or last name"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
          <table className="table border-no table-spacing" id="example1">
            <thead>
              <tr>
                <th>ID</th>
                <th
                  onClick={() => sortPatients("swab_number")}
                  className="pointer-style"
                >
                  Swab Number
                </th>
                <th
                  onClick={() => sortPatients("first_name")}
                  className="pointer-style"
                >
                  First Name
                </th>
                <th
                  onClick={() => sortPatients("last_name")}
                  className="pointer-style"
                >
                  Last Name
                </th>
                <th
                  onClick={() => sortPatients("company")}
                  className="pointer-style"
                >
                  Company
                </th>
                <th>Age</th>
                <th>Gender</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients &&
                getCurrentPageData().map((patient) => (
                  <OutreachItem key={patient.id} patient={patient} />
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
              pageCount={Math.ceil(sortedPatients.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(sortedPatients) => {
                setPageNumber(sortedPatients.selected);
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

export default OutReachTable;
