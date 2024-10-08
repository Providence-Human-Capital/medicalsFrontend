import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

const AsideNav = ({}) => {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState("dashboard");
  const user = useSelector((state) => state.auth.user);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/register";
  const styles = {
    pageHeight: {
      height: "100%",
    },

    color: {
      backgroundColor: "#58AD46",
      color: "#FFF",
    },

    bookingsColor: {
      backgroundColor: "#DD5540",
      color: "#FFF",
    },

    textColor: {
      color: "#58AD46",
    },
  };

  if (hideSidebar) {
    return null; // Don't render the sidebar
  }

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
                <i
                  className="ti-microphone"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h4 className="mb-0">
                Emergency
                <br />
              </h4>
            </Link>
          </div>
          {/* { user && user.type === "medicals" && (

          )} */}
          {/* /patients/add */}
          <div className="help-bt">
            <Link
              to={
                user.type === "medicals" ? "/attendees/add" : "/hms/add/patient"
              }
              className="d-flex align-items-center"
            >
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.color}
              >
                <i
                  className="fa fa-user-o"
                  aria-hidden="true"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h4
                className="mb-0"
                style={{
                  textTransform: "uppercase",
                  transition: "color 0.3s", // Adding transition for a smooth effect
                  ":hover": {
                    color: "green",
                  },
                }}
              >
                Add New Patient
              </h4>
            </Link>
          </div>
          <div className="help-bt">
            <Link to={"/add/booking"} className="d-flex align-items-center">
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.bookingsColor}
              >
                <i
                  className="fa fa-plus"
                  aria-hidden="true"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h4
                className="mb-0"
                style={{
                  textTransform: "uppercase",
                  transition: "color 0.3s", // Adding transition for a smooth effect
                  ":hover": {
                    color: "green",
                  },
                }}
              >
                ADD SINGLE BOOKING
              </h4>
            </Link>
          </div>
          <div className="help-bt">
            <Link
              to={"/attendees/add/excel"}
              className="d-flex align-items-center"
            >
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.color}
              >
                <p
                  style={{
                    marginTop: "-4px",
                  }}
                >
                  <i
                    className="fa fa-file-excel-o"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </p>
              </div>
              <h4
                className="mb-0"
                style={{
                  textTransform: "uppercase",
                  transition: "color 0.3s", // Adding transition for a smooth effect
                  ":hover": {
                    color: "green",
                  },
                }}
              >
                BULK PATIENT UPLOAD
              </h4>
            </Link>
          </div>

          <div className="help-bt">
            <Link to={"/booking"} className="d-flex align-items-center">
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.bookingsColor}
              >
                <p
                  style={{
                    marginTop: "-4px",
                  }}
                >
                  <i
                    className="fa fa-user-plus"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </p>
              </div>
              <h4
                className="mb-0"
                style={{
                  textTransform: "uppercase",
                  transition: "color 0.3s", // Adding transition for a smooth effect
                  ":hover": {
                    color: "green",
                  },
                }}
              >
                BOOKINGS
              </h4>
            </Link>
          </div>
          <div
            className="multinav"
            style={{
              overflowY: "scroll",
              height: "100vh",
              overflowX: "hidden",
            }}
          >
            <div className="multinav-scroll" style={styles.pageHeight}>
              {/* <!-- sidebar menu--> */}

              {user && user.type === "medicals" && (
                <ul className="sidebar-menu" data-widget="tree">
                  <li id="aside-bar">
                    <NavLink to={"/dashboard"}>
                      <i
                        className="ti-pie-chart"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Dashboard</span>
                    </NavLink>
                  </li>

                  {user && user.role_id === 6 && (
                    <li className="treeview">
                      <a
                        className="mb-1"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i
                          className="ti-view-grid"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Admin Operations</span>
                        <span className="pull-right-container">
                          <i className="ti-arrow-circle-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/companies"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Companies
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/illnesses"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Illnesses (Food Handlers)
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/diseases"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Diseases (Natpak)
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/skin/conditions"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Skin Conditions
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/auscultates"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Auscultates
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/tobacco"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Tobacco Use
                          </NavLink>
                        </li>
                        {/* <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/tobacco"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            ExamPurpose
                          </NavLink>
                        </li>
                        <li id="aside-bar-tree" className="mt-1">
                          {" "}
                          <NavLink to={"/tobacco"}>
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Service
                          </NavLink>
                        </li> */}
                      </ul>
                    </li>
                  )}

                  <li id="aside-bar">
                    <NavLink to={"/attendees"}>
                      <i
                        className="ti-id-badge"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Walk In Clients</span>
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink to={"/companies"}>
                      <i
                        className="ti-map-alt"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Companies</span>
                    </NavLink>
                  </li>
                  <li id="aside-bar">
                    <NavLink to={"/patients"}>
                      <i
                        className="ti-user"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Patients</span>
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "green",
                      }}
                      to={"/pneumo"}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      ></i>
                      <span>Pneumoconiosis</span>
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "green",
                      }}
                      to={"/foodhandlers"}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      ></i>
                      <span>Food Handlers</span>
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "green",
                      }}
                      to={"/industry"}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      ></i>
                      <span>Pre-Employment</span>
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink to={"/outreach"}>
                      <i
                        className="ti-clipboard"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>OutReach</span>
                    </NavLink>
                  </li>

                  <li className="treeview">
                    <a
                      className="mb-1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="ti-folder"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Stock Management</span>
                      <span className="pull-right-container">
                        <i className="ti-arrow-circle-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Inventory
                        </NavLink>
                      </li>
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Drugs
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li id="aside-bar">
                    <NavLink to={"/certificates"} activeclassname="active">
                      <i
                        className="ti-write"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Certificates (Batches)</span>
                    </NavLink>
                  </li>

                  {/* <li id="aside-bar">
                    <NavLink to={"/reports"} activeclassname="active">
                      <i
                        className="ti-pencil-alt"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span className="aside_label">Reports</span>
                    </NavLink>
                  </li> */}

                  <li className="treeview">
                    <a
                      className="mb-1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="ti-pie-chart"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Reports</span>
                      <span className="pull-right-container">
                        <i className="ti-arrow-circle-right"></i>
                      </span>
                    </a>
                    <ul
                      className="treeview-menu"
                      style={{
                        display: "block !important",
                      }}
                    >
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink to={"/reports"}>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Visual Reports
                        </NavLink>
                      </li>
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink to={"/reports/generate"}>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Generated Reports
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li id="aside-bar-tree" className="mt-1">
                    {" "}
                    <NavLink to={"/reports"}>
                      <i className="icon-Commit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Visual Reports
                    </NavLink>
                  </li>
                  <li id="aside-bar">
                    <NavLink to={"/reports/generate"}>
                      <i className="icon-Commit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Generated Reports
                    </NavLink>
                  </li>

                  <li id="aside-bar">
                    <NavLink to={"/dnotes"} activeclassname="active">
                      <i
                        className="ti-pencil-alt"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span className="aside_label">D Notes</span>
                    </NavLink>
                  </li>
                  <div className="help-bt">
                    <Link to={"/swab"} className="d-flex align-items-center">
                      <div
                        className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                        style={styles.color}
                      >
                        <i
                          class="fa fa-tint"
                          aria-hidden="true"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                      </div>
                      <h4
                        className="mb-0"
                        style={{
                          textTransform: "uppercase",
                          transition: "color 0.3s", // Adding transition for a smooth effect
                          ":hover": {
                            color: "green",
                          },
                        }}
                      >
                        SWAB REG
                      </h4>
                    </Link>
                  </div>
                  <li id="aside-bar">
                    <NavLink to={"/appointments"} activeclassname="active">
                      <i
                        className="ti-calendar"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span className="aside_label">Appointments</span>
                    </NavLink>
                  </li>
                </ul>
              )}
              {(user && user.type === "clinic") ||
                (user.type === "admin" && (
                  <ul className="sidebar-menu" data-widget="tree">
                    <li id="aside-bar">
                      <NavLink to={"/dashboard/clinic"}>
                        <i
                          className="ti-pie-chart"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Dashboard</span>
                      </NavLink>
                    </li>

                    {/* hms/patient/search */}

                    <li id="aside-bar">
                      <NavLink to={"/hms/patient/search"}>
                        <i
                          className="ti-search"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Patient's Search</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hms/patients"}>
                        <i
                          className="ti-user"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Patients</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hms/doctors"}>
                        <i
                          className="ti-id-badge"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Doctors</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/companies"}>
                        <i
                          className="ti-map-alt"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Companies</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hms/stock"}>
                        <i
                          className="ti-folder"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Stock Management</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hms/reports"}>
                        <i
                          className="ti-folder"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Reports</span>
                      </NavLink>
                    </li>
                  </ul>
                ))}

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
                      Best Health Care here{" "}
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
