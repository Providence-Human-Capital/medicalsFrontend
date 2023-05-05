import React, { Fragment, useState } from "react";
import Loader from "../components/Loader";
import AsideNav from "../components/AsideNav";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Fragment>
      <body
        className={`${
          isSidebarCollapsed
            ? "light-skin sidebar-mini theme-success fixed sidebar-collapse"
            : "light-skin sidebar-mini theme-success fixed "
        }`}
      >
        <Header
          isSidebarCollapsed={isSidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <AsideNav />
        <div class="content-wrapper">
          <div class="container-full">{children}</div>
        </div>
      </body>
    </Fragment>
  );
};

export default Layout;
