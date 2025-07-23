import React, {
  forwardRef,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PButtons from "./components/PButtons";
import BoxProfile from "./components/BoxProfile";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../redux_store/patients-store";
import InfoBox from "./components/InfoBox";
import { Helmet } from "react-helmet";
import {
  calculateDaysLeftForCertificateValidity,
  createCertificateBatch,
  doctorManualCertificateUpdate,
  getAllPatients,
  getCurrentPatientRemarks,
  getLatestPatientXray,
  getPatient,
  getPatientMedicalRecords,
} from "../../services/api";
import { formsActions } from "../../redux_store/forms-store";
import PatientSkeleton from "../../components/skeletons/PatientSkeleton";
import BpPlot from "./components/BpPlot";
import BmiPlot from "./components/BmiPlot";
import DaysLeftBox from "./components/DaysLeftBox";
import Swal from "sweetalert2";
import Loading from "../../components/loader/Loading";
import { useReactToPrint } from "react-to-print";
import PrintMedicalRecord from "./recordPrint/PrintMedicalRecord";
import PneumoDetail from "./patientDetailedComponents/PneumoDetail";
import PreEmployementDetail from "./patientDetailedComponents/PreEmployementDetail";
import FoodHandlerDetail from "./patientDetailedComponents/FoodHandlerDetail";
import InHouseDetail from "./patientDetailedComponents/InHouseDetail";

import { useQuery } from "@tanstack/react-query";

// Import PHYSICAL_EXAM if it's defined in another file
import { PHYSICAL_EXAM } from "../../utils/global";
import PastMedicalRecords from "./components/PastMedicalRecords.";

const PrintPatientMedicalRecord = forwardRef(
  (
    {
      patientData,
      selectedIllnesses,
      everyIllness,
      selectedTobaccos,
      everyTobacco,
      latestRecord,
      vitals,
    },
    ref
  ) => {
    return (
      <div ref={ref} style={{ padding: "3rem" }}>
        <PrintMedicalRecord
          patient={patientData}
          allIllnesses={everyIllness}
          specificIllnesses={selectedIllnesses}
          allTobaccos={everyTobacco}
          specificTobaccos={selectedTobaccos}
          latestRecord={latestRecord}
          latestVitals={vitals}
        />
      </div>
    );
  }
);

const PatientDetails = () => {
  const printmedicalRecordRef = useRef();
  const handlePrintCurrentMedicalRecord = useReactToPrint({
    content: () => printmedicalRecordRef.current,
  });

  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses || []
  );
  const diseases = useSelector((state) => state.illness.illnesses);
  const tobaccos = useSelector((state) => state.tobacco.tobaccos);
  const patientTobaccos =
    useSelector((state) => state.forms.patientsTobaccos) || [];

  const { patientId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dayLeftData, setDayLeftData] = useState(null);
  const [addingToBatch, setAddingToBatch] = useState(false); // Define addingToBatch state
  const token = useSelector((state) => state.auth.token);
  const companiesWithBatches = useSelector(
    (state) => state.company.companiesWithBatches
  );

  const fetchPatientData = async () => {
    try {
      setLoading(true);

      const [patientData, physicalExamRecordsResponse] = await Promise.all([
        getPatient(patientId),
        fetch(`${API}/physical/latest/${patientId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }),
      ]);

      const physicalExamRecords = await physicalExamRecordsResponse.json();

      console.log("LatestPhysicalExamRecords", physicalExamRecords);
      if (physicalExamRecordsResponse.ok) {
        dispatch(formsActions.setPhysicalExamination(physicalExamRecords.data));
      }

      dispatch(patientActions.setSinglePatient({ singlePatient: patientData }));
    } catch (error) {
      console.log("Error", error);
      dispatch(formsActions.setPhysicalExamination(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentStep", parseInt("1"));

    getCurrentPatientRemarks(patientId).then((remarks) => {
      dispatch(formsActions.setFoodHandlerRemarks(remarks));
    });
    getLatestPatientXray(patientId).then((xray) => {
      dispatch(formsActions.setPatientsXray(xray));
    });

    calculateDaysLeftForCertificateValidity(patientId).then((data) => {
      setDayLeftData(data);
    });
    getPatientMedicalRecords(patientId).then((records) => {
      dispatch(
        patientActions.setPatientMedicalRecords({
          patientMedicalRecords: records,
        })
      );
    });

    fetchPatientData();
  }, [patientId]);

  const singlePatient = useSelector((state) => state.patient.singlePatient);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);
  const records =
    useSelector((state) => state.patient.patientMedicalRecords) || [];

  if (loading) {
    return <PatientSkeleton />;
  }

  const filterCompany = (companyName) => {
    return companiesWithBatches.find(
      (company) => company.company_name === companyName
    );
  };

  const handleRenewCertificate = async () => {
    // Display a SweetAlert confirmation dialog
    Swal.fire({
      title: "Renew Certificate",
      text: "Are you sure you want to renew this certificate?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, renew it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      // Handle the result after the user clicks on the button
      if (result.isConfirmed) {
        // User clicked "Yes, renew it!"
        // Perform the logic to renew the certificate here
        const response = await fetch(`${API}/certificate/renew/${patientId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        const rsp = await response.json();
        if (response.ok) {
          // You can replace the following alert with your actual logic
          fetchPatientData();
          Swal.fire(
            "Renewed!",
            "Your certificate has been renewed.",
            "success"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No, cancel"
        Swal.fire("Cancelled", "Your certificate is not renewed.", "info");
      }
    });
  };

  // Adding Patient to Batch
  const handleAddToBatch = async (selectedValue, certificateId) => {
    console.log(selectedValue);
    try {
      setAddingToBatch(true);
      const response = await fetch(
        `${API}/certificate/batch/${selectedValue}/${certificateId}/add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (response.status === 200) {
        setAddingToBatch(false);
        console.log(responseData);
        Swal.fire("Success!", "Adding to Batch successfully.", "success");
      } else {
        setAddingToBatch(false);
        throw new Error(`${responseData.message}`);
      }
    } catch (error) {
      Swal.fire("Something went wrong!", error.message, "error");
      setAddingToBatch(false);
    }
  };

  const handleCancel = () => {
    Swal.close();
  };

  const handleAddToBatchClick = () => {
    const company = filterCompany(singlePatient.attendee.company.company_name);
    console.log("On click", company.certificate_batches);

    const valid_batches = company.certificate_batches.filter(
      (batch) => batch.invalidate !== 1
    );

    console.log("Valid batches", valid_batches);

    if (valid_batches.length === 0) {
      createCertificateBatch(company.id).then((data) => {
        console.log("Created certificate batch", data);
      });
    }

    if (company) {
      Swal.fire({
        title: "ADD CERTIFICATE TO A BATCH",
        width: "700px",
        html: `
        <div class="form-floating">
        <select id="status-select" class="form-select"> 
          <option value="">Select Batch</option> 
          ${valid_batches
            .map(
              (batch) => `<option value="${batch.id}">${batch.name}</option>`
            )
            .join("")} 
        </select>
        <label htmlFor="status-select">SELECT BATCH FOR CERTIFICATE</label>
        </div>
        
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
          handleAddToBatch(selectedValue, singlePatient.certificate.id);
        } else {
          handleCancel();
        }
      });
    }
  };

  const updateCertificateStatus = async (certificateId) => {
    Swal.fire({
      title: "UPDATE CERTIFICATE STATUS",
      width: "700px",
      html: `
        <div class="form-floating">
          <select id="status-select" class="form-select">
            <option value="PENDING">PENDING</option>
            <option value="MONITORING">MONITORING</option>
            <option value="READY">READY</option>
            <option value="FAILED">FAILED</option>
          </select>
          <label htmlFor="status-select">Status</label>
        </div>
        <div class="form-floating sep">
          <textarea id="update-reason" class="form-control update-reason" placeholder="Update Reason"></textarea>
          <label htmlFor="update-reason">UPDATE REASON</label>
        </div>
        <div class="form-floating sep">
          <input type="password" id="password-input" class="form-control" placeholder="Password" />
          <label htmlFor="password-input">USER PASSWORD</label>
        </div>
        <p><strong>NB</strong>: Enter Password for a successful status update!</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const selectElement = document.getElementById("status-select");
        const selectedValue =
          selectElement.options[selectElement.selectedIndex].value;

        const updateReasonElement = document.getElementById("update-reason");
        const updateReason = updateReasonElement.value;

        const passwordElement = document.getElementById("password-input");
        const password = passwordElement.value;

        console.log(
          "selectedValue   " + selectedValue,
          "updateReason   " + updateReason,
          "password    " + password
        );

        return { selectedValue, updateReason, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { selectedValue, updateReason, password } = result.value;
        // Perform the necessary actions with the selectedValue, updateReason, and password
        doctorManualCertificateUpdate(
          certificateId,
          selectedValue,
          updateReason,
          password,
          token
        ).then((data) => {
          console.log(data);
          const fetchAllPatients = async () => {
            const allPatients = await getAllPatients();
            console.log(
              "allPatients from Certificate Update",
              JSON.stringify(allPatients)
            );
            dispatch(
              patientActions.setPatients({
                patients: [...allPatients],
              })
            );
          };
          fetchAllPatients();
          fetchPatientData();
        });
      } else {
        handleCancel();
      }
    });
  };

  const category = singlePatient?.category ?? "Medical Patient";

  const PrintRecord = () => {
    handlePrintCurrentMedicalRecord();
  };

  return (
    <Fragment>
      {category && (
        <BreadCrumb title={"Patient Details"} activeTab={category} />
      )}

      <Helmet>
        <title>
          Client : {singlePatient?.attendee?.first_name ?? "Unknown"}{" "}
          {singlePatient?.attendee?.last_name ?? "Unknown"}
        </title>
      </Helmet>

      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        {singlePatient && (
          <PrintPatientMedicalRecord
            ref={printmedicalRecordRef}
            patientData={singlePatient}
            selectedIllnesses={patientIllnesses}
            everyIllness={diseases}
            everyTobacco={tobaccos}
            selectedTobaccos={patientTobaccos}
            latestRecord={records[records.length - 1]}
            vitals={vitals}
          />
        )}
      </div>
      {singlePatient ? (
        <section className="content">
          <div className="row">
            <div className="col-xl-8 col-12">
              <div
                style={{
                  display: "flex",
                  marginBottom: "14px",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{
                    marginBottom: "10px",
                  }}
                  onClick={PrintRecord}
                >
                  <i
                    className="ti-file"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                  {"  "}
                  PRINT MEDICAL RECORD
                </button>
                <button
                  className="btn btn-secondary btn-outline"
                  onClick={() =>
                    updateCertificateStatus(singlePatient.certificate.id)
                  }
                >
                  MANUAL CERTIFICATE UPDATE
                </button>
                <Link to={`/patients/edit/${singlePatient.id}`}>
                  <button className="btn btn-success btn-outline">
                    EDIT PATIENT BIO INFO
                  </button>
                </Link>
              </div>
              <div className="d-md-flex align-items-center justify-content-between mb-20">
                <div style={{}}>
                  <h4>
                    <strong>Certificate Status</strong>
                    {"   "}
                    {PHYSICAL_EXAM[singlePatient.certificate_status]}
                  </h4>
                </div>
                <div className="d-flex">
                  {addingToBatch ? (
                    <Loading />
                  ) : (
                    <div>
                      {singlePatient.certificate_status === "READY" ? (
                        <button
                          style={{
                            color: "#fff",
                            display: "block",
                            textTransform: "uppercase",
                            // Show the button
                          }}
                          className="btn btn-dark"
                          onClick={handleAddToBatchClick}
                        >
                          Add To Batch
                        </button>
                      ) : (
                        <button
                          style={{
                            display: "none", // Hide the button
                          }}
                        >
                          <strong>Add To Batch</strong>
                        </button>
                      )}
                    </div>
                  )}

                  {singlePatient.certificate_status !== "READY" &&
                    (singlePatient.certificate_status === "RELEASED" ? (
                      <button
                        className="btn btn-primary"
                        onClick={handleRenewCertificate}
                      >
                        <i
                          className="ti-back-left"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        {"  "}RENEW CERTICATE
                      </button>
                    ) : (
                      <PButtons routeId={patientId} patient={singlePatient} />
                    ))}
                </div>
              </div>

              {singlePatient.certificate_status === "RELEASED" && (
                <div className="col-xl-12 col-12">
                  {dayLeftData && <DaysLeftBox daysLeftData={dayLeftData} />}
                </div>
              )}

              <div className="col-xl-12 col-12">
                <InfoBox patient={singlePatient} />
              </div>
              <div className="row">
                <div className="col-xl-12 col-12">
                  <PastMedicalRecords />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-12">
                  <BpPlot />
                </div>
                <div className="col-xl-6 col-12">
                  <BmiPlot />
                </div>
              </div>
            </div>

            {(singlePatient.category === "Pneumoconiosis" ||
              singlePatient.category === "Exit-Pneumoconiosis") && (
              <Fragment>
                <PneumoDetail
                  singlePatient={singlePatient}
                  patientId={patientId}
                  vitals={vitals}
                />
              </Fragment>
            )}

            {singlePatient.category === "Food Handler (COH)" && (
              <Fragment>
                <FoodHandlerDetail
                  singlePatient={singlePatient}
                  patientId={patientId}
                  vitals={vitals}
                />
              </Fragment>
            )}

            {/* In House */}
            {(singlePatient.category === "Pre-Employement" ||
              singlePatient.category === "Exit-Employement") && (
              <Fragment>
                <PreEmployementDetail
                  singlePatient={singlePatient}
                  patientId={patientId}
                  vitals={vitals}
                />
              </Fragment>
            )}

            <div className="col-xl-8 col-12">
              <BoxProfile patient={singlePatient} />
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <div className="row">
            <div className="card mt-5 text-center">
              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  An Error occured whilst trying to fetch Patient Information /
                  Server Might be Unreachable
                </h4>
                <p className="card-text">
                  Please Reload the page / Check if Server is Online
                </p>
                <Link to={"/dashboard"} className="btn btn-primary">
                  Go To Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PatientDetails;
