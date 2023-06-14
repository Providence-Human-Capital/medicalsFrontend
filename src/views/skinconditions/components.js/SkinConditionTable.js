import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyTable from "../../../components/EmptyTable";
import ReactPaginate from "react-paginate";
import SkinConditionItem from "./SkinConditionItem";
import { getSkinConditions } from "../../../services/api";
import { illnessActions } from "../../../redux_store/illness-store";

const SkinConditionTable = () => {
  const dispatch = useDispatch();

  const skin_conditions = useSelector((state) => state.illness.skin_conditions) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSkinConditions = async () => {
      const fetchedSkinConditions = await getSkinConditions();
      dispatch(
        illnessActions.setSkinConditions({
          skin_conditions: fetchedSkinConditions,
        })
      );
    };

    fetchSkinConditions()
  }, []);

  function getCurrentPageData() {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return skin_conditions.slice(startIndex, endIndex);
  }

  return (
    <>
      {skin_conditions.length === 0 ? (
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
              {skin_conditions &&
                getCurrentPageData().map((skin_condition) => (
                  <SkinConditionItem
                    key={skin_condition.id}
                    skin_condition={skin_condition}
                  />
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
              pageCount={Math.ceil(skin_conditions.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(skin_conditions) => {
                setPageNumber(skin_conditions.selected);
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

export default SkinConditionTable;
