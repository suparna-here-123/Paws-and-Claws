import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HelloUser from './components/HelloUser';
import SignUpForm from './components/SignUpForm';
import ApptForm from './components/ApptForm';
import UserHomePage from './components/UserHomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<HelloUser/>}/>
        <Route path='/login-form' element={<LoginForm/>}/>
        <Route path='/sign-up-form' element={<SignUpForm/>}/>  
        <Route path='/appt-form' element={<ApptForm/>}/>  
        <Route path='/user-home' element={<UserHomePage/>}/>  

      </Routes>
    </BrowserRouter>
  )

}

export default App;
