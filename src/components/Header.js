import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../redux_store/auth-store";
import { ToastContainer } from "react-toastify";
import ExportExcelButton from "./buttons/ExportExcelButton";
import NavButton from "./buttons/NavButton";
import { formsActions } from "../redux_store/forms-store";
import { attendeeActions } from "../redux_store/attendee-store";
import { companyActions } from "../redux_store/company-store";
import { illnessActions } from "../redux_store/illness-store";
import { outReachActions } from "../redux_store/outreach-store";
import { patientActions } from "../redux_store/patients-store";
import { tobaccoActions } from "../redux_store/tobacco-store";
import { uiActions } from "../redux_store/ui-store";
import Swal from "sweetalert2";

const Header = () => {
  const [isSideBarCollapsed, setSidebarCollapsed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60); // Countdown timer

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(authActions.setLogout());
    dispatch(formsActions.clearFormsOnLogOut());
    dispatch(attendeeActions.clearAttendeesOnLogout());
    dispatch(companyActions.clearCompaniesOnLogout());
    dispatch(illnessActions.clearIllnessesOnLogout());
    dispatch(outReachActions.clearOutReachOnLogout());
    dispatch(patientActions.clearPatientsOnLogout());
    dispatch(tobaccoActions.clearTobaccoOnLogOut());
    dispatch(uiActions.resetOnLogOut());

    navigate("/login");
  };

  let timeout = useRef(null);
  let countdownInterval = useRef(null);

  const resetTimeout = () => {
    clearTimeout(timeout.current);
    clearInterval(countdownInterval.current);
    timeout.current = setTimeout(() => {
      showLogoutWarning(); // Show Swal popup with 60 seconds countdown
    }, 1000 * 60 * 5); // 5 minutes, after which show the countdown popup
  };

  const showLogoutWarning = () => {
    let countdown = 60; // Start countdown from 60 seconds
    setSecondsLeft(countdown);

    Swal.fire({
      title: "Session Expiring Soon!",
      html: `Your session will expire in <strong><span id="countdown">${countdown}</span></strong> seconds.`,
      showCancelButton: true,
      confirmButtonText: "Keep Working",
      cancelButtonText: "Logout",
      allowOutsideClick: false,
      willClose: () => {
        clearInterval(countdownInterval.current);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resetTimeout(); // Reset the timeout if user chooses to keep working
      } else {
        signOut(); // Logout if the user chooses to logout
      }
    });

    countdownInterval.current = setInterval(() => {
      countdown--;
      setSecondsLeft(countdown);
      document.getElementById("countdown").innerHTML = countdown;

      if (countdown <= 0) {
        clearInterval(countdownInterval.current);
        Swal.close(); // Close Swal on timeout
        signOut(); // Automatically logout when countdown reaches 0
      }
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    resetTimeout(); // Start the timer on component mount

    return () => {
      clearTimeout(timeout.current);
      clearInterval(countdownInterval.current);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    };
  }, []);

  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  function handleToggleSidebar() {
    setSidebarCollapsed(!isSideBarCollapsed);
  }

  const styles = {
    logoStyles: {
      height: "6.5rem",
    },
    logoutCursor: {
      cursor: "pointer",
    },
  };

  if (hideHeader) {
    return null;
  }

  return (
    <Fragment>
      <header className="main-header">
        <ToastContainer autoClose={8000} />
        <div className="d-flex align-items-center logo-box justify-content-start">
          {/* Logo */}
          <Link to={"/dashboard"} className="logo">
            {/* logo */}
            {isSideBarCollapsed && (
              <div className="logo-mini w-50">
                <span className="light-logo">
                  <img
                    src="/medicals/assets/images/providence.png"
                    alt="logo"
                  />
                </span>
              </div>
            )}

            <div className="logo-lg">
              <span className="light-logo">
                <img
                  src="/medicals/assets/images/providence.png"
                  alt="logo"
                  style={styles.logoStyles}
                />
              </span>
            </div>
          </Link>
        </div>

        {/* Header Navbar */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button */}
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li
                className="btn-group nav-item"
                style={{
                  marginTop: user && user?.type === "clinic" ? "15px" : "",
                }}
              >
                <Link
                  onClick={handleToggleSidebar}
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <i
                    className="ti-align-left"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </Link>
              </li>

              {user && user?.type === "medicals" ? (
                <>
                  <li>
                    <Link to={"/add/booking"}>
                      <button
                        className="btn btn-primary pp"
                        style={{
                          borderRadius: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        ADD SINGLE BOOKING
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"certificates/print/csv"}>
                      <button
                        className="btn btn-secondary pp"
                        style={{
                          borderRadius: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Print Certificates Using Csv File
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/print/booking"}>
                      <button
                        className="btn btn-warning pp"
                        style={{
                          borderRadius: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        Print Medicals Bookings
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={"certificate/print/coh"}>
                      <button
                        className="btn btn-warning pp"
                        style={{
                          borderRadius: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        CITY OF HARARE
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <h1></h1>
              )}
            </ul>
          </div>

          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              <li className="btn-group nav-item d-lg-inline-flex d-none">
                <Link
                  data-provide="fullscreen"
                  className="waves-effect waves-light nav-link full-screen btn-warning-light"
                  title="Full Screen"
                >
                  <i
                    className="ti-fullscreen"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </Link>
              </li>
              {/* Notifications */}
              <li className="dropdown notifications-menu">
                <Link
                  className="waves-effect waves-light dropdown-toggle btn-info-light"
                  data-bs-toggle="dropdown"
                  title="Notifications"
                >
                  <i
                    className="ti-bell"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </Link>
                <ul className="dropdown-menu animated bounceIn">
                  <li className="header">
                    <div className="p-20">
                      <div className="flexbox">
                        <div>
                          <h4 className="mb-0 mt-0">Notifications</h4>
                        </div>
                        <div>
                          <Link href="#" className="text-danger">
                            Clear All
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <ul className="menu sm-scrol">
                      <li>
                        <Link href="#">
                          <i className="fa fa-users text-info"></i> Curabitur id
                          eros quis nunc suscipit blandit.
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <Link href="#">View all</Link>
                  </li>
                </ul>
              </li>

              {/* User Account */}
              <li className="dropdown user user-menu">
                <a
                  className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex pt-5">
                    <div className="text-end me-10">
                      <p className="pt-5 fs-14 mb-0 fw-700 text-primary">
                        {user && user.first_name}
                      </p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        {user && user.type}
                      </small>
                    </div>
                    <img
                      src="/medicals/assets/images/avatar/avatar-1.png"
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </div>
                </a>
                <ul className="dropdown-menu animated flipInX">
                  <li className="user-body">
                    <Link className="dropdown-item" href="#">
                      <i className="ti-user text-muted me-2"></i> Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      onClick={signOut}
                      style={styles.logoutCursor}
                    >
                      <i className="ti-lock text-muted me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
