import React, { forwardRef, useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import { API } from "../../config";
import EmptyTable from "../../components/EmptyTable";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/loader/Loading";
import { useReactToPrint } from "react-to-print";
import DnotePrintCompanyCN from "../certificates/d-note/DnotePrintCompanyCN";
import { PHYSICAL_EXAM } from "../../helpers/helpers";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { automaticallyAddCertificatesToDnoteAPI } from "../../services/api";

const PrintDnote = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref}>
      <>
        <DnotePrintCompanyCN data={data} />
      </>
    </div>
  );
});

const DnoteEditPage = () => {
  const { dnoteId, dnoteName } = useParams();
  const [ids, setIds] = useState([]);
  const [clients, setClients] = useState([]);
  const [savingCertificateNumber, setSavingCertificateNumber] = useState(false);
  const [editValue, setEditValue] = useState(null);

  const isDisabled = dnoteName.includes("Simbisa");

  const simbisaDnotes =
    useSelector((state) => state.certificate.simbisaDnotes) || [];

  const initialValues = {
    certificate_number: "",
  };

  const editInitialValue = {
    certificate_number: editValue,
  };

  const validationSchema = yup.object().shape({
    certificate_number: yup.string().required("Enter Certificate Number"),
  });

  const onEditCertificateNumber = (editValue) => {
    setEditValue(editValue);
  };

  const handleCheckboxChange = (id) => {
    if (ids.includes(id)) {
      setIds(ids.filter((item) => item !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  const addCerticatesToDnote = async () => {
    if (simbisaDnotes) {
      Swal.fire({
        title: "Select D-Note",
        html: `
        <select id="status-select" class="form-select"> 
        <option value="">Select D NOTE</option> 
        ${simbisaDnotes
          .map(
            (dnote) => `<option value="${dnote.name}">${dnote.name}</option>`
          )
          .join("")} 
        `,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: () => {
          const selectElement = document.getElementById("status-select");
          const selectedValue =
            selectElement.options[selectElement.selectedIndex].value;
          return selectedValue;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedValue = result.value;
          automaticallyAddCertificatesToDnoteAPI(selectedValue, ids);
        } else {
          handleCancel();
        }
      });
    }
  };

  const handleCancel = () => {
    Swal.close();
  };

  const onSubmit = async (certificateId, values) => {
    const requestData = {
      certificate_number: values.certificate_number,
    };
    try {
      setSavingCertificateNumber(true);
      const response = await fetch(
        `${API}/patient/certificate/${certificateId}/number`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        // Handle successful response
        console.log("Certificate number updated successfully");
        automaticallyGetCertificatesOfDnote(dnoteName);
      } else {
        // Handle error response
        console.log("Error updating certificate number");
      }
      setSavingCertificateNumber(false);
    } catch (error) {
      console.log(error);
      setSavingCertificateNumber(false);
    }

    // console.log("CertificateId", JSON.stringify(certificateId));
    // console.log("CertificateValue", JSON.stringify(values.certificate_number));
  };

  const automaticallyGetCertificatesOfDnote = async (dnoteName) => {
    try {
      const response = await fetch(
        `${API}/dnote/${dnoteName}/get/certificates`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log("Get Dnote Name", responseData);
        const certificates = responseData.dnote.certificates;
        setClients(certificates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    automaticallyGetCertificatesOfDnote(dnoteName);
  }, [dnoteId, dnoteName]);

  const printDnoteRef = useRef();

  const handlePrintDnote = useReactToPrint({
    content: () => printDnoteRef.current,
  });

  return (
    <>
      <BreadCrumb activeTab={dnoteName} title={"SINGLE DNOTE"} />

      <div className="col-12">
        {clients && (
          <>
            <div
              style={{
                display: "none",
              }}
            >
              <PrintDnote ref={printDnoteRef} data={clients} />
            </div>

            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <button
                className="btn btn-secondary"
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                onClick={handlePrintDnote}
              >
                GENERATE DNOTE
              </button>
            </div>
          </>
        )}

        <div className="box">
          <div className="box-body">
            <h4
              className="box-title"
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {dnoteName} DNOTE
            </h4>
            <div className="table-responsive">
              {clients.length <= 0 ? (
                <EmptyTable />
              ) : (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">✅</th>
                      <th className="bb-2">No.</th>
                      <th className="bb-2">First Name</th>
                      <th className="bb-2">Last Name</th>
                      <th className="bb-2">Company</th>
                      <th className="bb-2">Certificate Status</th>
                      <th className="bb-2">Certificate Number</th>
                      <th className="bb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients &&
                      clients.map((client, index) => (
                        <tr key={client.id}>
                          <td>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input checky-input"
                                checked={ids.includes(
                                  client.patient.latest_certificate.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    client.patient.latest_certificate.id
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>{index + 1}</td>
                          <td>{client.patient.attendee.first_name}</td>
                          <td>{client.patient.attendee.last_name}</td>
                          <td>
                            {client.patient.attendee.company.company_name}
                          </td>
                          <td>
                            <strong>
                              {PHYSICAL_EXAM(
                                client.patient.latest_certificate.status
                              )}
                            </strong>
                          </td>
                          <td>
                            {client.patient.latest_certificate
                              .certificate_number !== null && (
                              <span>
                                {editValue ===
                                  client.patient.latest_certificate
                                    .certificate_number && (
                                  <>
                                    <Formik
                                      initialValues={editInitialValue}
                                      validationSchema={validationSchema}
                                    >
                                      {({
                                        values,
                                        isSubmitting,
                                        handleSubmit,
                                        touched,
                                        errors,
                                        setFieldValue,
                                      }) => (
                                        <Form>
                                          <div className="row">
                                            <div className="col-md-8">
                                              <div className="form-floating">
                                                <Field
                                                  type="text"
                                                  className={`form-control`}
                                                  id="certificate_number"
                                                  placeholder="CERTIFICATE NUMBER"
                                                  name="certificate_number"
                                                />
                                                <label htmlFor="certificate_number">
                                                  CERTIFICATE NUMBER
                                                </label>
                                                <ErrorMessage
                                                  name="certificate_number"
                                                  component="div"
                                                  className="text-danger"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="row">
                                                <div className="d-flex">
                                                  {savingCertificateNumber ? (
                                                    <Loading />
                                                  ) : (
                                                    <button
                                                      style={{
                                                        textTransform:
                                                          "uppercase",
                                                        fontWeight: "bold",
                                                      }}
                                                      className="btn btn-primary"
                                                      onClick={() =>
                                                        onSubmit(
                                                          client.patient
                                                            .latest_certificate
                                                            .id,
                                                          values
                                                        )
                                                      }
                                                    >
                                                      Save
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Form>
                                      )}
                                    </Formik>
                                  </>
                                )}
                              </span>
                            )}

                            {client.patient.latest_certificate
                              .certificate_number === null ? (
                              <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                              >
                                {({
                                  values,
                                  isSubmitting,
                                  handleSubmit,
                                  touched,
                                  errors,
                                  setFieldValue,
                                }) => (
                                  <Form>
                                    <div className="row">
                                      <div className="col-md-8">
                                        <div className="form-floating">
                                          <Field
                                            type="text"
                                            className={`form-control`}
                                            id="certificate_number"
                                            placeholder="CERTIFICATE NUMBER"
                                            name="certificate_number"
                                            disabled={
                                              client.patient.latest_certificate
                                                .status !== "READY"
                                            }
                                          />
                                          <label htmlFor="certificate_number">
                                            CERTIFICATE NUMBER
                                          </label>
                                          <ErrorMessage
                                            name="certificate_number"
                                            component="div"
                                            className="text-danger"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="row">
                                          <div className="d-flex">
                                            {savingCertificateNumber ? (
                                              <Loading />
                                            ) : (
                                              <button
                                                style={{
                                                  textTransform: "uppercase",
                                                  fontWeight: "bold",
                                                }}
                                                className="btn btn-primary"
                                                onClick={() =>
                                                  onSubmit(
                                                    client.patient
                                                      .latest_certificate.id,
                                                    values
                                                  )
                                                }
                                                disabled={
                                                  client.patient
                                                    .latest_certificate
                                                    .status !== "READY"
                                                }
                                              >
                                                Save
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display:
                                      editValue ===
                                      client.patient.latest_certificate
                                        .certificate_number
                                        ? "none"
                                        : "inline-block",
                                  }}
                                >
                                  <span>
                                    {
                                      client.patient.latest_certificate
                                        .certificate_number
                                    }
                                  </span>
                                  {"   "}
                                  <span
                                    style={{
                                      marginLeft: "40px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      onEditCertificateNumber(
                                        client.patient.latest_certificate
                                          .certificate_number
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </span>
                                </div>
                              </>
                            )}
                          </td>
                          <td>
                            <a className="waves-effect waves-light btn btn-primary-light btn-circle">
                              <span className="icon-Trash1 fs-18">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-8"></div> */}
          <div className="col-md-4">
            <div className="box">
              <div className="box-header">
                <h4 className="box-title">D NOTE ACTIONS </h4>
              </div>
              <div className="box-body">
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/images/shelf.svg"
                    className="w-100 bg-primary-light rounded10 me-15"
                    alt=""
                  />
                  <div>
                    <h4 className="mb-0"></h4>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-15">
                  {isDisabled ? (
                    <a className="btn btn-danger-light me-4">Clear Batch</a>
                  ) : (
                    <>
                      <a
                        className="btn btn-success-light"
                        onClick={() => addCerticatesToDnote()}
                      >
                        ADD TO OTHER DNOTE (SIMBISA)
                      </a>
                      <a className="btn btn-danger-light me-4">Clear Batch</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DnoteEditPage;
