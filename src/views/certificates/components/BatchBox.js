import React, { useEffect, useState } from "react";
import BatchItem from "./BatchItem";
import { batch, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  companiesWithCertificateBatches,
  createCertificateBatch,
} from "../../../services/api";
import Loading from "../../../components/loader/Loading";
import { uiActions } from "../../../redux_store/ui-store";
import { companyActions } from "../../../redux_store/company-store";

const BatchBox = ({ company }) => {
  // const isLoading = useSelector((state) => state.ui.isLoading);
  const [ loadingBatches, setLoadingBatches] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loadingCompanyId, setLoadingCompanyId] = useState(null);

  const handleCreateBatch = async (companyId) => {
    setLoadingCompanyId(companyId);
    setLoadingBatches(true)
    createCertificateBatch(companyId)
      .then((data) => {
        console.log(data);
        if (data) {
          setLoadingBatches(false)
          companiesWithCertificateBatches().then((dataBatches) => {
            if (dataBatches && dataBatches.companies) {
              dispatch(
                companyActions.setCompaniesWithBatches(dataBatches.companies)
              );
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingBatches(false)
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
                {loadingBatches || loadingCompanyId === company.id ? (
                  <Loading />
                ) : (
                  <div>
                    <Link
                      to={`/batch/create/${company.id}/${company.company_name}`}
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
              company.certificate_batches.map((batch, index) => (
                <BatchItem batch={batch} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchBox;
