import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AsideNav = ({}) => {
  const styles = {
    pageHeight: {
      height: "100%",
    },

    color: {
      backgroundColor: "#58AD46",
      color: "#FFF",
    },

    textColor: {
      color: "#58AD46",
    },
  };

  return (
    <Fragment>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="help-bt">
            <Link href="tel:108" className="d-flex align-items-center">
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.color}
              >
                <i data-feather="mic"></i>
              </div>
              <h4 className="mb-0">
                Emergency
                <br />
                help
              </h4>
            </Link>
          </div>
          <div className="multinav">
            <div className="multinav-scroll" style={styles.pageHeight}>
              {/* <!-- sidebar menu--> */}
              <ul className="sidebar-menu" data-widget="tree">
                <li className="treeview">
                  <Link to={"/"}>
                    <i data-feather="monitor"></i>
                    <span>Dashboard</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to={"/attendees"}>
                    <i data-feather="users"></i>
                    <span>Attendees</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/patients"}>
                    <i data-feather="users"></i>
                    <span>Patients</span>
                  </Link>
                </li>

                <li>
                  <Link to={"/companies"}>
                    <i data-feather="users"></i>
                    <span>Companies</span>
                  </Link>
                </li>

                <li>
                  <Link to={"/"}>
                    <i data-feather="package"></i>
                    <span>Certificates</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/"}>
                    <i data-feather="calendar"></i>
                    <span>Appointments</span>
                  </Link>
                </li>
              </ul>

              <div className="sidebar-widgets">
                <div className="mx-25 mb-30 pb-20 side-bx bg-primary-light rounded20">
                  <div className="text-center">
                    <img
                      src="https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/color-svg/custom-17.svg"
                      className="sideimg p-5"
                      alt=""
                    />
                    <h4
                      className="title-bx text-primary"
                      style={styles.textColor}
                    >
                      Make an Appointments
                    </h4>
                    <a
                      className="py-10 fs-14 mb-0 text-primary"
                      style={styles.textColor}
                    >
                      Best Helth Care here{" "}
                      <i className="mdi mdi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="copyright text-center m-25">
                  <p>
                    <strong className="d-block">Providence Medicals</strong> ©
                    <script>document.write(new Date().getFullYear());</script>
                    All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </Fragment>
  );
};

export default AsideNav;
