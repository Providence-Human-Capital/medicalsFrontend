import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Loading from "../../../components/loader/Loading";
import SaveButton from "../../../components/buttons/SaveButton";
const employeeRoles = [
  {
    id: 1,
    name: "Patient",
  },
  {
    id: 2,
    name: "Employee",
  },
  {
    id: 3,
    name: "Nurse",
  },
  {
    id: 4,
    name: "Doctor",
  },
  {
    id: 5,
    name: "Next of Kin",
  },
  {
    id: 6,
    name: "Admin",
  },
  {
    id: 7,
    name: "Receptionist",
  },
  {
    id: 8,
    name: "Nurse Aid",
  },
];

const types = [
  {
    id: 1,
    name: "medicals",
  },
  {
    id: 2,
    name: "clinic",
  },
];

const UserAssignment = ({}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    user_id: "",
    email: "",
    password: "",
    role_id: "",
    type: "",
  };

  const validationSchema = yup.object().shape({
    user_id: yup
      .number()
      .required("Select The User You Want Assign Auth Rights"),
    email: yup.string().email().required("Enter The Email"),
    password: yup.string().required("Enter the Password"),
    role_id: yup.number().required("Select The Role"),
    type: yup.string().required("Select The User Type"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {};

  useEffect(() => {}, []);

  return (
    <>
      <BreadCrumb
        title={"Adminstator"}
        activeTab={"Assign Administrative User"}
      />
      <div className="separation-div"></div>
      <div className="section">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="card">
              <div className="">
                <div className="box-body">
                  <div>
                    <h4
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      ASSIGN USER ADMINISTRATIVE RIGHTS
                    </h4>
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
                                  as="select"
                                  className={`form-select ${
                                    touched.user_id && errors.user_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="user_id"
                                  name="user_id"
                                >
                                  <option value=""></option>
                                  <option value={1}>Tafadzwa Gashira</option>
                                </Field>
                                <label htmlFor="user_id">USER</label>
                                <ErrorMessage
                                  name="user_id"
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
                                    touched.email && errors.email
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="email"
                                  placeholder="Enter Middle Name"
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
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-4">
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
                                  {employeeRoles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                      {role.name}
                                    </option>
                                  ))}
                                </Field>
                                <label htmlFor="role_id">USER ROLE</label>
                                <ErrorMessage
                                  name="role_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.type && errors.type
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="type"
                                  name="type"
                                >
                                  <option value=""></option>
                                  {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                      {type.name}
                                    </option>
                                  ))}
                                </Field>
                                <label htmlFor="type">TYPE OF AUTH</label>
                                <ErrorMessage
                                  name="type"
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
                                  type="password"
                                  className={`form-control ${
                                    touched.password && errors.password
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="password"
                                  placeholder="Preffered User Password"
                                  name="password"
                                />
                                <label htmlFor="password">PASSWORD</label>
                                <ErrorMessage
                                  name="password"
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
                            <SaveButton
                              text={"Save User"}
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
          <div className="col-xl-4 col-12">
            <h4>EXISTING USERS</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAssignment;
