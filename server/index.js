require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { syncDatabase } = require('./models');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
const productRouter = require("./routers/product.router.js")
const categoryRouter = require("./routers/category.router.js")
const subcategoryRouter = require("./routers/subcategory.router.js")
const cartRouter = require("./routers/cart.router.js")
const paymentRouter = require("./routers/payment.router.js")
const userRouter = require("./routers/user.router.js")
const orderRouter = require("./routers/order.router.js")

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use("/api/products", productRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/subcategories", subcategoryRouter)
app.use("/api/cart", cartRouter)
app.use("/api", paymentRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer(); 