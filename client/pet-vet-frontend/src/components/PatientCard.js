import React from "react";
import "../assets/Card.css";
import axios from "axios";

export default function PatientCard(props) {

    async function apptDone(){
        try{
          const response = await axios.delete(`http://localhost:3001/api/appointments/${props.id}`)
          console.log(response.data);
        }
        catch(error){
            console.error(error);
        }
    }



  return (
    <div>
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <h5 className="card-title">Patient</h5>
        </div>
      </div>
      <div className="card-text">{props.time}</div>
      <div className="card-text">{props.reason}</div>
      <button onClick={apptDone}>Done</button>
    </div><br/>
    </div>
  );
}