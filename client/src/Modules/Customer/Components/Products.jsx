import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, IconButton } from '@material-ui/core';
import Customernavbar from './Customernavbar';
import axios from 'axios';
import { ArrowBack } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../../Context/Context';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: 'relative',
    marginTop: "80px"
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    backgroundColor: '#FFF',
  },
  media: {
    height: 140,
    objectFit: "cover"
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: 1000,
    marginTop: "50px"
  },
}));

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useMyContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getAllProducts');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleBack = () => {
    navigate('/CustomerHome');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // alert("Item added to cart") 
  };

  return (
    <>
      <IconButton className={classes.backButton} onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <Container className={classes.root} maxWidth="xl">
        <Customernavbar />
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className={classes.card}>
                <CardActionArea>
                  {product.product_image && <CardMedia
                    className={classes.media}
                    image={require(`../../../Uploads/${product.product_image}`)}
                    title={product.product_name}
                  />}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="h6" style={{ fontWeight: "600", fontSize: "17px" }}>
                      Price: ₹{product.product_cost}
                    </Typography>
                    <RatingComponent productId={product.id} />
                  </CardContent>
                </CardActionArea>
                <Button variant="contained" color="primary" fullWidth style={{ backgroundColor: "#33a8bd" }} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

const RatingComponent = ({ productId }) => {
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/add/addRating', {
        user_id: user.id,
        product_id: productId,
        rating: rating,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error while submitting rating:', error);
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <Rating
        name={`rating-${productId}`}
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      {rating > 0 && <Button onClick={handleRatingSubmit} variant="contained" color="primary" className={classes.button}>Rate</Button>}
    </>
  );
};

export default Products;
