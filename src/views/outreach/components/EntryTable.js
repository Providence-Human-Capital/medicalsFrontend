import React, { Fragment, useState } from "react";
import EntryItem from "./EntryItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { useEffect } from "react";
import { outReachActions } from "../../../redux_store/outreach-store";

const EntryTable = () => {
  const dispatch = useDispatch();
  const [sortColumn, setSortColumn] = useState("swab_number");
  const [isSortAscending, setIsSortAscending] = useState(true);

  const entry = useSelector((state) => state.outreach.newEntry);

  const getLatestEntries = async () => {
    try {
      const outreachResponse = await fetch(`${API}/latest/outreach`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseData = await outreachResponse.json();
      console.log("Latest", responseData.data);

      dispatch(
        outReachActions.setLatestPatients({
          latestOPatients: [...responseData.data],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(
        outReachActions.setNewEntry({
          newEntry: false,
        })
      );
    }
  };

  useEffect(() => {
    if (entry) {
      getLatestEntries();
    }
  }, [entry]);

  const latestOutReachPatients = useSelector(
    (state) => state.outreach.latestOPatients
  );

  const sortPatients = (column) => {
    if (sortColumn === column) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortColumn(column);
      setIsSortAscending(true);
    }
  };

  const sortedPatients =
    latestOutReachPatients &&
    [...latestOutReachPatients].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (isSortAscending) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <Fragment>
      <table className="table border-no mb-4" id="example1">
        <thead>
          <tr>
            <th
              onClick={() => sortPatients("swab_number")}
              className="pointer-style"
            >
              Swab #
            </th>
            <th
              onClick={() => sortPatients("first_name")}
              className="pointer-style"
            >
              Name
            </th>
            <th
              onClick={() => sortPatients("last_name")}
              className="pointer-style"
            >
              Surname
            </th>
            <th
              onClick={() => sortPatients("gender")}
              className="pointer-style"
            >
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients &&
            sortedPatients.map((user) => (
              <EntryItem key={user.id} user={user} />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default EntryTable;
