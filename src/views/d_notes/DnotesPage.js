import React, { forwardRef, useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { getAllDnotes, getCityOfHarareDNote } from "../../services/api";
import DnoteBox from "./components/DnoteBox";
import { useDispatch, useSelector } from "react-redux";
import { certificateActions } from "../../redux_store/certificates-store";
import CityOHDnotePrint from "../certificates/d-note/CityOHDnotePrint";
import SimbisaDnotePrint from "../certificates/d-note/SimbisaDnotePrint";
import TexasDnotePrint from "../certificates/d-note/TexasDnotePrint";
import { useReactToPrint } from "react-to-print";
import DnoteAdvanceSearch from "./components/DnoteAdvanceSearch";

const CityOfHarareDnote = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref}>
      <>
        <CityOHDnotePrint data={data} />
      </>
    </div>
  );
});

// const SimbisaDnote = forwardRef(({ data }, ref) => {
//   return (
//     <div ref={ref}>
//       <>
//         <SimbisaDnotePrint />
//       </>
//     </div>
//   );
// });

// const TexasDnote = forwardRef(({ data }, ref) => {
//   return (
//     <div ref={ref}>
//       <>
//         <TexasDnotePrint />
//       </>
//     </div>
//   );
// });

const DnotesPage = () => {
  // const [dnotes, setDnotes] = useState([]);
  const [isLoadingDnotes, setIsLoadingDnotes] = useState(true);
  const dispatch = useDispatch();
  const [cityOfHarare, setCityOfHarare] = useState([]);

  const dnotes = useSelector((state) => state.certificate.allDnotes) || [];

  const cityOfHarareDnoteRef = useRef();
  const simbisaDnoteRef = useRef();
  const texasDnoteRef = useRef();

  const handlePrintDnote = useReactToPrint({
    content: () => cityOfHarareDnoteRef.current,
  });

  const handlePrintSimbisaDnote = useReactToPrint({
    content: () => simbisaDnoteRef.current,
  });

  const handlePrintTexasDnote = useReactToPrint({
    content: () => texasDnoteRef.current,
  });

  useEffect(() => {
    getCityOfHarareDNote().then((data) => {
      if (data) {
        setCityOfHarare(data);
      }
    });
    getAllDnotes()
      .then((dnotes) => {
        // setDnotes(dnotes);
        setIsLoadingDnotes(false);
        dispatch(certificateActions.setAllDnotes([...dnotes]));
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingDnotes(false);
      });
  }, []);

  return (
    <>
      <BreadCrumb title={"D Notes"} activeTab={"Company D-Notes"} />
      <section className="content">
        <DnoteAdvanceSearch />
        <div
          className="container"
          style={{
            marginBottom: "30px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "none",
            }}
          >
            <CityOfHarareDnote ref={cityOfHarareDnoteRef} data={cityOfHarare} />
            {/* <SimbisaDnote ref={simbisaDnoteRef} />
            <TexasDnote ref={texasDnoteRef} /> */}
          </div>
          <button
            className="btn btn-success-light me-4"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            onClick={handlePrintDnote}
          >
            City Of Harare DNOTE
          </button>
          {/* <button
            className="btn btn-success-light me-4"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            onClick={handlePrintSimbisaDnote}
          >
            SIMBISA BRANDS DNOTE
          </button>
          <button
            className="btn btn-success-light me-4"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            onClick={handlePrintTexasDnote}
          >
            TEXAS DNOTE
          </button> */}
        </div>
        {isLoadingDnotes ? (
          // Render the loading spinner while data is being fetched
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="row">
            {dnotes.map((dnote, index) => (
              <DnoteBox key={dnote.id} dnote={dnote} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default DnotesPage;
