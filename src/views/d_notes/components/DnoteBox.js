import React from "react";
import { Link } from "react-router-dom";

const DnoteBox = ({ dnote }) => {
  return (
    <>
      <div class="col-12 col-xl-4">
        <div class="box">
          <div class="box-header with-border">
            <Link
              to={`/dnote/certificate/update/${dnote.id}/${dnote.name}`}
            >
              <h4 class="box-title">
                <strong>{dnote.name}</strong>
              </h4>
            </Link>

            <br />
            <span className="fw-500">
              <i className="fa fa-clock-o"></i> Dispatched Date:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                12 June 2023
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DnoteBox;

// /dnote/certificate/update/:dnoteId/:dnoteName
