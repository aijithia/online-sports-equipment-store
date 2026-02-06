import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#ffffff', // Background color
    padding: theme.spacing(2), // Padding around the form
  },
  button: {
    marginTop: theme.spacing(1), // Add margin between buttons
    marginBottom: theme.spacing(1),
  },
}));

const categories = ['Vanilla', 'Chocolate', 'Strawberry', 'Mint'];

const AddProductForm = ({ onCancel }) => {
  const classes = useStyles();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!productName.trim()) {
      errors.productName = 'Product Name is required';
    }
    if (!category) {
      errors.category = 'Category is required';
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) < 10) {
      errors.price = 'Price must be a number and minimum 10';
    }
    if (!quantity.trim() || isNaN(quantity) || parseInt(quantity) < 1) {
      errors.quantity = 'Quantity must be a number and minimum 1';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('image', image);
      // Now you can send formData to your backend API
      console.log('Form data:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={handleProductNameChange}
        error={!!errors.productName}
        helperText={errors.productName}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal" error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
      </FormControl>
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={handlePriceChange}
        error={!!errors.price}
        helperText={errors.price}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        error={!!errors.quantity}
        helperText={errors.quantity}
        fullWidth
        margin="normal"
      />
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" color="primary" component="span" fullWidth className={classes.button}>
          Upload Image
        </Button>
      </label>
      <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
        Add Product
      </Button>
      <Button variant="contained" color="default" onClick={onCancel} fullWidth style={{ marginTop: '8px' }}>
        Cancel
      </Button>
    </form>
  );
};

export default AddProductForm;
