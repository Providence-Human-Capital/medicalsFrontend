import React, { useEffect } from "react";

const BookAppointment = ({}) => {
  return (
    <>
      <div class="d-flex py-3">
        <div class="">
          <div class="row align-items-center">
            <div class="border-0 mb-4">
              <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 class="fw-bold mb-0">Appointment Booking</h3>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-12">
              <div class="card mb-3">
                <div class="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                  <h6 class="mb-0 fw-bold ">Basic Inforamtion</h6>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row g-3 align-items-center">
                      <div class="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="firstname"
                          />
                          <label for="firstname" class="form-label">
                            Full Name
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="phonenumber"
                          />
                          <label for="phonenumber" class="form-label">
                            Phone Number
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            class="form-control"
                            id="emailaddress"
                          />
                          <label for="emailaddress" class="form-label">
                            Email Address
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Gender</label>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios11"
                                value="option1"
                                checked=""
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios11"
                              >
                                Male
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios22"
                                value="option2"
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios22"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <input
                            type="date"
                            class="form-control"
                            id="admitdate"
                          />
                          <label for="admitdate" class="form-label">
                            Appointment Date
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <input
                            type="time"
                            class="form-control"
                            id="admittime"
                          />
                          <label for="admittime" class="form-label">
                            Appointment Time
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected="">Select Reson</option>
                            <option value="1">Surgeory</option>
                            <option value="2">Dentist Chekup</option>
                            <option value="3">Body Chekup</option>
                            <option value="4">Gynecologist Chekup</option>
                            <option value="5">Other Service</option>
                          </select>
                          <label class="form-label">Select Reson</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="form-floating">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected="">Select Doctor</option>
                            <option value="1">DR.Peter</option>
                            <option value="2">DR.Mary</option>
                            <option value="3">DR.Zoe</option>
                            <option value="4">DR.Lily</option>
                            <option value="5">DR.Adrian</option>
                          </select>
                          <label class="form-label">Select Doctor</label>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div className="form-floating">
                          <textarea
                            class="form-control"
                            id="addnote"
                            style={{
                                minHeight: "200px"
                            }}
                            rows="3"
                          ></textarea>
                          <label for="addnote" class="form-label">
                            Add Note
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary mt-4">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
