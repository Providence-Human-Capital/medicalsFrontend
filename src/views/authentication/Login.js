import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Fragment>
      <div className="hold-transition theme-primary bg-img">
        <div className="container h-p100">
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-white rounded10 shadow-lg">
                    <div className="content-top-agile p-20 pb-0">
                      <h2 className="text-primary">Let's Get Started</h2>
                      <p className="mb-0">Sign in to continue to Rhythm.</p>
                    </div>
                    <div className="p-40">
                      <form>
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent">
                              <i className="ti-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control ps-15 bg-transparent"
                              placeholder="Username"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent">
                              <i className="ti-lock"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control ps-15 bg-transparent"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="checkbox">
                              <input type="checkbox" id="basic_checkbox_1" />
                              <label for="basic_checkbox_1">Remember Me</label>
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
                            <button
                              type="submit"
                              className="btn btn-danger mt-10"
                            >
                              SIGN IN
                            </button>
                          </div>
                          {/* <!-- /.col --> */}
                        </div>
                      </form>
                      <div className="text-center">
                        <p className="mt-15 mb-0">
                          Don't have an account?
                          <Link
                            href="auth_register.html"
                            className="text-warning ms-5"
                          >
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
