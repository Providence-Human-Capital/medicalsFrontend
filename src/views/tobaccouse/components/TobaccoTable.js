import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { API } from "../../../config";
import { tobaccoActions } from "../../../redux_store/tobacco-store";
import TobaccoItem from "./TobaccoItem";

const TobaccoTable = () => {
  const dispatch = useDispatch();
  const allTobacco = useSelector((state) => state.tobacco.tobaccos) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;

  const getAllTobaccos = async () => {
    const tobaccoResponse = await fetch(`${API}/tobacco`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const responseData = await tobaccoResponse.json();
    const tobaccos = responseData.data;
    dispatch(
      tobaccoActions.setTobaccos({
        tobaccos: [...tobaccos],
      })
    );
  };

  useState(() => {
    getAllTobaccos();
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allTobacco.slice(startIndex, endIndex);
  }

  return (
    <Fragment>
      <table className="table border-no" id="example1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tobacco Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTobacco &&
            getCurrentPageData().map((tobacco) => (
            <TobaccoItem key={tobacco.id} tobacco={tobacco} />
            ))}
        </tbody>
      </table>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(allTobacco.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(allTobacco) => {
            setPageNumber(allTobacco.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </Fragment>
  );
};

export default TobaccoTable;
