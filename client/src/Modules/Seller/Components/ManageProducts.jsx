import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Addproducts from './Addproducts';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#1287A5',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
  table: {
    minWidth: 650,
  },
  deleteButton: {
    color: '#FF3E4D',
  },
  editButton: {
    color: '#0ABDE3',
  },
}));

const Manageproducts = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setproducts] = useState([]);
  const [EditingProducts, setEditingProducts] = useState(null);
  const [EditedProduct, setEditedProduct] = useState({});
  const user= JSON.parse(localStorage.getItem('user'))
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/delete/deleteProduct/${id}`);
      alert(response.data.message);
      getproducts(); 
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error);
    }
  };

  const handleEditproduct = (product) => {
    setEditingProducts(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveproduct = async () => {
    try {
      // Perform update request with edited product details
      const response = await axios.post(`http://localhost:8081/updateProduct/${EditedProduct.id}`, EditedProduct);
      alert(response.data.message);
      // Refresh the user list after saving changes
      getproducts();
      setEditingProducts(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProducts(null);
    setEditedProduct({});
  };

  const getproducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getAllproducts');
      setproducts(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error getting user:', error.message);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  const handleInputChange = (e, field) => {
    setEditedProduct({ ...EditedProduct, [field]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.addButton} onClick={() => setOpenDialog(true)}>
        Add New Products
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product_Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Product_Cost</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.filter((item)=> item.user_id == user.id).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{EditingProducts === user.id ? <TextField value={EditedProduct.product_name} onChange={(e) => handleInputChange(e, 'product_name')} /> : user.product_name}</TableCell>
                <TableCell>{EditingProducts === user.id ? <TextField value={EditedProduct.product_type} onChange={(e) => handleInputChange(e, 'product_type')} /> : user.product_type}</TableCell>
                <TableCell>{EditingProducts === user.id ? <TextField value={EditedProduct.description} onChange={(e) => handleInputChange(e, 'description')} /> : user.description}</TableCell>
                <TableCell>{EditingProducts === user.id ? <TextField value={EditedProduct.product_cost} onChange={(e) => handleInputChange(e, 'product_cost')} /> : user.product_cost}</TableCell>
                <TableCell>
                  {EditingProducts === user.id ? (
                    <>
                      <IconButton aria-label="save" onClick={handleSaveproduct}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton aria-label="cancel" onClick={handleCancelEdit}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton aria-label="edit" className={classes.editButton} onClick={() => handleEditproduct(user)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton aria-label="delete" className={classes.deleteButton} onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="add-user-dialog-title">
        <DialogTitle id="add-user-dialog-title">Add New Product</DialogTitle>
        <Addproducts onCloseDialog={() => setOpenDialog(false)} getproducts={getproducts} />
      </Dialog>
    </div>
  );
};

export default Manageproducts;
