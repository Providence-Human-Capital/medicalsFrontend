import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import BreadCrumb from "../../components/BreadCrumb";
import { useReactToPrint } from "react-to-print";

import InHouseCertificatePrint from "../certificates/certificates-print/InHouseCertificatePrint";

const PersonDetails = forwardRef(({ person }, ref) => {
  return (
    <div ref={ref}>
      <InHouseCertificatePrint person={person} />
    </div>
  );
});

const InHousePrintAlll = forwardRef(({ person }, ref) => {
  const [personsData, setPersonsData] = useState([]);
  const fetchPersonsData = async () => {
    // Simulating an asynchronous API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const personsData = [
          {
            name: "John",
            last_name: "Doe",
            age: 25,
            address: "123 Main St",
            phone: "123-456-7890",
            company: "NatPak",
          },
          {
            name: "Jane ",
            last_name: "Smith",
            age: 30,
            address: "456 Elm St",
            phone: "987-654-3210",
            company: "NatPak",
          },
          {
            name: "Michael",
            last_name: "Johnson",
            age: 35,
            address: "789 Oak St",
            phone: "555-123-4567",
            company: "NatPak",
          },
          {
            name: "Emily",
            last_name: "Davis",
            age: 28,
            address: "321 Pine St",
            phone: "777-888-9999",
            company: "NatPak",
          },
          {
            name: "David",
            last_name: "Jonasi",
            age: 32,
            address: "654 Cedar St",
            phone: "444-555-6666",
            company: "NatPak",
          },
        ];

        resolve(personsData);
      }, 1000); // Simulating a 1 second delay
    });
  };

  useEffect(() => {
    fetchPersonsData()
      .then((data) => {
        setPersonsData(data);
      })
      .catch((error) => {
        console.error("Error fetching persons data:", error);
      });
  });
  return (
    <div ref={ref}>
      {personsData.map((person, index) => (
        <>
          <div key={index} style={{ paddingTop: index === 0 ? 0 : "10px" }}>
            <InHouseCertificatePrint person={person} />
          </div>
        </>
      ))}
    </div>
  );
});

const Appointments = () => {
  const [personsData, setPersonsData] = useState([]);
  const dispatch = useDispatch();
  const [selectedPersons, setSelectedPersons] = useState([]);

  useEffect(() => {
    fetchPersonsData()
      .then((data) => {
        setPersonsData(data);
      })
      .catch((error) => {
        console.error("Error fetching persons data:", error);
      });
  });
  const handlePrint = () => {
    console.log("Printing completed");
  };

  const fetchPersonsData = async () => {
    // Simulating an asynchronous API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const personsData = [
          {
            name: "John",
            last_name: "Doe",
            age: 25,
            address: "123 Main St",
            phone: "123-456-7890",
            company: "NatPak",
          },
        ];

        resolve(personsData);
      }, 1000); // Simulating a 1 second delay
    });
  };

  const personRefs = useRef([]);
  const inHousePrintAllRef = useRef();

  const handlePrintAll = useReactToPrint({
    content: () => inHousePrintAllRef.current,
  });

  return (
    <>
      <BreadCrumb title={"Appointments"} activeTab={"Appointments"} />
      <div className="row">
        <div
          className="col-md-6"
          style={{
            display: "none",
          }}
        >
          <InHousePrintAlll ref={inHousePrintAllRef} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div
            className="box"
            style={{
              margin: "10px",
            }}
          >
            <div className="box-body">
              <button
                className="btn btn-primary"
                onClick={handlePrintAll}
                style={{
                  marginBottom: "1Opx",
                  borderRadius: "20px",
                }}
              >
                Print All
              </button>
              <div className="table-responsive mt-4">
                <table className="table no-border">
                  <thead>
                    <tr className="text-uppercase bg-lightest">
                      <th>
                        <span className="text-dark">Patient Name</span>
                      </th>
                      <th>
                        <span className="text-dark">Last Name</span>
                      </th>
                      <th>
                        <span className="text-dark">Company</span>
                      </th>
                      <th>
                        <span className="text-dark">Print Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {personsData.map((person, index) => (
                      <Fragment>
                        <tr key={index}>
                          <td>
                            <span className="text-fade fw-600 d-block fs-16">
                              {person.name}
                            </span>
                          </td>
                          <td>
                            <span className="text-fade fw-600 d-block fs-16">
                              {person.last_name}
                            </span>
                          </td>
                          <td>
                            <span className="text-fade fw-600 d-block fs-16">
                              {person.company}
                            </span>
                          </td>
                          <td>
                            <span className="text-fade fw-600 d-block fs-16">
                              <div key={index} className="d-flex">
                                <div
                                  style={{
                                    border: "1px solid black",
                                    display: "none",
                                  }}
                                >
                                  <PersonDetails
                                    person={person}
                                    ref={(el) =>
                                      (personRefs.current[index] = el)
                                    }
                                  />
                                </div>
                                <ReactToPrint
                                  trigger={() => (
                                    <button
                                      className="btn btn-primary"
                                      style={{
                                        width: "fit-content",
                                        margin: "20px",
                                        borderRadius: "20px",
                                      }}
                                    >
                                      Print
                                    </button>
                                  )}
                                  content={() => personRefs.current[index]}
                                  onAfterPrint={handlePrint}
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                      </Fragment>
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

export default Appointments;
