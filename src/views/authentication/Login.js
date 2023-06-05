import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import axios from "axios";
import { authActions } from "../../redux_store/auth-store";
import ErrorNotification from "../../components/notifications/ErrorNotification";

const Login = () => {
  const [signinValues, setSigninValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!signinValues.email.trim()) {
      errors.email = "Email field is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signinValues.email)) {
      errors.email = "Email field is invalid";
      isValid = false;
    }
    if (!signinValues.password.trim()) {
      errors.password = "Password field is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleFormChange = (e) => {
    setSigninValues({ ...signinValues, [e.target.name]: e.target.value });
  };

  const styles = {
    logoStyles: {
      height: "80px",
    },

    pageH: {
      height: "100vh",
      overflow: "hidden",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...signinValues };
    console.log("SIGIN DATA", JSON.stringify(data));

    userSignin(data).then((data) => {
      if (data.message === "Invalid Credentials") {
        setSigninValues({
          ...setSigninValues,
        });
        setError(data.message);
      } else {
        dispatch(
          authActions.setLogin({
            user: data.user,
            token: data.access_token,
            isAuth: true,
            role: data.user.role,
          })
        );
        setRedirectToHome(true);
        setSigninValues({
          ...signinValues,
          email: "",
          password: "",
        });
      }
    });
  };

  const userSignin = async (user) => {
    if (validateForm()) {
      setIsLoading(true);
      return fetch(`${API}/user/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((response) => {
          setIsLoading(false);
          return response.json();
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          if (err.message === "Failed to fetch") {
            setError("Server is offline. Please try again later.");
          } else {
            setError("There was an error. Please try again.");
          }
        });
    }
  };

  useEffect(() => {
    if (redirectToHome) {
      navigate("/dashboard");
    } else {
      return;
    }
  }, [redirectToHome]);

  return (
    <Fragment>
      <div className="hold-transition theme-primary " style={styles.pageH}>
        <div className="container h-p100">
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0  adjust-position">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-white rounded10 shadow-lg">
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
                        Sign in to continue to Phc Medicals
                      </p>
                    </div>

                    {error && <ErrorNotification message={error} />}
                    <div className="p-40">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent">
                              <i className="ti-user"></i>
                            </span>
                            <input
                              type="email"
                              name="email"
                              className={`form-control ps-15 bg-transparent ${
                                errors.email ? "error-input" : ""
                              }`}
                              placeholder="User Email"
                              onChange={handleFormChange}
                              value={signinValues.email}
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
                            <span className="input-group-text bg-transparent">
                              <i className="ti-lock"></i>
                            </span>
                            <input
                              type="password"
                              className={`form-control ps-15 bg-transparent ${
                                errors.password ? "error-input" : ""
                              }`}
                              placeholder="Password"
                              name="password"
                              onChange={handleFormChange}
                              value={signinValues.password}
                            />
                          </div>
                          {errors.password && (
                            <span className="text-danger">
                              <strong> {errors.password}</strong>
                            </span>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="checkbox">
                              <input type="checkbox" id="basic_checkbox_1" />
                              <label htmlFor="basic_checkbox_1">
                                Remember Me
                              </label>
                            </div>
                          </div>
                          {/* <!-- /.col --> */}
                          <div className="col-6">
                            <div className="fog-pwd text-end">
                              <Link to={"/"} className="hover-warning">
                                <i className="ion ion-locked"></i> Forgot pwd?
                              </Link>
                              <br />
                            </div>
                          </div>
                          {/* <!-- /.col --> */}
                          <div className="col-12 text-center">
                            {isLoading ? (
                              <Loading />
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-danger mt-10"
                              >
                                SIGN IN
                              </button>
                            )}
                          </div>
                          {/* <!-- /.col --> */}
                        </div>
                      </form>
                      <div className="text-center">
                        <p className="mt-15 mb-0">
                          Don't have an account?
                          <Link className="text-warning ms-5" to={"/register"}>
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="mt-20 text-white">- Sign With -</p>
                    <p className="gap-items-2 mb-20">
                      <Link
                        className="btn btn-social-icon btn-round btn-facebook"
                        to={"/"}
                      >
                        <i className="fa fa-facebook"></i>
                      </Link>
                      <Link
                        className="btn btn-social-icon btn-round btn-twitter"
                        to={"/"}
                      >
                        <i className="fa fa-twitter"></i>
                      </Link>
                      <Link
                        className="btn btn-social-icon btn-round btn-instagram"
                        to={"/"}
                      >
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </p>
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

export default Login;
