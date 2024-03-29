import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';  // Import the Button component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import happyDogImage from '../assets/happy_dog.jpg';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function HelloUser() {

    const navigate = useNavigate()

    function gotoUserlogin(){
      navigate('/login-form');
    }

    function gotoVetlogin(){
      navigate('/login-form-doc');
    }

    function gotoSignUpForm(){
      navigate('/create-login');
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
              backgroundImage: `url(${happyDogImage})`,
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
              <Avatar sx={{ m: 1, bgcolor: '#F8E16F' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                <strong><i>Paws & Claws</i></strong><br/>
              </Typography>
  
              <Button
                onClick={gotoVetlogin}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: '100%',
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '15px',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Vet Login
              </Button>
  

              <Button
                onClick={gotoUserlogin}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: '100%',
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '15px',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                User Login
              </Button>


              <Button
                onClick={gotoSignUpForm}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: '100%',
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '15px',
                  fontSize: '1.2rem',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Sign up
              </Button>
  
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
  