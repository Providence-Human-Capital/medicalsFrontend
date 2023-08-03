import React, { useEffect, useState } from "react";
import { getCompanyClientsDueForMedicals } from "../../../services/api";
import CompanyDueItem from "./CompanyDueItem";
import UserCardSkeleton from "../../../components/skeletons/UserCardSkeleton";
const CompanyDueBox = ({ companyId, companyName }) => {
  const [dueClients, setDueClients] = useState([]);
  const [fetchDue, setFetchDue] = useState(false);

  useEffect(() => {
    const fetchDueClients = async () => {
      setFetchDue(true);
      try {
        const dueClients = await getCompanyClientsDueForMedicals(companyId);
        setDueClients(dueClients);
        setFetchDue(false);
      } catch (error) {
        console.log(error);
        setFetchDue(false);
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
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            <span
              className="badge badge-pill badge-info"
              style={{
                fontWeight: "bold",
              }}
            >
              {companyName}
            </span>{" "}
            Clients Due for MEDICALS
          </h4>
        </div>
        <div class="box-body">
          {fetchDue ? (
            <UserCardSkeleton />
          ) : (
            <>
              {dueClients &&
                dueClients.map((client, index) => (
                  <CompanyDueItem key={client.id} dueClient={client} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyDueBox;
