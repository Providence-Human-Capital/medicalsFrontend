import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

const AsideNav = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleAdminMenu = () => {
    setIsAdminOpen((prev) => !prev);
  };

  const hideSidebar = ["/login", "/register"].includes(location.pathname);
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
    linkStyle: {
      textTransform: "uppercase",
      transition: "color 0.3s",
      color: "#5C607",
      fontWeight: "400",
      ":hover": {
        color: "green",
      },
    },
  };

  if (hideSidebar) {
    return null; // Don't render the sidebar
  }

  const renderMedicalsMenu = () => {
    return (
      <ul className="sidebar-menu" data-widget="tree">
        <li id="aside-bar">
          <NavLink to={"/dashboard"}>
            <i className="ti-pie-chart" style={{ fontSize: "20px" }}></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        {user?.role_id === 6 && (
          <li className={`treeview ${isAdminOpen ? "menu-open" : ""}`}>
            <a
              className="mb-1  d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={toggleAdminMenu}
            >
              <div>
                <i
                  className="ti-view-grid me-2"
                  style={{ fontSize: "20px" }}
                ></i>
                <span>Admin Operations</span>
              </div>
              <span className="pull-right-container">
                <i
                  className={`ti-arrow-circle-${
                    isAdminOpen ? "down" : "right"
                  } transition`}
                ></i>
              </span>
            </a>

            <ul
              className={`treeview-menu ${isAdminOpen ? "d-block" : "d-none"}`}
            >
              <li className="mt-1">
                <NavLink to="/companies">
                  <i className="icon-Commit"></i> Companies
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink to="/illnesses">
                  <i className="icon-Commit"></i> Illnesses (Food Handlers)
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink to="/diseases">
                  <i className="icon-Commit"></i> Diseases (Natpak)
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink to="/skin/conditions">
                  <i className="icon-Commit"></i> Skin Conditions
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink to="/auscultates">
                  <i className="icon-Commit"></i> Auscultates
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink to="/tobacco">
                  <i className="icon-Commit"></i> Tobacco Use
                </NavLink>
              </li>
            </ul>
          </li>
        )}

        <li id="aside-bar">
          <NavLink to={"/attendees"}>
            <i className="ti-id-badge" style={{ fontSize: "20px" }}></i>
            <span>Walk In Clients</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/companies"}>
            <i className="ti-map-alt" style={{ fontSize: "20px" }}></i>
            <span>Companies</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/patients"}>
            <i className="ti-user" style={{ fontSize: "20px" }}></i>
            <span>Patients</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/pneumo"}>
            <i
              className="ti-support"
              style={{ fontSize: "20px", color: "green" }}
            ></i>
            <span>Pneumoconiosis</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/foodhandlers"}>
            <i
              className="ti-support"
              style={{ fontSize: "20px", color: "green" }}
            ></i>
            <span>Food Handlers</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/industry"}>
            <i
              className="ti-support"
              style={{ fontSize: "20px", color: "green" }}
            ></i>
            <span>Pre-Employment</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/outreach"}>
            <i className="ti-clipboard" style={{ fontSize: "20px" }}></i>
            <span>OutReach</span>
          </NavLink>
        </li>

        <li id="aside-bar">
          <NavLink to={"/certificates"}>
            <i className="ti-write" style={{ fontSize: "20px" }}></i>
            <span>Certificates (Batches)</span>
          </NavLink>
        </li>

        <li id="aside-bar">
          <NavLink to={"/reports"}>
            <i
              className="ti-clipboard"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            ></i>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {" "}
              Visual Reports
            </span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/reports/generate"}>
            <i
              className="ti-clipboard"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            ></i>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {" "}
              Generated Reports
            </span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/dnotes"}>
            <i className="ti-pencil-alt" style={{ fontSize: "20px" }}></i>
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
                className="fa fa-tint"
                aria-hidden="true"
                style={{ fontSize: "20px" }}
              ></i>
            </div>
            <h4 className="mb-0" style={styles.linkStyle}>
              SWAB REG
            </h4>
          </Link>
        </div>
      </ul>
    );
  };

  const renderClinicMenu = () => {
    return (
      <ul className="sidebar-menu" data-widget="tree">
        <li id="aside-bar">
          <NavLink to={"/dashboard/clinic"}>
            <i className="ti-pie-chart" style={{ fontSize: "20px" }}></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/hms/patient/search"}>
            <i className="ti-search" style={{ fontSize: "20px" }}></i>
            <span>Patient's Search</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/hms/patients"}>
            <i className="ti-user" style={{ fontSize: "20px" }}></i>
            <span>Patients</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/hms/doctors"}>
            <i className="ti-id-badge" style={{ fontSize: "20px" }}></i>
            <span>Doctors</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/companies"}>
            <i className="ti-map-alt" style={{ fontSize: "20px" }}></i>
            <span>Companies</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/hms/stock"}>
            <i className="ti-folder" style={{ fontSize: "20px" }}></i>
            <span>Stock Management</span>
          </NavLink>
        </li>
        <li id="aside-bar">
          <NavLink to={"/hms/reports"}>
            <i className="ti-folder" style={{ fontSize: "20px" }}></i>
            <span>Reports</span>
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <Fragment>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          {/* Refresh */}
          <div className="help-bt">
            <button
              onClick={() => window.location.reload(true)}
              className="d-flex align-items-center border-0 px-3 py-2"
              style={{
                cursor: "pointer",
                gap: "12px",
                borderRadius: "25px",
                backgroundColor: "#28a745", // Bootstrap green
                color: "#fff",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#fff",
                }}
              >
                <i
                  className="fa fa-refresh"
                  style={{ fontSize: "20px", color: "#28a745" }}
                ></i>
              </div>
              <h4
                className="mb-0 fw-semibold"
                style={{
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              >
                Refresh System
              </h4>
            </button>
          </div>

          {/* Add Booking */}
          <div className="help-bt">
            <Link to={"/add/booking"} className="d-flex align-items-center">
              <div
                className="text-center me-15"
                style={{ ...iconBoxStyle, ...styles.bookingsColor }}
              >
                <i className="fa fa-calendar-plus-o" style={iconStyle}></i>
              </div>
              <h4 style={styles.linkStyle}>Add Single Booking</h4>
            </Link>
          </div>

          {/* Bulk Upload */}
          <div className="help-bt">
            <Link
              to={"/attendees/add/excel"}
              className="d-flex align-items-center"
            >
              <div
                className="text-center me-15"
                style={{ ...iconBoxStyle, ...styles.color }}
              >
                <i className="fa fa-file-excel-o" style={iconStyle}></i>
              </div>
              <h4 style={styles.linkStyle}>Bulk Patient Upload</h4>
            </Link>
          </div>

          {/* Bookings */}
          <div className="help-bt">
            <Link to={"/booking"} className="d-flex align-items-center">
              <div
                className="text-center me-15"
                style={{ ...iconBoxStyle, ...styles.bookingsColor }}
              >
                <i className="fa fa-book" style={iconStyle}></i>
              </div>
              <h4 style={styles.linkStyle}>Add Patient Bookings</h4>
            </Link>
          </div>

          {/* Add Patient */}
          <div className="help-bt">
            <Link to={"/attendees/add"} className="d-flex align-items-center">
              <div
                className="text-center me-15"
                style={{ ...iconBoxStyle, ...styles.color }}
              >
                <i className="fa fa-user" style={iconStyle}></i>
              </div>
              <h4 style={styles.linkStyle}>Add New Patient</h4>
            </Link>
          </div>

          {/* Rest of sidebar */}
          <div
            className="multinav"
            style={{
              overflowY: "scroll",
              height: "100vh",
              overflowX: "hidden",
            }}
          >
            <div className="multinav-scroll" style={styles.pageHeight}>
              {renderMedicalsMenu()}
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
                      Make an Appointment
                    </h4>
                    <a
                      className="py-10 fs-14 mb-0 text-primary"
                      style={styles.textColor}
                    >
                      Best Health Care here{" "}
                      <i className="fa fa-arrow-right"></i>
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

const iconStyle = {
  fontSize: "20px",
  color: "#fff",
};

const iconBoxStyle = {
  height: "50px",
  width: "50px",
  lineHeight: "50px",
  borderRadius: "10px",
};
