import React, { Fragment, useState } from "react";
import EntryItem from "./EntryItem";

const EntryTable = () => {
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
            <EntryItem />
            <EntryItem />
            <EntryItem />
        </tbody>
      </table>
    </Fragment>
  );
};

export default EntryTable;
