import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import BreadCrumb from "../../components/BreadCrumb";

const AddTobacco = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter the name"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/tobacco`, {
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
      console.log(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectBack) {
      navigate("/tobacco");
    } else {
      return;
    }
  }, [redirectBack]);

  return (
<Fragment>
  <BreadCrumb title={"Add Tobacco"} activeTab={"Add Tobacco"} />
  <div className="row">
    <div className="col-xl-12 col-12">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h2>Enter your Tobacco details</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, isSubmitting, handleSubmit, touched, errors }) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="illness_name">Tobacco Name</label>
                        <Field
                          type="text"
                          className={`form-control ${
                            touched.name && errors.name
                              ? "error-input"
                              : ""
                          }`}
                          id="name"
                          name="name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
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
                        Save Tobacco Use
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
  </div>
</Fragment>
  )
  
};

export default AddTobacco;
