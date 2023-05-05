import React, { Fragment } from "react";

const SmokingAnalysisCard = () => {
  const styles = {
    width80: {
      width: "80%",
    },
    width24: {
      width: "24%",
    },
    width31: {
      width: "31%",
    },
    width57: {
      width: "45%",
    },
  };
  return (
    <Fragment>
      <div className="box">
        <div className="box-header">
          <h4 className="box-title">Tobacco Use Analysis</h4>
        </div>
        <div className="box-body">
          <div className="mb-30">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>80 %</h5>
              <h5>Cigarretes</h5>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar progress-bar-primary"
                role="progressbar"
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
                style={styles.width80}
              ></div>
            </div>
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>24 %</h5>
              <h5>Snuff</h5>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
                style={styles.width24}
              ></div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>57 %</h5>
              <h5>0ther</h5>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar progress-bar-warning"
                role="progressbar"
                aria-valuenow="72"
                aria-valuemin="0"
                aria-valuemax="100"
                style={styles.width57}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmokingAnalysisCard;
