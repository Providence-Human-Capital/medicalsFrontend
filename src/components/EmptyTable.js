import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const EmptyTable = () => {
  return (
    <div className="empty-table">
      <div className="empty-table-content">
        <div className="empty-table-content-title">
          <div className="text-center mt-4">
            <FontAwesomeIcon icon={faTimesCircle} size="5x" color="#d9534f" />
            <h5 className="mt-3">No Data Available</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;
