import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../config";
import PButtons from "../components/PButtons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux_store/ui-store";
import { formsActions } from "../../../redux_store/forms-store";
import Loading from "../../../components/loader/Loading";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientSideView from "../components/PatientSideView";
import SaveButton from "../../../components/buttons/SaveButton";
import FormButton from "../../../components/buttons/FormButton";

const XrayForm = ({ handlePrev, handleNext }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const user = useSelector((state) => state.auth.user);

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
        "You are supposed to comment on the  status of xray"
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
        dispatch(formsActions.setPatientsXray(data["x-ray"]));

        handleNext();
      }
      console.log("X ray response Data", data);

      toast.success("Patient X-Ray Add Successfully");
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
      <div className="step-form">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="container">
                    <h4
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Upload Patient's Xray Image
                    </h4>
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
                                <div className="form-floating">
                                  <input
                                    class="form-control"
                                    type="file"
                                    name="image"
                                    onChange={(event) =>
                                      handleImageChange(event, setFieldValue)
                                    }
                                  />
                                  <label htmlFor="formFile" class="form-label">
                                    SELECT UPLOAD XRAY
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
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
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="status">Status</label>
                                  <div className="form-floating">
                                    <Field
                                      as="select"
                                      name="status"
                                      className="form-select"
                                      disabled={user.role !== "admin"}
                                    >
                                      <option value="NEGATIVE">
                                        POSITIVE RESULT
                                      </option>
                                      <option value="POSITIVE">
                                        NEGATIVE RESULT
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name="status"
                                      component="div"
                                      className="error-message"
                                    />
                                    <label htmlFor="status">
                                      COMMENT ON XRAY
                                    </label>

                                    
                                  </div>
                                </div>

                                {values.status === "POSITIVE" && (
                                  <div className="form-group">
                                    <label htmlFor="result">
                                      Result Comment
                                    </label>
                                    <div className="form-floating">
                                      <Field
                                        as="textarea"
                                        rows="4"
                                        name="result"
                                        className={`form-control  textareaH ${
                                          touched.result && errors.result
                                            ? "error-input"
                                            : ""
                                        }`}
                                        disabled={user.role !== "admin"}
                                      />
                                      <ErrorMessage
                                        name="result"
                                        component="div"
                                        className="error-message"
                                      />
                                      <label htmlFor="result">
                                        COMMENT ON THE XRAY
                                      </label>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {isLoading ? (
                            <Loading />
                          ) : (
                            <div
                              className="d-flex"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "20px",
                                marginBottom: "20px",
                              }}
                            >
                              <FormButton
                                text={"Previous"}
                                direction={"left"}
                                onClick={handlePrev}
                              />
                              <FormButton
                                text={"Next"}
                                direction={"right"}
                                onClick={onSubmit}
                              />
                            </div>
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
      </div>
    </Fragment>
  );
};

export default XrayForm;
