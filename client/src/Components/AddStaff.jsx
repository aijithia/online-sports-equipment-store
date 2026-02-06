import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MenuItem, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '65vh',
    overflowY: 'hidden',
  },
  buttonContainer: {
    marginTop: theme.spacing(1),
  },
}));

const AddStaffForm = ({ onCancel }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!address.trim()) {
      errors.address = 'Address is required';
    }
    if (!location.trim()) {
      errors.location = 'Location is required';
    }
    if (!userType) {
      errors.userType = 'User type is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStaffSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Handle staff submission logic here
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Add New Staff</Typography>
      <form onSubmit={handleStaffSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userType"
              label="User Type"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              error={!!errors.userType}
              helperText={errors.userType}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Accountant">Accountant</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
          <Button variant="contained" color="default" onClick={onCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddStaffForm;
