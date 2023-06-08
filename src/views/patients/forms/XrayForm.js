import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../config";
import PButtons from "../components/PButtons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import Loading from "../../../components/loader/Loading";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientSideView from "../components/PatientSideView";

const XrayForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    status: "NEGATIVE",
    image: "",
    result: "",
  };

  const styles = {
    seperation: {
      height: "20px",
    },
  };

  const validationSchema = Yup.object({
    status: Yup.string().required("Required"),
    image: Yup.mixed().required("Please select an X-Ray Image"),
    result: Yup.string().when("status", {
      is: "POSITIVE",
      then: Yup.string().required(
        "You are supposed to comment on the POSTIVE status of Xray"
      ),
    }),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("status", values.status);
    formData.append("image", values.image);
    formData.append("result", values.result);

    try {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
      const response = await fetch(`${API}/xray/${patientId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
      }
      console.log("X ray response Data", data);
      toast.success("Patient X-Ray Add Successfully");
      navigate(`/patients/${patientId}`);
    } catch (error) {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
      console.error(error);
      toast.error("Something went wrong", error.message);
    }

    setSubmitting(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const { patientId } = useParams();

  return (
    <Fragment>
      <BreadCrumb title={"Xray"} activeTab={"Add Xray"} />
      <div className="separation-div" ></div>
      <div className="row">
        <div className="col-xl-8 col-12">
          <PButtons routeId={patientId} />
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Upload Patient's Xray Image</h2>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({
                      isSubmitting,
                      setFieldValue,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form>
                        <div className="form-group">
                          <div className="col-xl-6 col-12">
                            <div class="mb-3">
                              <label htmlFor="formFile" class="form-label">
                                Upload X-Ray Image
                              </label>
                              <input
                                class="form-control"
                                type="file"
                                name="image"
                                onChange={(event) =>
                                  handleImageChange(event, setFieldValue)
                                }
                              />
                            </div>
                          </div>

                          {previewImage && (
                            <div className="preview-images-container">
                              <div className="preview-image-wrapper">
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  className="mt-2 preview-image"
                                  style={{ maxWidth: "100%" }}
                                />
                              </div>
                            </div>
                          )}
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <Field
                            as="select"
                            name="status"
                            className="form-control"
                          >
                            <option value="NEGATIVE">NEGATIVE</option>
                            <option value="POSITIVE">POSITIVE</option>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {values.status === "POSITIVE" && (
                          <div className="form-group">
                            <label htmlFor="result">Result</label>
                            <Field
                              type="text"
                              name="result"
                              className={`form-control ${
                                touched.result && errors.result
                                  ? "error-input"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              name="result"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        )}

                        {isLoading ? (
                          <Loading />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            Save Xray Details
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
        <PatientSideView />
        </div>
      </div>
    </Fragment>
  );
};

export default XrayForm;
