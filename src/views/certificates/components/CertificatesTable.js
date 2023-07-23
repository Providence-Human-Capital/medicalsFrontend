import React, { Fragment } from "react";
import CertificateItem from "./CertificateItem";
import EmptyTable from "../../../components/EmptyTable";

const CertificatesTable = ({ name, batch }) => {
  return (
    <Fragment>
      <div class="col-12">
        <div class="box">
          <div class="box-body">
            <h4 class="box-title">
              {name} {"  "} Certificates
            </h4>
            <div class="table-responsive">
              {batch.batch.certificate_batch_items.length <= 0 ? (
                <EmptyTable />
              ) : (
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th class="bb-2">No.</th>
                      <th class="bb-2">First Name</th>
                      <th class="bb-2">Last Name</th>
                      <th class="bb-2">Gender</th>
                      <th class="bb-2">Status</th>
                      <th class="bb-2">Exam Purpose</th>
                      <th class="bb-2">ID Number</th>
                      <th class="bb-2">Phone Number</th>
                      <th class="bb-2">Referral</th>
                      <th class="bb-2">Certificate Validity</th>
                      <th class="bb-2">Actions</th>
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
