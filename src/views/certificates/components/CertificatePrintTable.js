import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import CertificatePrintItem from "./CertificatePrintItem";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import InHouseCertificatePrint from "../certificates-print/InHouseCertificatePrint";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { certificateActions } from "../../../redux_store/certificates-store";
import ProfessionalCertificatePrint from "../certificates-print/ProfessionalCertificatePrint";
import CityCertificate from "../certificates-print/CityCertificate";

const InHousePrintAllCertificates = forwardRef(
  ({ certificates, doctor, company }, ref) => {
    return (
      <div ref={ref}>
        {certificates.map((certificate, index) => (
          <>
            <div
              key={index}
              style={{
                paddingTop: index === 0 ? 0 : "10px",
              }}
            >
              <InHouseCertificatePrint
                person={certificate}
                doctor={doctor}
                company={company}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
);

const ProfessionalCertificatePrintAll = forwardRef(
  ({ company, batch, doctor }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          margin: "0",
        }}
      >
        {batch.map((data, index) => (
          <>
            <div
              key={index}
              style={{
                height: "1025px",
                marginTop: index >= 1 ? "6rem" : "0",
              }}
            >
              <ProfessionalCertificatePrint
                key={index}
                company={company}
                person={data}
                doctor={doctor}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
);

const CityCertificatesPrintAll = forwardRef(
  ({ company, batch, doctor }, ref) => {
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
  }
);

const CertificatePrintTable = () => {
  const validationSchema = Yup.object().shape({
    template: Yup.mixed().nullable(),
    examinerName: Yup.string().required("Examiner Name is required"),
    qualifications: Yup.string().required("Qualifications are required"),
  });
  const [loading, setLoading] = useState(false);

  const [selectedCheckbox, setSelectedCheckbox] = useState("certificate1");
  const isInputDisabled = selectedCheckbox === "certificate1";
  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
  };

  const [selectType, setSelectedType] = useState("professional");
  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  };

  const generatedDocuments =
    useSelector((state) => state.forms.generatedDocuments) || [];

  const dispatch = useDispatch();
  const inHousePrintAllRef = useRef();
  const professionalCertificatePrintAllRef = useRef();

  const handlePrintAll = useReactToPrint({
    content: () => inHousePrintAllRef.current,
  });

  const handlePrintProfessionalAll = useReactToPrint({
    content: () => professionalCertificatePrintAllRef.current,
  });

  const cityCertificatePrintAllRef = useRef();

  const handlePrintCityCertificatesAll = useReactToPrint({
    content: () => cityCertificatePrintAllRef.current,
  });

  useEffect(() => {}, []);
  const batch = useSelector((state) => state.certificate.certifificateBatch);
  const batchCompany = useSelector((state) => state.certificate.batchCompany);
  const medicalDoctor = useSelector((state) => state.certificate.medicalDoctor);

  console.log("FROM TABLE", +batchCompany);

  const handlePrint = () => {
    console.log("Printing Certificate");
  };

  //Code For Templating Certificates
  const onGenerateDocument = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (selectedCheckbox === "certificate1") {
      console.log("Checking");
      dispatch(
        certificateActions.setMedicalDoctor({
          examinerName: values.examinerName,
          qualifications: values.qualifications,
        })
      );
    } else {
      console.log("Generating Certificate", values);
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="row">
        <div
          style={{
            display: "none",
          }}
        >
          <InHousePrintAllCertificates
            certificates={batch}
            ref={inHousePrintAllRef}
            doctor={medicalDoctor}
            company={batchCompany}
          />
        </div>
      </div>

      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <ProfessionalCertificatePrintAll
          ref={professionalCertificatePrintAllRef}
          company={batchCompany}
          batch={batch}
          certificates={batch}
          doctor={medicalDoctor}
        />
      </div>

      <div className="row">
        <div className="box">
          <div className="box-body">
            <div className="row">
              <div className="container d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="certificate1"
                    id="checkbox1"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckbox === "certificate1"}
                  />
                  <label className="form-check-label" htmlFor="checkbox1">
                    <strong> On Site Certificate Print </strong>
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="certificate2"
                    id="checkbox2"
                    onChange={handleCheckboxChange}
                    checked={selectedCheckbox === "certificate2"}
                  />
                  <label className="form-check-label" htmlFor="checkbox2">
                    <strong>Editable Certificate Documents</strong>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3
                style={{
                  textTransform: "uppercase",
                }}
              >
                <strong>Certificate Generator</strong>
              </h3>
              <Formik
                initialValues={{
                  template: "",
                  examinerName: "DR M.A RUMHIZHA",
                  qualifications: "MD PHD",
                }}
                validationSchema={validationSchema}
                onSubmit={onGenerateDocument}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-floating">
                          <Field
                            type="text"
                            id="examinerName"
                            name="examinerName"
                            className="form-control"
                          />
                          <label htmlFor="examinerName">
                            NAME OF EXAMINER:
                          </label>
                          <ErrorMessage name="examinerName" component="div" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-floating">
                          <Field
                            type="text"
                            id="qualifications"
                            name="qualifications"
                            className="form-control"
                          />
                          <label htmlFor="qualifications">
                            QUALIFICATIONS:
                          </label>
                          <ErrorMessage name="qualifications" component="div" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="form-group"
                          style={{
                            display: isInputDisabled ? "none" : "",
                          }}
                        >
                          <label htmlFor="template" className="form-label">
                            Select Template:
                          </label>
                          <input
                            id="template"
                            name="template"
                            type="file"
                            disabled={isInputDisabled}
                            accept=".docx"
                            onChange={(event) => {
                              setFieldValue(
                                "template",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-control"
                          />
                          <ErrorMessage name="template" component="div" />
                        </div>
                      </div>
                    </div>
                    <div className="separation-div"></div>

                    <div className="row">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ borderRadius: "10px", fontWeight: "bold" }}
                          disabled={
                            !values.examinerName || !values.qualifications
                          }
                        >
                          {selectedCheckbox === "certificate1"
                            ? "Save Doctor"
                            : "Generate Document"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="box">
          <div className="box-body">
            <div
              className="d-flex"
              style={{
                marginBottom: "20px",
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="professional"
                  id="checkbox3"
                  onChange={handleSelectType}
                  checked={selectType === "professional"}
                />
                <label className="form-check-label" htmlFor="checkbox3">
                  <strong>Professional Certificate </strong>
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="local"
                  id="checkbox4"
                  onChange={handleSelectType}
                  checked={selectType === "local"}
                />
                <label className="form-check-label" htmlFor="checkbox4">
                  <strong>InHouse Certificate</strong>
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="coh"
                  id="checkbox5"
                  onChange={handleSelectType}
                  checked={selectType === "coh"}
                />
                <label className="form-check-label" htmlFor="checkbox5">
                  <strong>City of Harare Certificate</strong>
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="cohpo"
                  id="checkbox6"
                  onChange={handleSelectType}
                  checked={selectType === "cohpo"}
                />
                <label className="form-check-label" htmlFor="checkbox6">
                  <strong>City of Harare Certificate (PrintOn)</strong>
                </label>
              </div>
            </div>
            <h4 className="box-title">
              <strong>
                List Of Certificates Ready Printing{" "}
                <span>
                  {selectType === "local" ? (
                    <button
                      className="btn btn-success-light"
                      onClick={handlePrintAll}
                      // onClick={handlePrintProfessionalAll}
                      style={{
                        fontWeight: "bold",
                      }}
                      disabled={!medicalDoctor}
                    >
                      Print All (InHouse)
                    </button>
                  ) : (
                    <button
                      className="btn btn-success-light"
                      onClick={handlePrintProfessionalAll}
                      style={{
                        fontWeight: "bold",
                      }}
                      disabled={!medicalDoctor}
                    >
                      Print All (Professional)
                    </button>
                  )}
                </span>
              </strong>
            </h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">No.</th>
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Gender</th>
                    <th className="bb-2">National_ID</th>
                    <th className="bb-2">Phone Number</th>
                    <th className="bb-2">Certificate Validity</th>
                    <th className="bb-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.length > 0 &&
                    batch.map((certificateItem, index) => (
                      <CertificatePrintItem
                        key={index}
                        handlePrint={handlePrint}
                        certificateItem={certificateItem}
                        doctor={medicalDoctor}
                        company={batchCompany}
                        certificateType={selectType}
                      />
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

export default CertificatePrintTable;
