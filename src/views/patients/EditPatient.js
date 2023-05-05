import React, { Fragment } from "react";
import Layout from "../../core/Layout";
import BreadCrumb from "../../components/BreadCrumb";

const EditPatient = () => {
  return (
    <Fragment>
      <Fragment>
        <Layout>
          <BreadCrumb title={"Edit Patient"} activeTab={"Edit Patient"} />
          <h1>Edit Patient</h1>
        </Layout>
      </Fragment>
    </Fragment>
  );
};

export default EditPatient;
