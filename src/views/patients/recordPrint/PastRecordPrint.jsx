import React from "react";
import "./Record.css";

const PastRecordPrint = ({
  allIllnesses,
  specificIllnesses,
  allTobaccos,
  specificTobaccos,
  latestVitals,
  record,
}) => {
  const mergedIllnesses = allIllnesses.map((illness) => {
    const specificIllness = specificIllnesses.find(
      (item) => item.name === illness.illness_name
    );
    return {
      ...illness,
      specificIllness: specificIllness || {
        has_illness: 0,
        treatment_year: "",
      },
    };
  });

  const mergedTobaccos = allTobaccos.map((tobacco) => {
    const specificTobacco = specificTobaccos.find(
      (item) => item.name === tobacco.name
    );
    return {
      ...tobacco,
      specificTobacco: specificTobacco || {
        do_smoke: 0,
        how_many: "",
      },
    };
  });

  const renderBox = (text, specificTobacco) => {
    const { do_smoke, how_many } = specificTobacco;

    return (
      <div
        style={{
          display: "flex",
          padding: "0px",
        }}
      >
        <div style={{ flex: 0.3 }}>
          <span style={{ fontWeight: "bold" }}>{text}</span>
        </div>

        <div
          style={{
            flex: 0.7,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3px",
          }}
        >
          <div
            style={{
              border: "1px solid black",
              width: "20px",
              height: "20px",
              display: "inline-block",
              textAlign: "center",
              margin: "0px",
              backgroundColor: do_smoke === 1 ? "white" : "white",
            }}
          >
            {do_smoke === 1 && (
              <span
                style={{ color: "black", fontWeight: "bold", fontSize: "10px" }}
              >
                ✔️
              </span>
            )}
          </div>

          <div
            style={{
              border: "1px solid black",
              width: "20px",
              height: "20px",
              display: "inline-block",
              textAlign: "center",
              margin: "0px",
              backgroundColor: do_smoke === 0 ? "white" : "white",
            }}
          >
            {do_smoke === 0 && (
              <span
                style={{ color: "black", fontWeight: "bold", fontSize: "10px" }}
              >
                ✔️
              </span>
            )}
          </div>

          <span
            style={{
              fontWeight: "bold",
              paddingLeft: "3px",
              paddingRight: "3px",
            }}
          >
            If yes, how many per day?
          </span>

          <div
            style={{
              border: "1px solid black",
              width: "20px",
              height: "20px",
              display: "inline-block",
              textAlign: "center",
              margin: "0px",
              backgroundColor: how_many ? "white" : "white",
            }}
          >
            {how_many && (
              <span
                style={{ color: "black", fontWeight: "bold", fontSize: "10px" }}
              >
                {how_many}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const formattedDate = record?.created_at
    ? new Date(record.created_at).toLocaleDateString("en-GB")
    : "N/A";

  return (
    <>
      <div className="record-container">
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          <img
            // src="/assets/images/providence.png"
            src="/medicals/assets/images/providence.png"
            style={{
              height: "5rem",
            }}
          />
        </p>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: "-10px",
            marginBottom: "2px",
          }}
        >
          PERIODIC MEDICAL EXAMINATION RECORD
        </p>
        <p
          className="rmargin form"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <span>
            <u>PATIENT DETAILS</u>
          </span>
          <span style={{ float: "right", fontSize: "11px" }}>
            DATE <span className="underline-span2">{formattedDate}</span>
          </span>
        </p>
        <p
          className="form_p"
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          NAME{" "}
          <span
            className="underline-span2"
            style={{ flex: 4, fontSize: "11px" }}
          >
            {record.patient && record.patient.first_name}
          </span>
          SURNAME{" "}
          <span
            className="underline-span2"
            style={{ flex: 4, fontSize: "11px" }}
          >
            {record.patient && record.patient.last_name}
          </span>
          AGE{" "}
          <span
            className="underline-span2"
            style={{ flex: 2, fontSize: "11px" }}
          >
            {record.patient.age}
          </span>
        </p>
        <p
          className="form_p"
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          DATE OF BIRTH{" "}
          <span
            className="underline-span2"
            style={{ flex: 0.3, fontSize: "11px" }}
          >
            {record.patient && record.patient.date_of_birth}
          </span>
          SEX:
          <span
            className="underline-span2"
            style={{ flex: 0.3, fontSize: "11px" }}
          >
            {record.patient.gender}
          </span>
          CONTACT NUMBER
          <span
            className="underline-span2"
            style={{ flex: 0.4, fontSize: "11px" }}
          >
            {" "}
            {record.patient.phone_number}
          </span>
        </p>
        <p
          className="form_p"
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          EMPLOYEE NO.{" "}
          <span
            className="underline-span2"
            style={{ flex: 0.2, fontSize: "11px" }}
          >
            {" "}
            {record.patient && record.patient.employee_number}
          </span>
          DIVISION/COMPANY{" "}
          <span
            className="underline-span2"
            style={{ flex: 0.75, fontSize: "11px" }}
          >
            {record.patient && record.patient.company}
          </span>{" "}
        </p>
        <p
          className="form_p"
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          <span>
            ID NUMBER{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.4, fontSize: "11px" }}
            >
              {" "}
              {record.patient && record.patient.national_id}
            </span>{" "}
          </span>
        </p>

        <div className="illness section">
          <p
            className="form_p"
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              marginTop: "10px",
              textDecoration: "underline",
            }}
          >
            MEDICAL HISTORY
          </p>
        </div>
        <p style={{ fontWeight: "bold" }}>
          WERE YOU EVER TREATED FOR ANY OF THE ILLNESSES LISTED BELOW ? PLEASE
          TICK
        </p>
        <div
          style={{
            padding: "10px",
          }}
        >
          <table className="table-table">
            <thead>
              <tr>
                <th className="tth name"></th>
                <th className="tth text-center">YES</th>
                <th className="tth text-center">NO</th>
                <th className="tth text-center">WHEN?</th>
              </tr>
            </thead>
            <tbody>
              {mergedIllnesses.map((illness) => (
                <tr key={illness.id}>
                  <td
                    className="ttd"
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {illness.illness_name}
                  </td>
                  <td className="ttd text-center">
                    {illness.specificIllness.has_illness === 1 ? "✔️" : ""}
                  </td>
                  <td className="ttd text-center">
                    {illness.specificIllness.has_illness === 0 ? "✔️" : ""}
                  </td>
                  <td className=" ttd text-center">
                    {illness.specificIllness.treatment_year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginTop: "15px",
          }}
        >
          <p
            className="form_p"
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            TOBACCO USE{" "}
          </p>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                flex: 0.2,
              }}
            >
              <p style={{ fontWeight: "bold" }}>Do you smoke?</p>
            </div>
            <div style={{ flex: 0.5 }}>
              {mergedTobaccos.map((tobacco) => (
                <div
                  style={{
                    paddingBottom: "0px",
                    fontSize: "10px",
                    marginBottom: "2px",
                  }}
                  key={tobacco.id}
                >
                  {renderBox(tobacco.name, tobacco.specificTobacco)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p
            className="form_p"
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: "3px",
            }}
          >
            MEDICAL TESTS
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
              marginBottom: "3px",
            }}
          >
            WHEN WAS YOUR LAST CHEST XRAY DONE?{" "}
            <span
              className="underline-span2"
              style={{ flex: 1, marginLeft: "5px" }}
            >
              {/* {patient.last_x_ray && patient.last_x_ray} */}
            </span>{" "}
          </p>
        </div>
        <div>
          <p
            className="form_p"
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              textDecoration: "underline",
            }}
          >
            FOR OFFICIAL USE ONLY
          </p>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "3px",
              textDecoration: "underline",
            }}
          >
            PHYSICAL EXAMINATION
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
              marginBottom: "3px",
            }}
          >
            HEIGHT{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.4, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.height ? `${latestVitals.height} m` : ""} 
            </span>{" "}
            WEIGHT{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.6, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.weight ? `${latestVitals.weight} kg` : ""} 
            </span>
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
              marginBottom: "3px",
            }}
          >
            BP{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.4, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.bp_sys && latestVitals.bp_dia
                ? `${latestVitals.bp_sys}/${latestVitals.bp_dia} mmHg`
                : ""}
            </span>
            PULSE{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.6, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.pulse}
            </span>{" "}
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
              marginBottom: "3px",
            }}
          >
            BMI{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.4, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.bmi ? `${latestVitals.bmi}` : ""} 
              
              {latestVitals && latestVitals.bmi_status ? `${(latestVitals.bmi_status)}` : ""}
             
            </span>{" "}
            <span
              style={{
                fontSize: "11px",
                paddingRight: "10px",
              }}
            >
              {" "}
              VISION{" "}
            </span>{" "}
            LEFT
            <span
              className="underline-span2"
              style={{ flex: 0.3, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.left_vision}
            </span>{" "}
            RIGHT
            <span
              className="underline-span2"
              style={{ flex: 0.3, marginLeft: "5px" }}
            >
              {latestVitals && latestVitals.right_vision}
            </span>
          </p>
          <p
            className="form_p"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            GENERAL PHYSICAL OBSERVATION AND REMARKS
          </p>
          <p style={{ display: "flex", marginBottom: "2px" }}>
            <p
              className="underline-span3"
              style={{ flex: 1, marginLeft: "5px" }}
            >
              {" "}
              {record.doctor_remarks && record.doctor_remarks.comment}
            </p>
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
            }}
          >
            CHEST XRAY NORMAL YES/NO{" "}
            <span
              style={{
                paddingLeft: "20px",
                fontWeight: "bold",
              }}
            >
              COMMENTS
            </span>
            <span
              className="underline-span3"
              style={{ flex: 1, marginLeft: "5px" }}
            ></span>
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
            }}
          >
            RECTAL SWAB RESULT
            <span
              className="underline-span2"
              style={{ flex: 1, marginLeft: "5px" }}
            ></span>
          </p>
          <p
            className="form_p"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            DOCTOR'S REMARKS
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2px",
              textAlign: "start !important",
            }}
          >
            <p
              className="underline-span3 form_p"
              style={{ marginLeft: "5px", flex: "3" }}
            >
              {record.doctor_remarks && record.doctor_remarks.remarks}
            </p>
          </div>

          <p
            className="form_p"
            style={{
              fontWeight: "bold",
            }}
          >
            IS THE EMPLOYEE FIT TO WORK AS A FOOD HANDLER?{" "}
            <span style={{ fontWeight: "bold", marginLeft: "4rem" }}>
              FIT / UNFIT{" "}
            </span>{" "}
          </p>
          <p
            className="form_p"
            style={{
              display: "flex",
              marginBottom: "2px",
            }}
          >
            DOCTOR'S SIGNATURE{" "}
            <span
              className="underline-span2"
              style={{ flex: 0.5, marginRight: "5px" }}
            ></span>{" "}
            DATE{" "}
            <span className="underline-span2" style={{ flex: 0.5 }}>
              {formattedDate}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PastRecordPrint;