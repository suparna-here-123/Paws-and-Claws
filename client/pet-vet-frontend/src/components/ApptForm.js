import { useState } from "react";
import axios from 'axios';

export default function ApptForm(){
    const [apptDetails, setApptDetails] = useState({
        date : "",
        time : "",
        reason : ""
    })

    async function confirmAppt(event){
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/api/postAppt", apptDetails)
            console.log(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    return(
        <div>
            <form onSubmit={confirmAppt}>
                <label htmlFor='onDate'>Date of Appointment</label><br/>
                <input type='date' id='onDate' onChange={event=>setApptDetails((prevAppt)=>({...prevAppt, date:event.target.value}))}/><br/>

                <label htmlFor='atTime'>Time of Appointment</label><br/>
                <input type='time' id='atTime' onChange={event=>setApptDetails((prevAppt)=>({...prevAppt, time:event.target.value}))}/><br/>

                <p>Reason of visit</p>
                <input type='radio' name='reason' id='vacc' value='vacc' onChange={event=>setApptDetails((prevAppt)=>({...prevAppt, reason:event.target.value}))}/>
                <label htmlFor='vacc'>Vaccination</label><br/>

                <input type='radio' name='reason' id='routine' value='routine onChange={event=>setApptDetails((prevAppt)=>({...prevAppt, reason:event.target.value}))}'/>
                <label htmlFor='routine'>Routine Checkup</label>
                
                <input type='submit' value='Confirm'/>
            </form>
        </div>
    )
}