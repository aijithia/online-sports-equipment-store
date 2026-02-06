import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import addRoutes from '../Backend/routes/addRoute.js'
import authRoutes from '../Backend/routes/authRoutes.js'
import getRoutes from '../Backend/routes/getRoute.js'
import deleteRoutes from '../Backend/routes/deleteRoute.js'
import updateRoutes from '../Backend/routes/updateRoute.js'
import multer from "multer";
import db from './config/db.js';
import path from "path";

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:['GET , POST ,PUT','DELETE'],
        credentials:true
      }
      ))
      
app.use('/api/auth',authRoutes)
app.use('/api/add', addRoutes)
app.use('/api/get', getRoutes)
app.use('/api/update', updateRoutes)
app.use('/api/delete', deleteRoutes)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/Uploads'); // Save uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp + file extension as filename
    }
  });
  
const upload = multer({ storage: storage });




app.post('/addProduct', upload.single('productImage'), (req, res) => {
  console.log("hyyyy");
    if (!req.file) {
        res.status(400).json({ message: "No image file uploaded." });
        return;
    }

    const { productName, product_type, price,description,user_id} = req.body;  
    console.log(req.body);
    const imagePath = req.file.filename;

    const sql = "INSERT INTO products (product_name, product_type, product_cost,description,user_id,product_image) VALUES (?, ?, ?,?,?,?)";
    const values = [productName, product_type, price,description,user_id, imagePath];  
    db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error adding product:', err);
          res.status(500).json({ error: 'Error adding product' });
          return;
      }
      console.log('product added successfully');
      res.status(200).json({ message: 'product added successfully' });
  });
  
});

app.post('/updateProduct/:id', (req, res) => {
const {id}=req.params
  const { product_name, product_type, product_cost,description} = req.body;  

  const sql = "UPDATE  products SET product_name=? ,product_type=? ,product_cost=?,description=? where id=?";
  const values = [product_name, product_type, product_cost,description,id];  

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating product:', err);
          res.status(500).json({ error: 'Error updating product' });
          return;
      }
      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
  });
});



app.listen(8081, () => {
  console.log('Server is running');
});
