import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};
export default SearchBox;
