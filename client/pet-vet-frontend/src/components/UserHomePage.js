import { useNavigate } from "react-router-dom"

export default function UserHomePage(){
    const navigate = useNavigate();
    
    function gotoAppt(){
        navigate("/appt-form");
    }

    return(
        <div>
            <p>Book an appointment</p>
            <button onClick={gotoAppt}>Book</button>

            <p>Edit Pet Profile</p>
            <button>Edit profile</button>
        </div>
    )
}