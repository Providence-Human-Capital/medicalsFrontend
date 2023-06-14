import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiseases } from "../../../services/api";
import { illnessActions } from "../../../redux_store/illness-store";
import ReactPaginate from "react-paginate";
import DiseaseItem from "./DiseaseItem";
import EmptyTable from "../../../components/EmptyTable";

const DiseaseTable = () => {
  const dispatch = useDispatch();

  const diseases = useSelector((state) => state.illness.diseases) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDiseases = async () => {
      const fetchedDiseases = await getDiseases();
      dispatch(
        illnessActions.setDiseases({
          diseases: fetchedDiseases,
        })
      );
    };

    fetchDiseases();
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return diseases.slice(startIndex, endIndex);
  }

  return (
    <>
      {diseases.length === 0 ? (
        <EmptyTable />
      ) : (
        <Fragment>
          <table className="table border-no" id="example1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Skin Condition</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {diseases &&
                getCurrentPageData().map((disease) => (
                  <DiseaseItem key={disease.id} disease={disease} />
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
              pageCount={Math.ceil(diseases.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(diseases) => {
                setPageNumber(diseases.selected);
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

export default DiseaseTable;
