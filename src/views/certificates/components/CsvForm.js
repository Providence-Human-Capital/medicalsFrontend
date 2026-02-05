import React, { forwardRef, useRef, useState } from "react";
import "./CvsForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import ProfessionalCertificatePrintCsv from "../certificates-print/ProfessionalCertificatePrintCsv";
import { useReactToPrint } from "react-to-print";
import InHouseCertificatePrintCsv from "../certificates-print/InHouseCertificatePrintCsv";
import CityCertificate from "../certificates-print/CityCertificate";
import CityPrintOn from "../certificates-print/CityPrintOn";

import { API } from "../../../config";
import { useQuery } from "@tanstack/react-query";

const ProfessionalCertificatePrintAll = forwardRef(
  ({ company, clients, examData }, ref) => {
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
            <ProfessionalCertificatePrintCsv
              company={company}
              examData={examData}
              client={client}
              index={index}
            />
          </div>
        ))}
      </div>
    );
  }
);

const InHouseCertificatePrintAll = forwardRef(
  ({ company, clients, examData }, ref) => {
    return (
      <div ref={ref}>
        {clients.map((client, index) => (
          <div
            key={index}
            style={{
              paddingTop: index === 0 ? 0 : "10px",
            }}
          >
            <InHouseCertificatePrintCsv
              company={company}
              examData={examData}
              client={client}
            />
          </div>
        ))}
      </div>
    );
  }
);

const CityCertificatesPrintAll = forwardRef(({ company, batch, doctor }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      <CityCertificate company={company} client={batch} doctor={doctor} />
    </div>
  );
});

const CityPrintOnAll = forwardRef(({ company, clients, examData, doctor }, ref) => {
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
          <CityPrintOn
            company={company}
            client={client}
            examData={examData}
            doctor={doctor}
            index={index}
          />
        </div>
      ))}
    </div>
  );
});

