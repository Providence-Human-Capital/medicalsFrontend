import React, { useEffect, useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import BreadCrumb from "../../components/BreadCrumb";
import { API } from "../../config";
import Loading from "../../components/loader/Loading";
import Swal from "sweetalert2";

import inHouseCertificateImage from "../../assets/certificatesPNGs/INHOUSE_MEDICAL_CERTIFICATE_TEMPLATE-1.png";
import cityOfHarareCertificateImage from "../../assets/certificatesPNGs/CITY_OF_HARARE_CERTIFICATE_TEMPLATE-1.png";
import natPakCertificateImage from "../../assets/certificatesPNGs/NATPAK_PERIODICAL_CERTIFICATE_TEMPLATE-1.png";

const Appointments = () => {
  const [template, setTemplate] = useState(null);
  const [examinerName, setExaminerName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificateType, setCertificateType] = useState("InHouseCertificate");

  const handleTemplateChange = (event) => {
    setTemplate(event.target.files[0]);
  };

  const handleExaminerNameChange = (event) => {
    setExaminerName(event.target.value);
  };

  const handleQualificationsChange = (event) => {
    setQualifications(event.target.value);
  };

  const handleCertificateTypeChange = (event) => {
    // New function
    setCertificateType(event.target.value);
  };

  const fetchDataArrayFromAPI = async () => {
    try {
      const response = await fetch(`${API}/print-data`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return null;
    }
  };

  const generateDocument = async () => {
    if (!template) {
      Swal.fire({
        icon: "warning",
        title: "Please select a template file",
        showConfirmButton: true, // Show the "OK" button
        allowOutsideClick: false, // Prevent clicking outside the pop-up to close it
      }).then((result) => {
        setLoading(false);
        if (result.isConfirmed) {
          return; // Return after the user clicks "OK"
        }
      });
    }
    setLoading(true);
    const dataArray = await fetchDataArrayFromAPI(); // Fetch an array of data objects from your API
    if (!dataArray) {
      alert("Failed to fetch data from API");
      setLoading(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      const templateContent = event.target.result;
      dataArray.forEach((data, index) => {
        const { first_name, last_name, company, city, address, gender } = data;
        const fileName = `${first_name}-${last_name}(${company}).docx`;
        const zip = new PizZip(templateContent);
        const doc = new Docxtemplater();
      
        const now = new Date();
        const monthNames = [
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
        // Format the date as "22nd of JULY 2023"
        const date = `${now.getDate()}${
          ["st", "nd", "rd"][((((now.getDate() + 90) % 100) - 10) % 10) - 1] ||
          "th"
        } of ${monthNames[now.getMonth()].toUpperCase()} ${now.getFullYear()}`;
        doc.loadZip(zip);
        doc.setData({
          examinerName: examinerName,
          qualifications: qualifications,
          first_name: first_name,
          last_name: last_name,
          company: company,
          city: city,
          address: address,
          date: date,
          gender: gender,
        });
        // doc.setOptions({ parser: customParser });
        doc.render();
        const generatedDocument = doc.getZip().generate({ type: "blob" });
        saveAs(generatedDocument, fileName);
      });
      setLoading(false);
    };
    reader.readAsBinaryString(template);
  };

  const customParser = (tag) => {
    if (tag === "tick") {
      return {
        get: function (scope) {
          const gender = scope.gender;
          if (gender === "Male") {
            return "☑";
          } else if (gender === "Female") {
            return "☑";
          } else {
            return "☐";
          }
        },
      };
    }
    return false;
  };

  useEffect(() => {
    // setLoading(false);
  });

  return (
    <>
      <BreadCrumb title={"Appointments"} activeTab={"Appointments"} />
      <div className="row">
        <div className="col-md-6">
          <div className="box">
            <div className="box-body">
              <div className="p-3">
                <h3
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  <strong>Certificate Generator</strong>
                </h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="template" className="form-label">
                      Select Template:
                    </label>
                    <input
                      type="file"
                      id="template"
                      accept=".docx"
                      onChange={handleTemplateChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="examinerName">Name Of Examiner:</label>
                    <input
                      type="text"
                      id="examinerName"
                      value={examinerName}
                      onChange={handleExaminerNameChange}
                      className="form-control my-upload"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="qualifications">Qualifications:</label>
                    <input
                      type="text"
                      id="qualifications"
                      value={qualifications}
                      onChange={handleQualificationsChange}
                      className="form-control my-upload"
                      required
                    />
                  </div>
                  <div className="form-group d-flex">
                    <label>Certificate Type:</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="certificateType"
                        id="inHouseCertificate"
                        value="InHouseCertificate"
                        checked={certificateType === "InHouseCertificate"}
                        onChange={handleCertificateTypeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inHouseCertificate"
                      >
                        InHouse Certificate
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="certificateType"
                        id="cityOfHarareCertificate"
                        value="CityOfHarareCertificate"
                        checked={certificateType === "CityOfHarareCertificate"}
                        onChange={handleCertificateTypeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cityOfHarareCertificate"
                      >
                        City Of Harare Certificate
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="certificateType"
                        id="natPakCertificate"
                        value="NatPakCertificate"
                        checked={certificateType === "NatPakCertificate"}
                        onChange={handleCertificateTypeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="natPakCertificate"
                      >
                        NatPak Certificate
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p>
                      <strong>Disclaimer</strong> The Certificate Type Select
                      above only shows you what the templates looks like but
                      doesn't select a template for usage. You have to uploade a
                      certificate to use it.
                    </p>
                  </div>
                  <div className="form-group">
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        onClick={generateDocument}
                        className="btn btn-primary"
                        disabled={!template}
                      >
                        Generate Document
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="container">
            <img
              src={
                certificateType === "InHouseCertificate"
                  ? inHouseCertificateImage
                  : certificateType === "CityOfHarareCertificate"
                  ? cityOfHarareCertificateImage
                  : certificateType === "NatPakCertificate"
                  ? natPakCertificateImage
                  : null
              }
              alt=""
              className="img-fluid"
              style={{
                borderRadius: "10px",
                width: "fit-content",
                height: "fit-content",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
