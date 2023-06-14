import React, { Fragment, useEffect, useState } from "react";
import IllnessItem from "./IllnessItem";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../config";
import { illnessActions } from "../../../redux_store/illness-store";
import ReactPaginate from "react-paginate";
import EmptyTable from "../../../components/EmptyTable";

const IllnessTable = () => {
  const dispatch = useDispatch();
  const allillnesses = useSelector((state) => state.illness.illnesses) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const getIllnesses = async () => {
    const illnessesResponseData = await fetch(`${API}/illness`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await illnessesResponseData.json();
    const illnesses = responseData.data;

    dispatch(
      illnessActions.setIllnesses({
        illnesses: [...illnesses],
      })
    );
  };

  useState(() => {
    getIllnesses();
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allillnesses.slice(startIndex, endIndex);
  }

  return (
    <>
      {allillnesses.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Illness Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allillnesses &&
                getCurrentPageData().map((illness) => (
                  <IllnessItem key={illness.id} illness={illness} />
                ))}
            </tbody>
          </table>
          <div className="table-spacing"></div>
          <div className="paginate-position">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(allillnesses.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(allillnesses) => {
                setPageNumber(allillnesses.selected);
              }}
              containerClassName={"pagination"}
              activeClassName={"active-paginate"}
            />
          </div>
        </Fragment>
      )}
    </>
  );
};

export default IllnessTable;
