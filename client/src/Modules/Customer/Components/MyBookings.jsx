import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog } from '@material-ui/core';
import axios from 'axios';
import Customernavbar from './Customernavbar';
import Invoice from './Invoice'; // Import the Invoice component

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
}));

const MyBooking = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getBookings');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleInvoiceOpen = (order) => {
    setSelectedOrder(order);
    setInvoiceOpen(true);
  };

  const handleInvoiceClose = () => {
    setInvoiceOpen(false);
  };

  const getTotalPrice = (items) => {
    return items.reduce((total, item) => total + Number(item.product_cost), 0);
  };
  console.log(orders,'aaaaa');

  return (
    <>
      <Customernavbar />
      <div className={classes.root} style={{ marginTop: "80px" }}>
        <Typography variant="h5" gutterBottom>My Orders</Typography>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "600" }}>#</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Order ID</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Address</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Phone Number</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Total Amount</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.filter((item) => item.user_id === user.id).map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phone_number}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleInvoiceOpen(order)}
                    >
                      Download Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedOrder && (
          <Invoice
            open={invoiceOpen}
            onClose={handleInvoiceClose}
            customerDetails={{
              name: user.name,
              phoneNumber: selectedOrder.phone_number,
              address: selectedOrder.address,
            }}
            total={() => selectedOrder.total}
            product_name = {selectedOrder.product_name}
          />
        )}
      </div>
    </>
  );
};

export default MyBooking;
