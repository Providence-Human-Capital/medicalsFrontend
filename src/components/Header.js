import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({}) => {
  const [isSideBarCollapsed, setSidebarCollapsed] = useState(false);

  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  function handleToggleSidebar() {
    setSidebarCollapsed(!isSideBarCollapsed);
  }

  const styles = {
    logoStyles: {
      height: "80px",
    },
  };

  if (hideHeader) {
    return null;
  }

  return (
    <Fragment>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          {/* <!-- Logo --> */}
          <Link to={"/"} className="logo">
            {/* <!-- logo--> */}
            {isSideBarCollapsed && (
              <div className="logo-mini w-50">
                <span className="light-logo">
                  <img src="/assets/images/providence.png" alt="logo" />
                </span>
              </div>
            )}

            <div className="logo-lg">
              <span className="light-logo">
                <img
                  src="/assets/images/providence.png"
                  alt="logo"
                  style={styles.logoStyles}
                />
              </span>
            </div>
          </Link>
        </div>
        {/* <!-- Header Navbar --> */}
        <nav className="navbar navbar-static-top">
          {/* <!-- Sidebar toggle button--> */}
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <Link
                  onClick={handleToggleSidebar}
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <i data-feather="align-left"></i>
                </Link>
              </li>
              <li className="btn-group d-lg-inline-flex d-none">
                <div className="app-menu">
                  <div className="search-bx mx-5">
                    <form>
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn"
                            type="submit"
                            id="button-addon3"
                          >
                            <i data-feather="search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              <li className="btn-group nav-item d-lg-inline-flex d-none">
                <Link
                  href="#"
                  data-provide="fullscreen"
                  className="waves-effect waves-light nav-link full-screen btn-warning-light"
                  title="Full Screen"
                >
                  <i data-feather="maximize"></i>
                </Link>
              </li>
              {/* <!-- Notifications --> */}
              <li className="dropdown notifications-menu">
                <Link
                  href="#"
                  className="waves-effect waves-light dropdown-toggle btn-info-light"
                  data-bs-toggle="dropdown"
                  title="Notifications"
                >
                  <i data-feather="bell"></i>
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
                    {/* <!-- inner menu: contains the actual data --> */}
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

              {/* <!-- User Account--> */}
              <li className="dropdown user user-menu">
                <Link
                  href="#"
                  className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex pt-5">
                    <div className="text-end me-10">
                      <p className="pt-5 fs-14 mb-0 fw-700 text-primary">
                        Johen Doe
                      </p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        Admin
                      </small>
                    </div>
                    <img
                      src="/assets/images/avatar/avatar-1.png"
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </div>
                </Link>
                <ul className="dropdown-menu animated flipInX">
                  <li className="user-body">
                    <Link className="dropdown-item" href="#">
                      <i className="ti-user text-muted me-2"></i> Profile
                    </Link>
                    <Link className="dropdown-item" href="#">
                      <i className="ti-wallet text-muted me-2"></i> My Wallet
                    </Link>
                    <Link className="dropdown-item" href="#">
                      <i className="ti-settings text-muted me-2"></i> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" href="#">
                      <i className="ti-lock text-muted me-2"></i> Logout
                    </Link>
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
