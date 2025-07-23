import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";

const SearchBox = ({ searchTerm, handleSearch, placeholderText }) => {
  return (
    <div className="col-md-6">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="search-input"
          value={searchTerm}
          onChange={handleSearch}
          placeholder=" "
        />
        <label htmlFor="search-input">{placeholderText}</label>
      </div>
    </div>
  );
};

export default SearchBox;
