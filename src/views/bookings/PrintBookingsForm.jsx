import React, { forwardRef, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { useReactToPrint } from "react-to-print";
import { printActions } from "../../redux_store/print-store";
import Swal from "sweetalert2";
import PrintBookingFile from "./booking-prints/PrintBookingFile";

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

const PrintBookingsForm = () => {
  const [selectedOption, setSelectedOption] = useState("bookings");
  const companies = useSelector((state) => state.company.companies);
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const diseases = useSelector((state) => state.illness.illnesses);
  const tobaccos = useSelector((state) => state.tobacco.tobaccos);

  const patientTobaccos = [];
  const patientIllnesses = [];

  const [names, setNames] = useState([]);

  const bookingsPrintRef = useRef();

  const clients = useSelector((state) => state.print.currentTF);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company is required"),
    fileInput: Yup.mixed().required(
      "Select The CSV File With All The Employee Information"
    ),
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
        })

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

  const handlePrintBoookingsPrint = () => {
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
          handlePrintBookings();
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
      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              company_name: "",
              fileInput: null,
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
                        <button
                          className="btn btn-primary text-uppercase"
                          onClick={handlePrintBoookingsPrint}
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
