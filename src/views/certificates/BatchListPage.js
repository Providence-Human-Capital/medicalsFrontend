import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import CertificatesTable from "./components/CertificatesTable";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux_store/ui-store";
import Loading from "../../components/loader/Loading";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const BatchListPage = () => {
  const { batchId, batchName } = useParams();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [isFetching, setIsFetching] = useState(false);
  const [batchList, setBatchList] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [certificateDispatched, setCertificateDispatched] = useState(false);

  const clearBatchItems = async () => {
    try {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
      const response = await fetch(`${API}/batch/items/${batchId}/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
        Swal.fire({
          title: "Success",
          text: responseData.message,
          icon: "success",
        });
        navigate("/certificates");
      }
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
      Swal.fire({
        title: "Error",
        text: "An error occurred",
        icon: "error",
      });
    }
  };

  const handleClearBatchItems = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to clear all batch items?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Clear",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearBatchItems();
      }
    });
  };

  const dispatchCertificates = async () => {
    try {
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: true,
        })
      );
      const response = await fetch(
        `${API}/certificate/batch/${batchId}/dispatch`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        dispatch(
          uiActions.setLoadingSpinner({
            isLoading: false,
          })
        );
        setCertificateDispatched(true);
        Swal.fire({
          title: "Success",
          text: responseData.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setLoadingSpinner({
          isLoading: false,
        })
      );
      Swal.fire({
        title: "Error",
        text: "An error occurred",
        icon: "error",
      });
    }
  };

  const handleDispatchBatch = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to dispatch Certificates?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Dispatch",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchCertificates();
      }
    });
  };

  const getCertificateBatch = async (batchId) => {
    setIsFetching(true);
    try {
      const response = await fetch(`${API}/certificate/batch/${batchId}/get`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        // return responseData;
        setIsFetching(false);

        setBatchList(responseData);
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getCertificateBatch(batchId);
  }, [batchId, batchName]);
  return (
    <Fragment>
      <BreadCrumb title={"Certificate List"} activeTab={batchName} />
      <section className="content">
        {isFetching ? (
          <TableSkeleton />
        ) : (
          batchList && (
            <Fragment>
              <CertificatesTable name={batchName} batch={batchList} />
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <div className="box">
                    <div className="box-header">
                      <h4 className="box-title">Assigned Doctor</h4>
                    </div>
                    <div className="box-body">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/shelf.svg"
                          className="w-100 bg-primary-light rounded10 me-15"
                          alt=""
                        />
                        <div>
                          <h4 className="mb-0">{batchName}</h4>
                          {batchList && (
                            <p className="text-muted">
                              {batchList.batch.certificate_batch_items.length}{" "}
                              {batchList.batch.certificate_batch_items.length >
                              1
                                ? "Certificates"
                                : "Certificate"}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-15">
                        <a
                          className="btn btn-danger-light me-4"
                          onClick={handleClearBatchItems}
                        >
                          Clear Batch
                        </a>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <a
                            className="btn btn-success-light"
                            onClick={handleDispatchBatch}
                          >
                            Dispatch Batch
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )
        )}
      </section>
    </Fragment>
  );
};

export default BatchListPage;
