import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";

const ForwardPatientPage = ({}) => {
  const { patientId } = useParams();
  return (
    <>
      <BreadCrumb
        title={"Assing Patient to Consultatant"}
        activeTab={"Assign To Doctor / Nurse"}
      />
      <div className="section">
        <div className="row">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="box p-3  py-4">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  ASSIGN PATIENT TO DOCTOR / NURSE
                </h4>

                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select">
                        <option value="">ANY NURSE / DOCTOR</option>
                        <option value="">Bridget Moyo (RGN)</option>
                        <option value="">Constance Mufuka (RGN)</option>
                        <option value="">Dr Daniel Mijeri</option>
                        <option value="">Dr jennipher Chikomo </option>
                      </select>
                      <label>SELECT DOCTOR / NURSE TO ASSIGN PATIENT TO</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select">
                        <option value="">SELECT CONSULTATION TYPE</option>
                        <option value="">ADULT CONSULTATION</option>
                        <option value="">CHILDREN CONSULTATION</option>
                        <option value="">ADULT REVIEW</option>
                        <option value="">CHILDREN REVIEW</option>
                        <option value="">PCR</option>
                        <option value="">VACCINES</option>
                        <option value="">ANTIGEN</option>
                      </select>
                      <label>CONSULTATION TYPE (SELECT BELOW)</label>
                    </div>
                  </div>
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select">
                        <option value="">SELECT PAYPOINT</option>
                        <option value="">DEPARTMENT PP</option>
                        <option value="">BAKERS INN F1</option>
                        <option value="">COMPLEX FO</option>
                      </select>
                      <label>PAYPOINT TYPE (SELECT BELOW)</label>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-3">
                    <div className="form-floating">
                      <select className="form-select">
                        <option value="">SELECT PAYMENT</option>
                        <option value="">PAYROLL</option>
                      </select>
                      <label>PAYMENT TYPE (SELECT BELOW)</label>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="form-floating">
                      <textarea className="form-control" rows="3"
                      style={{
                        minHeight: "150px"
                      }}
                      ></textarea>
                      <label>PATIENT FORWARDING NOTES (OPTIONAL)</label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{
                    width: "fit-content",
                  }}
                >
                  FORWARD PATIENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForwardPatientPage;
