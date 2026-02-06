import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Typography,
  CircularProgress,
  Box
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
    marginBottom: theme.spacing(4),
  },
  title: {
    color: '#2C3E50',
    fontWeight: 600,
  },
  addButton: {
    backgroundColor: '#2C3E50',
    color: '#ffffff',
    padding: theme.spacing(1, 3),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#1a365d',
    },
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
    },
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: '#f5f7fa',
    '& .MuiTableCell-head': {
      color: '#2C3E50',
      fontWeight: 600,
      fontSize: '0.95rem',
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
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: theme.spacing(1),
      minWidth: 400,
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  noData: {
    textAlign: 'center',
    padding: theme.spacing(3),
    color: '#64748b',
  },
}));

const Users = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleDeleteUser = async(id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`http://localhost:8081/api/delete/deleteUser/${id}`);
        alert(response.data.message);
        getUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addusers', userData);
      alert(response.data.message);
      getUsers();
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert('Failed to add user');
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8081/api/get/getUsers');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error getting users:', error.message);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
      alert('Please fill in all fields');
      return;
    }
    addUser(formData);
    handleCloseDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          User Management
        </Typography>
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleOpenDialog}
          startIcon={<PersonAddIcon />}
        >
          Add New User
        </Button>
      </div>

      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="users table">
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id} className={classes.tableRow}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        className={classes.deleteButton}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className={classes.noData}>
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="add-user-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="add-user-dialog-title" className={classes.dialogTitle}>
          Add New User
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            variant="contained"
            color="primary"
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
