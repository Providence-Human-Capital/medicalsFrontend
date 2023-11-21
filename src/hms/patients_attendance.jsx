import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useGetUsersQuery } from "../redux_store/api/userSlice";

const PatientsAttendance = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users, error, isLoading } = useGetUsersQuery();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users?.data.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.national_id.includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    // Fetch all users when the component mounts
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <BreadCrumb
        title={"Patients Attendance"}
        activeTab={"Patients Search Engine"}
      />
      <section className="content">
        <div className="mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="box p-3  py-4">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  PATIENTS GOOGLE
                </h4>
                <div className="row g-3 mt-2">
                  <div className="col-md-3">
                    <div className="form-floating">
                      <select className="form-select">
                        <option value="">ANY STATUS</option>
                        <option value="PENDING">HOLDER</option>
                        <option value="READY">DEPENDANT</option>
                      </select>
                      <label>SELECT TYPE</label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name or Last Name or National ID"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <label>
                        Enter First Name or Last Name or National ID
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary btn-block">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {}
        <div class="col-12">
          <div class="box">
            <div class="box-body">
              <h4 class="box-title"></h4>
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th class="bb-2">No.</th>
                      <th class="bb-2">First Name</th>
                      <th class="bb-2">Last Name</th>
                      <th class="bb-2">National ID</th>
                      <th class="bb-2">Company</th>
                      <th class="bb-2">Employee Number</th>

                      <th class="bb-2">Mark Attendance</th>
                      <th class="bb-2">Assing Doctor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers &&
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>PT-{user.id}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>
                            <span class="badge badge-warning">
                              {user.national_id}
                            </span>
                          </td>
                          <td>{user.company?.company_name.toUpperCase()}</td>
                          <td>{user.employee_number}</td>
                          <td>
                            <button
                              className="btn btn-success-light"
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              CHECK
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline btn-success me-5"
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              FORWARD PATIENT
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientsAttendance;
