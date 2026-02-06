import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../../Context/Context';

const useStyles = makeStyles((theme) => ({
  appBar: {
    
    // background: 'linear-gradient(55deg, #226583 60%,  #13547a 100%)',
    background: 'linear-gradient(to right, #09203f 0%, #13547a  100%)',
  },
  title: {
    flexGrow: 1,
  },
}));

const Customernavbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cartItems } = useMyContext();

  const handleProducts = () => {
    navigate('/Products');
  };

  const handleCartClick = () => {
    navigate("/Cart")
  };

  const handleOrderHistoryClick = () => {
    navigate("/MyBookings")
  };

  const handleLogout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sports Equipment Store
          </Typography>

          <Button color="inherit" onClick={handleProducts}>Products</Button>
          <Button color="inherit" onClick={handleOrderHistoryClick}>Order History</Button>
          <IconButton color="inherit" onClick={handleCartClick}>
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <Typography variant="body1" color="inherit" style={{ marginLeft: '5px' }}>
                {cartItems.length}
              </Typography>
            )}
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Customernavbar;
