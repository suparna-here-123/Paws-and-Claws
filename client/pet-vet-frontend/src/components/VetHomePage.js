import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import PatientCard from './PatientCard';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function VetHomePage() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const weekOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date().toISOString().split('T')[0]
    const dayNum = new Date().getDay()
    const currentDay = weekOfDays[dayNum]


    async function getPatients() {
        try {
            const response = await axios.get("http://localhost:3001/api/patients");
            //console.log(response.data);
            setPatients(response.data);
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
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
              <strong>{currentDay}</strong>
            </Typography>

            <Typography component="h1" variant="h5">
              {currentDate}
            </Typography>

            <Typography component="h1" variant="h5">
              Appointments Today
            </Typography>

            {patients.length === 0 ? <p>No appointments today</p> : 
             patients.map((patient)=><PatientCard date={patient.date} time={patient.time} reason={patient.reason}/>)}

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}