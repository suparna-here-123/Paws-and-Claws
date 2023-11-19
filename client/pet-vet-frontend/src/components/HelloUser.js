import { useNavigate } from "react-router-dom";

export default function HelloUser() {

    const navigate = useNavigate()

    function gotologin(){
      navigate('/login-form');
    }

    function gotoSignUp(){
      navigate('/sign-up-form');
    }

    return (
      <div>
        <p>Hello!</p>

        <label htmlFor='doc'>Vet login</label><br/>
        <button onClick={gotologin}>Vet login</button><br/>     


        <label htmlFor='existing'>Existing user login</label><br/>
        <button onClick={gotologin}>Existing user</button><br/>
          
        <label htmlFor='new'>Sign up as user</label><br/>
        <button onClick={gotoSignUp}>Sign up</button><br/>


      </div>
    );
  }
  