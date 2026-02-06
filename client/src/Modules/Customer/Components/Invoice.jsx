import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  invoiceContent: {
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  customerDetails: {
    marginBottom: theme.spacing(2),
  },
  orderDetails: {
    marginBottom: theme.spacing(2),
  },
  orderItem: {
    marginBottom: theme.spacing(1),
  },
  total: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
  '@media print': {
    hideOnPrint: {
      display: 'none',
    },
    dialog: {
      position: 'relative !important',
      width: '100% !important',
      height: 'auto !important',
      overflow: 'visible !important',
    },
    invoiceContent: {
      border: 'none',
      padding: 0,
    },
  },
}));

const Invoice = ({ open, onClose, customerDetails, product_name, total }) => {
  const classes = useStyles();

  const generateInvoiceNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle>Invoice</DialogTitle>
      <DialogContent className={classes.invoiceContent}>
        <Typography variant="h6">Invoice Number: {generateInvoiceNumber()}</Typography>
        <Typography variant="body1">Date: {currentDate}</Typography>
        <div className={classes.customerDetails}>
          <Typography variant="h6">Customer Details</Typography>
          <Typography variant="body1">Name: {customerDetails.name}</Typography>
          <Typography variant="body1">Phone Number: {customerDetails.phoneNumber}</Typography>
          <Typography variant="body1">Address: {customerDetails.address}</Typography>
        </div>
        <div className={classes.orderDetails}>
          <Typography variant="h6">Order Details</Typography>
            <div  className={classes.orderItem}>
              <Typography variant="body1">{product_name}</Typography>
            </div>
        </div>
        <Typography variant="h6" className={classes.total}>Grand Total: ₹ {total()}.00</Typography>
      </DialogContent>
      <DialogActions className={classes.hideOnPrint}>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={() => window.print()} color="primary">Print</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Invoice;
