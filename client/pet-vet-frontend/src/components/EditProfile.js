import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAndProvider';
import eagleImage from '../assets/eagle.jpeg'

const defaultTheme = createTheme();

export default function SignUpForm() {
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    getProfile();
  }, []);

  const [newUser, setNewUser] = useState({
    username : user,
    petName : "",
    petBreed : "",
    petSpecies : "",
    petAge : "",
    parentName : "",
    parentPh : ""
  })

  const [enableButton, setEnableButton] = useState(false);

  let toCompareWith = {};
  

  async function getProfile(){
    try{
        const response = await axios.get(`http://localhost:3001/api/getProfile/${user}`)
        console.log('response data contains ', response.data);
            setNewUser({
            username : user,
            petName : response.data[0].petName,
            petBreed : response.data[0].petBreed,
            petSpecies : response.data[0].petSpecies,
            petAge : response.data[0].petAge,
            parentName : response.data[0].parentName,
            parentPh : response.data[0].parentPh
        })
        
        // later to be compared with
        toCompareWith = {...response.data[0]};


    }catch(error){
        console.log(error);
    }
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {

      const response = await fetch(`http://localhost:3001/api/updateProfile/${user}`, {
        method : "PUT",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(newUser)
      });
      if (response.ok)
        console.log("Client received okay");
      else
        console.log("fail");    
    
    setNewUser({
      username : user,
      petName : "",
      petBreed : "",
      petSpecies : "",
      petAge : "",
      parentName : "",
      parentPh : ""
    })  

    navigate('/user-home');

    } catch (error) {
    console.error(error);
    }
}


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${eagleImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2E77D1' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="petName"
                label="Pet Name"
                value={newUser.petName}
                onChange={event=>{
                  setNewUser(prev=>({...prev, petName:event.target.value}))
                  !(newUser.petName === toCompareWith.petName) ? setEnableButton(true) : setEnableButton(false)
                }}
                autoFocus
                required
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Pet Breed"
                type="text"
                id="petBreed"
                value={newUser.petBreed}
                onChange={event=>{
                  setNewUser(prev=>({...prev, petBreed:event.target.value}))
                  !(newUser.petBreed === toCompareWith.petBreed) ? setEnableButton(true) : setEnableButton(false)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Pet Species"
                type="text"
                id="petSpecies"
                value={newUser.petSpecies}
                onChange={event=>{
                  setNewUser(prev=>({...prev, petSpecies:event.target.value}))
                  !(newUser.petSpecies === toCompareWith.petSpecies) ? setEnableButton(true) : setEnableButton(false)
                }}
              />  

              <TextField
                margin="normal"
                required
                fullWidth
                label="Pet Age"
                type="text"
                id="petAge"
                value={newUser.petAge}
                onChange={event=>{
                  setNewUser(prev=>({...prev, petAge:event.target.value}))
                  !(newUser.petAge === toCompareWith.petAge) ? setEnableButton(true) : setEnableButton(false)
                }}
              />   
              <TextField
                margin="normal"
                required
                fullWidth
                label="Parent Name"
                type="text"
                id="parentName"
                value={newUser.parentName}
                onChange={event=>{
                  setNewUser(prev=>({...prev, parentName:event.target.value}))
                  !(newUser.parentName === toCompareWith.parentName) ? setEnableButton(true) : setEnableButton(false)
                }}
              />      
              <TextField
                margin="normal"
                required
                fullWidth
                label="Parent Contact"
                type="text"
                id="parentPh"
                min='10'
                max='10'
                value={newUser.parentPh}
                onChange={event=>{
                  setNewUser(prev=>({...prev, parentPh:event.target.value}))
                  !(newUser.parentPh === toCompareWith.parentPh) ? setEnableButton(true) : setEnableButton(false)
                }}
              />
              {enableButton && <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>}               
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}