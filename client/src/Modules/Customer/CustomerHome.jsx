import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Card, CardActionArea, CardContent, Grid, Button, TextField, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import BannerImage from './banner.webp'; // Import your banner image here
import CategoryImage1 from './Components/utils/individual.jpg'; // Import your category images here
import CategoryImage2 from './Components/utils/team.jpg';
import CategoryImage3 from './Components/utils/Fitness.jpg';
import Customernavbar from "./Components/Customernavbar";
import axios from 'axios';
import { useMyContext } from '../../Context/Context';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  banner: {
    width: '100%',
    height: 300,
    backgroundImage: `url(${BannerImage})`,
    backgroundSize: 'cover',
    marginBottom: theme.spacing(2),
    borderRadius: "5px"
  },
  searchBar: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  searchTextField: {
    width: '55%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiInputAdornment-root svg': {
      color: '#555',
    },
  },
  searchAlert: {
    color: '#FF3E4D',
    textAlign: 'center',
    marginLeft: '100px',
  },
  categoriesHeading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoryCard: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    color: '#fff',
  },
  categoryCardContent: {
    textAlign: 'center',
  },
  productsContainer: {
    marginTop: theme.spacing(2),
  },
  productCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const categories = [
  { name: 'Team Sports', image: CategoryImage1 },
  { name: 'Individual Sports', image: CategoryImage2 },
  { name: 'Fitness and Exercise ', image: CategoryImage3 },
];


