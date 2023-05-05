import React, { Fragment } from "react";

const DiseaseHistory = () => {
  return (
    <Fragment>
      <div className="box">
        <div className="box-header border-0 pb-0">
          <h4 className="box-title">Disease History</h4>
        </div>
        <div className="box-body">
          <div className="widget-timeline-icon">
            <ul>
              <li>
                <div className="icon bg-primary fa fa-heart-o"></div>
                <a className="timeline-panel text-muted" href="#">
                  <h4 className="mb-2 mt-1">Diabetes</h4>
                  <p className="fs-15 mb-0">mon, 18 Mar 2021, 11:15 AM</p>
                </a>
              </li>
              <li>
                <div className="icon bg-primary fa fa-heart-o"></div>
                <a className="timeline-panel text-muted" href="#">
                  <h4 className="mb-2 mt-1">Sleep Problem</h4>
                  <p className="fs-15 mb-0">Tue, 21 Jun 2020, 03:22 PM</p>
                </a>
              </li>
              <li>
                <div className="icon bg-primary fa fa-heart-o"></div>
                <a className="timeline-panel text-muted" href="#">
                  <h4 className="mb-2 mt-1">Dental Care</h4>
                  <p className="fs-15 mb-0">Wed, 15 Mar 2020, 02:11 PM</p>
                </a>
              </li>
              <li>
                <div className="icon bg-primary fa fa-heart-o"></div>
                <a className="timeline-panel text-muted" href="#">
                  <h4 className="mb-2 mt-1">Diabetes</h4>
                  <p className="fs-15 mb-0">Sun, 11 Jan 2020, 12:24 PM</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DiseaseHistory;
