import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { PHYSICAL_EXAM } from "../../../helpers/helpers";
import { Link } from "react-router-dom";

const SearchedClientsBox = () => {
  const searchedClients =
    useSelector((state) => state.patient.searchResults) || [];
  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <h4 className="box-title">
            Searched Clients:{" "}
            <span className="badge badge-pill badge-warning">
              {searchedClients.length}
            </span>
          </h4>
        </div>
        <div className="box-body pt-0">
          <div className="row mt-25">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="bb-2">First Name</th>
                    <th className="bb-2">Last Name</th>
                    <th className="bb-2">Company</th>
                    <th className="bb-2">Category</th>
                    <th className="bb-2">Phone Number</th>
                    <th className="bb-2">Certificate</th>
                    <th className="bb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedClients &&
                    searchedClients.map((client, index) => (
                      <tr key={client.id}>
                        <td>{client.attendee.first_name}</td>
                        <td>{client.attendee.last_name}</td>
                        <td>{client.company.company_name}</td>
                        <td>{client.category}</td>
                        <td>{client.attendee.phone_number}</td>
                        <td>{PHYSICAL_EXAM(client.certificates[0].status)}</td>
                        <td>
                          <Link
                            to={`/patients/${client.id}`}
                            className="waves-effect waves-light btn btn-primary-light btn-circle"
                          >
                            <span className="icon-Settings-1 fs-18">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <CSVLink filename={"MedicalsClients.csv"} data={searchedClients}>
          Download CSV
        </CSVLink> */}
      </div>
    </>
  );
};

export default SearchedClientsBox;
