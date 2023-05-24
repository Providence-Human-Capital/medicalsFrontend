import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import Loading from "../../components/loader/Loading";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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
        navigate("/login")
        return response.json();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className="container h-p100">
        <div className="row align-items-center justify-content-md-center h-p100">
          <div className="col-12">
            <div className="row justify-content-center g-0 adjust-position">
              <div className="col-lg-5 col-md-5 col-12">
                <div className="bg-white rounded10 shadow-lg">
                  <div className="content-top-agile p-20 pb-0">
                    <h2 className="text-primary">Get started with PHC</h2>
                    <p className="mb-0">Register a new membership</p>
                  </div>
                  <div className="p-40">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent">
                            <i className="ti-user"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control ps-15 bg-transparent"
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text bg-transparent">
                            <i className="ti-email"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control ps-15 bg-transparent"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Email"
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
                            id="password"
                            value={formData.password}
                            name="password"
                            onChange={handleFormChange}
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
                            placeholder="Retype Password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
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
                              Receptionist
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
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
                        <div className="col-4">
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
                        {/* <!-- /.col --> */}

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

                        {/* <!-- /.col --> */}
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

                <div className="text-center">
                  <p className="mt-20 text-white">- Register With -</p>
                  <p className="gap-items-2 mb-20">
                    <Link
                      className="btn btn-social-icon btn-round btn-facebook"
                      href="#"
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                    <Link
                      className="btn btn-social-icon btn-round btn-twitter"
                      href="#"
                    >
                      <i className="fa fa-twitter"></i>
                    </Link>
                    <Link
                      className="btn btn-social-icon btn-round btn-instagram"
                      href="#"
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
    </Fragment>
  );
};

export default Register;
