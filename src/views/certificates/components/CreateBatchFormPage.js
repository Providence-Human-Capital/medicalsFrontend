import React, { Fragment, useEffect, useState } from "react";
import { createCertificateBatch } from "../../../services/api";
import BreadCrumb from "../../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import SaveButton from "../../../components/buttons/SaveButton";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../../redux_store/ui-store";
import { API } from "../../../config";
import Loading from "../../../components/loader/Loading";

const CreateBatchFormPage = () => {
  const [error, setError] = useState("");
  const companies = useSelector((state) => state.company.companies);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { companyId, companyName } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    // company_id: "",
    name: "",
  };

  const validationSchema = yup.object().shape({
    // company_id: yup.number().required("Please select a company"),
    name: yup.string().nullable(),
  });

  const handleCreateBatch = async (formData) => {
    console.log("Custom Form Data", formData);

    try {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
      const response = await fetch(
        `${API}/certificate/batch/${companyId}/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
        navigate("/certificates");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
    }
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
                      <strong>Create New Batch ({companyName})</strong>
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
                                    touched.name && errors.name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="name"
                                  placeholder="Enter The Custom Batch Name"
                                  name="name"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4"></div>
                          </div>
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <SaveButton
                              text={"Create Batch"}
                              onClick={handleCreateBatch}
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
      </section>
    </Fragment>
  );
};

export default CreateBatchFormPage;
