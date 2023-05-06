import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";

const Companies = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Companies"} activeTab={"Companies"} />
    </Fragment>
  );
};

export default Companies;
