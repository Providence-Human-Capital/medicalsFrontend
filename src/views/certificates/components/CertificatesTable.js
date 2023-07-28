import React, { Fragment, useEffect } from "react";
import CertificateItem from "./CertificateItem";
import EmptyTable from "../../../components/EmptyTable";
import { useDispatch } from "react-redux";
import { certificateActions } from "../../../redux_store/certificates-store";

const CertificatesTable = ({ name, batch }) => {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [name]);

  return (
    <Fragment>
      <div className="col-12">
        <div className="box">
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
          {/* <!-- /.box-body --> */}
        </div>
      </div>
    </Fragment>
  );
};

export default CertificatesTable;
