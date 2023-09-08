import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import SaveButton from "../../../components/buttons/SaveButton";
import { API } from "../../../config";

const HygieneForm = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const formik = useFormik({
    initialValues: {
      skin_condition: false,
      sc_comment: "",
      auscultate: false,
      auscu_comment: "",
      nails: false,
      nails_comment: "",
      hair: false,
      hair_comment: "",
    },
    validationSchema: Yup.object({
      sc_comment: Yup.string().when("skin_condition", {
        is: true,
        then: Yup.string().required("Comment on patient's skin condition"),
      }),
      auscu_comment: Yup.string().when("auscultate", {
        is: true,
        then: Yup.string().required("Comment on patient's skin auscultates"),
      }),
      nails_comment: Yup.string().when("nails", {
        is: true,
        then: Yup.string().required("Comment on patient's nails"),
      }),
      hair_comment: Yup.string().when("hair", {
        is: true,
        then: Yup.string().required("Comment on patient's hair"),
      }),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Handle form submission
      console.log(values);
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API}/patient/${patientId}/hygiene/capture`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          }
        );
        const responseData = await response.json();
        if (response.status === 200 || response.status === 201) {
          console.log("onSubmit", responseData);
          setIsLoading(false);
          resetForm();
        }
      } catch (e) {
        console.log("error", e);
        setIsLoading(false);
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="card">
            <div className="box-body">
              <h5>
                <strong>CLIENT'S PERSONAL HYGIENE</strong>
              </h5>
              <form onSubmit={formik.handleSubmit}>
                <p className="mb-4">
                  {" "}
                  <strong>NB:</strong> Tick a checkbox if only the person has an
                  issues and then comment on the issue{" "}
                </p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="skin_condition"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        1. Skin Condition
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="skin_condition"
                          name="skin_condition"
                          checked={formik.values.skin_condition}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="skin_condition"
                        >
                          Skin Condition
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      {formik.values.skin_condition && (
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="sc_comment"
                            name="sc_comment"
                            value={formik.values.sc_comment}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="sc_comment">
                            COMMENT ON SKIN CONDITIONS
                          </label>
                        </div>
                      )}
                    </div>
                    {formik.values.skin_condition &&
                    formik.errors.sc_comment ? (
                      <div className="text-danger">
                        {formik.errors.sc_comment}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="auscultate"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        2. Auscultate
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="auscultate"
                          name="auscultate"
                          checked={formik.values.auscultate}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="auscultate"
                        >
                          Auscultate
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      {formik.values.auscultate && (
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="auscu_comment"
                            name="auscu_comment"
                            value={formik.values.auscu_comment}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="auscu_comment">
                            COMMENT ON AUSCULTATES
                          </label>
                        </div>
                      )}
                    </div>
                    {formik.values.auscultate && formik.errors.auscu_comment ? (
                      <div className="text-danger">
                        {formik.errors.auscu_comment}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="nails"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        3. NAILS
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="nails"
                          name="nails"
                          checked={formik.values.nails}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="nails">
                          Nails
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      {formik.values.nails && (
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="nails_comment"
                            name="nails_comment"
                            value={formik.values.nails_comment}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="nails_comment">
                            COMMENT ON NAILS ISSUES
                          </label>
                        </div>
                      )}
                    </div>
                    {formik.values.nails && formik.errors.nails_comment ? (
                      <div className="text-danger">
                        {formik.errors.nails_comment}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="hair"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        4. HAIR
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="hair"
                          name="hair"
                          checked={formik.values.hair}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="hair">
                          Hair
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      {formik.values.hair && (
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="hair_comment"
                            name="hair_comment"
                            value={formik.values.hair_comment}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="hair_comment">
                            COMMENT ON HAIR ISSUES
                          </label>
                        </div>
                      )}
                    </div>
                    {formik.values.hair && formik.errors.hair_comment ? (
                      <div className="text-danger">
                        {formik.errors.hair_comment}
                      </div>
                    ) : null}
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <button type="submit" className="btn btn-success-light me-4">
                    Save Personal Hygiene Details
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HygieneForm;

const onSubmit = async (values, { setSubmitting, resetForm }) => {
  console.log("onSubmit", JSON.stringify(values));
};