const CustomerHome = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useMyContext()
  const [rating, setRating] = useState([]);



  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchItems, setSearchItems] = useState([])
  console.log('searchItems', searchItems)

  const [teamSportsProducts, setTeamSportsProducts] = useState([])
  const [individualSportsProducts, setIndividualSportsProducts] = useState([])
  const [fitnes_excerciseProducts, setFitnes_excerciseProducts] = useState([])

  console.log(searchInputValue)
  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/get/getRatings');
      setRating(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching stylists:', error);
    }
  };


  const handleSearchProduct = (event) => {
    setSearchInputValue(event.target.value);
    const filteredProducts = products.filter(product =>
      product.product_name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setSearchItems(filteredProducts);
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/getAllProducts');

        setProducts(response.data.data);

        const productsArray = response.data.data
        console.log('productsArray', productsArray)

        const TeamSportsItems = productsArray.filter((item) => item.product_type.trim() === 'Team Sports')
        const IndividualSportsItems = productsArray.filter((item) => item.product_type.trim() === 'Individual Sports')
        const Fitness_exerciseItems = productsArray.filter((item) => item.product_type.trim() === 'Fitness and Exercise')

        if (TeamSportsItems && IndividualSportsItems && Fitness_exerciseItems) {
          setTeamSportsProducts(TeamSportsItems)
          setIndividualSportsProducts(IndividualSportsItems)
          setFitnes_excerciseProducts(Fitness_exerciseItems)
        }

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    fetchRatings()
  }, []);

  console.log(rating,"rate");

  const handleAddToCart = (product) => {
    addToCart(product);
    // alert("Item added to cart")  
  };

  return (
    <div>
      <Customernavbar />
      <Container style={{ marginTop: "80px" }}>
        {/* Banner */}
        <div className={classes.banner}>    </div>


        {/* Search Bar */}
        <div className={classes.searchBar}>

          <Typography variant="h4" className={classes.categoriesHeading}>
            Our Products
          </Typography>

          <TextField
            className={classes.searchTextField}
            variant="outlined"
            placeholder="Search for products..."
            value={searchInputValue}
            onChange={handleSearchProduct}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon onClick={handleSearchProduct} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {
          searchInputValue ?
            <Typography variant="h4" className={classes.categoriesHeading}>
              Searched Products
            </Typography>
            : null
        }

        <Grid container spacing={2} className={classes.productsContainer}>

          {
            searchInputValue && searchItems.length === 0 ?
              <Typography className={classes.searchAlert}>Searched Product not found !!!</Typography>
              :
              searchItems.map((product, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Card className={classes.productCard} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)' }}>
                    <CardActionArea>
                      {product.product_image && <div style={{ height: 200, backgroundImage: `url(${require(`../../Uploads/${product.product_image}`)})`, backgroundSize: 'cover' }}></div>}
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          {product.product_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {product.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Price: ₹ {product.product_cost}.00
                        </Typography>
                        <Rating
                            name="rating"
                            value={rating.filter(rate=>rate.product_id == product.id).map(item=>item.average_rating)}
                            precision={0.5} // Allow half stars
                          />
                      </CardContent>
                    </CardActionArea>
                    <div style={{ backgroundColor: '#33a8bd', padding: '10px 0', textAlign: 'center' }}>
                      <Button style={{ color: 'white' }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                    </div>
                  </Card>
                </Grid>
              ))}

        </Grid>


        {/* Categories */}
        <Typography variant="h4" className={classes.categoriesHeading}>
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className={classes.categoryCard} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${category.image})` }}>
                <CardActionArea>
                  <CardContent className={classes.categoryCardContent}>
                    <Typography variant="h6">{category.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>


        <Typography variant="h4" className={classes.categoriesHeading}>
          Team Sports
        </Typography>
        <Grid container spacing={2} className={classes.productsContainer}>
          {teamSportsProducts.length > 0 && teamSportsProducts.map((product, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card className={classes.productCard} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)' }}>
                <CardActionArea>
                  {product.product_image && <div style={{ height: 200, backgroundImage: `url(${require(`../../Uploads/${product.product_image}`)})`, backgroundSize: 'cover' }}></div>}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Price: ₹ {product.product_cost}.00
                    </Typography>
                    <Rating
                            name="rating"
                            value={rating.filter(rate=>rate.product_id == product.id).map(item=>item.average_rating)}
                            precision={0.5} // Allow half stars
                          />
                  </CardContent>
                </CardActionArea>
                <div style={{ backgroundColor: '#33a8bd', padding: '10px 0', textAlign: 'center' }}>
                  <Button style={{ color: 'white' }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>



        <Typography variant="h4" className={classes.categoriesHeading}>
          Individual Sports
        </Typography>
        <Grid container spacing={2} className={classes.productsContainer}>
          {individualSportsProducts.length > 0 && individualSportsProducts.map((product, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card className={classes.productCard} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)' }}>
                <CardActionArea>
                  {product.product_image && <div style={{ height: 200, backgroundImage: `url(${require(`../../Uploads/${product.product_image}`)})`, backgroundSize: 'cover' }}></div>}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Price: ₹ {product.product_cost}.00
                    </Typography>
                    <Rating
                            name="rating"
                            value={rating.filter(rate=>rate.product_id == product.id).map(item=>item.average_rating)}
                            precision={0.5} // Allow half stars
                          />
                  </CardContent>
                </CardActionArea>
                <div style={{ backgroundColor: '#33a8bd', padding: '10px 0', textAlign: 'center' }}>
                  <Button style={{ color: 'white' }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>


        <Typography variant="h4" className={classes.categoriesHeading}>
          Fitness and Exercise
        </Typography>
        <Grid container spacing={2} className={classes.productsContainer}>
          {fitnes_excerciseProducts.length > 0 && fitnes_excerciseProducts.map((product, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card className={classes.productCard} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)' }}>
                <CardActionArea>
                  {product.product_image && <div style={{ height: 200, backgroundImage: `url(${require(`../../Uploads/${product.product_image}`)})`, backgroundSize: 'cover' }}></div>}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Price: ₹ {product.product_cost}.00
                    </Typography>
                    <Rating
                            name="rating"
                            value={rating.filter(rate=>rate.product_id == product.id).map(item=>item.average_rating)}
                            precision={0.5} // Allow half stars
                          />
                  </CardContent>
                </CardActionArea>
                <div style={{ backgroundColor: '#33a8bd', padding: '10px 0', textAlign: 'center' }}>
                  <Button style={{ color: 'white' }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>



      </Container>
    </div>
  );
};

export default CustomerHome;
