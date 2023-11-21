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
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import angryCatImage from '../assets/angryCat.jpg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './ContextAndProvider';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateLogin() {

    const [newUser, setNewUser] = useState({
        username : "",
        password : ""
    })

    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        // seeing if username already exists
        try{
            const response = await axios.post('http://localhost:3001/api/checkUserThenPost', newUser)
            if (response.data.length !== 0){

                setNewUser((prev)=>({...prev, username : ""}));
                console.log("username exist");
                alert("Please pick another username!");
            }
            else{
                setNewUser({
                    username : "",
                    password : ""
                })
                alert("User registered successfully!");
                
                setUser(newUser.username);
                // navigates to the login page
                navigate('/sign-up-form');
            }
        }catch(error)
        {
            console.log(error);
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
            backgroundImage: `url(${angryCatImage})`,
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
              Create An Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                value = {newUser.username}
                onChange={event => setNewUser((prev)=>({...prev, username : event.target.value}))}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value = {newUser.password}
                onChange={event => setNewUser((prev)=>({...prev, password : event.target.value}))}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}