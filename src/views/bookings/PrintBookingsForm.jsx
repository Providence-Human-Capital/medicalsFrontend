import React, { forwardRef, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { useReactToPrint } from "react-to-print";
import { printActions } from "../../redux_store/print-store";
import Swal from "sweetalert2";
import PrintBookingFile from "./booking-prints/PrintBookingFile";
import Nassa from "../certificates/nssa/Nassa";

const PrintBookingsAll = forwardRef(
  (
    {
      company,
      clients,
      examData,
      selectedIllnesses,
      everyIllness,
      selectedTobaccos,
      everyTobacco,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          margin: "0",
        }}
      >
        {clients.map((client, index) => (
          <div
            key={index}
            style={{
              marginTop: index >= 1 ? "6rem" : "0",
            }}
          >
            <PrintBookingFile
              client={client}
              examData={examData}
              allIllnesses={everyIllness}
              specificIllnesses={selectedIllnesses}
              allTobaccos={everyTobacco}
              specificTobaccos={selectedTobaccos}
              index={index}
            />
          </div>
        ))}
      </div>
    );
  }
);

const PrintPneumoBookingsAll = forwardRef(
  ({ clients, company, examData }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          margin: "0",
        }}
      >
        {clients.map((client, index) => (
          <div
            key={index}
            style={{
              marginTop: index >= 1 ? "6rem" : "0",
            }}
          >
            <Nassa
              company={company}
              person={client}
              other={examData}
              index={index}
            />
          </div>
        ))}
      </div>
    );
  }
);

