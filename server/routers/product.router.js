const express = require("express")
const Router = express.Router()
const {
  create,
  remove,
  getAll,
  getById,
  update,
  getBySubcategory,
  getByCategoryId,
  getByGender
} = require("../controller/product.controller.js")

Router.get("/", getAll)
Router.get("/gender/:gender", getByGender)
Router.get("/subcategory/:subcategoryId", getBySubcategory)
Router.get("/category/:categoryId", getByCategoryId)
Router.get("/:id", getById)
Router.post("/add", create)
Router.delete("/deleteone/:productId", remove)
Router.put("/update/:productId", update)

module.exports = Router 