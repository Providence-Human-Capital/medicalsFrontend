import React, { useEffect, useState } from "react";
import DueClient from "./DueClient";
import { getClientsDueForMedicals } from "../../../services/api";
import UserCardSkeleton from "../../../components/skeletons/UserCardSkeleton";

const DueMedicalsBox = () => {
  const [dueClients, setDueClients] = useState([]);
  const [isFetchDueMedicals, setIsFetchDueMedicals] = useState(false);

  useEffect(() => {
    const fetchDueClients = async () => {
      setIsFetchDueMedicals(true);
      try {
        const dueMedicalsClients = await getClientsDueForMedicals();
        setDueClients(dueMedicalsClients);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchDueMedicals(false);
      }
    };

    fetchDueClients();
  }, []);

  return (
    <div className="box">
      <div className="box-header">
        <h4
          className="box-title"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Clients Due for MEDICALS{" "}
          <span className="badge bg-primary ms-2">New</span>
        </h4>
      </div>

      {/* Scrollable content area */}
      <div
        className="box-body"
        style={{
          maxHeight: "320px",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {dueClients.length <= 0 && !isFetchDueMedicals && (
          <p>No Clients Due for Medicals as of yet!</p>
        )}

        {isFetchDueMedicals ? (
          <UserCardSkeleton />
        ) : (
          dueClients.map((client) => (
            <DueClient key={client.id} dueClient={client} />
          ))
        )}
      </div>
    </div>
  );
};

export default DueMedicalsBox;
