import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import SaveButton from "../../components/buttons/SaveButton";

const AddIllness = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    illness_name: "",
  };

  const validationSchema = yup.object().shape({
    illness_name: yup.string().required("Please enter the illness name"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("FormData", formData);
    try {
      const response = await fetch(`${API}/illness`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.data);
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
      navigate("/illnesses");
    } else {
      return;
    }
  }, [redirectBack]);
  return (
    <Fragment>
      <BreadCrumb title={"Add Illnesses"} activeTab={"Add Illnesses"} />
      <div className="row">
        <div className="col-xl-8 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h3
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Enter New Illness
                  </h3>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
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
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.illness_name && errors.illness_name
                                    ? "error-input"
                                    : ""
                                }`}
                                id="illness_name"
                                name="illness_name"
                              />
                              <label
                                htmlFor="illness_name"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                ENTER NEW ILLNESS
                              </label>
                              <ErrorMessage
                                name="illness_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="separation-div"></div>
                        </div>
                        {loading ? (
                          <Loading />
                        ) : (
                          <SaveButton
                            disable={isSubmitting}
                            onClick={handleSubmit}
                            text={"Save"}
                          />
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
  );
};

export default AddIllness;
