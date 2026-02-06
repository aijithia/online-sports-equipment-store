import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

const ServiceReports = () => {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const [bookedServices, setBookedServices] = useState([]);
  const [Services, setServices] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewBookingDialogOpen, setViewBookingDialogOpen] = useState(false);
  const [acceptRejectDialogOpen, setAcceptRejectDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date
  const user= JSON.parse(localStorage.getItem('user'))
  const [bookingID,setBookingiD]=useState()
  const [products, setproducts] = useState([]);


  const handleReject = async(id) => {
    try {
      const response = await axios.put('http://localhost:8081/api/update/UpdateBookings', {
        id: id, 
        status: "Rejected",
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert(error);
    }
  }

  const handleAccept = async (id) => {
    try {
      const response = await axios.put('http://localhost:8081/api/update/UpdateBookings', {
        id: id, 
        status: "Accepted",
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error accepting order:', error);
      alert(error);
    }
  }
  

  useEffect(() => {
    const getproducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getAllproducts');
        setproducts(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error getting user:', error.message);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getBookings');
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchBookedItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getBookedServices');
        setBookedServices(response.data.data);
      } catch (error) {
        console.error('Error fetching booked services:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getAllproducts');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchBookings();
    fetchBookedItems();
    fetchServices();
    getproducts()
  }, []);

  const userProducts = products.filter(item=> item.user_id == user.id).map(product=>product.id)
  console.log(userProducts);


  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="reports table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Ordered Product</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.filter(booking => userProducts.includes(booking.product_id)).map((booking, index) => (
              <TableRow key={booking.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.phone_number}</TableCell>
                <TableCell>{products.filter(item=>item.id == booking.product_id).map(item=>item.product_name)}</TableCell>
                <TableCell>{booking.total}</TableCell>
                {booking.status == "Ordered" ? <TableCell>
                  <Button variant="contained" color="secondary" style={{backgroundColor:"#26ae60", color:'#ffffff',marginRight:"5px"}} onClick={()=>handleAccept(booking.id)}>Accept</Button>
                  <Button variant="contained" onClick={()=>handleReject(booking.id)} style={{background:'#E44236', color:'#ffffff'}}>Reject</Button>
                </TableCell>: <TableCell>{booking.status}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default ServiceReports;