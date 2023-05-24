import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import EntryTable from "./components/EntryTable";

const AddOutreach = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  const dispatch = useDispatch();
  const initialValues = {
    swab_number: "",
    first_name: "",
    last_name: "",
    company: "",
    date_of_birth: "",
    gender: "",
  };

  const validationSchema = yup.object().shape({
    swab_number: yup.number().required("Please Enter The Swab Number"),
    first_name: yup.string().required("Please Enter First Name"),
    last_name: yup.string().required("Please Enter Last Name"),
    company: yup.string().required("Please Enter Company Name"),
    date_of_birth: yup.string().required("Please Enter Last Name"),
    gender: yup.string().required("Please Select Gender"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("FormData", formData);
    try {
      const response = await fetch(`${API}/outreach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      resetForm();
      setRedirectBack(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectBack) {
      console.log("Redirect Back Activated");
    }
  }, [redirectBack]);

  return (
    <Fragment>
      <BreadCrumb title={"Outreach"} activeTab={"Add Outreach Entries"} />
      <div className="row">
        <div className="col-xl-8 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Enter your Users Here</h2>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, isSubmitting, handleSubmit, errors, touched }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="first_name">First Name:</label>
                              <Field
                                type="text"
                                className={`form-control ${touched.first_name && errors.first_name ? 'error-input' : ''}`}
                                id="first_name"
                                placeholder="Enter first name"
                                name="first_name"
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="last_name">Last Name:</label>
                              <Field
                                type="text"
                                className={`form-control ${touched.last_name && errors.last_name ? 'error-input' : ''}`}
                                id="last_name"
                                placeholder="Enter Last Name"
                                name="last_name"
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="swab_number">Swab Number:</label>
                              <Field
                                type="number"
                                className={`form-control ${touched.swab_number && errors.swab_number ? 'error-input' : ''}`}
                                id="swab_number"
                                placeholder="Enter Swab Number"
                                name="swab_number"
                              />
                              <ErrorMessage
                                name="swab_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="gender">Gender:</label>
                              <Field
                                as="select"
                                className={`form-control ${touched.gender && errors.gender ? 'error-input' : ''}`}
                                id="gender"
                                name="gender"
                              >
                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                              </Field>
                              <ErrorMessage
                                name="gender"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="date_of_birth">
                                Date of Birth:
                              </label>
                              <Field
                                type="date"
                                className={`form-control ${touched.date_of_birth && errors.date_of_birth ? 'error-input' : ''}`}
                                id="date_of_birth"
                                placeholder="Enter date of birth"
                                name="date_of_birth"
                              />
                              <ErrorMessage
                                name="date_of_birth"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="company">Company Name:</label>
                              <Field
                                type="text"
                                className={`form-control ${touched.company && errors.company ? 'error-input' : ''}`}
                                id="company"
                                placeholder="Enter Company Name"
                                name="company"
                              />
                              <ErrorMessage
                                name="company"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        {loading ? (
                          <Loading />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                          >
                            Save User
                          </button>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-12">
          <div className="box">
            <div className="box-header no-border">
              <h4 className="box-title">Latest Users</h4>
            </div>
            <div className="box-body">
              <EntryTable />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddOutreach;
