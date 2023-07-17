import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";

const BatchListPage = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Certificate Batch"} activeTab={"Create Batch"} />
    </Fragment>
  );
};

export default BatchListPage;
