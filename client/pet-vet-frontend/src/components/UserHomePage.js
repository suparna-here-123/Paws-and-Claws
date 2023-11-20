import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from './ContextAndProvider';

export default function UserHomePage(){
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    
    function gotoAppt(){
        navigate("/appt-form");
    }

    return(
        <div>
            <p>User logged in is { user }</p>

            <p>Book an appointment</p>
            <button onClick={gotoAppt}>Book</button>

            <p>Edit Pet Profile</p>
            <button>Edit profile</button>
        </div>
    )
}