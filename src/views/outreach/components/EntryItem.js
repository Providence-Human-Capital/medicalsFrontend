import React, { Fragment, useState } from "react";

const EntryItem = ({ user }) => {
  return (
    <Fragment>
      <tr className="hover-primary">
        <td>{ user.swab_number}</td>
        <td>{ user.first_name }</td>
        <td>{ user.last_name }</td>
        <td>{ user.gender }</td>
      </tr>
    </Fragment>
  );
};

export default EntryItem;
