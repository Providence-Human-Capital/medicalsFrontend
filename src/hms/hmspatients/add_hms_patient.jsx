import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import BreadCrumb from "../../components/BreadCrumb";
import Loading from "../../components/loader/Loading";
import SaveButton from "../../components/buttons/SaveButton";
import {
  useAddNewUserMutation,
  useGetUsersQuery,
} from "../../redux_store/api/userSlice";
import { useGetCompaniesQuery } from "../../redux_store/api/companySlice";
import { json } from "react-router-dom";
import { useGetRolesQuery } from "../../redux_store/api/apiSlice";

const familyRelationships = [
  {
    id: 1,
    name: "self/holder",
  },
  {
    id: 2,
    name: "father",
  },
  {
    id: 3,
    name: "mother",
  },
  {
    id: 4,
    name: "son",
  },
  {
    id: 5,
    name: "daughter",
  },
  {
    id: 6,
    name: "grandfather",
  },
  {
    id: 7,
    name: "grandmother",
  },
  {
    id: 8,
    name: "wife",
  },
  {
    id: 9,
    name: "sister",
  },
  {
    id: 10,
    name: "brother",
  },
  {
    id: 11,
    name: "extended family",
  },
];

const AddHmsPatient = ({}) => {
  const [loading, setLoading] = useState(false);

  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const { data: companies } = useGetCompaniesQuery();
  const { data: roles } = useGetRolesQuery();
  const { data: users } = useGetUsersQuery();
  const [selectedType, setSelectedType] = useState("holder");

  const initialValues = {
    first_name: "",
    last_name: "",
    middle_name: "",
    credentials: "",
    prefix: "",
    email: "",
    marital_status: "",
    employee_number: "",
    national_id: "",
    gender: "",
    phone_number: "",
    phone_number_2: "",
    date_of_birth: "",
    home_address: "",
    occupation: "",
    medical_aid_id: "",
    company_id: "",
    medical_aid_number: "",
    role_id: "",
    type: "",
    account_holder_id: "",
    relationship: "",
  };

  const validationSchema = yup.object().shape({
    // first_name: yup.string().required("Please Enter First Name"),
    // last_name: yup.string().required("Please Enter Last Name"),
    // prefix: yup
    //   .string()
    //   .required("Please Select Prefix (Mr, Ms, Dr, RGN etc.)"),
    // marital_status: yup.string().required("Please Select Marital Status"),
    // national_id: yup.string().required("Please Enter National ID Number"),
    // gender: yup.string().required("Select your gender"),
    // date_of_birth: yup.string().required("Date of Birth is Required"),
    // home_address: yup.string().nullable(),
    // role_id: yup.number().required("Select Role ID"),
    // type: yup.string().required("Select Type"),
    // company_id: yup.string().nullable(),
  });

  const handleChangeType = (type) => {
    setSelectedType(type);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const userData = {
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      credentials: values.credentials,
      prefix: values.prefix,
      email: values.email,
      marital_status: values.marital_status,
      employee_number: values.employee_number,
      national_id: values.national_id,
      gender: values.gender,
      phone_number: values.phone_number,
      phone_number_2: values.phone_number_2,
      date_of_birth: values.date_of_birth,
      home_address: values.home_address,
      occupation: values.occupation,
      medical_aid_id: values.medical_aid_id,
      company_id: 5,
      medical_aid_number: values.medical_aid_number,
      role_id: values.role_id,
      type: values.type,
      password: "",
    };

    console.log(userData);

    try {
      await addNewUser(userData).unwrap();
    } catch (error) {
      console.error("Error Messsage", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <BreadCrumb title={"New Patient"} activeTab={"Add New Patient"} />
      <div className="separation-div"></div>
      <div className="section">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="">
                <div className="box-body">
                  <div className="">
                    <h4
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Add New Patient
                    </h4>
                    <div className="separation-div"></div>
                    <div className="row">
                      <div className="mb-2">
                        <button
                          class="btn btn-primary"
                          onClick={() => handleChangeType("holder")}
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          Account Holder
                        </button>
                        <button
                          class="btn btn-secondary"
                          onClick={() => handleChangeType("dependant")}
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          Dependant
                        </button>
                      </div>
                    </div>
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
                          {selectedType === "dependant" && (
                            <>
                              <p
                                className="mb-2"
                                style={{
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  paddingTop: "20px",
                                  paddingBottom: "14px",
                                  color: "#58AD46",
                                  fontSize: "20px",
                                  fontFamily: "Cooper Black"
                                }}
                              >
                                NB: On adding Dependant, Please select the
                                account holder name and the relationship
                              </p>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-floating">
                                    <Field
                                      as="select"
                                      className={`form-select ${
                                        touched.account_holder_id &&
                                        errors.account_holder_id
                                          ? "error-input"
                                          : ""
                                      }`}
                                      id="account_holder_id"
                                      name="account_holder_id"
                                    >
                                      <option value=""></option>
                                      {users.data &&
                                        users.data.map((user) => (
                                          <option value={user.id} key={user.id}>
                                            {" "}
                                            {user.first_name.toUpperCase()}{" "}
                                            {user.last_name.toUpperCase()}{" "}
                                          </option>
                                        ))}
                                    </Field>
                                    <label htmlFor="account_holder_id">
                                      SELECT THE ACCOUNT HOLDER
                                    </label>
                                    <ErrorMessage
                                      name="account_holder_id"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-floating">
                                    <Field
                                      as="select"
                                      className={`form-select ${
                                        touched.relationship &&
                                        errors.relationship
                                          ? "error-input"
                                          : ""
                                      }`}
                                      id="relationship"
                                      placeholder="Enter first name"
                                      name="relationship"
                                    >
                                      <option value=""></option>
                                      {familyRelationships &&
                                        familyRelationships.map(
                                          (relationship) => (
                                            <option
                                              value={relationship.name}
                                              key={relationship.id}
                                            >
                                              {" "}
                                              {relationship.name.toUpperCase()}
                                            </option>
                                          )
                                        )}
                                    </Field>
                                    <label htmlFor="relationship">
                                      RELATIONSHIP WITH HOLDER
                                    </label>
                                    <ErrorMessage
                                      name="relationship"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="separation-div"></div>

                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.first_name && errors.first_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="first_name"
                                  placeholder="Enter first name"
                                  name="first_name"
                                />
                                <label htmlFor="first_name">FIRST NAME</label>
                                <ErrorMessage
                                  name="first_name"
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
                                    touched.last_name && errors.last_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="last_name"
                                  placeholder="Enter last name"
                                  name="last_name"
                                />
                                <label htmlFor="last_name">LAST NAME</label>
                                <ErrorMessage
                                  name="last_name"
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
                                    touched.middle_name && errors.middle_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="middle_name"
                                  placeholder="Enter Middle Name"
                                  name="middle_name"
                                />
                                <label htmlFor="middle_name">
                                  MIDDLE NAME (Optional)
                                </label>
                                <ErrorMessage
                                  name="middle_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-2">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.prefix && errors.prefix
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="prefix"
                                  name="prefix"
                                >
                                  <option value=""></option>
                                  <option value="Mr">Mr</option>
                                  <option value="Mrs">Mrs</option>
                                  <option value="Miss">Miss</option>
                                  <option value="Dr">Dr</option>
                                  <option value="Rgn">Rgn</option>
                                  <option value="Sr">Sr</option>
                                </Field>
                                <label htmlFor="prefix">
                                  PREFIX (Mr, Mrs etc.)
                                </label>
                                <ErrorMessage
                                  name="prefix"
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
                                    touched.credentials && errors.credentials
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="credentials"
                                  placeholder="Enter Credentials e.g (MD)"
                                  name="credentials"
                                />
                                <label htmlFor="credentials">CREDENTIALS</label>
                                <ErrorMessage
                                  name="credentials"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.marital_status &&
                                    errors.marital_status
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="marital_status"
                                  name="marital_status"
                                >
                                  <option value=""></option>
                                  <option value="Single">Single</option>
                                  <option value="Married">Married</option>
                                  <option value="Married">Divorced</option>
                                </Field>
                                <label htmlFor="marital_status">
                                  MARITAL STATUS
                                </label>
                                <ErrorMessage
                                  name="marital_status"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.employee_number &&
                                    errors.employee_number
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="employee_number"
                                  placeholder="Enter Employee Number"
                                  name="employee_number"
                                />
                                <label htmlFor="employee_number">
                                  EMPLOYEE NUMBER
                                </label>
                                <ErrorMessage
                                  name="employee_number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.email && errors.email
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="email"
                                  placeholder="Enter Email If Available"
                                  name="email"
                                />
                                <label htmlFor="email">EMAIL</label>
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.national_id && errors.national_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="national_id"
                                  placeholder="Enter National ID"
                                  name="national_id"
                                />
                                <label htmlFor="national_id">NATIONAL ID</label>
                                <ErrorMessage
                                  name="national_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.gender && errors.gender
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="gender"
                                  name="gender"
                                >
                                  <option value=""></option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </Field>
                                <label htmlFor="gender">GENDER</label>
                                <ErrorMessage
                                  name="gender"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="date"
                                  className={`form-control ${
                                    touched.date_of_birth &&
                                    errors.date_of_birth
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="date_of_birth"
                                  placeholder="Enter date of birth"
                                  name="date_of_birth"
                                />
                                <label htmlFor="date_of_birth">
                                  DATE OF BIRTH
                                </label>
                                <ErrorMessage
                                  name="date_of_birth"
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
                                    touched.home_address && errors.home_address
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="home_address"
                                  placeholder="Enter National ID"
                                  name="home_address"
                                />
                                <label htmlFor="home_address">
                                  HOME ADDRESS
                                </label>
                                <ErrorMessage
                                  name="home_address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.phone_number && errors.phone_number
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="phone_number"
                                  placeholder="Enter Phone Number"
                                  name="phone_number"
                                />
                                <label htmlFor="phone_number">
                                  PHONE NUMBER
                                </label>
                                <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.phone_number_2 &&
                                    errors.phone_number_2
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="phone_number_2"
                                  placeholder="Enter Phone Number"
                                  name="phone_number_2"
                                />
                                <label htmlFor="phone_number_2">
                                  PHONE NUMBER 2 (Optional)
                                </label>
                                <ErrorMessage
                                  name="phone_number_2"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.occupation && errors.occupation
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="occupation"
                                  placeholder="Enter Occupation Details"
                                  name="occupation"
                                />
                                <label htmlFor="occupation">
                                  OCCUPATION (Optional)
                                </label>
                                <ErrorMessage
                                  name="occupation"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.company_id && errors.company_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="company_id"
                                  name="company_id"
                                >
                                  <option value=""></option>

                                  {companies.data &&
                                    companies.data.map((company) => (
                                      <option
                                        key={company.id}
                                        value={company.id}
                                      >
                                        {company.company_name.toUpperCase()}
                                      </option>
                                    ))}
                                  <option value="PHC">PHC</option>
                                  <option value="CAPRI">CAPRI</option>
                                </Field>
                                <label htmlFor="company_id">COMPANY</label>
                                <ErrorMessage
                                  name="company_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.medical_aid_number &&
                                    errors.medical_aid_number
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="medical_aid_number"
                                  placeholder="Enter Occupation Details"
                                  name="medical_aid_number"
                                />
                                <label htmlFor="medical_aid_number">
                                  MEDICAL AID NUMBER (Optional)
                                </label>
                                <ErrorMessage
                                  name="medical_aid_number"
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
                                    touched.role_id && errors.role_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="role_id"
                                  name="role_id"
                                >
                                  <option value=""></option>
                                  {roles.data &&
                                    roles.data.map((role) => (
                                      <option key={role.id} value={role.id}>
                                        {role.name.toUpperCase()}
                                      </option>
                                    ))}
                                </Field>
                                <label htmlFor="role_id">EMPLOYEE ROLE</label>
                                <ErrorMessage
                                  name="role_id"
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
                            // <SaveButton
                            //   text={"Save New Patient"}
                            //   onClick={handleSubmit}
                            //   disable={isSubmitting}
                            // />
                            <button
                              className="btn btn-primary "
                              type="submit"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                              style={{
                                fontFamily: 'Cooper Black',
                                fontSize: "20px"
                              }}
                            >
                              Save New Patient
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
      </div>
    </>
  );
};

export default AddHmsPatient;
