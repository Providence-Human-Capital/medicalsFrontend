import * as XLSX from "xlsx";

export const sortPatients = (patients, sortColumn, isSortAscending) => {
  return [...patients].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (isSortAscending) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
export const filterPatients = (patients, searchTerm) => {
  const regex = new RegExp(searchTerm, "gi");
  return patients.filter((patient) => {
    return (
      patient.first_name.match(regex) ||
      patient.last_name.match(regex) ||
      patient.company.match(regex)
    );
  });
};
export const getCurrentPageData = (
  filteredPatients,
  pageNumber,
  itemsPerPage
) => {
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredPatients.slice(startIndex, endIndex);
};

export const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
  XLSX.writeFile(workbook, filename);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = "";
  if (dateString.length > 4) {
    month = date.toLocaleString("default", { month: "long" });
  }
  return `${month.toUpperCase()} ${year}`;
};
