import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import SaveButton from "../../../components/buttons/SaveButton";
import Loading from "../../../components/loader/Loading";
import { API } from "../../../config";

const SwabForm = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const initialValues = {
    status: "",
    file: "",
    comment: "",
    result: true,
  };

  const validationSchema = yup.object().shape({
    status: yup.string().nullable(),
    comment: yup.string().nullable(),
    result: yup.boolean().nullable(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("onSubmit", values);
    const formData = new FormData();
    formData.append("status", values.status);
    formData.append("file", values.file);
    formData.append("comment", values.comment);
    formData.append("result", values.result);

    // console.log("FORM DATA",formData);

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/patient/${patientId}/swab/results`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        console.log("Success", data);
        setIsLoading(false);
        resetForm();
      }
    } catch (e) {
      console.log("error", e);
      setIsLoading(false);
    }

    setSubmitting(false);
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewFile(reader.result);
      };
    } else {
      setPreviewFile(null);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="card">
            <div className="box-body">
              <h5>
                <strong>CLIENT'S SWAB RESULTS</strong>
              </h5>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="form-floating">
                              <input
                                class="form-control"
                                type="file"
                                name="file"
                                onChange={(event) =>
                                  handleFileChange(event, setFieldValue)
                                }
                              />
                              <label htmlFor="file">FILE UPLOAD</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="status">SWAB STATUS</label>
                            <div className="form-floating">
                              <Field
                                as="select"
                                className="form-select"
                                id="status"
                                name="status"
                              >
                                <option value="PENDING">PENDING</option>
                                <option value="DONE">DONE</option>
                              </Field>
                              <label htmlFor="status">SWAB STATUS</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="status">
                              GENERAL COMMENT ON SWAB
                            </label>
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                rows="4"
                                name="comment"
                                className="form-control"
                                style={{
                                  minHeight: "100px",
                                }}
                              />
                              <label htmlFor="comment">COMMENT ON SWAB</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="result">RESULT STATUS</label>
                            <div className="form-floating">
                              <Field
                                as="select"
                                className="form-select"
                                id="result"
                                name="result"
                              >
                                <option value={true}>POSITIVE</option>
                                <option value={false}>NAGATIVE</option>
                              </Field>
                              <label htmlFor="result">
                                SWAB POSITIVE/NEGATIVE
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <SaveButton
                        text={"Save"}
                        onClick={onSubmit}
                        disable={isSubmitting}
                      />
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwabForm;