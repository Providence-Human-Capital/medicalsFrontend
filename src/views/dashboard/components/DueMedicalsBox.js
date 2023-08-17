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
        setIsFetchDueMedicals(false);
      } catch (error) {
        console.log(error);
        setIsFetchDueMedicals(false);
      }
    };

    fetchDueClients();
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
            Clients Due for MEDICALS
            <span class="badge">New</span>
          </h4>
        </div>
        <div class="box-body">
          {dueClients.length <= 0 && !isFetchDueMedicals && (
            <p>No Clients Due for Medicals as of yet!</p>
          )}
          {isFetchDueMedicals ? (
            <UserCardSkeleton />
          ) : (
            <>
              {dueClients &&
                dueClients.map((client, index) => (
                  <DueClient key={client.id} dueClient={client} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DueMedicalsBox;
