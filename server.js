const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
 

  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Shopping123*",
    database:"shopping"
})



app.post('/login', (req, res) => {
  const sql = "SELECT * FROM customer WHERE email=? AND password=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
          return res.json("Error");
      }
      if (data.length > 0) {
          
          return res.json({
            customer_id: data[0].customer_id,
            name: data[0].name,
            redirect: '/'
        });
      } else {
          return res.json({ redirect: '/login' });
      }
  });
});
app.post('/adminlogin', (req, res) => {
  const sql = "SELECT * FROM admin WHERE email=? AND password=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
          return res.json("Error");
      }
      if (data.length > 0) {
          
          return res.json({
            admin_id: data[0].admin_id,
            admin_name: data[0].admin_name,
            redirect: '/dashboard'
        });
      } else {
          return res.json({ redirect: '/adminlogin' });
      }
  });
});

 

app.post('/addtocart', (req, res) => {
  const {customer_id, product_id, quantity} = req.body;
const status = "Pending";
  const sql = "INSERT INTO cart (customer_id, product_id, quantity, status) VALUES (?, ?, ?, ?)";
  console.log("SQL Query:", sql);

  db.query(sql,[customer_id, product_id, quantity, status], (err, results) => {
      console.log(err);
      if (err) {
          return res.json('Error adding item to cart');
      } else {
          return res.json('success');
      }
  });
});



app.post('/getcart', (req, res) => {
  const customer_id = req.body.customer_id;
  const status = 'Pending';

  const sql = `
  SELECT cart.*, product.*
  FROM cart
  INNER JOIN product ON cart.product_id = product.product_id
  WHERE cart.customer_id = ? AND cart.status = ?;
`;

db.query(sql, [customer_id, status], (err, results) => {
  console.log("SQL Query:", customer_id); 

  if (err) {
      console.error(err);
      res.status(500).send('Error fetching cart data');
  } else {
    console.log();
      res.json(results);
      console.log(results);
  }
});
    

  });


app.get('/products', (req, res) => {
  const category = req.query.category;

  let sql = 'SELECT * FROM product';
  console.log(category);
    if (category) {
      sql += ` WHERE category = '${category}'`;
    }
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
      } else {
        res.json(results);
      }
    });
    

  });

  app.get('/adminproduct', (req, res) => {
    const category = req.query.category;
  
    let sql = 'SELECT * FROM product';
      db.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching products');
        } else {
          res.json(results);
        }
      });
      
  
    });
    app.get('/adminorders', (req, res) => {
    
      let sql = 'SELECT * FROM order';
        db.query(sql, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error fetching products');
          } else {
            res.json(results);
          }
        });
        
    
      });

  app.get('/viewproducts', (req, res) => {
    const productid = req.query.productid;
  
    let sql = 'SELECT * FROM product';
    console.log(productid);
      if (productid) {
        sql += ` WHERE product_id = '${productid}'`;
      }
      db.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching products');
        } else {
          res.json(results);
         console.log(results);
        }
      });
      
  
    });


    app.post('/register', (req, res) => {
      const { name, email, password, phoneno, address } = req.body;
  
      const sql = "INSERT INTO customer (name, email, password, phoneno, address) VALUES (?, ?, ?, ?, ?)";
      console.log("SQL Query:", sql);
  
      db.query(sql, [name, email, password, phoneno, address], (err, result) => {
          console.log(err);
          if (err) {
              return res.json("Error registering user");
          } else {
              return res.json("User registered successfully");
          }
      });
  });

  app.post('/payment', (req, res) => {
    // Extract necessary data from the request body
    const {customer_id,  grandTotal, paymentOption } = req.body;

  
    // Modify your SQL query accordingly
    const sql = "INSERT INTO `payment` (customer_id,total_amount, payment_method) VALUES (?, ?, ?)";
    const updateCartQuery = "UPDATE cart SET status = 'cleared' WHERE customer_id = ?";
    const ordersql = "INSERT INTO `order` (customer_id,total_amount, payment_mode) VALUES (?, ?, ?)";

    db.query(sql, [customer_id,  grandTotal, paymentOption], (err, results) => {
      if (err) {
        console.error("Error adding order:", err);
        return res.status(500).json({ error: 'Error processing order' });
    } else {
        // Assuming the order is successfully added, execute the second query to update cart status
        db.query(updateCartQuery, [customer_id], (err, cartResults) => {
            if (err) {
                console.error("Error updating cart status:", err);
                return res.status(500).json({ error: 'Error updating cart status' });
            } else {
                db.query(ordersql, [customer_id,  grandTotal, paymentOption], (err, results) => {
                  if (err) {
                    console.error("Error adding order:", err);
                    return res.status(500).json({ error: 'Error processing order' });
                } else {
                return res.json({ success: true });
                }
              });
            }
        });
    }
    });
  });
  
  app.post('/addorder', (req, res) => {
    const {customer_id,  grandTotal, paymentOption } = req.body;
    const sql = "INSERT INTO `order` (customer_id,total_amount, payment_mode) VALUES (?, ?, ?)";
    const updateCartQuery = "UPDATE cart SET status = 'cleared' WHERE customer_id = ?";

    db.query(sql, [customer_id,  grandTotal, paymentOption], (err, results) => {
      if (err) {
        console.error("Error adding order:", err);
        return res.status(500).json({ error: 'Error processing order' });
    } else {
        db.query(updateCartQuery, [customer_id], (err, cartResults) => {
            if (err) {
                console.error("Error updating cart status:", err);
                return res.status(500).json({ error: 'Error updating cart status' });
            } else {
                return res.json({ success: true });
            }
        });
    }
    });
  });

  app.post('/payment/confirm', (req, res) => {
    res.status(200).json({ success: true });
  });
  app.get('/totalOrders', (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalOrders FROM `order`';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ totalOrders: result[0].totalOrders });
    });
  });
  
  app.get('/totalCustomers', (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalCustomers FROM customer';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ totalCustomers: result[0].totalCustomers });
    });
  });
  

  app.get('/totalProducts', (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalProducts FROM product';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ totalProducts: result[0].totalProducts });
    });
  });


  app.get('/adminorders', (req, res) => {
    const sql = 'SELECT * FROM `order`';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ orders: results });
    });
  });

  app.post('/addproduct', (req, res) => {
    const { ProductName,Category,Price,Description,Image } = req.body;

    const sql = "INSERT INTO product (product_name,category,price,description,product_img) VALUES (?, ?,?, ?, ?)";
    console.log("SQL Query:", sql);

    db.query(sql, [ProductName, Category,Price,Description,Image], (err, result) => {
        console.log(err);
        if (err) {
            return res.json("Error : Something Went Wrong");
        } else {
            return res.json("Product added successfully");
        }
    });
});
app.listen(8081,()=>{
    console.log("Listening...")
})