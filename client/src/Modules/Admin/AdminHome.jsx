import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Card, CardContent, Box, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PeopleIcon from '@material-ui/icons/People';
import Users from './Components/Users';
import Seller from './Components/Seller';
import Reports from './Components/Reports';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  appBar: {
    backgroundColor: '#2C3E50',
    zIndex: theme.zIndex.drawer + 1,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    fontWeight: 600,
    letterSpacing: '1px',
  },
  avatar: {
    backgroundColor: '#2196F3',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff',
    borderRight: 'none',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#2C3E50',
    color: '#fff',
  },
  listItem: {
    margin: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#f0f4f7',
    },
  },
  listItemSelected: {
    backgroundColor: '#e3f2fd',
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
  },
  listItemIcon: {
    color: '#2C3E50',
  },
  listItemText: {
    color: '#2C3E50',
    fontWeight: 500,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    backgroundColor: '#f5f7fa',
  },
  welcomeSection: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  welcomeTitle: {
    color: '#2C3E50',
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: theme.spacing(2),
  },
  welcomeSubtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
    marginBottom: theme.spacing(3),
  },
  statsContainer: {
    marginTop: theme.spacing(4),
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: 500,
  },
  cardValue: {
    color: '#1e293b',
    fontSize: '1.8rem',
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Fetch dashboard statistics
    fetchDashboardStats();
    fetchRecentActivities();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Replace with your actual API endpoints
      const response = await axios.get('http://localhost:8081/api/get/dashboardStats');
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8081/api/get/recentActivities');
      setRecentActivities(response.data);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    setOpenDrawer(false);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Users':
        return <Users />;
      case 'Sellers':
        return <Seller />;
      case 'Reports':
        return <Reports />;
      case 'Logout':
        return Logout();
      default:
        return <Typography variant="h4" align="center" gutterBottom style={{color:"black"}}>Welcome to Online Sports Equipment Store</Typography>;
    }
  };

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  const renderDashboard = () => {
    return (
      <div>
        {/* Welcome Section */}
        <div className={classes.welcomeSection}>
          <Typography variant="h1" className={classes.welcomeTitle}>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="h6" className={classes.welcomeSubtitle}>
            Monitor and manage your business performance with real-time analytics
          </Typography>
          <Typography variant="body1" style={{ color: '#64748b' }}>
            From this dashboard, you can:
          </Typography>
          <ul style={{ 
            color: '#64748b', 
            marginTop: '8px'  // Using direct pixel value instead of theme.spacing
          }}>
            <li>Monitor total users and sellers</li>
            <li>Track order statistics</li>
            <li>View revenue analytics</li>
            <li>Manage system operations</li>
          </ul>
        </div>

        {/* Stats Cards */}
        <Grid container spacing={4} className={classes.statsContainer}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.statsCard}>
              <CardContent>
                <Box className={classes.cardIcon} style={{ backgroundColor: '#e3f2fd' }}>
                  <PeopleIcon style={{ color: '#2196f3', fontSize: 30 }} />
                </Box>
                <Typography className={classes.cardTitle}>Total Users</Typography>
                <Typography className={classes.cardValue}>{dashboardStats.totalUsers}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  className={classes.progressBar}
                  style={{ backgroundColor: '#e3f2fd', color: '#2196f3' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.statsCard}>
              <CardContent>
                <Box className={classes.cardIcon} style={{ backgroundColor: '#fef3c7' }}>
                  <BusinessIcon style={{ color: '#f59e0b', fontSize: 30 }} />
                </Box>
                <Typography className={classes.cardTitle}>Total Sellers</Typography>
                <Typography className={classes.cardValue}>{dashboardStats.totalSellers}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  className={classes.progressBar}
                  style={{ backgroundColor: '#fef3c7', color: '#f59e0b' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.statsCard}>
              <CardContent>
                <Box className={classes.cardIcon} style={{ backgroundColor: '#e8f5e9' }}>
                  <ShoppingCartIcon style={{ color: '#4caf50', fontSize: 30 }} />
                </Box>
                <Typography className={classes.cardTitle}>Total Orders</Typography>
                <Typography className={classes.cardValue}>{dashboardStats.totalOrders}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={60} 
                  className={classes.progressBar}
                  style={{ backgroundColor: '#e8f5e9', color: '#4caf50' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.statsCard}>
              <CardContent>
                <Box className={classes.cardIcon} style={{ backgroundColor: '#fee2e2' }}>
                  <MonetizationOnIcon style={{ color: '#ef4444', fontSize: 30 }} />
                </Box>
                <Typography className={classes.cardTitle}>Total Revenue</Typography>
                <Typography className={classes.cardValue}>₹{dashboardStats.totalRevenue}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  className={classes.progressBar}
                  style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6">Admin Panel</Typography>
        </div>
        <List>
          {[
            { text: 'Users', icon: <PersonIcon /> },
            { text: 'Sellers', icon: <BusinessIcon /> },
            { text: 'Reports', icon: <AssessmentIcon /> },
            { text: 'Logout', icon: <ExitToAppIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleItemClick(item.text)}
              className={`${classes.listItem} ${
                selectedItem === item.text ? classes.listItemSelected : ''
              }`}
            >
              <ListItemIcon className={classes.listItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                className={classes.listItemText}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        {!selectedItem ? renderDashboard() : renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
