import React, { Fragment, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ExcelUploader = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState(0);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const [headers, ...rows] = excelData;
      const formattedData = rows.map((row) =>
        headers.reduce(
          (obj, header, index) => ({ ...obj, [header]: row[index] }),
          {}
        )
      );
      setData(formattedData);
    };
    reader.readAsBinaryString(file);
  };
  const handleSearch = () => {
    const filteredData = data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-8 col-12">
          <div className="box">
            <div className="custom-form">
              <div className="box-body">
                <div className="container">
                  <h3 className="text-center mb-4">
                    Excel Uploader and Search{" "}
                  </h3>
                  <form>
                    <div className="form-group">
                      <div className="col-xl-6 col-12">
                        <div class="mb-3">
                          <label htmlFor="fileInput" class="form-label">
                            Upload Excel File
                          </label>
                          <input
                            class="form-control"
                            type="file"
                            id="fileInput"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="searchInput">Search Query</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="searchInput"
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearch}
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {filteredData.length > 0 ? (
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          {Object.keys(filteredData[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, index) => (
                              <td key={index}>{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center mt-4">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        size="5x"
                        color="#d9534f"
                      />
                      <h5 className="mt-3">No Results Found</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="separation-div"></div>
    </Fragment>
  );
};
export default ExcelUploader;
