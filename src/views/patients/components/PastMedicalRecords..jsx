import React, {
  forwardRef,
  useRef,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import PastRecordPrint from "../recordPrint/PastRecordPrint";

const PrintRecord = forwardRef(
  (
    {
      record,
      selectedIllnesses,
      everyIllness,
      selectedTobaccos,
      everyTobacco,
      vitals,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          padding: "3rem",
        }}
      >
        <PastRecordPrint
          record={record}
          allIllnesses={everyIllness}
          specificIllnesses={selectedIllnesses}
          allTobaccos={everyTobacco}
          specificTobaccos={selectedTobaccos}
          latestVitals={vitals}
        />
      </div>
    );
  }
);

const PastMedicalRecords = () => {
  const [recordToPrint, setRecordToPrint] = useState(null);
  const patientIllnesses = useSelector(
    (state) => state.forms.patientsIllnesses || []
  );
  const patientTobaccos =
    useSelector((state) => state.forms.patientsTobaccos) || [];
  const diseases = useSelector((state) => state.illness.illnesses);
  const tobaccos = useSelector((state) => state.tobacco.tobaccos);
  const vitals = useSelector((state) => state.forms.fPhysicalExamination);

  const recordRef = useRef();
  const handlePrintRecord = useReactToPrint({
    content: () => recordRef.current,
  });
  const records =
    useSelector((state) => state.patient.patientMedicalRecords) || [];

  const printRecord = (recordId) => {
    setRecordToPrint(null);
    const pr = records.find((record) => record.id === recordId);
    setRecordToPrint(pr);
    if (recordToPrint !== null) {
      handlePrintRecord();
    }
  };

  return (
    <>
      {recordToPrint && (
        <div
          className="row"
          style={{
            display: "none",
          }}
        >
          <PrintRecord
            ref={recordRef}
            record={recordToPrint}
            selectedIllnesses={patientIllnesses}
            everyIllness={diseases}
            everyTobacco={tobaccos}
            selectedTobaccos={patientTobaccos}
            vitals={vitals}
          />
        </div>
      )}

      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            <strong>PATIENT'S MEDICAL HISTORY</strong>
          </h4>
        </div>
        <div className="box-body">
          <div className="row mt-25">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">YEAR OF EXAMINATION</th>
                    <th className="bb-2">XRAY STATUS</th>
                    <th className="bb-2">PREVIOUS HEALTH ISSUES</th>
                    <th className="bb-2">DOCTORS/NURSE COMMENT</th>
                    <th className="bb-2">REMARKS</th>
                    <th className="bb-2">FIT TO WORK</th>
                    <td className="bb-2">Action <strong>(Double Click)</strong> </td>
                  </tr> 
                </thead>
                <tbody>
                  {records &&
                    records.map((record, index) => (
                      <tr key={index}>
                        <td>
                          <span className="btn btn-primary">
                            {record.year_of_exam}
                          </span>
                        </td>
                        {/* <td>{record.xray && record.xray.status}</td> */}
                        <td>
                          {record.xray ? (
                            <span>{record.xray.status}</span>
                          ) : (
                            <p>N/A</p>
                          )}
                        </td>
                        {/* <td>
                          {record.doctor_remarks &&
                            record.doctor_remarks.previous_health_issues}
                        </td> */}
                        <td>
                          {record.doctor_remarks ? (
                            <span>
                              {record.doctor_remarks.previous_health_issues}
                            </span>
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>
                        <td
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                          }}
                        >
                          {record.doctor_remarks ? (
                            <span>{record.doctor_remarks.comment}</span>
                          ) : (
                            <span>N/A</span>
                          )}
                          {/* {record.doctor_remarks &&
                            record.doctor_remarks.comment} */}
                        </td>
                        <td
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                          }}
                        >
                          {record.doctor_remarks ? (
                            <span>{record.doctor_remarks.remarks}</span>
                          ) : (
                            <span>N/A</span>
                          )}
                          {/* {record.doctor_remarks &&
                            record.doctor_remarks.remarks} */}
                        </td>
                        <td>
                          {record.doctor_remarks &&
                          record.doctor_remarks.fit_to_work === 1 ? (
                            <span className="badge badge-pill badge-success">
                              YES
                            </span>
                          ) : (
                            <span className="badge badge-pill badge-danger">
                              NO
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-success mb-5"
                            style={{
                              borderRadius: "10px",
                            }}
                            onClick={() => printRecord(record.id)}
                          >
                            PRINT RECORD
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
    </>
  );
};

export default PastMedicalRecords;
