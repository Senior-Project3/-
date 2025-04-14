const express = require("express")
const Router = express.Router()
const {create,remove,getAll,getById,update,getByCategory}= require("../controller/product.controller.js")

Router.get("/", getAll)
Router.get("/:id", getById)
Router.post("/add",create)
Router.delete("/deleteone/:productId",remove)
Router.put("/update/:productId",update)
Router.get("/category/:categoryId", getByCategory)




module.exports = Router 