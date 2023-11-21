import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import happyCatImage from '../assets/happyCat.jpg';
import doctorDogImage from '../assets/doctorDog.jpg';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
   
const defaultTheme = createTheme();

export default function ApptForm() {

  const [apptDetails, setApptDetails] = useState({
    date : "",
    time : "",
    reason : ""
  })

  const navigate = useNavigate();

  async function handleSubmit (event){
    event.preventDefault();

    try{
      const response = await axios.post("http://localhost:3001/api/postAppt", apptDetails)
      console.log(response.data);
      alert("Appointment Booked!");
      setApptDetails({
        date : "",
        time : "",
        reason : ""
      })
      navigate('/user-home');
    }
    catch(error){
      console.error(error);
    }

  };

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
            backgroundImage: `url(${doctorDogImage})`,
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
             Book An Appointment!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                type='date'
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date of Appointment"
                onChange={event=>setApptDetails((prev)=>({...prev, date:event.target.value}))}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Time of Appointment"
                type="time"
                id="time"
                onChange={event=>setApptDetails((prev)=>({...prev, time:event.target.value}))}
              />

            <TextField
                margin="normal"
                required
                fullWidth
                label="Reason of visit"
                type="text"
                id="reason"
                onChange={event=>setApptDetails((prev)=>({...prev, reason:event.target.value}))}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}