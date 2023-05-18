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

    // validationSchema.validate(values).then((validValues) => {
    //   try {
    //     setLoading(true);
    //     const response = fetch(`${API}/company/update/${companyId}`, {
    //       method: "PATCH",
    //       body: JSON.stringify(validValues),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = response.json();
    //     console.log("Response from Update",data);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);

    //   }
    // });
  };

  return (
    <Fragment>
      <BreadCrumb title={"Edit Company"} activeTab={"Edit Company"} />
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
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
                              <label htmlFor="company_email">
                                Company Email
                              </label>
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
                                <option value="Choose province" disabled>
                                  Choose province
                                </option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="KwaZulu-Natal">
                                  KwaZulu-Natal
                                </option>
                                <option value="Western Cape">
                                  Western Cape
                                </option>
                                <option value="Eastern Cape">
                                  Eastern Cape
                                </option>
                                <option value="North West">North West</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Free State">Free State</option>
                                <option value="Mpumalanga">Mpumalanga</option>
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
