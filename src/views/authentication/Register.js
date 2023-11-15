import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import Loading from "../../components/loader/Loading";
import ErrorNotification from "../../components/notifications/ErrorNotification";
import "./Auth.css";

const Register = () => {
  const styles = {
    logoStyles: {
      height: "80px",
    },

    pageH: {
      height: "100vh !important",
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    if (!formData.name.trim()) {
      errors.name = "Name field is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email field is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (formData.password_confirmation !== formData.password) {
      errors.password_confirmation = "Passwords do not match";
      isValid = false;
    }
    if (!selectedValue) {
      errors.role = "Please select a role";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleCheckboxChange = (value) => {
    setSelectedValue(value);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, role: selectedValue };
    console.log("DATA", JSON.stringify(data));

    if (validateForm()) {
      setIsLoading(true);
      return fetch(`${API}/user/register`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => {
          setIsLoading(false);
          console.log(response);
          navigate("/login");
          return response.json();
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.message === "Failed to fetch") {
            setError("Server is offline. Please try again later.");
          } else {
            setError("There was an error. Please try again.");
          }

          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  };

  return (
    <Fragment>
      <div className="container h-p100">
        <div
          className="row align-items-center justify-content-md-center h-p100"
          style={{
            marginTop: "12rem",
          }}
        >
          <div className="col-12">
            <div className="row justify-content-center g-0 " >
              <div className="col-lg-5 col-md-5 col-12">
                <div className="bg-white rounded10 shadow-lg" >
                  <div className="content-top-agile p-20 pb-0">
                    <div className="logo-lg">
                      <span className="light-logo">
                        <img
                          src="/assets/images/providence.png"
                          alt="logo"
                          style={styles.logoStyles}
                        />
                      </span>
                    </div>
                    <p className="mb-0">
                      <strong>Register a new membership</strong>
                    </p>
                  </div>
                  {error && <ErrorNotification message={error} />}

                  <div className="p-40">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent adjust-height">
                            <i className="ti-user"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control ps-15 bg-transparent adjust-height ${
                              errors.name ? "error-input" : ""
                            }`}
                            id="name"
                            name="name"
                            placeholder="Username"
                            value={formData.name}
                            onChange={handleFormChange}
                          />
                        </div>
                        {errors.name && (
                          <span className="text-danger">
                            <strong>{errors.name}</strong>
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent adjust-height">
                            <i className="ti-email"></i>
                          </span>
                          <input
                            type="email"
                            className={`form-control ps-15 bg-transparent adjust-height ${
                              errors.email ? "error-input" : ""
                            }`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Email"
                          />
                        </div>
                        {errors.email && (
                          <span className="text-danger">
                            <strong>{errors.email}</strong>
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent adjust-height">
                            <i className="ti-lock"></i>
                          </span>
                          <input
                            type="password"
                            className={`form-control ps-15 bg-transparent adjust-height ${
                              errors.password ? "error-input" : ""
                            }`}
                            placeholder="Password"
                            id="password"
                            value={formData.password}
                            name="password"
                            onChange={handleFormChange}
                          />
                        </div>
                        {errors.password && (
                          <span className="text-danger">
                            <strong> {errors.password}</strong>
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent adjust-height">
                            <i className="ti-lock"></i>
                          </span>
                          <input
                            type="password"
                            className={`form-control ps-15 bg-transparent adjust-height ${
                              errors.password_confirmation ? "error-input" : ""
                            }`}
                            placeholder="Retype Password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleFormChange}
                          />
                        </div>
                        {errors.password_confirmation && (
                          <span className="text-danger">
                            <strong> {errors.password_confirmation}</strong>{" "}
                          </span>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id="basic_checkbox_1"
                              checked={selectedValue === "receptionist"}
                              onChange={() =>
                                handleCheckboxChange("receptionist")
                              }
                            />
                            <label htmlFor="basic_checkbox_1">
                              Recep
                            </label>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id="basic_checkbox_2"
                              checked={selectedValue === "medical_staff"}
                              onChange={() =>
                                handleCheckboxChange("medical_staff")
                              }
                            />
                            <label htmlFor="basic_checkbox_2">
                              Medical Stuff
                            </label>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id="basic_checkbox_3"
                              checked={selectedValue === "admin"}
                              onChange={() => handleCheckboxChange("admin")}
                            />
                            <label htmlFor="basic_checkbox_3">Admin</label>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              id="basic_checkbox_4"
                              checked={selectedValue === "doctor"}
                              onChange={() => handleCheckboxChange("doctor")}
                            />
                            <label htmlFor="basic_checkbox_3">Doctor</label>
                          </div>
                        </div>
                        {errors.role && (
                          <span className="text-danger">
                            <strong>{errors.role}</strong>
                          </span>
                        )}

                        {!isLoading && (
                          <div className="col-12 text-center mt-4">
                            <button
                              type="submit"
                              className="btn btn-info margin-top-10"
                            >
                              SIGN UP
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                    <div className="text-center">
                      {!isLoading ? (
                        <p className="mt-15 mb-0">
                          Already have an account?
                          <Link to={"/login"} className="text-danger ms-5">
                            Sign In
                          </Link>
                        </p>
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
