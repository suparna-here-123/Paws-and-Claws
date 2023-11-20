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
import happyCatImage from '../assets/happyCat.jpg';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAndProvider';
import axios from 'axios';


const defaultTheme = createTheme();

export default function LoginForm() {
  const [currUser, setCurrUser] = useState({
    uName : "",
    pwd : ""
  })

  // the variables being extracted must have same name as what was provided in the ContextAndProvider.js file!!!!!!!!!!!!!!
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit (event) {
    event.preventDefault();

    try{
      const response = await axios.get(`http://localhost:3001/api/verifyUserLogin/${currUser.uName}/${currUser.pwd}`)
      console.log("Response data : ", response.data);

      if (response.data.length === 1){
        alert("Login verified!");
        setUser(currUser.uName);
        navigate('/user-home');
        

      }
      else{
        alert("User not found :(");
      }
    }catch(error){
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
            backgroundImage: `url(${happyCatImage})`,
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address" 
                onChange={event => setCurrUser((prev)=>({...prev, uName : event.target.value}))}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={event => setCurrUser((prev)=>({...prev, pwd : event.target.value}))}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}