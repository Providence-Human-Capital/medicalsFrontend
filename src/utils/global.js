

export const PHYSICAL_EXAM = (certificate_status) => {
  if (certificate_status === "PENDING") {
    return (
      <span className="badge badge-pill badge-primary">
        <strong>{certificate_status}</strong>
      </span>
    );
  } else if (certificate_status === "READY") {
    return (
      <span className="badge badge-pill badge-success">
        <strong>{certificate_status}</strong>
      </span>
    );
  } else if (certificate_status === "MONITORING") {
    return (
      <span className="badge badge-pill badge-warning">
        <strong>{certificate_status}</strong>
      </span>
    );
  } else {
    return (
      <span className="badge badge-pill badge-success">
        <strong>{certificate_status}</strong>
      </span>
    );
  }
};
