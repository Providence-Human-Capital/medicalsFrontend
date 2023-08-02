import React from "react";

const DueMedicalsBox = () => {
  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <h4
            className="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Clients Due for Medicals
          </h4>
        </div>
        <div className="box-body pt-0">
          <div></div>
          <div className="row mt-25"></div>
        </div>
      </div>
    </>
  );
};

export default DueMedicalsBox;
