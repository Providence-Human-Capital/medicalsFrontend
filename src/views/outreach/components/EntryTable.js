import React, { Fragment, useState } from "react";
import EntryItem from "./EntryItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { useEffect } from "react";
import { outReachActions } from "../../../redux_store/outreach-store";

const EntryTable = ({ newEntry }) => {
  const dispatch = useDispatch();

  const getLatestEntries = async () => {
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
  };

  useEffect(() => {
    getLatestEntries();
  }, [newEntry]);

  const latestOutReachPatients = useSelector(
    (state) => state.outreach.latestOPatients
  );
  return (
    <Fragment>
      <table className="table border-no mb-4" id="example1">
        <thead>
          <tr>
            <th>Swab #</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {latestOutReachPatients &&
            latestOutReachPatients.map((user) => (
              <EntryItem key={user.id} user={user} />
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default EntryTable;
