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

const Appointments = () => {
  return (
    <>
      <BreadCrumb title={"Appointments"} activeTab={"Appointments"} />
    </>
  );
};

export default Appointments;
