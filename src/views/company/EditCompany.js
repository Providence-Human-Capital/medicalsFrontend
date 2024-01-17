import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Loading from "../../components/loader/Loading";
import { API } from "../../config";

const EditCompany = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const navigate = useNavigate();
  const { companyId } = useParams();
  const companies = useSelector((state) => state.company.companies) || [];
  const [company, setCompany] = useState({});

  useEffect(() => {
    const filteredCompany = companies.filter(
      (company) => company.id === parseInt(companyId)
    );
    console.log("Company", filteredCompany[0]);
    setCompany(filteredCompany[0]);

    if (redirectBack) {
      navigate("/companies");
    } else {
      return;
    }
  }, [companyId, redirectBack]);

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

  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("Values", values);
    try {
      const response = await fetch(`${API}/company/update/${companyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Response Data", data);
      resetForm();
      setRedirectBack(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <BreadCrumb title={"Edit Company"} activeTab={"Edit Company"} />
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="">
                  <h2>Edit Company Details</h2>
                  {company && (
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        company_name: company.company_name,
                        address: company.address,
                        site_telephone: company.site_telephone,
                        company_email: company.company_email,
                        contact_person: company.contact_person,
                        province: company.province,
                        designation: company.designation,
                        contact_number: company.contact_number,
                      }}
                      onSubmit={handleUpdateSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ values, isSubmitting, handleSubmit }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-floating ">
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="company_name"
                                  name="company_name"
                                />
                                <label htmlFor="company_name">
                                  Company Name
                                </label>
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
                                  className="form-control"
                                  id="address"
                                  name="address"
                                />
                                <label htmlFor="address">Address</label>
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
                                  className="form-control"
                                  id="site_telephone"
                                  name="site_telephone"
                                />
                                <label htmlFor="site_telephone">
                                  Site Telephone
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
                                  className="form-control"
                                  id="company_email"
                                  name="company_email"
                                />
                                <label htmlFor="company_email">
                                  Company Email
                                </label>
                                <ErrorMessage
                                  name="company_email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="designation"
                                  name="designation"
                                />
                                <label htmlFor="designation">Designation</label>
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
                                  className="form-control"
                                  id="contact_person"
                                  name="contact_person"
                                />
                                <label htmlFor="contact_person">
                                  Contact Person
                                </label>
                                <ErrorMessage
                                  name="contact_person"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-floating ">
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="contact_number"
                                  name="contact_number"
                                />
                                <label htmlFor="contact_number">
                                  Contact Number
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
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className="form-select"
                                  id="province"
                                  name="province"
                                >
                                  <option value="Choose province"></option>
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
                                <label htmlFor="province">Province</label>

                                <ErrorMessage
                                  name="province"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          {loading ? (
                            <Loading />
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Update Company
                            </button>
                          )}
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCompany;
