import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Link, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import bg from './sports.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(6),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: 450,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(90deg, #2196F3, #00BCD4, #4CAF50)',
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    color: '#1a237e',
    fontWeight: 700,
    fontSize: '2rem',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      '&:hover fieldset': {
        borderColor: '#2196F3',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#455a64',
    },
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
  },
  button: {
    marginTop: theme.spacing(3),
    background: 'linear-gradient(90deg, #2196F3, #00BCD4)',
    color: 'white',
    padding: theme.spacing(1.5),
    borderRadius: 8,
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #1976D2, #00ACC1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
    },
  },
  link: {
    color: '#2196F3',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#1976D2',
      textDecoration: 'none',
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
    color: '#90a4ae',
  },
  select: {
    '& .MuiSelect-select': {
      borderRadius: 8,
    },
  },
  errorText: {
    color: '#f44336',
    marginTop: theme.spacing(1),
    fontSize: '0.875rem',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignIn = async () => {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (username.trim() === '' || password.trim() === '') {
      // setError('Username and password are required');
      return;
    }

    const loginType = userType; 

    try {
      let loginEndpoint;
      if (loginType === 'admin') {
        loginEndpoint = '/api/auth/AdminLogin';
      } else if (loginType === 'seller') {
        loginEndpoint = '/api/auth/SellerLogin';
      } else if (loginType === 'user') {
        loginEndpoint = '/api/auth/Login';
      }
      const res = await axios.post(`http://localhost:8081${loginEndpoint}`, { email: username, password });
      console.log(res.data.message);
      const user = res.data.user;
      login(user); // Update authentication context
      alert(res.data.message)
      if (loginType === 'admin') {
        navigate('/AdminHome');
      } else if (loginType === 'seller') {
        navigate("/SellerHome");
      } else if (loginType === 'user') {
        navigate("/CustomerHome");
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error)
    }
  };

  const handleSignUp = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phone').value;

    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === '') {
      // Handle validation or show error message
      return;
    }
    if (name.trim().length < 4) {
      alert('Name must be at least 4 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }

    try {
      let formData = { name, email, password, phoneNumber };
      const res = await axios.post(`http://localhost:8081/api/add/addusers`, formData);
      console.log(res.data.message);
      alert(res.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
    }
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={0}>
          <Typography component="h1" variant="h4" className={classes.title}>
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Grid container spacing={3}>
            {isSignIn ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    className={classes.textField}
                    InputProps={{
                      style: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    className={classes.textField}
                    InputProps={{
                      style: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="user-type-label">Login As</InputLabel>
                    <Select
                      labelId="user-type-label"
                      id="user-type"
                      value={userType}
                      onChange={handleUserTypeChange}
                      label="Login As"
                      className={classes.select}
                    >
                      <MenuItem value="">
                        <em>Select Role</em>
                      </MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                      <MenuItem value="seller">Seller</MenuItem>
                      <MenuItem value="user">Customer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignUp}
                  >
                    Create Account
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="body1" align="center" className={classes.divider}>
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <Link className={classes.link} onClick={handleToggleForm}>
                  {' '}{isSignIn ? 'Sign Up' : 'Sign In'}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
