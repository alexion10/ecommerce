require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userRoleUpdate = require("./routes/userData")
const productsRoutes = require("./routes/productsData")
const favoriteRoutes = require('./routes/favoritesList')
const cartRoutes = require('./routes/cartList')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/role', userRoleUpdate);
app.use('/api/products', productsRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/cart', cartRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
