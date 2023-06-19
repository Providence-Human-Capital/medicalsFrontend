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

export const convertToDateWord = (dateString, language = "en") => {
  const weekdays = {
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    fr: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    es: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    de: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ],
  };
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fr: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    es: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    de: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
  };
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = months[language][parseInt(dateParts[1]) - 1];
  const day = parseInt(dateParts[2]);
  const dayOfWeek = weekdays[language][new Date(dateString).getDay()];
  const dateWord = `${dayOfWeek}, ${month} ${day}, ${year}`;
  return dateWord;
};
