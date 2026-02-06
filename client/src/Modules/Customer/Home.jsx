import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import CategoryImage1 from './Components/utils/individual.jpg'; // Import your category images here
import CategoryImage2 from './Components/utils/team.jpg';
import CategoryImage3 from './Components/utils/Fitness.jpg';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';
import BannerImage from './banner.webp'; // Import your banner image here


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  appBar: {
    background: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.8rem',
  },
  loginButton: {
    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
    color: 'white',
    borderRadius: '25px',
    padding: '8px 25px',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
    },
  },
  banner: {
    width: '100%',
    height: '70vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(6),
    position: 'relative',
  },
  bannerContent: {
    textAlign: 'center',
    color: '#ffffff',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  bannerSubtitle: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(3),
  },
  categoriesSection: {
    padding: theme.spacing(8, 0),
  },
  categoriesHeading: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    fontWeight: 700,
    color: '#2D3436',
    '& span': {
      borderBottom: '4px solid #FF6B6B',
    },
  },
  categoryCard: {
    height: 300,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
    '&:hover': {
      '& $categoryCardContent': {
        transform: 'translateY(0)',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
      },
    },
  },
  categoryCardContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))',
    padding: theme.spacing(3),
    transform: 'translateY(70%)',
    transition: 'all 0.3s ease-in-out',
  },
  categoryTitle: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  categoryDescription: {
    color: '#ffffff',
    opacity: 0.9,
  },
  benefitsSection: {
    padding: theme.spacing(8, 0),
    background: '#ffffff',
    borderRadius: '30px',
    margin: theme.spacing(4, 0),
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  benefitCard: {
    padding: theme.spacing(3),
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: '15px',
    height: '100%',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
  footer: {
    background: 'linear-gradient(45deg, #2D3436, #000000)',
    color: '#ffffff',
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(8),
  },
}));

const categories = [
  { 
    name: 'Team Sports',
    image: CategoryImage1,
    description: 'Discover premium equipment for football, basketball, volleyball, and more.'
  },
  { 
    name: 'Individual Sports',
    image: CategoryImage2,
    description: 'High-quality gear for tennis, swimming, athletics, and other individual sports.'
  },
  { 
    name: 'Fitness & Exercise',
    image: CategoryImage3,
    description: 'Complete range of fitness equipment for your home and professional workout needs.'
  },
];

const benefits = [
  {
    title: 'Premium Quality',
    description: 'All our products are sourced from top manufacturers ensuring the highest quality standards.'
  },
  {
    title: 'Expert Support',
    description: 'Our team of sports experts is always ready to help you choose the right equipment.'
  },
  {
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to your doorstep with real-time tracking.'
  },
];

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SportsPro
          </Typography>
          <IconButton color="primary">
            <AccountCircleIcon />
          </IconButton>
          <Button className={classes.loginButton} onClick={() => navigate("/Login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.banner}>
        <div className={classes.bannerContent}>
          <Typography variant="h1" className={classes.bannerTitle}>
            Your Sports Journey Starts Here
          </Typography>
          <Typography variant="h5" className={classes.bannerSubtitle}>
            Premium Sports Equipment for Champions
          </Typography>
          <Button variant="contained" className={classes.loginButton}>
            Explore Now
          </Button>
        </div>
      </div>

      <Container maxWidth="lg">
        <div className={classes.categoriesSection}>
          <Typography variant="h3" className={classes.categoriesHeading}>
            <span>Shop By Category</span>
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  className={classes.categoryCard}
                  style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover' }}
                >
                  <CardActionArea>
                    <CardContent className={classes.categoryCardContent}>
                      <Typography className={classes.categoryTitle}>
                        {category.name}
                      </Typography>
                      <Typography className={classes.categoryDescription}>
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={classes.benefitsSection}>
          <Typography variant="h3" className={classes.categoriesHeading}>
            <span>Why Choose Us</span>
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <div className={classes.benefitCard}>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 600, color: '#2D3436' }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {benefit.description}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>

      <footer className={classes.footer}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>About Us</Typography>
              <Typography variant="body2">
                Your trusted partner in sports equipment since 2024.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Contact</Typography>
              <Typography variant="body2">
                Email: support@sportspro.com<br />
                Phone: +1 234 567 890
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Follow Us</Typography>
              <Typography variant="body2">
                Connect with us on social media
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
