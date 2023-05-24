import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/Loading";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companyActions } from "../../redux_store/company-store";

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
      setRedirectBack(true)
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
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h2>Enter your Companies details</h2>
                  
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, isSubmitting, handleSubmit }) => (
                      <Form>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="company_name">Company Name</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="company_name"
                              name="company_name"
                            />
                            <ErrorMessage
                              name="company_name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="address">Address</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="site_telephone">
                              Site Telephone
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="site_telephone"
                              name="site_telephone"
                            />
                            <ErrorMessage
                              name="site_telephone"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="company_email">Company Email</label>
                            <Field
                              type="email"
                              className="form-control"
                              id="company_email"
                              name="company_email"
                            />
                            <ErrorMessage
                              name="company_email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-4">
                            <label htmlFor="designation">Designation</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="designation"
                              name="designation"
                            />
                            <ErrorMessage
                              name="designation"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="contact_person">
                              Contact Person
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="contact_person"
                              name="contact_person"
                            />
                            <ErrorMessage
                              name="contact_person"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="contact_number">
                              Contact Number
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="contact_number"
                              name="contact_number"
                            />
                            <ErrorMessage
                              name="contact_number"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="province">Province</label>
                            <Field
                              as="select"
                              className="form-control"
                              id="province"
                              name="province"
                            >
                              <option value="Choose province">
                                Choose province
                              </option>
                              <option value="Gauteng">Harare</option>
                              <option value="KwaZulu-Natal">
                                Bulawayo
                              </option>
                              <option value="Western Cape">Manicaland</option>
                              <option value="Eastern Cape">Mashonaland Central</option>
                              <option value="North West">Mashonaland East</option>
                              <option value="Limpopo">Mashonaland West</option>
                              <option value="Free State">Masvingo</option>
                              <option value="Mpumalanga">Matebeleland North</option>
                              <option value="Mpumalanga">Matebeleland South</option>
                            </Field>
                            <ErrorMessage
                              name="province"
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
                            Save Company
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
  );
};

export default AddCompany;
