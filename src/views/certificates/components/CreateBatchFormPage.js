import React, { Fragment, useEffect, useState } from "react";
import { createCertificateBatch } from "../../../services/api";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import SaveButton from "../../../components/buttons/SaveButton";

const CreateBatchFormPage = () => {
  const [error, setError] = useState("");
  const companies = useSelector((state) => state.company.companies);

  const initialValues = {
    company_id: "",
    custom_name: "",
  };

  const validationSchema = yup.object().shape({
    company_id: yup.number().required("Please select a company"),
    custom_name: yup.string().nullable(),
  });

  const handleCreateBatch = async (companyId) => {
    createCertificateBatch(companyId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <BreadCrumb title={"Certificate"} activeTab={"Create Batch"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-9 col-12">
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="container">
                    <h3>
                      <strong>Create New Batch</strong>
                    </h3>

                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleCreateBatch}
                      validationSchema={validationSchema}
                    >
                      {({
                        values,
                        isSubmitting,
                        handleSubmit,
                        touched,
                        errors,
                      }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="first_name">
                                  Custom Batch Name:
                                </label>
                                <Field
                                  type="text"
                                  className={`form-control my-upload ${
                                    touched.custom_name && errors.custom_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="custom_name"
                                  placeholder="Enter The Custom Batch Name"
                                  name="custom_name"
                                />
                                <ErrorMessage
                                  name="custom_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="company_id">Company Name:</label>
                              <Field
                                as="select"
                                className={`form-control my-upload ${
                                  touched.company_id && errors.company_id
                                    ? "error-input"
                                    : ""
                                }`}
                                id="company_id"
                                name="company_id"
                              >
                                <option value="">Select a company</option>
                                {companies.map((company) => (
                                  <option key={company.id} value={company.id}>
                                    {company.company_name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="company_id"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          </div>
                          <SaveButton text={"Create Batch"} />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CreateBatchFormPage;
