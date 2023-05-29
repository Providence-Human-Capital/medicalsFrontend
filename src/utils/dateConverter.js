export const formatDate = (dateString, options) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};
