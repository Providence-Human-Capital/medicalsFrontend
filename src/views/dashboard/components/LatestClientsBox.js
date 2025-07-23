import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getLatestClients } from "../../../services/api";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loading from "../../../components/loader/Loading";

const LatestClientsBox = () => {
  const {
    data: latestClients,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestClients"],
    queryFn: getLatestClients,
  });

  if (isLoading) {
    return (
      <div className="box">
        <div
          className="flex items-center justify-center h-64"
          style={{
            margin: "20px",
          }}
        >
          <div className="text-lg font-medium text-gray-600 animate-pulse">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      <div className="box-header no-border">
        <h4
          className="box-title"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Latest Clients
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
                  <th className="bb-2">Date Of Entry</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {latestClients &&
                  latestClients.map((client, index) => (
                    <tr key={client.id}>
                      <td>{client.first_name}</td>
                      <td>{client.last_name}</td>
                      <td>
                        {" "}
                        <span className="badge badge-pill badge-warning">
                          {" "}
                          {client.company}
                        </span>
                      </td>
                      <td>{client.category}</td>
                      <td>{client.phone_number}</td>
                      <td>
                        <Moment fromNow>{client.created_at}</Moment>
                      </td>
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
    </div>
  );
};

export default LatestClientsBox;
