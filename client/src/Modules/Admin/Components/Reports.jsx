import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  statusChip: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    fontWeight: 500,
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
    color: '#2C3E50',
    fontWeight: 600,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
}));

const Reports = () => {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/api/get/getBookings');
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { bg: '#e3fcef', color: '#0f766e' };
      case 'pending':
        return { bg: '#fef3c7', color: '#92400e' };
      case 'cancelled':
        return { bg: '#fee2e2', color: '#991b1b' };
      default:
        return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Booking Reports
      </Typography>

      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => {
                const statusStyle = getStatusColor(booking.status);
                return (
                  <TableRow key={booking.id} className={classes.tableRow}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.user_name}</TableCell>
                    <TableCell>{booking.address}</TableCell>
                    <TableCell>{booking.phone_number}</TableCell>
                    <TableCell>₹{booking.total}</TableCell>
                    <TableCell>
                      <Box
                        className={classes.statusChip}
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {booking.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Reports;
