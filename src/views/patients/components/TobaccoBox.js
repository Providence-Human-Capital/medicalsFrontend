import React, { Fragment, useEffect, useState } from "react";
import TobaccoUseItem from "./TobaccoUseItem";

const TobaccoBox = ({ tobacco }) => {
  const styles = {
    smokeImage: {},
  };
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">Tobacco Use Overview</h4>
        </div>
        <div className="box-body">
          <div className="widget-timeline-icon">
            <ul>
              {tobacco &&
                tobacco.map((tobaccoItem) => (
                  <TobaccoUseItem tobaccoItem={tobaccoItem} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TobaccoBox;
