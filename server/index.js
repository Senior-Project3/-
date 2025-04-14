require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { syncDatabase, sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

// Configure CORS with specific origin
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const productRouter = require("./routers/product.router.js")
const categoryRouter = require("./routers/category.router.js")
const subcategoryRouter = require("./routers/subcategory.router.js")
const cartRouter = require("./routers/cart.router.js")
const paymentRouter = require("./routers/payment.router.js")
const userRouter = require("./routers/user.router.js")

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// API routes
app.use("/api/products", productRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/subcategories", subcategoryRouter)
app.use("/api/cart", cartRouter)
app.use("/api", paymentRouter)
app.use("/api/users", userRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync database
    await syncDatabase();
    console.log('Database synchronized successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 