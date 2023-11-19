import React from "react";
import "../assets/Card.css";

export default function PatientCard(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h5 className="card-title">Patient</h5>
        </div>
      </div>
      <div className="card-text">{props.time}</div>
      <div className="card-text">{props.reason}</div>
    </div>
  );
}