import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/Loading";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companyActions } from "../../redux_store/company-store";
import SaveButton from "../../components/buttons/SaveButton";

const AddCompany = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    company_name: "",
    address: "",
    site_telephone: "",
    company_email: "",
    contact_person: "",
    province: "",
    designation: "",
    contact_number: "",
  };

  const validationSchema = yup.object().shape({
    company_name: yup.string().required("Company name is required"),
    address: yup.string().required("Address is required"),
    site_telephone: yup.string().required("Site telephone is required"),
    company_email: yup
      .string()
      .email("Invalid email")
      .required("Company email is required"),
    contact_person: yup.string().required("Contact person is required"),
    province: yup.string().required("Province is required"),
    designation: yup.string().required("Designation is required"),
    contact_number: yup.string().required("Contact number is required"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("FormData", formData);
    try {
      const response = await fetch(`${API}/company`, {
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
      navigate("/companies");
    } else {
      return;
    }
  }, [redirectBack]);

  return (
    <Fragment>
      <BreadCrumb title={"Add Companies"} activeTab={"Add Companies"} />

      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="card">
            <div className="custom-form">
              <div className="box-body">
                <div className="">
                  <h3
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Enter New Company
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
                                id="company_name"
                                name="company_name"
                                className={`form-control ${
                                  touched.company_name && errors.company_name
                                    ? "error-input"
                                    : ""
                                }`}
                                placeholder="Enter company name"
                              />
                              <label htmlFor="company_name">COMPANY NAME</label>

                              <ErrorMessage
                                name="company_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="address"
                                name="address"
                                className={`form-control ${
                                  touched.address && errors.address
                                    ? "error-input"
                                    : ""
                                }`}
                                placeholder="Enter address"
                              />
                              <label htmlFor="address">ADDRESS</label>
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="separation-div"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.site_telephone &&
                                  errors.site_telephone
                                    ? "error-input"
                                    : ""
                                }`}
                                id="site_telephone"
                                name="site_telephone"
                                placeholder="Enter site telephone"
                              />
                              <label htmlFor="site_telephone">
                                SITE TELEPHONE
                              </label>
                              <ErrorMessage
                                name="site_telephone"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="email"
                                className={`form-control ${
                                  touched.company_email && errors.company_email
                                    ? "error-input"
                                    : ""
                                }`}
                                id="company_email"
                                name="company_email"
                                placeholder="Enter company email"
                              />
                              <label htmlFor="company_email">
                                COMPANY EMAIL
                              </label>

                              <ErrorMessage
                                name="company_email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.designation && errors.designation
                                    ? "error-input"
                                    : ""
                                }`}
                                id="designation"
                                name="designation"
                                placeholder="Enter Designation"
                              />
                              <label htmlFor="designation">DESIGNATION</label>

                              <ErrorMessage
                                name="designation"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control  ${
                                  touched.contact_person &&
                                  errors.contact_person
                                    ? "error-input"
                                    : ""
                                }`}
                                id="contact_person"
                                name="contact_person"
                                placeholder="Name of contact person"
                              />
                              <label htmlFor="contact_person">
                                CONTACT PERSON
                              </label>
                              <ErrorMessage
                                name="contact_person"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.contact_number &&
                                  errors.contact_number
                                    ? "error-input"
                                    : ""
                                }`}
                                id="contact_number"
                                name="contact_number"
                                placeholder="Enter Contact Number"
                              />
                              <label htmlFor="contact_number">
                                CONTACT NUMBER
                              </label>
                              <ErrorMessage
                                name="contact_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="separation-div"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                as="select"
                                className={`form-select ${
                                  touched.province && errors.province
                                    ? "error-input"
                                    : ""
                                }`}
                                id="province"
                                name="province"
                                placeholder="Select A Province"
                              >
                                <option value="Choose province">
                                  Choose province
                                </option>
                                <option value="Harare">Harare</option>
                                <option value="Bulawayo">Bulawayo</option>
                                <option value="Manicaland">Manicaland</option>
                                <option value="Mashonaland Central">
                                  Mashonaland Central
                                </option>
                                <option value="Mashonaland East">
                                  Mashonaland East
                                </option>
                                <option value="Mashonaland West">
                                  Mashonaland West
                                </option>
                                <option value="Masvingo">Masvingo</option>
                                <option value="Matebeleland North">
                                  Matebeleland North
                                </option>
                                <option value="Matebeleland South">
                                  Matebeleland South
                                </option>
                              </Field>
                              <label htmlFor="province">PROVIDENCE</label>

                              <ErrorMessage
                                name="province"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        {loading ? (
                          <Loading />
                        ) : (
                          // <button
                          //   type="submit"
                          //   className="btn btn-primary"
                          //   disabled={isSubmitting}
                          //   onClick={handleSubmit}
                          // >
                          //   Save Company
                          // </button>
                          <SaveButton
                            text={"Save Company"}
                            onClick={handleSubmit}
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
        </div>
      </div>
    </Fragment>
  );
};

export default AddCompany;
