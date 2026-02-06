import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  title: {
    color: '#2C3E50',
    fontWeight: 600,
  },
  addButton: {
    backgroundColor: '#2C3E50',
    color: '#ffffff',
    padding: theme.spacing(1, 3),
    '&:hover': {
      backgroundColor: '#1a365d',
    },
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: '#f5f7fa',
    '& .MuiTableCell-head': {
      color: '#2C3E50',
      fontWeight: 600,
    },
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f8fafc',
    },
    '&:hover': {
      backgroundColor: '#f0f4f7',
    },
  },
  deleteButton: {
    color: '#ef4444',
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: theme.spacing(1),
    },
  },
  dialogTitle: {
    backgroundColor: '#f8fafc',
    '& h2': {
      color: '#2C3E50',
      fontWeight: 600,
    },
  },
  dialogContent: {
    padding: theme.spacing(3),
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
  dialogActions: {
    padding: theme.spacing(2, 3),
  },
}));

const Seller = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [Seller, setSeller] = useState([]);

  const handleDeleteServiceCenter =async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteSeller/${id}`
      );
      alert(response.data.message)
      getSeller()
    } catch (error) {
      console.error('Error adding Service_center:', error);
      alert(error)
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getSeller = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getSeller'
      );
      setSeller(response.data.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error getting Seller:', error.message);
    }
  };
  useEffect(() => {
  getSeller()
  }, [Seller])

  const addServiceCenter = async (name, email, password, phoneNumber, location) => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addSeller', 
        { name, email, password, phoneNumber,location }
      );
      alert(response.data.message)
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert(error)
    }
  };

  const handleAddServiceCenter = () => {
    // Get form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const location = document.getElementById('location').value;
    // Call add service center function
    addServiceCenter(name, email, password, phoneNumber, location);
    // Close dialog
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Sellers
        </Typography>
        <Button variant="contained" className={classes.addButton} onClick={handleOpenDialog}>Add Seller</Button>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="service centers table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
              {/* <TableCell>Products</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Seller.map((center) => (
              <TableRow key={center.id}>
                <TableCell>{center.id}</TableCell>
                <TableCell>{center.name}</TableCell>
                <TableCell>{center.location}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteServiceCenter(center.id)}>
                    <DeleteIcon />
                  </IconButton>

                </TableCell>
                  {/* <TableCell> 
                   <Button color="primary" variant="outlined"
                  //  onClick={() => handleViewProducts(center.id)}
                   >View Products</Button></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Service Center Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="add-center-dialog-title">
        <DialogTitle id="add-center-dialog-title">Add Seller</DialogTitle>
        <DialogContent>
          {/* Form fields for adding service center */}
          <TextField id="name" label="Name" fullWidth />
          <TextField id="email" label="Email" fullWidth />
          <TextField id="password" label="Password" fullWidth />
          <TextField id="phoneNumber" label="Phone Number" fullWidth />
          <TextField id="location" label="Location" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleAddServiceCenter} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Seller;
