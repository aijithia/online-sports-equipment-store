import db from "../config/db.js";


export const getUsers = (req,res)=>{

    const sql = "Select * from users ";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}
export const getSeller = (req,res)=>{

    const sql = "Select * from sellers ";
  
    db.query(sql,  (err, result) => {
      if (err) {
        console.error('Error :', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}
export const getAllproducts = (req,res)=>{
    const sql = "Select * from products";
    // console.log("hyyy");
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      // console.log('services fetched successfully ');
      res.status(200).json({ data:result });
    });
}



export const getBookings = (req, res) => {
  const getAllInvoicesQuery = `
    SELECT 
      b.*, 
      p.product_name 
    FROM 
      bookings b
    LEFT JOIN 
      products p 
    ON 
      b.product_id = p.id
  `;

  db.query(getAllInvoicesQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving invoices:', error);
      res.status(500).json({ error: 'Error retrieving invoices' });
      return;
    }

    res.status(200).json({ data: results });
  });
};


export const getBookedServices = (req, res) => {
  // console.log("hyy");
  const getInvoiceItemsQuery = "SELECT * FROM booked_products";

  db.query(getInvoiceItemsQuery,  (error, results) => {
    if (error) {
      console.error('Error retrieving booking items:', error);
      res.status(500).json({ error: 'Error retrieving booking items' });
      return;
    }

    res.status(200).json({ data:results });
  });
};

export const getRatings = async (req, res) => {
  console.log("hyy");
  try {
    const avgRatingQuery = `
      SELECT product_id, AVG(rating) AS average_rating
      FROM Ratings
      GROUP BY product_id
    `;

    db.query(avgRatingQuery, (err, results) => {
      if (err) {
        console.error('Error fetching product ratings:', err);
        res.status(500).json({ error: 'Error fetching product ratings' });
        return;
      }

      // Send the average ratings as response
      res.status(200).json({ data: results });
    });
  } catch (error) {
    console.error('Error fetching product ratings:', error);
    res.status(500).json({ error: 'Error fetching product ratings' });
  }
};

export const getInvoicesByCustomerID = (req, res) => {
  const { customer_id } = req.body;
  const getInvoicesByAccountantQuery = "SELECT * FROM bookings WHERE customer_id = ?";

  db.query(getInvoicesByAccountantQuery, [customer_id], (error, results) => {
    if (error) {
      console.error('Error retrieving invoices by accountant:', error);
      res.status(500).json({ error: 'Error retrieving invoices by accountant' });
      return;
    }

    res.status(200).json({ data:results });
  });
};