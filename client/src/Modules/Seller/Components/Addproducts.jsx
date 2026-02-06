import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const categories = ['Team Sports', 'Individual Sports ', 'Fitness and Exercise '];

const Addproducts = ({ onCancel }) => {
  const classes = useStyles();

  const [productName, setproductName] = useState('');
  const [productType, setproductType] = useState('');
  const [productCost, setproductCost] = useState('');
  const [description, setDescription] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [user_id, setUser_id] = useState('');
  const [image, setImage] = useState(null);

  const handleproductNameChange = (e) => {
    setproductName(e.target.value);
  };

  const handleproductTypeChange = (e) => {
    setproductType(e.target.value);
  };

  const handleproductCostChange = (e) => {
    setproductCost(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTimeRequiredChange = (e) => {
    setTimeRequired(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUser_id(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   const data= JSON.parse(localStorage.getItem('user'))
    try {
    
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('product_type', productType);
      formData.append('price', productCost);
      formData.append('description', description);
      formData.append('time', timeRequired);
      formData.append('user_id', data.id);
      formData.append('productImage', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      const response = await axios.post('http://localhost:8081/addProduct', formData, config);
  
      alert("product Added Successfully");
      console.log('Response:', response.data);
  
      // Reset form fields after successful submission
      setproductName('');
      setproductType('');
      setproductCost('');
      setDescription('');
      setTimeRequired('');
      setUser_id('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Failed to add product"); 
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={handleproductNameChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>product Type</InputLabel>
        <Select value={productType} onChange={handleproductTypeChange}>
          <MenuItem value="">Select product Type</MenuItem>
          <MenuItem value="Team Sports">Team Sports</MenuItem>
          <MenuItem value="Individual Sports ">Individual Sports </MenuItem>
          <MenuItem value="Fitness and Exercise">Fitness and Exercise</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="product Cost"
        type="number"
        value={productCost}
        onChange={handleproductCostChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
      />
      <input
        accept="image/*"
        id="image-upload"
        name="productImage"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload">
        <Button variant="outlined" color="#F44336" component="span"  className={classes.uploadButton}>
          Upload Image
        </Button>
      </label>
      <Button type="submit" variant="contained" color="#F44336" style={{backgroundColor:"#F44336"}} fullWidth className={classes.button}>
        Add product
      </Button>
      <Button variant="contained" color="default" onClick={onCancel} fullWidth className={classes.button}>
        Cancel
      </Button>
    </form>
  );
};

export default Addproducts;
