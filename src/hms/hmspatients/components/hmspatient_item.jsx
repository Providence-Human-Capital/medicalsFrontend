import React, { useEffect } from "react";

const HmPatientItem = ({}) => {
  return (
    <>
      <tr role="row" class="odd">
        <td tabindex="0" class="sorting_1">
          PT-0001
        </td>
        <td>
          <img
            src="/assets/images/avatar2.png"
            class="avatar  rounded-circle me-2"
            alt="profile-image"
          />
          <span>Molly </span>
        </td>
        <td>45</td>
        <td>70 Bowman St. South Windsor, CT 06074</td>
        <td>May 13, 2021</td>
        <td class=" dt-body-right">May 16, 2021</td>
        <td style={{}}>
          <div
            class="progress"
            style={{
              height: "3px",
            }}
          >
            <div
              class="progress-bar progress-bar-warning"
              role="progressbar"
              aria-valuenow="40"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{
                width: "40%",
              }}
            >
              {" "}
              <span class="sr-only">40% Complete</span>{" "}
            </div>
          </div>
        </td>
        <td
          class=" dt-body-right"
          style={{
            display: "none",
          }}
        >
          <span class="badge bg-info">Admit</span>
        </td>
      </tr>
    </>
  );
};

export default HmPatientItem;
