import React from "react";
import "./NotificationModal.css";

const NotificationModal = ({ notifications }) => {
  return (
    <>
      <div className="notification-modal">
        {notifications.map((notification, index) => (
          <div key={index} className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationModal;
