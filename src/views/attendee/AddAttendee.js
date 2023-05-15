import React, { Fragment } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import "./components-style/Attendee.module.css"

const AddAttendee = ({}) => {

  const styles = {
    formContainer: {
      width: "70%",
      margin: "3rem auto"
    }
  }

  return (
    <Fragment>
      <BreadCrumb title={"Add Attendee"} activeTab={"Add Attendee"} />
      <div className="row">
        <div className="col-xl-12 col-12">
          <div class="box">
            <div className="custom-form">
            <div class="box-body">
              <div class="container">
                <h2>Enter your Attendes details</h2>

                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="first_name">First Name:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="first_name"
                          placeholder="Enter first name"
                          name="first_name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="last_name">Last Name:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="last_name"
                          placeholder="Enter last name"
                          name="last_name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="x_ray_status">X-ray Status:</label>
                        <select
                          class="form-control"
                          id="x_ray_status"
                          name="x_ray_status"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="DONE">DONE</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="company_name">Company Name:</label>
                        <select
                          class="form-control"
                          id="company_name"
                          name="company_name"
                        >
                          <option value="">Select a company</option>
                          {/* <!-- add options dynamically from database using PHP --> */}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="gender">Gender:</label>
                        <select class="form-control" id="gender" name="gender">
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="national_id"> Employee Number:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="employee_number"
                          placeholder="Enter Employee Number"
                          name="employee_number"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="national_id">National ID:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="national_id"
                          placeholder="Enter national ID"
                          name="national_id"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="phone_number">Phone Number:</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <select
                              class="form-control"
                              id="country_code"
                              name="country_code"
                            >
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+91">+91</option>
                              {/* <!-- add more country codes as needed --> */}
                            </select>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            id="phone_number"
                            placeholder="Enter phone number"
                            name="phone_number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="date_of_birth">Date of Birth:</label>
                        <input
                          type="date"
                          class="form-control"
                          id="date_of_birth"
                          placeholder="Enter date of birth"
                          name="date_of_birth"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>

                
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddAttendee;
