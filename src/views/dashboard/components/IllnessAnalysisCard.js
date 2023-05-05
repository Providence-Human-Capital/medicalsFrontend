import React, { Fragment } from "react";

const IllnessAnalysisCard = () => {
  const styles = {
    width80: {
      width: "80%",
    },
    width24: {
      width: "24%",
    },
    width31: {
      width: "31%"
    },
    width57: {
      width: "45%"
    }
  };
  return (
    <Fragment>
      <div className="box">
        <div className="box-header">
          <h4 className="box-title">Illness Analysis</h4>
        </div>
        <div className="box-body">
          <div className="mb-30">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>80 %</h5>
              <h5>Cold</h5>
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
          <div className="mb-30">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>24 %</h5>
              <h5>Fracture</h5>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
                aria-valuenow="24"
                aria-valuemin="0"
                aria-valuemax="100"
                style={styles.width24}
              ></div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>91 %</h5>
              <h5>Ache</h5>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow="91"
                aria-valuemin="0"
                aria-valuemax="100"
                style={styles.width31}
              ></div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5>50 %</h5>
              <h5>Hematoma</h5>
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
              <h5>72 %</h5>
              <h5>Caries</h5>
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

export default IllnessAnalysisCard;
