import React, { useEffect } from "react";
import HmPatientItem from "./hmspatient_item";
import { useGetUsersQuery } from "../../../redux_store/api/userSlice";
import Loading from "../../../components/loader/Loading";

const HmsPatientsTable = ({}) => {
  const {
    data: pts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess && pts?.data) {
    content = pts.data.map((patient) => (
      <HmPatientItem key={patient.id} patient={patient} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  useEffect(() => {
    console.log("Patients List", pts);
  }, [pts]);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th
                className="pointer-style"
                style={{
                  cursor: "pointer",
                }}
              >
                ID
              </th>
              <th className="pointer-style">First Name</th>
              <th className="pointer-style">Last Name</th>
              <th className="pointer-style">Company</th>
              <th>National_ID</th>
              <th>Date Of Birth</th>
              <th>Phone Number</th>
              <th>Employee Number</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Relationship</th>
              <th className="fw-500">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </>
  );
};

export default HmsPatientsTable;
