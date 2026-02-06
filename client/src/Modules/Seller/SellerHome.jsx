import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ManageProducts from './Components/ManageProducts';
import Orders from './Components/Orders';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background:'#EAF0F1',
    height:'100vh'
  },
  appBar: {
    backgroundColor: '#1287A5',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1287A5',
    color: '#fff',
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: "80px",
  },
  listItemText: {
    color: 'white',
  },
  listItemIcon: {
    color: 'white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "80px",
    minHeight: "70vh",
  },
}));

const SellerHome = () => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Typography variant="h4" style={{ textAlign: 'center', marginTop: 20 ,}}>Welcome to Service Center Admin Dashboard</Typography>;
      case 'Manage Products':
        return <ManageProducts />;
      case 'Orders':
        return <Orders />;
      case 'Logout':
        return Logout();
      default:
        return <Typography variant="h4" style={{ textAlign: 'center', marginTop: 20 }}>Welcome to Service Center Admin Dashboard</Typography>;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Service Center Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <BusinessIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            {['Dashboard', 'Manage Products', 'Orders', 'Logout'].map((text, index) => (
              <ListItem button key={text} onClick={() => handleItemClick(text)}>
                <ListItemIcon className={classes.listItemIcon}>
                  {text === 'Dashboard' && <DashboardIcon />}
                  {text === 'Manage Products' && <BusinessIcon />}
                  {text === 'Orders' && <ListAltIcon />}
                  {text === 'Logout' && <ExitToAppIcon />}
                </ListItemIcon>
                <ListItemText primary={text} classes={{ primary: classes.listItemText }} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>

      <main className={classes.content}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default SellerHome;
