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

const InHousePrintAllCertificates = forwardRef(
  ({ certificates, doctor }, ref) => {
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
              <InHouseCertificatePrint person={certificate} doctor={doctor} />
            </div>
          </>
        ))}
      </div>
    );
  }
);

const ProfessionalCertificatePrintAll = forwardRef(({}, ref) => {
  const dummyData = [
    { id: 1, name: "John Doe" },
    // { id: 2, name: "Jane Smith" },
    // { id: 3, name: "Bob Johnson" },
    // { id: 4, name: "Alice Williams" },
  ];
  return (
    <div ref={ref}>
      {dummyData.map((data, index) => (
        <>
          <div
            key={index}
            style={{
              paddingTop: index === 0 ? 0 : "30px",
            }}
          >
            <ProfessionalCertificatePrint key={data.id} name={data.name} />
          </div>
        </>
      ))}
    </div>
  );
});

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

  useEffect(() => {}, []);
  const batch = useSelector((state) => state.certificate.certifificateBatch);
  const medicalDoctor = useSelector((state) => state.certificate.medicalDoctor);

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
                    Certificate Print
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
                    Certificate Documents
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
                        <div className="form-group">
                          <label htmlFor="examinerName">
                            Name Of Examiner:
                          </label>
                          <Field
                            type="text"
                            id="examinerName"
                            name="examinerName"
                            className="form-control my-upload"
                          />
                          <ErrorMessage name="examinerName" component="div" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="qualifications">
                            Qualifications:
                          </label>
                          <Field
                            type="text"
                            id="qualifications"
                            name="qualifications"
                            className="form-control my-upload"
                          />
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

                    <div className="row">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ borderRadius: "20px", fontWeight: "bold" }}
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
            <h4 className="box-title">
              <strong>
                List Of Certificates Ready Printing{" "}
                <span>
                  <button
                    className="btn btn-success-light"
                    // onClick={handlePrintAll}
                    onClick={handlePrintProfessionalAll}
                    style={{
                      fontWeight: "bold",
                    }}
                    disabled={!medicalDoctor}
                  >
                    Print All
                  </button>
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
                      />
                    ))}
                </tbody>
              </table>
            </div>
            {/* <p>{JSON.stringify(batch)}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePrintTable;
