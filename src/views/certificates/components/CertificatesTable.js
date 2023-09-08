import React, { Fragment, forwardRef, useEffect, useState } from "react";
import CertificateItem from "./CertificateItem";
import EmptyTable from "../../../components/EmptyTable";
import CompanyDnotePrint from "../d-note/CompanyDnotePrint";
import { useDispatch } from "react-redux";
import { certificateActions } from "../../../redux_store/certificates-store";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { API } from "../../../config";

const CompanyDNote = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref}>
      <>
        <CompanyDnotePrint data={data} />
      </>
    </div>
  );
});



const CertificatesTable = ({ name, batch }) => {
  
  const dispatch = useDispatch();
  const [dnotePatients, setDnotePatients] = useState([]);
  const companyDNoteRef = useRef();

  const handlePrintCompanyDnote = useReactToPrint({
    content: () => companyDNoteRef.current,
  });

  const automaticallyAddCertificatesToDnote = async (certificateIds) => {

    const requestData = {
      certificate_ids: certificateIds,
    };
    try {
      const response = await fetch(`${API}/dnote/${name}/add/certificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const automaticallyGetCertificatesOfDnote = async (dnoteName) => {
    try {
      const response = await fetch(
        `${API}/dnote/${dnoteName}/get/certificates`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log("Get Dnote Name", responseData);
        const certificates = responseData.dnote.certificates;
        setDnotePatients(certificates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const certificateBatchItems = batch.batch.certificate_batch_items || [];
    const certificateIds = certificateBatchItems.map((item) => item.patient.latest_certificate_id);


    if (certificateBatchItems.length > 0) {
      automaticallyAddCertificatesToDnote(certificateIds);
    }
    automaticallyGetCertificatesOfDnote(name);


    if (
      batch.batch.certificate_batch_items.length <= 0 &&
      batch.batch.company
    ) {
      return;
    }
    dispatch(
      certificateActions.setCertificateBatch(
        batch.batch.certificate_batch_items
      )
    );

    dispatch(certificateActions.setCompanyBatch(batch.batch.company));

    console.log("BBBB", batch.batch.certificate_batch_items)
  }, [name]);

  return (
    <Fragment>
      <div
        style={{
          display: "none",
        }}
      >
        <CompanyDNote data={dnotePatients} ref={companyDNoteRef} />
      </div>
      <div className="col-12">
        <div className="box">
          <a
            className="btn btn-success-light"
            style={{
              fontWeight: "bold",
            }}
            onClick={handlePrintCompanyDnote}
          >
            GENERATE DNOTE
          </a>
          <div className="box-body">
            <h4 className="box-title">
              {name} {"  "} Certificates
            </h4>
            <div className="table-responsive">
              {batch.batch.certificate_batch_items.length <= 0 ? (
                <EmptyTable />
              ) : (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">No.</th>
                      <th className="bb-2">First Name</th>
                      <th className="bb-2">Last Name</th>
                      <th className="bb-2">Gender</th>
                      <th className="bb-2">Status</th>
                      <th className="bb-2">Exam Purpose</th>
                      <th className="bb-2">ID Number</th>
                      <th className="bb-2">Phone Number</th>
                      <th className="bb-2">Referral</th>
                      <th className="bb-2">Certificate Validity</th>
                      <th className="bb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batch.batch.certificate_batch_items.length > 0 &&
                      batch.batch.certificate_batch_items.map((item, index) => (
                        <CertificateItem key={index} item={item} />
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CertificatesTable;
