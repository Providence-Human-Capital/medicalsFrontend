import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loader/Loading";
import { API } from "../../../config";
import { uiActions } from "../../../redux_store/ui-store";
import { formsActions } from "../../../redux_store/forms-store";
import { toast } from "react-toastify";
import FormButton from "../../../components/buttons/FormButton";
import PhysicalExamForm from "./PhysicalExamForm";

const HomeAddressForm = ({ handlePrev, handleNext }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const AddressSchema = Yup.object().shape({
    street: Yup.string().nullable(),
    address: Yup.string().required("Please enter the address atleast"),
    city: Yup.string().nullable(),
    province: Yup.string().required("Please select the province"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      dispatch(uiActions.setLoadingSpinner({ isLoading: true }));
      const response = await fetch(`${API}/home/address/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
      toast.dark("Home address successfully updated!");
      dispatch(formsActions.setHomeAddress(responseData.data));

      handleNext();
    } catch (err) {
      console.log("Error", err);
      dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
    }
  };

  useEffect(() => {
    dispatch(uiActions.setLoadingSpinner({ isLoading: false }));
  }, []);
  return (
    <div className="step-form">
      <div className="box">
        <div className="custom-form">
          <div className="box-body">
            <div className="container">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Home Address</strong>
              </h4>
              <p>Please Enter Your Home Address!</p>
              <Formik
                initialValues={{
                  street: "",
                  address: "",
                  city: "",
                  province: "",
                }}
                validationSchema={AddressSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label
                        htmlFor="street"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Street
                      </label>
                      <div className="form-floating">
                        <Field
                          type="text"
                          className={`form-control ${
                            errors.street && touched.street ? "is-invalid" : ""
                          }`}
                          name="street"
                        />
                        <label htmlFor="street">ENTER THE STREET NAME</label>
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="address"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </label>
                      <div className="form-floating">
                        <Field
                          type="text"
                          className={`form-control ${
                            errors.address && touched.address
                              ? "is-invalid"
                              : ""
                          }`}
                          name="address"
                        />
                        <label htmlFor="street">ENTER THE ADDRESS</label>
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="province"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            City
                          </label>
                          <div className="form-floating">
                            <Field
                              type="text"
                              className={`form-control ${
                                errors.city && touched.city ? "is-invalid" : ""
                              }`}
                              name="city"
                            />
                            <label htmlFor="city">ENTER THE CITY</label>
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="province"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            Province
                          </label>
                          <div className="form-floating">
                            <Field
                              as="select"
                              className={`form-select ${
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
                            <label htmlFor="province">SELECT PROVINCE</label>
                            <ErrorMessage
                              name="province"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <button type="submit" className="btn btn-primary">
                      Submit
                    </button> */}
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
                      {/* <button onClick={handlePrev}>Previous</button> */}
                      <FormButton
                        text={"Previous"}
                        direction={"left"}
                        onClick={handlePrev}
                      />

                      {isLoading ? (
                        <Loading />
                      ) : (
                        // <button onClick={handleNext}>Temp Next</button>
                        // <button onClick={onSubmit} type="submit">Next</button>
                        <FormButton
                          text={"Next"}
                          direction={"right"}
                          onClick={onSubmit}
                        />
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAddressForm;
