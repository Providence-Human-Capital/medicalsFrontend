import React from "react";

function PlaceHolderBox({ title, tag }) {
  return (
    <div className="col-md-12">
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">
            <strong>{title}</strong>
          </h4>
        </div>
        <div className="box-body">
          <h5 className="fw-500">
            <span className="fw-200 badge badge-info">{tag}</span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default PlaceHolderBox;
