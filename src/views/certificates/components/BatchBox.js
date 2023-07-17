import React, { useEffect, useState } from "react";
import BatchItem from "./BatchItem";
import { batch, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCertificateBatch } from "../../../services/api";
import Loading from "../../../components/loader/Loading";
import { uiActions } from "../../../redux_store/ui-store";

const BatchBox = ({ company }) => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loadingCompanyId, setLoadingCompanyId] = useState(null);

  const handleCreateBatch = async (companyId) => {
    setLoadingCompanyId(companyId);
    createCertificateBatch(companyId)
      .then((data) => {
        console.log(data);
        if (data) {
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
        }
        setError(err);
      })
      .finally(() => {
        setLoadingCompanyId(null);
      });
  };

  useEffect(() => {}, []);
  return (
    <>
      <div class="col-12 col-xl-4">
        <div class="box">
          <div class="box-header with-border">
            <h4 class="box-title">
              <strong>{company.company_name}</strong>
              <small class="subtitle">
                <span>
                  <strong> {company.certificate_batches.length}</strong>
                  {"  "}
                </span>
                Certificate Batches
              </small>
            </h4>
            <ul class="box-controls pull-right d-md-flex d-none">
              <li class="dropdown">
                {isLoading || loadingCompanyId === company.id ? (
                  <Loading />
                ) : (
                  <div>
                    <Link
                      // to={`/batch/create/${}`}
                      style={{
                        marginLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      Create Custom
                    </Link>
                    <button
                      class="btn btn-primary px-10 py-10"
                      style={{
                        borderRadius: "15px",
                        fontSize: "14px",
                      }}
                      onClick={() => handleCreateBatch(company.id)}
                    >
                      New Batch
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div
            class="box-body"
            style={{
              overflowY: "scroll",
              height: "20vh",
            }}
          >
            {company.certificate_batches &&
              company.certificate_batches.map((batch) => (
                <BatchItem batch={batch} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchBox;
