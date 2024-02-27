import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuscultates } from "../../../services/api";
import { illnessActions } from "../../../redux_store/illness-store";
import AustItem from "./AustItem";
import ReactPaginate from "react-paginate";
import EmptyTable from "../../../components/EmptyTable";

const AustTable = () => {
  const dispatch = useDispatch();

  const auscultates = useSelector((state) => state.illness.auscultates) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAuscultates = async () => {
      const fetchedAuscultates = await getAuscultates();
      dispatch(
        illnessActions.setAuscultates({
          auscultates: fetchedAuscultates,
        })
      );
    };

    fetchAuscultates();
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return auscultates.slice(startIndex, endIndex);
  }

  return (
    <>
      {auscultates.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Auscultate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {auscultates &&
                getCurrentPageData().map((auscultate) => (
                  <AustItem key={auscultate.id} auscultate={auscultate} />
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
              pageCount={Math.ceil(auscultates.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(auscultates) => {
                setPageNumber(auscultates.selected);
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

export default AustTable;
