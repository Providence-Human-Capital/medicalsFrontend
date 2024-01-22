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
                help
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
                  className="ti-plus"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    height="20px"
                    color="#fff"
                  
                  >
                    <path d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z" />
                  </svg>
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
          <div className="multinav">
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

                  <li className="treeview">
                    <a
                      className="mb-1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Pneumoconiosis</span>
                      <span className="pull-right-container">
                        <i className="ti-arrow-circle-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink to={"/pneumo"}>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Pneumoconiosis
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="treeview">
                    <a
                      className="mb-1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Food Handlers</span>
                      <span className="pull-right-container">
                        <i className="ti-arrow-circle-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink to={"/foodhandlers"}>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Food Handlers
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview">
                    <a
                      className="mb-1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="ti-support"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      <span>Pre-Employment</span>
                      <span className="pull-right-container">
                        <i className="ti-arrow-circle-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li id="aside-bar-tree" className="mt-1">
                        {" "}
                        <NavLink to={"/industry"}>
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Pre-Employment Medical
                        </NavLink>
                      </li>
                    </ul>
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
                    <ul className="treeview-menu">
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
