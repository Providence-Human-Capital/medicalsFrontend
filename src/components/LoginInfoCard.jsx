import React, { useEffect, useState } from "react";

const LoginInfoCard = ({ userName, loginLocation }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied or unavailable.");
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="box shadow-sm border-0" style={{ maxWidth: "100%" }}>
      <div className="box-body d-flex align-items-start">
        <div
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{ width: "48px", height: "48px" }}
        >
          <i className="fas fa-user fa-lg"></i>
        </div>
        <div>
          <h5 className="box-title mb-1">Welcome back, {userName}!</h5>
          <p className="box-text text-muted mb-0">
            <i className="fas fa-map-marker-alt me-1 text-danger"></i>
            Logged in from:{" "}
            <span className="badge badge-primary">{loginLocation}</span>
          </p>
          <p className="box-text text-muted mb-0">
            <i className="fas fa-map-marker-alt me-1 text-danger"></i>
            {error
              ? error
              : location.lat && location.lng
              ? `Coordinates: (${location.lat.toFixed(
                  4
                )}, ${location.lng.toFixed(4)})`
              : "Fetching location..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginInfoCard;
