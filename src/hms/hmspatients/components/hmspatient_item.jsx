import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetUserDependantsQuery } from "../../../redux_store/api/userSlice";

const HmPatientItem = ({ patient }) => {
  const {
    data: usrd,
    isFetching,
    isSuccess,
  } = useGetUserDependantsQuery(patient.id);

  const viewPatientDetails = async () => {
    Swal.fire({
      title: "PATIENT QUICK VIEW",
      width: "100vw",
      html: `
      <section class="content">
         <div class="row">
            <div class="col-xl-4 col-12">
              <div class="box">
                  <div class="box-body text-end min-h-150">
                      <div class="box-body wed-up position-relative">
                        <div class="d-md-flex align-items-center">
                          <div class="me-20 text-center text-md-start" 
                            style="margin-top: 20px"
                            >
                              <img
                                src="/assets/images/avatar/2.jpg"
                                className="bg-success-light rounded10"
                                alt=""
                                style="border-radius: 50%"
                              />
                              <div class="text-center my-10">
                                  <p class="mb-0" style="font-weight: bold">Account Owner</p>
                                  <h4> 
                                   <span class="badge badge-pill badge-info"> 
                                      ${usrd.account_holder.relationship} 
                                   </span> 
                                  
                                  </h4>
                              </div>
                          </div>
                          <div class="mt-40">
                            <h4 class="fw-600 mb-5">
                              ${usrd.account_holder.first_name} ${
                                  usrd.account_holder.last_name
                                }
                            </h4>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="col-xl-8 col-12">
                  <p>${JSON.stringify(usrd)}</p>
            </div>
         </div>
      </section>
      `,
    });
  };

  useEffect(() => {
    console.log("users_detail", usrd);
  }, []);

  return (
    <>
      <tr className="hover-primary" style={{
       }}>
        <td>PT-{patient.id}</td>
        <td>{patient.first_name}</td>
        <td>{patient.last_name}</td>
        <td>{patient.company && patient.company.company_name.toUpperCase()}</td>
        <td>{patient.national_id}</td>
        <td>{patient.date_of_birth}</td>
        <td>{patient.phone_number}</td>
        <td>{patient.employee_number}</td>
        <td>{patient.gender}</td>
        <td>
          {patient.role &&
            (patient.role.name === "Dependant" ? (
              <span className="badge badge-pill badge-primary">
                {patient.role.name}
              </span>
            ) : (
              <span className="btn btn-sm btn-primary-light me-4">
                {patient.role.name}
              </span>
            ))}
        </td>

        <td>
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => viewPatientDetails()}
          >
            {patient.relationship === "self" ? (
              <span className="badge badge-success-light">
                {patient.relationship}
              </span>
            ) : (
              <span className="badge badge-pill badge-warning">
                {patient.relationship}
              </span>
            )}
          </span>
        </td>

        <td className="text-end">
          <Link
            to={`/hms/patient/${patient.id}`}
            className="waves-effect waves-light btn btn-primary-light btn-circle"
          >
            <span className="icon-Settings-1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </Link>

          <a className="waves-effect waves-light btn btn-primary-light btn-circle">
            <span className="icon-Trash1 fs-18">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </a>
        </td>
      </tr>
    </>
  );
};

export default HmPatientItem;
