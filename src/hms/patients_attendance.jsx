import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useGetUsersQuery } from "../redux_store/api/userSlice";
import { Link } from "react-router-dom";

const PatientsAttendance = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [loading, setLoading] = useState(false);
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

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

  const getCheckedInUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/today/checkin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setCheckedInUsers(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCheckIn = async (userId) => {
    setLoading(true);
    const checkInData = {
      user_id: parseInt(userId),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/patient/checkin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkInData),
        }
      );

      if (!response.ok) {
        // If the response status is not OK (e.g., 404 or 500),
        // throw an error and handle it in the catch block.
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      // You might want to do something with the responseData here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error more gracefully, e.g., show an error message to the user.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    handleSearch(searchQuery);
    getCheckedInUsers();
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
                          {checkedInUsers && (
                            <td>
                              {loading ? (
                                <h1>Loading...</h1>
                              ) : (
                                <>
                                  {checkedInUsers.some((checkedUser) => {
                                    const checkinDate =
                                      checkedUser?.checkin.split(" ")[0];
                                    return (
                                      checkedUser.user?.id === user.id &&
                                      checkinDate === currentDateString
                                    );
                                  }) ? (
                                    <span
                                      role="img"
                                      aria-label="Checked In"
                                      style={{
                                        fontSize: "2em",
                                        paddingLeft: "45px",
                                      }}
                                    >
                                      ✅
                                    </span>
                                  ) : (
                                    <button
                                      className="btn btn-success-light"
                                      style={{
                                        fontWeight: "bold",
                                      }}
                                      onClick={() => handleCheckIn(user.id)}
                                    >
                                      CHECK IN
                                    </button>
                                  )}
                                </>
                              )}
                            </td>
                          )}

                          <td>
                            <Link
                              to={`/hms/assign/consultant/${user.id}`}
                              className="btn btn-outline btn-success me-5"
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              FORWARD PATIENT
                            </Link>
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
