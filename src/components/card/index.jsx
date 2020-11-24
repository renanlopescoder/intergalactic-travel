import React from "react";

export default function Card({ children, title = "", icon }) {
  return (
    <div className="card">
      <div className="container">
        <title className="card-title">
          <div className="card-title-icon">{icon}</div>
          {title}
        </title>
        {children}
      </div>
    </div>
  );
}
