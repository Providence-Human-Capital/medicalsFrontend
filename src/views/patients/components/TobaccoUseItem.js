import React, { Fragment, useEffect, useState } from "react";

const TobaccoUseItem = ({ tobaccoItem }) => {
  return (
    <Fragment>
      <li>
        <div className="icon bg-danger">
          <img src="/assets/images/smoking.png" alt="" className="mb-3" />
        </div>
        <a className="timeline-panel text-muted" href="#">
          <h4 className="mb-2 mt-1">{tobaccoItem.name}</h4>
          <p className="fs-15 mb-0">
            Do yo Smoke ? : {tobaccoItem.do_smoke === 0 ? "NO" : "YES"}{" "}
          </p>
          {tobaccoItem.do_smoke !== 0 && (
            <p className="fs-15 mb-0">
              How Many Per Day ? : {tobaccoItem.how_many}{" "}
            </p>
          )}
        </a>
      </li>
    </Fragment>
  );
};

export default TobaccoUseItem;


