import React, { useEffect, useState } from "react";
import { getAllCompanyClients } from "../../../services/api";
import { getCurrentPageData } from "../../../helpers/helpers";
import ReactPaginate from "react-paginate";

const CompanyClientsBox = ({ companyName, companyId }) => {
  const [isFetchingClients, setIsFetchingClients] = useState(false);
  const [clients, setClients] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7;

  const currentPageData = getCurrentPageData(clients, pageNumber, itemsPerPage);
  useEffect(() => {
    const fetchingClients = async () => {
      setIsFetchingClients(true);
      try {
        const clients = await getAllCompanyClients(companyId);
        setClients(clients);
        setIsFetchingClients(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingClients();
  }, []);
  return (
    <>
      <div class="box">
        <div class="box-header">
          <h4
            class="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Clients
            <span class="badge">New</span>
          </h4>
        </div>
        <div class="box-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className=" bb-2">Client Id</th>
                  <th className=" bb-2">First Name</th>
                  <th className=" bb-2">Last Name</th>
                  <th className=" bb-2">National ID</th>
                  <th className=" bb-2">Phone Number</th>
                  <th className=" bb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients &&
                  currentPageData.map((client, index) => (
                    <tr className="hover-primary" key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.first_name}</td>
                      <td>{client.last_name}</td>
                      <td>
                        <span className="badge badge-pill badge-warning">
                          {client.national_id}
                        </span>
                      </td>
                      <td>{client.phone_number}</td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="table-spacing"></div>
            {clients && (
              <div className="paginate-position">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(clients.length / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(clients) => {
                    setPageNumber(clients.selected);
                  }}
                  containerClassName={"pagination"}
                  activeClassName={"active-paginate"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyClientsBox;
