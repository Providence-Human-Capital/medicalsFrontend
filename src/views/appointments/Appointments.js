import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import ExcelJS from "exceljs";
import BreadCrumb from "../../components/BreadCrumb";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const services = {
  foodHandlersPreEmployment: [
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
  ],
  foodHandlersPeriodical: ["Service 5", "Service 6", "Service 7", "Service 8"],
  pneumoconiosisPreEmployment: [
    "Service 9",
    "Service 10",
    "Service 11",
    "Service 12",
  ],
  pneumoconiosisPeriodical: [
    "Service 13",
    "Service 14",
    "Service 15",
    "Service 16",
  ],
  preEmployment: ["Service 17", "Service 18", "Service 19", "Service 20"],
  postEmployment: ["Service 21", "Service 22", "Service 23", "Service 24"],
  hivMedical: ["Service 25", "Service 26", "Service 27", "Service 28"],
  audiometry: ["Service 29", "Service 30", "Service 31", "Service 32"],
  spirometry: ["Service 33", "Service 34", "Service 35", "Service 36"],
  annualCheckup: ["Service 37", "Service 38", "Service 39", "Service 40"],
};

const Appointments = () => {
  useEffect(() => {}, []);

  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPurpose(selectedValue);
    setModalOpen(!!selectedValue);
  };

  return (
    <>
      <BreadCrumb title={"Appointments"} activeTab={"Appointments"} />
      <div className="container mt-5">
        <h3>Select Exam Purpose:</h3>
        <select
          className="form-control"
          value={selectedPurpose}
          onChange={handleDropdownChange}
        >
          <option value="">Select an Exam Purpose</option>
          <option value="foodHandlersPreEmployment">
            Food Handlers - (Pre-Employment)
          </option>
          <option value="foodHandlersPeriodical">
            Food Handlers - (Periodical)
          </option>
          <option value="pneumoconiosisPreEmployment">
            Pneumoconiosis - (Pre-Employment)
          </option>
          <option value="pneumoconiosisPeriodical">
            Pneumoconiosis - (Periodical)
          </option>
          <option value="preEmployment">Pre-Employment</option>
          <option value="postEmployment">Post Employment Medical</option>
          <option value="hivMedical">HIV Medical Examination</option>
          <option value="audiometry">Audiometry</option>
          <option value="spirometry">Spirometry</option>
          <option value="annualCheckup">Annual Medical Checkup</option>
        </select>

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader toggle={() => setModalOpen(false)}>
            Services for Selected Exam Purpose
          </ModalHeader>
          <ModalBody>
            <ul>
              {services[selectedPurpose]?.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Appointments;