const PrintBookingsForm = () => {
  const [selectedOption, setSelectedOption] = useState("bookings");
  const companies = useSelector((state) => state.company.companies);
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [bookingType, setBookingType] = useState("foodHandler");
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const diseases = useSelector((state) => state.illness.illnesses);
  const tobaccos = useSelector((state) => state.tobacco.tobaccos);

  const patientTobaccos = [];
  const patientIllnesses = [];

  const [names, setNames] = useState([]);

  const bookingsPrintRef = useRef();

  const pneumoPrintRef = useRef();

  const clients = useSelector((state) => state.print.currentTF);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company is required"),
    fileInput: Yup.mixed().required(
      "Select The CSV File With All The Employee Information"
    ),
    bookingType: Yup.string().required(
      "Please select Booking Type (Food Handler / Pneumo)"
    ),

    industryType: Yup.string().required("Industry type is required"),
    mining_mineral: Yup.string().when("industryType", {
      is: "mining",
      then: Yup.string().required("Mineral is required"),
    }),
    other_description: Yup.string().when("industryType", {
      is: "other",
      then: Yup.string().required("Other description is required"),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setIsPrinting(true);
    dispatch(printActions.clearOnLoad());
    setExamData(values);

    const selectedCompany = companies.find(
      (company) => company.company_name === values.company_name
    );
    setSelectedCompany(selectedCompany);

    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.map((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });

        const convertedData = namesData.map((dataItem) => {
          return {
            first_name: dataItem[0],
            surname: dataItem[1],
            national_id: dataItem[2],
            gender: dataItem[3],
            phone_number: dataItem[4],
            date_of_birth: dataItem[5],
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        dispatch(
          printActions.setCurrentPrintBookingForms({
            currentTF: convertedData,
          })
        );
        // handlePrintBookings();
        console.log(convertedData);
      },
    });
  };

  const handlePrintBoookingsPrint = (boookingType) => {
    console.log("This is the selected Bookin Type: " + boookingType);

    if (bookingsPrintRef.current) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: `Are you sure you are ready to print all ${csvData.length} bookings forms`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger printing only if the ref is valid
          if (boookingType === "Pneumo") {
            handlePrintPneumo();
          } else if (boookingType === "foodHandler") {
            handlePrintBookings();
          }
        } else {
          // Handle cancel logic if needed
        }
      });
    } else {
      console.error("Termination Ref is not set or is null.");
    }
  };

  const handlePrintBookings = useReactToPrint({
    content: () => bookingsPrintRef.current,
  });

  const handlePrintPneumo = useReactToPrint({
    content: () => pneumoPrintRef.current,
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <PrintBookingsAll
          ref={bookingsPrintRef}
          company={selectedCompany}
          examData={examData}
          clients={csvData}
          selectedIllnesses={patientIllnesses}
          everyIllness={diseases}
          everyTobacco={tobaccos}
          selectedTobaccos={patientTobaccos}
        />
      </div>

      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <PrintPneumoBookingsAll
          ref={pneumoPrintRef}
          examData={examData}
          clients={csvData}
          company={selectedCompany}
        />
      </div>

      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              company_name: "",
              fileInput: null,
              bookingType: "",

              industryType: "", // Holds the selected industry type
              mining_mineral: "",
              other_description: "",

              healthRisk: "",
              other_health_risk: "",

              controlMeasure: "",
              ppe: "",
              ppe_specify: "",
              other_cm: "",
              other_cm_specify: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="card p-4 mt-5">
                  <div className="row g-3">
                    <div className="col-12 mb-4">
                      <h4>Printing Medicals Booking For Outreach </h4>
                      <span className="text-muted">
                        Please make sure that you upload the csv file
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="bookingType"
                            name="bookingType"
                            onChange={(e) => {
                              setFieldValue("bookingType", e.target.value);
                              setBookingType(e.target.value); // Update state directly for conditional rendering
                            }}
                          >
                            <option value="">SELECT BOOKING TYPE</option>
                            <option value="Pneumo">
                              PNEUMOCONIOSIS BOOKING
                            </option>
                            <option value="foodHandler">
                              FOODHANDLER BOOKING
                            </option>
                          </Field>
                          <label htmlFor="bookingType">BOOKING TYPE</label>
                          <ErrorMessage
                            name="bookingType"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>

                    {/* {bookingType === "Pneumo" && (
                      <div className="row">
                        <h1>Pneumo Booking ___________</h1>
                      </div>
                    )} */}

                    {bookingType === "Pneumo" && (
                      <div
                        className="row"
                        style={{
                          backgroundColor: "#ccc",
                          borderRadius: "10px",
                          padding: "20px",
                        }}
                      >
                        <div className="row">
                          <h3
                            style={{
                              margin: "10px 2rem",
                              textTransform: "uppercase",
                              fontSize: "17px",
                              fontWeight: "bold",
                            }}
                          >
                            Industry Classification
                          </h3>
                          <div className="col-md-4">
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="mining"
                                className="form-check-input"
                                id="mining"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="mining"
                              >
                                Mining
                              </label>
                            </div>
                            {values.industryType === "mining" && (
                              <div
                                className="form-floating"
                                style={{
                                  margin: "10px 2rem",
                                }}
                              >
                                <Field
                                  type="text"
                                  name="mining_mineral"
                                  className="form-control"
                                />
                                <label htmlFor="mining_mineral">MINING</label>
                                <ErrorMessage
                                  name="mining_mineral"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            )}

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="quarrying"
                                className="form-check-input"
                                id="quarrying"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="quarrying"
                              >
                                Quarrying
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="manufacturing"
                                className="form-check-input"
                                id="manufacturing"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="manufacturing"
                              >
                                Manufacturing
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="construction"
                                className="form-check-input"
                                id="construction"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="construction"
                              >
                                Construction
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="agriculture"
                                className="form-check-input"
                                id="agriculture"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="agriculture"
                              >
                                Agriculture
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="industryType"
                                value="other"
                                className="form-check-input"
                                id="other"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="other"
                              >
                                Other
                              </label>
                            </div>
                            {values.industryType === "other" && (
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  name="other_description"
                                  className="form-control"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="other_description"
                                >
                                  Other Description
                                </label>
                                <ErrorMessage
                                  name="other_description"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-md-4">
                            <h3
                              style={{
                                margin: "10px 2rem",
                                textTransform: "uppercase",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              Health Risk
                            </h3>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="healthRisk"
                                value="silica"
                                className="form-check-input"
                                id="silica"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="silica"
                              >
                                Silica
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="healthRisk"
                                value="coal"
                                className="form-check-input"
                                id="coal"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="coal"
                              >
                                Coal
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="healthRisk"
                                value="asbestos"
                                className="form-check-input"
                                id="asbestos"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="asbestos"
                              >
                                Asbestos
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="healthRisk"
                                value="other_hr"
                                className="form-check-input"
                                id="other_hr"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="other_hr"
                              >
                                Other
                              </label>
                            </div>
                            {values.healthRisk === "other_hr" && (
                              <div
                                className="form-floating"
                                style={{
                                  margin: "10px 2rem",
                                }}
                              >
                                <Field
                                  type="text"
                                  name="other_health_risk"
                                  className="form-control"
                                />
                                <label htmlFor="other_health_risk">
                                  Specify Other
                                </label>
                                <ErrorMessage
                                  name="other_health_risk"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            )}
                          </div>

                          <div className="col-md-4">
                            <h3
                              style={{
                                margin: "10px 2rem",
                                textTransform: "uppercase",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              CONTROL MEASURES
                            </h3>

                            <div className="form-check">
                              <Field
                                type="radio"
                                name="controlMeasure"
                                value="wet_method"
                                className="form-check-input"
                                id="wet_method"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="wet_method"
                              >
                                Use of Wet Method
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="controlMeasure"
                                value="containment"
                                className="form-check-input"
                                id="containment"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="containment"
                              >
                                Containment and Ventilation
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="controlMeasure"
                                value="monitoring"
                                className="form-check-input"
                                id="monitoring"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="monitoring"
                              >
                                Exposure monitoring (workplace dust level
                                surveys)
                              </label>
                            </div>
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="controlMeasure"
                                value="ppe"
                                className="form-check-input"
                                id="ppe"
                              />
                              <label className="form-check-label" htmlFor="ppe">
                                PPE: (Specify)
                              </label>
                            </div>
                            {values.controlMeasure === "ppe" && (
                              <div
                                className="form-floating"
                                style={{
                                  margin: "10px 2rem",
                                }}
                              >
                                <Field
                                  type="text"
                                  name="ppe_specify"
                                  className="form-control"
                                />
                                <label htmlFor="ppe_specify">
                                  (Specify) PPE
                                </label>
                                <ErrorMessage
                                  name="ppe_specify"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            )}
                            <div className="form-check">
                              <Field
                                type="radio"
                                name="controlMeasure"
                                value="other_cm"
                                className="form-check-input"
                                id="other_cm"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="other_cm"
                              >
                                Other
                              </label>
                            </div>
                            {values.controlMeasure === "other_cm" && (
                              <div
                                className="form-floating"
                                style={{
                                  margin: "10px 2rem",
                                }}
                              >
                                <Field
                                  type="text"
                                  name="other_cm_specify"
                                  className="form-control"
                                />
                                <label htmlFor="other_cm_specify">Other</label>
                                <ErrorMessage
                                  name="other_cm_specify"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space"></div>

                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="company_name"
                            name="company_name"
                          >
                            <option value="">
                              Open this select menu to select company
                            </option>
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                              <option
                                key={company.id}
                                value={company.company_name}
                              >
                                {company.company_name}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="company_name">COMPANY</label>
                          <ErrorMessage
                            name="company_name"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="fileInput"
                            name="fileInput"
                            accept=".csv"
                            onChange={(event) => {
                              setFieldValue(
                                "fileInput",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <label for="fileInput">
                            EMPLOYEE CSV (Make sure the file is a csv file)
                          </label>
                          <ErrorMessage
                            name="fileInput"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="space"></div>
                      <div className="col-12 mt-4">
                        <button
                          className="btn btn-primary text-uppercase"
                          disabled={isPrinting}
                          style={{
                            borderRadius: "10px",
                          }}
                          type="submit"
                        >
                          LOAD EMPLOYEES {"  "}
                          <i className="fa fa-print"></i>
                        </button>
                      </div>
                      <div className="space"></div>
                      <h4>
                        {" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          NB:
                        </span>{" "}
                        Note that you can only print the forms if you have
                        successfully loaded the names{" "}
                      </h4>
                      <div>
                        <p>Booking Type: {bookingType}</p>
                        <button
                          className="btn btn-primary text-uppercase"
                          onClick={() => handlePrintBoookingsPrint(bookingType)}
                          disabled={csvData.length <= 0}
                          style={{
                            borderRadius: "10px",
                          }}
                        >
                          PRINT CERTIFICATES NOW
                          <i className="fa fa-print"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="row"></div>
          {/* {JSON.stringify(examData)} */}
          <div className="box">
            <div className="box-header no-border">
              <h4
                className="box-title"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                MEDICAL BOOKINGS AWAITING PRINTING
              </h4>
            </div>
            <div className="box-body pt-0">
              <div className="row mt-25">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">FIRST NAME</th>
                        <th className="bb-2">SURNAME</th>
                        <th className="bb-2">NATIONAL ID</th>
                        <th className="bb-2">GENDER</th>
                        <th className="bb-2">PHONE NUMBER</th>
                        <th className="bb-2">DATE OF BIRTH</th>
                        <th className="bb-2">COMPANY</th>
                        <th className="bb-2">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients &&
                        clients.map((client, index) => (
                          <tr key={index}>
                            <td>{client.first_name}</td>
                            <td>{client.surname}</td>
                            <td>{client.national_id}</td>
                            <td>{client.gender}</td>
                            <td>{client.phone_number}</td>
                            <td>{client.date_of_birth}</td>
                            <td>{examData.company_name}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                style={{
                                  borderRadius: "10px",
                                }}
                                disabled={true}
                              >
                                PRINT SINGLE BOOKING
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
        </div>
      </section>
    </>
  );
};

export default PrintBookingsForm;
