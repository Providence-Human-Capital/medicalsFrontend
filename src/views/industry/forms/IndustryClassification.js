import React, { Fragment } from "react";
import BreadCrumb from "../../../components/BreadCrumb";

const IndustryClassification = () => {
  return (
    <Fragment>
      <BreadCrumb title={"Industry"} activeTab={"Classification"} />
      <div>Industry Classification</div>
    </Fragment>
  );
};

export default IndustryClassification;
