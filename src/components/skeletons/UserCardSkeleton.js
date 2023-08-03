import React from "react";
import "./Skeleton.css";

const UserCardSkeleton = () => {
  return (
    <>
      <div className="user-card-skeleton">
        <div className="avatar-skeleton"></div>
        <div className="info-skeleton">
          <div className="name-skeleton"></div>
          <div className="email-skeleton"></div>
        </div>
      </div>
      <div className="user-card-skeleton">
        <div className="avatar-skeleton"></div>
        <div className="info-skeleton">
          <div className="name-skeleton"></div>
          <div className="email-skeleton"></div>
        </div>
      </div>
      <div className="user-card-skeleton">
        <div className="avatar-skeleton"></div>
        <div className="info-skeleton">
          <div className="name-skeleton"></div>
          <div className="email-skeleton"></div>
        </div>
      </div>
    </>
  );
};

export default UserCardSkeleton;
