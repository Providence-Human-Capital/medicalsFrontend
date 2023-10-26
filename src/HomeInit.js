import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import AsideNav from "./components/AsideNav";
import { Outlet, Route, Routes } from "react-router-dom";

const HomeInit = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  useEffect(() => {
    const body = document.body;
    if (isSidebarCollapsed) {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed",
        "sidebar-collapse"
      );
    } else {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed"
      );
    }
  }, [isSidebarCollapsed]);
  return (
    <Fragment>
      <div className="content-wrapper">
        <div className="container-full">
          <Header
            isSidebarCollapsed={isSidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <AsideNav />
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default HomeInit;
