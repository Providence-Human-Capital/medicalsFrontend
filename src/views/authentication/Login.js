import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import axios from "axios";
import { authActions } from "../../redux_store/auth-store";
import ErrorNotification from "../../components/notifications/ErrorNotification";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const [signinValues, setSigninValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedTab, setSelectedTab] = useState("Medicals");
  const userType = useSelector((state) => state.auth.user?.type);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

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
      height: "100vh !important",
      overflow: "hidden",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...signinValues };
    console.log("SIGIN DATA", JSON.stringify(data));

    userSignin(data).then((data) => {
      console.log("Response, data:", data);
      if (data.message === "Invalid Credentials") {
        Swal.fire({
          title: "Failed to login",
          text: "Invalid credentials / User does not exist!",
          icon: "error",
        });

        setError("Invalid credentials / User does not exist");
      }
      if (data.message === "Too Many Attempts.") {
        setError("Too Many Attempts when trying to login, Cool down");
      }
      if (data.message === "Invalid Credentials / Wrong account Portal") {
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
            role: "admin",
            type: data.user.type,
          })
        );
        setRedirectToHome(true);
        if (data.user.type === "clinic" || data.user.type === "admin") {
          navigate("/dashboard/clinic");
        } else if (data.user.type === "medicals") {
          navigate("/dashboard");
        }
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
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Hey 👋👋👋, you've successfully logged in!",
              timer: 4000,
              confirmButtonColor: "#007a41",
            });
          }
          return response.json();
        })
        .catch((err) => {
          setIsLoading(false);

          console.log(err);
          if (err.message === "Failed to fetch") {
            // toast.error("🚫🚫 Server is offline. Please try again later.");
            setError("🚫🚫 Server is offline. Please try again later.");
          } else {
            // toast.error("🚫🚫 There was an error. Please try again.");
            setError(" 🚫🚫 There was an error. Please try again.");
          }
        });
    }
  };

  const renderLoginForm = () => {
    return (
      <div className="bg-white borderr  shadow-lg">
        <div className="content-top-agile p-20 pb-0">
          <div className="logo-lg">
            <span className="light-logo">
              <img
                src="/assets/images/providence.png"
                // src="assets/images/providence.png"
                alt="logo"
                style={styles.logoStyles}
              />
            </span>
          </div>
          <p className="mb-0">
            {selectedTab === "Medicals"
              ? "Sign in to continue to Phc Medicals"
              : "Sign in to continue to Phc Clinic"}{" "}
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
                  type="email"
                  name="email"
                  className={`form-control ps-15 bg-transparent adjust-height ${
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
                <span className="input-group-text bg-transparent adjust-height ">
                  <i className="ti-lock"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ps-15 bg-transparent adjust-height  ${
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
                  <label htmlFor="basic_checkbox_1">Remember Me</label>
                </div>
              </div>
              {/* <!-- /.col --> */}
              <div className="col-6">
                <div className="fog-pwd text-end">
                  {/* <Link to={"/"} className="hover-warning">
                    <i className="ti-lock"></i> Forgot password?
                  </Link>
                  <br /> */}
                </div>
              </div>
              {/* <!-- /.col --> */}
              <div className="col-12 text-center">
                {isLoading ? (
                  <Loading />
                ) : (
                  <button type="submit" className="btn btn-danger mt-10">
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
              <Link className="text-warning ms-5">Contact IT</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // if (redirectToHome) {
    //   if (userType && userType === "clinic") {
    //     navigate("/dashboard/clinic");
    //   }
    //   navigate("/dashboard");
    // } else {
    //   return;
    // }
  }, [redirectToHome]);

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
            <div className="row justify-content-center g-0">
              <div className="col-lg-5 col-md-5 col-12">
                <div className="bg-white  shadow-lg  bor">
                  <ul className="nav nav-tabs nav-tabs-top nav-justified bor">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#top-justified-tab1"
                        data-bs-toggle="tab"
                        onClick={() => handleTabChange("Medicals")}
                      >
                        Medicals
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#top-justified-tab2"
                        data-bs-toggle="tab"
                        onClick={() => handleTabChange("Hospital")}
                      >
                        Clinic
                      </a>
                    </li>
                  </ul>
                </div>

                {renderLoginForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
