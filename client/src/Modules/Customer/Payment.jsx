import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  paymentIcon: {
    marginRight: theme.spacing(1),
  },
  confirmButton: {
    marginTop: theme.spacing(2),
    marginBottom: "30px",
    marginRight: theme.spacing(2),
  },
  cancelButton: {
    marginTop: theme.spacing(2),
    marginBottom: "30px",
  },
}));

const Payment = ({ cancelPayment , booking ,total }) => {
  const classes = useStyles();
  const [paymentOption, setPaymentOption] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const user=JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    // Reset errors whenever payment option changes
    setPaymentOption('');
    setPaymentId('');
    setCardNumber('');
    setCardHolderName('');
    setExpiryDate('');
    setCvv('');
    setBankName('');
    setAccountNumber('');
    setIfscCode('');
  }, []);

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleConfirmOrder = async () => {
    const newErrors = {};
  
    // Validate input based on payment option
    if (paymentOption === 'card') {
      if (!cardNumber.trim() || !/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'Valid card number is required (16 digits)';
      }
      if (!cardHolderName.trim()) {
        newErrors.cardHolderName = 'Card holder name is required';
      }
      if (!expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate)) {
        newErrors.expiryDate = 'Valid expiry date is required (MM/YYYY)';
      }
      if (!cvv.trim() || !/^\d{3}$/.test(cvv)) {
        newErrors.cvv = 'Valid CVV is required (3 digits)';
      }
    } else if (paymentOption === 'bank') {
      if (!bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!accountNumber.trim() || !/^\d{8,12}$/.test(accountNumber)) {
        newErrors.accountNumber = 'Valid account number is required (8-12 digits)';
      }
      if (!ifscCode.trim() || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        newErrors.ifscCode = 'Valid IFSC code is required (Example: ABCD0123456)';
      }
    } else if (paymentOption === 'upi') {
      if (!paymentId.trim()) {
        newErrors.paymentId = 'Payment ID is required';
      }
    }
  
    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      try {
         await booking()
         cancelPayment()
      } catch (error) {
        alert("Payment failed");
      }
    } else {
      // Show alert with error messages
      let errorMessage = 'Please fix the following errors:\n';
      for (const errorKey in newErrors) {
        errorMessage += `${newErrors[errorKey]}\n`;
      }
      alert(errorMessage);
    }
  };
  
  


  return (
    <>
    <Container className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Payment Details:
      </Typography>
      <Typography variant="h6">Total Amount : ₹{total()} </Typography>

      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="payment-option-label">Select Payment Option</InputLabel>
        <Select
          labelId="payment-option-label"
          id="payment-option"
          value={paymentOption}
          onChange={handlePaymentOptionChange}
          label="Select Payment Option"
        >
          <MenuItem value="">
            <em>Select Payment Option</em>
          </MenuItem>
          <MenuItem value="card">Credit/Debit Card</MenuItem>
          <MenuItem value="bank">Bank Transfer</MenuItem>
          <MenuItem value="upi">UPI Payment</MenuItem>
        </Select>
      </FormControl>

      {paymentOption && (
        <div className={classes.paymentOption}>
          <div className={classes.paymentIcon}>
            {paymentOption === 'card' ? '💳' : paymentOption === 'bank' ? '🏦' : '📱'}
          </div>
          {paymentOption === 'card' && (
            <>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <TextField
                label="Card Holder Name"
                variant="outlined"
                fullWidth
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
              <TextField
                label="Expiry Date (MM/YYYY)"
                variant="outlined"
                fullWidth
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </>
          )}
          {paymentOption === 'bank' && (
            <>
              <TextField
                label="Bank Name"
                variant="outlined"
                fullWidth
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                label="Account Number"
                variant="outlined"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <TextField
                label="IFSC Code"
                variant="outlined"
                fullWidth
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </>
          )}
          {paymentOption === 'upi' && (
            <TextField
              label="Payment ID"
              variant="outlined"
              fullWidth
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
            />
          )}
        </div>
      )}

      {paymentOption && <Button
        variant="contained"
        color="primary"
        className={classes.confirmButton}
        onClick={handleConfirmOrder}
      >
        Confirm Order
      </Button>}
      <Button
        variant="contained"
        color="primary"
        className={classes.confirmButton}
        onClick={cancelPayment}
      >
        Cancel
      </Button>
    </Container>
    </>
  );
};

export default Payment;
