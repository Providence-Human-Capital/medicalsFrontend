import React, { Fragment, useEffect, useState } from "react";

const DiseaseItem = ({ illness }) => {
  return (
    <Fragment>
        
      <li className="mb-2">
        <div className="icon bg-primary fa fa-heart-o"></div>
        <a className="timeline-panel text-muted" href="#">
          <h4 className="mb-2 mt-1">{illness.name}</h4>
          <p className="fs-15 mb-0">
            Treated for this illness? :{" "}
            <span className="fw-800">   {illness.has_illness === 0 ? "NO" : "YES"}</span>
          
          </p>
          {illness.has_illness !== 0 && (
            <p className="fs-15 mb-0">
              Year of Treatment? : {illness.treatment_year}
            </p>
          )}
        </a>
      </li>
    </Fragment>
  );
};

export default DiseaseItem;