const CsvForm = () => {
  const [selectedOption, setSelectedOption] = useState("professional");
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // ✅ Fetch companies (no redux state)
  const {
    data: companies = [],
    isLoading: companiesLoading,
    isError: companiesError,
    error: companiesErrorObj,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await fetch(`${API}/company`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      // adjust if your API returns a different structure
      return responseData?.data || [];
    },
  });

  const validationSchema = Yup.object().shape({
    examinerName: Yup.string().required("Examiner Name is required"),
    qualifications: Yup.string().required("Qualifications are required"),
    exam_date: Yup.date().required("Date of Medical Examination is required"),
    company_name: Yup.string().required("Company is required"),
    fileInput: Yup.mixed().required("CSV file is required"),
    designation: Yup.string().nullable(),
    doc_address: Yup.string().nullable(),
  });

  const professionalCertificatePrintAllRef = useRef();
  const handlePrintProfessionalAll = useReactToPrint({
    content: () => professionalCertificatePrintAllRef.current,
  });

  const inHouseCertificatesPrintAllRef = useRef();
  const handlePrintAllInHouseCertificates = useReactToPrint({
    content: () => inHouseCertificatesPrintAllRef.current,
  });

  const cityCertificatePrintAllRef = useRef();
  const handlePrintCityCertificatesAll = useReactToPrint({
    content: () => cityCertificatePrintAllRef.current,
  });

  const cityPrintOnPrintAllRef = useRef();
  const handlePrintAllCityPrintOn = useReactToPrint({
    content: () => cityPrintOnPrintAllRef.current,
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setIsPrinting(true);

    setExamData(values);

    const chosenCompany = companies.find(
      (company) => company.company_name === values.company_name
    );
    setSelectedCompany(chosenCompany || {});

    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.forEach((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });

        // same conversion logic you had (first_name/last_name from first two columns)
        const convertedData = namesData.map((dataItem) => {
          return {
            first_name: dataItem[0],
            last_name: dataItem[1],
          };
        });

        setColumnArray(columnData[0] || []);
        setCsvData(convertedData);

        // ✅ Print AFTER csv data is ready (important)
        setIsPrinting(false);
        setSubmitting(false);

        if (selectedOption === "professional") {
          handlePrintProfessionalAll();
        } else if (selectedOption === "inhouse") {
          handlePrintAllInHouseCertificates();
        } else if (selectedOption === "city") {
          handlePrintCityCertificatesAll();
        } else if (selectedOption === "printon") {
          handlePrintAllCityPrintOn();
        }
      },
      error: function () {
        setIsPrinting(false);
        setSubmitting(false);
      },
    });
  };

  return (
    <>
      {/* Hidden print templates */}
      <div className="row" style={{ display: "none" }}>
        <ProfessionalCertificatePrintAll
          ref={professionalCertificatePrintAllRef}
          company={selectedCompany}
          examData={examData}
          clients={csvData}
        />
      </div>

      <div className="row" style={{ display: "none" }}>
        <InHouseCertificatePrintAll
          ref={inHouseCertificatesPrintAllRef}
          company={selectedCompany}
          examData={examData}
          clients={csvData}
        />
      </div>

      <div className="row" style={{ display: "none" }}>
        {/* keeping your props exactly as you had them */}
        <CityCertificatesPrintAll
          ref={cityCertificatePrintAllRef}
          company={selectedCompany}
          examData={examData}
          clients={csvData}
        />
      </div>

      <div className="row" style={{ display: "none" }}>
        <CityPrintOnAll
          ref={cityPrintOnPrintAllRef}
          company={selectedCompany}
          examData={examData}
          clients={csvData}
        />
      </div>

      <Formik
        initialValues={{
          examinerName: "DR F MUSHAMBI",
          qualifications: "MD (UNIVERSITY OF ALGIERS)",
          exam_date: "",
          company_name: "",
          fileInput: null,
          designation: "HOSPITAL SUPERINTENDENT",
          doc_address: "BRIDH",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <div className="card p-4 mt-5">
                <div className="row g-3">
                  <div className="col-12 mb-4">
                    <h4>Printing Medicals</h4>
                    <span className="text-muted">
                      Please make sure that you upload the csv files containing
                      all the names and don't forget the doctor and
                      Qualifications
                    </span>
                  </div>

                  <div className="col-12">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="Professional"
                        value="professional"
                        checked={selectedOption === "professional"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="Professional">
                        Professional Certificates
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="InHouse"
                        value="inhouse"
                        checked={selectedOption === "inhouse"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="InHouse">
                        InHouse Certificates
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="City"
                        value="city"
                        checked={selectedOption === "city"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="City">
                        City Of Harare Certificates
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="PrintOn"
                        value="printon"
                        checked={selectedOption === "printon"}
                        onChange={handleOptionChange}
                      />
                      <label className="form-check-label" htmlFor="PrintOn">
                        City Of Harare PrintOn
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating">
                      <Field
                        type="text"
                        className="form-control"
                        placeholder="Examiner Name"
                        id="examinerName"
                        name="examinerName"
                      />
                      <label htmlFor="examinerName">MEDICAL EXAMINER NAME</label>
                      <ErrorMessage
                        name="examinerName"
                        component="div"
                        style={{ color: "red" }}
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
                        placeholder="MEDICAL EXAMINER QUALIFICATIONS"
                      />
                      <label htmlFor="qualifications">
                        MEDICAL EXAMINER QUALIFICATIONS
                      </label>
                      <ErrorMessage
                        name="qualifications"
                        component="div"
                        style={{ color: "red" }}
                        className="error-message"
                      />
                    </div>
                  </div>

                  {selectedOption !== "professional" && (
                    <>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="designation"
                            name="designation"
                            placeholder="EXAMINER DESIGNATION"
                          />
                          <label htmlFor="designation">
                            EXAMINER DESIGNATION
                          </label>
                          <ErrorMessage
                            name="designation"
                            component="div"
                            style={{ color: "red" }}
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
                            placeholder="EXAMINER ADDRESS"
                          />
                          <label htmlFor="doc_address">EXAMINER ADDRESS</label>
                          <ErrorMessage
                            name="doc_address"
                            component="div"
                            style={{ color: "red" }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating">
                      <Field
                        type="date"
                        className="form-control"
                        id="exam_date"
                        name="exam_date"
                        placeholder="DEPARTING"
                      />
                      <label htmlFor="exam_date">
                        DATE OF MEDICAL EXAMINATION
                      </label>
                      <ErrorMessage
                        name="exam_date"
                        component="div"
                        style={{ color: "red" }}
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="form-floating">
                      <Field
                        as="select"
                        className="form-select"
                        id="company_name"
                        name="company_name"
                        disabled={companiesLoading || companiesError}
                      >
                        <option value="">
                          {companiesLoading
                            ? "Loading companies..."
                            : companiesError
                            ? "Failed to load companies"
                            : "Open this select menu to select company"}
                        </option>

                        {!companiesLoading &&
                          !companiesError &&
                          companies.map((company) => (
                            <option key={company.id} value={company.company_name}>
                              {company.company_name}
                            </option>
                          ))}
                      </Field>
                      <label htmlFor="company_name">COMPANY</label>
                      <ErrorMessage
                        name="company_name"
                        component="div"
                        style={{ color: "red" }}
                        className="error-message"
                      />
                      {companiesError && (
                        <div style={{ color: "red", marginTop: 6 }}>
                          {companiesErrorObj?.message || "Error loading companies"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="fileInput"
                        name="fileInput"
                        onChange={(event) => {
                          setFieldValue("fileInput", event.currentTarget.files[0]);
                        }}
                      />
                      <label htmlFor="fileInput">CLIENTS CSV</label>
                      <ErrorMessage
                        name="fileInput"
                        component="div"
                        style={{ color: "red" }}
                        className="error-message"
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      className="btn btn-primary text-uppercase"
                      disabled={isPrinting || companiesLoading}
                      style={{
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                      type="submit"
                    >
                      PRINT CERTIFICATES{" "}
                      <i className="fa fa-print" />
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
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Company</th>
                    <th className="bb-2">Exam Date</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData &&
                    csvData.map((client, index) => (
                      <tr key={index}>
                        <td>{client.first_name}</td>
                        <td>{client.last_name}</td>
                        <td>{examData.company_name}</td>
                        <td>{examData.exam_date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CsvForm;
