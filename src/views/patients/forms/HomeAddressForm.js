import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddressSchema = Yup.object().shape({
  street: Yup.string().nullable(),
  address: Yup.string().nullable(),
  city: Yup.string().nullable(),
  province: Yup.string().nullable(),
});

const HomeAddressForm = ({ handlePrev, handleNext }) => {
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4>Home Address</h4>
              <p>Please Enter Your Home Address!</p>
              <Formik
                initialValues={{
                  street: "",
                  address: "",
                  city: "",
                  province: "",
                }}
                validationSchema={AddressSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="street">Street</label>
                      <Field
                        type="text"
                        className={`form-control my-upload ${
                          errors.street && touched.street ? "is-invalid" : ""
                        }`}
                        name="street"
                      />
                      <ErrorMessage
                        name="street"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <Field
                        type="text"
                        className={`form-control my-upload ${
                          errors.address && touched.address ? "is-invalid" : ""
                        }`}
                        name="address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <Field
                            type="text"
                            className={`form-control my-upload${
                              errors.city && touched.city ? "is-invalid" : ""
                            }`}
                            name="city"
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="province">Province</label>
                          <Field
                            as="select"
                            className={`form-control my-upload ${
                              errors.province && touched.province
                                ? "is-invalid"
                                : ""
                            }`}
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
                          <ErrorMessage
                            name="province"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <button type="submit" className="btn btn-primary">
                      Submit
                    </button> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
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
        <button onClick={handlePrev}>Previous</button>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default HomeAddressForm;
