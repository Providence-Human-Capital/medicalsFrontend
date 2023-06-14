import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";

const SearchBox = ({ searchTerm, handleSearch, placeholderText }) => {
  return (
    <form className="search-box">
      <input
        type="text"
        id="search-input"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholderText}
      />
      <button>
        <div className="icon-c">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </button>
    </form>
  );
};
export default SearchBox;
