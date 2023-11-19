import { useState } from "react";
import axios from 'axios';

export default function SignUpForm(){

    const [user, setUser] = useState({
        petName : "",
        species : "",
        breed : "",
        age : "",
        parentName : "",
        parentPh : ""
    })

    async function postUser(event) {
        event.preventDefault();
        try {
        const response = await axios.post("http://localhost:3001/api/register", user);
        console.log(response.data); // Log the response for debugging
        setUser({
            petName : "",
            species : "",
            breed : "",
            age : "",
            parentName : "",
            parentPh : ""
        })


        } catch (error) {
        console.error(error);
        }
    }
  


    return(
        <div>
            <form onSubmit={postUser}>
                <input type='text' id='field-1' value={user.petName} onChange={event => setUser({...user, petName : event.target.value})} required/>
                <label htmlFor='field-1'>Pet Name</label><br/>

                <input type='text' id='field-2' value={user.species} onChange={event=> setUser({...user, species : event.target.value})}required/>
                <label htmlFor='field-2'>Pet Species</label><br/>

                <input type='text' id='field-3' value={user.breed} onChange={event=>setUser({...user, breed : event.target.value})} required/>
                <label htmlFor='field-3'>Pet Breed</label><br/>

                <input type='text' id='field-4' value={user.age} onChange={event => setUser({...user, age : event.target.value})}required/>
                <label htmlFor='field-4'>Pet Age</label><br/>

                <input type='text' id='field-5' value={user.parentName} onChange={event=>setUser({...user, parentName : event.target.value})}required/>
                <label htmlFor='field-5'>Parent Name</label><br/>

                <input type='tel' id='field-6' size='10' value={user.parentPh} onChange={event => setUser({...user, parentPh : event.target.value})}required/>
                <label htmlFor='field-6'>Parent Contact</label><br/>

                <input type='submit' value='Register'/>
            </form>
        </div>
    )
}