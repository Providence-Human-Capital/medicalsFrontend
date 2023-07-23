import React, { Fragment } from "react";
import "./Skeleton.css";

const TableSkeleton = () => {
  return (
    <Fragment>
      <table className="table-skeleton">
      <tbody>
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <td key={colIndex}>
                <div className="cell-skeleton"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </Fragment>
  );
};

export default TableSkeleton;
