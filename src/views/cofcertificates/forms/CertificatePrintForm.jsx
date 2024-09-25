import React, { forwardRef, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import ReactToPrint, { useReactToPrint } from "react-to-print";

import Swal from "sweetalert2";
import CityOfHararePrint from "../prints/CityOfHararePrint";

const CityOfHarareCertificatesPrintOn = forwardRef(
  ({ doctor, clients }, ref) => {
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
              height: "1025px",
              marginTop: index >= 1 ? "6rem" : "0",
            }}
          >
            <CityOfHararePrint doctor={doctor} client={client} index={index} />
          </div>
        ))}
        <div></div>
      </div>
    );
  }
);

const CertificatePrintForm = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const validationSchema = Yup.object().shape({
    examinerName: Yup.string().required("Examiner Name is required"),
    qualifications: Yup.string().required("Qualifications are required"),
    fileInput: Yup.mixed().required("CSV file is required"),
    designation: Yup.string().required("Please Enter doctors Designation"),
    doc_address: Yup.string().required("Please Enter Doctor Address"),
  });

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setIsPrinting(true);
    setExamData(values);
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
            date_of_examination: dataItem[0],
            first_name: dataItem[1],
            surname: dataItem[2],
            company: dataItem[3],
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        console.log(convertedData);
      },
    });
  };

  const PrintCertificates = () => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: `Are you sure you are ready to print all ${csvData.length} City Of Harare Certificates`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePrintAllCityPrintOn();
      } else {
        
      }
    });
  };

  const cityPrintOnPrintAllRef = useRef();
  const handlePrintAllCityPrintOn = useReactToPrint({
    content: () => cityPrintOnPrintAllRef.current,
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <CityOfHarareCertificatesPrintOn
          ref={cityPrintOnPrintAllRef}
          doctor={examData}
          clients={csvData}
        />
      </div>
      <div className="row">
        <Formik
          initialValues={{
            examinerName: "DR C. DURI",
            qualifications: "MBChB,MSc Clinical Epi, MBA",
            designation: "HOSPITAL SUPERINTENDENT",
            fileInput: null,
            doc_address: "BRIDH",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="card p-4 mt-5">
                <div className="row g-3">
                  <div className="col-12 mb-4">
                    <h2
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Printing Medical Certificate{" "}
                    </h2>
                    <span className="text-muted">
                      Please make sure that you upload the csv files containing
                      all the names and don't forget the doctor and
                      Qualifications
                    </span>
                    <h4>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        NB:
                      </span>{" "}
                      Please make sure the file that you are uploading is a CSV
                      file{" "}
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Examiner Name"
                          id="examinerName"
                          name="examinerName"
                        />
                        <label htmlFor="examinerName">
                          MEDICAL EXAMINER NAME
                        </label>
                        <ErrorMessage
                          name="examinerName"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="qualifications"
                          name="qualifications"
                          placeholder=" MEDICAL EXAMINER QUALIFICATIONS
                    "
                        />
                        <label
                          htmlFor="qualifications"
                          style={{
                            fontWeight: "bolder",
                          }}
                        >
                          MEDICAL EXAMINER QUALIFICATIONS
                        </label>
                        <ErrorMessage
                          name="qualifications"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="designation"
                          name="designation"
                          placeholder="EXAMINER DESIGNATION
                    "
                        />
                        <label htmlFor="designation">
                          EXAMINER DESIGNATION
                        </label>
                        <ErrorMessage
                          name="designation"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="doc_address"
                          name="doc_address"
                          placeholder="EXAMINER ADDRESS
                    "
                        />
                        <label htmlFor="doc_address">EXAMINER ADDRESS</label>
                        <ErrorMessage
                          name="doc_address"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="space"></div>
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
                        <label for="fileInput">CLIENTS CSV </label>
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
                        LOAD CERTIFICATES {"  "}
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
                      Note that you can only print certificates if you have
                      successfully loaded the names{" "}
                    </h4>
                    <div>
                      <button
                        className="btn btn-primary text-uppercase"
                        onClick={PrintCertificates}
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
        <div className="box">
          <div className="box-header no-border">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Certificates Awaiting Printing
            </h4>
          </div>
          <div className="box-body pt-0">
            <div className="row mt-25">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">DATE OF EXAMINATION</th>
                      <th className="bb-2">FIRST NAME</th>
                      <th className="bb-2">SURNAME</th>
                      <th className="bb-2">COMPANY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData &&
                      csvData.map((client, index) => (
                        <tr key={index}>
                          <td>{client.date_of_examination}</td>
                          <td>{client.first_name}</td>
                          <td>{client.surname}</td>
                          <td>{client.company}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePrintForm;
